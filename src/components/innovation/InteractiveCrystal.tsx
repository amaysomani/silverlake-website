"use client";

import React, { useRef, useEffect, useCallback } from "react";
import * as THREE from "three";

// ── Main Crystal Vertex Shader ──
const vertexShader = `
  uniform float uTime;
  uniform float uHover;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying float vFresnel;
  varying vec3 vViewDir;

  void main() {
    vec3 pos = position;
    // Slow organic breathing
    float breathe = sin(uTime * 0.35) * 0.007 + cos(uTime * 0.22) * 0.004;
    pos += normal * breathe;

    vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
    vWorldPosition = worldPosition.xyz;
    vNormal = normalize(normalMatrix * normal);
    vec3 viewDir = normalize(cameraPosition - worldPosition.xyz);
    vViewDir = viewDir;
    vFresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 4.0);
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

// ── Glass Fragment Shader ──
const fragmentShader = `
  uniform float uTime;
  uniform float uHover;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying float vFresnel;
  varying vec3 vViewDir;

  vec3 envReflect(vec3 dir) {
    float y = dir.y * 0.5 + 0.5;
    vec3 sky    = vec3(0.01, 0.04, 0.14);
    vec3 horizon= vec3(0.2,  0.0, 0.3); // deep purple horizon
    vec3 ground = vec3(0.0,  0.01, 0.04);
    vec3 col = mix(ground, horizon, smoothstep(0.0, 0.4, y));
    col = mix(col, sky, smoothstep(0.4, 1.0, y));
    return col;
  }

  void main() {
    vec3 n = normalize(vNormal);
    vec3 v = normalize(vViewDir);
    vec3 r = reflect(-v, n);
    vec3 envColor = envReflect(r);

    vec3 light1 = normalize(vec3(1.2, 1.5, 2.0));
    vec3 light2 = normalize(vec3(-1.5, 0.5, 0.8));

    float spec1 = pow(max(dot(r, light1), 0.0), 300.0) * 2.0;
    float spec2 = pow(max(dot(r, light2), 0.0), 90.0) * 0.6;

    // Iridescence
    float iri = pow(1.0 - abs(dot(v, n)), 3.5);
    float iriShift = iri * (0.4 + 0.3 * sin(uTime * 0.15));
    vec3 iriColor = mix(vec3(0.3, 0.1, 0.5), vec3(0.8, 0.2, 0.6), sin(iriShift * 3.14159));

    // Base: vivid blue glass with strong inner glow
    vec3 col = vec3(0.03, 0.1, 0.28) + envColor * 0.5;
    col += iriColor * iri * 0.55;
    col += mix(vec3(0.3, 0.65, 1.0), vec3(0.9, 0.95, 1.0), spec1) * spec1;
    col += vec3(0.15, 0.5, 1.0) * spec2;

    // Inner glow — bright core light radiating through glass
    float coreGlow = pow(1.0 - vFresnel, 2.5);   // brightest at face center
    col += vec3(0.05, 0.25, 0.8) * coreGlow * 0.6;

    // Fresnel rim — vivid bright cyan to pink
    float rimStr = 0.7 + uHover * 0.4;
    col += mix(vec3(0.4, 0.2, 0.8), vec3(0.8, 0.4, 1.0), vFresnel) * vFresnel * rimStr;

    // Diffuse fill so all faces are visible
    float diffuse = max(dot(n, normalize(vec3(0.5, 1.0, 1.5))), 0.0);
    col += vec3(0.05, 0.2, 0.55) * (diffuse * 0.5 + 0.35);

    // Alpha: opaque with glassy edges
    float alpha = 0.78 + vFresnel * 0.18 + spec1 * 0.08;
    alpha = clamp(alpha, 0.0, 1.0);

    gl_FragColor = vec4(col, alpha);
  }
`;

// ── Shard Vertex Shader — directional explode toward mouse ──
const shardVertexShader = `
  uniform float uTime;
  uniform float uHover;
  uniform float uShardHover;   // per-shard activation (0-1), based on dot with mouse dir
  uniform vec3  uExplodeDir;   // face centroid direction
  uniform float uExplodeDist;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying float vFresnel;
  varying vec3 vViewDir;

  void main() {
    vec3 pos = position;

    // Each shard activates based on its alignment to the mouse direction
    float activation = uHover * uShardHover;

    // Explode outward
    pos += uExplodeDir * activation * uExplodeDist;

    // Tumble ONLY when exploding — angle is 0 at hover=0 so shards sit perfectly still
    // activation drives both the explode distance AND the tumble
    float angle = activation * uExplodeDist * 1.5;
    vec3 axis = normalize(cross(uExplodeDir, vec3(0.447, 0.894, 0.0)));
    // Guard: if axis is degenerate use fallback
    if (length(axis) < 0.001) axis = vec3(0.0, 1.0, 0.0);
    float c = cos(angle);
    float s = sin(angle);
    float tt = 1.0 - c;
    mat3 rot = mat3(
      tt*axis.x*axis.x + c,        tt*axis.x*axis.y - s*axis.z,  tt*axis.x*axis.z + s*axis.y,
      tt*axis.x*axis.y + s*axis.z, tt*axis.y*axis.y + c,         tt*axis.y*axis.z - s*axis.x,
      tt*axis.x*axis.z - s*axis.y, tt*axis.y*axis.z + s*axis.x,  tt*axis.z*axis.z + c
    );
    // Only rotate if actually exploding (avoids floating point identity issues at angle=0)
    if (activation > 0.001) pos = rot * pos;

    vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
    vWorldPosition = worldPosition.xyz;
    vNormal = normalize(normalMatrix * normal);
    vec3 viewDir = normalize(cameraPosition - worldPosition.xyz);
    vViewDir = viewDir;
    vFresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 4.0);
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

export default function InteractiveCrystal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const crystalGroupRef = useRef<THREE.Group | null>(null);
  const shardsRef = useRef<THREE.Mesh[]>([]);
  const shardDirsRef = useRef<THREE.Vector3[]>([]);
  const frameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const hoverRef = useRef(0);
  const targetHoverRef = useRef(0);
  const timeUniformRef = useRef<THREE.IUniform>({ value: 0 });
  const shardUniformsRef = useRef<Array<Record<string, THREE.IUniform>>>([]);

  const initScene = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const w = container.clientWidth;
    const h = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
    camera.position.set(0, 0, 5.5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const crystalGroup = new THREE.Group();
    crystalGroupRef.current = crystalGroup;
    scene.add(crystalGroup);

    // Shared time uniform for all shards
    const timeUniform: THREE.IUniform = { value: 0 };
    timeUniformRef.current = timeUniform;

    // IcosahedronGeometry detail=2 → 320 triangles = much smaller shards
    const flatGeom = new THREE.IcosahedronGeometry(1.2, 2).toNonIndexed();
    flatGeom.computeVertexNormals();

    // Thin wireframe overlay to show facet edges (renders on top correctly)
    const wireMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x004477), wireframe: true, transparent: true, opacity: 0.09,
      depthWrite: false,  // wire doesn't block depth reads
    });
    crystalGroup.add(new THREE.Mesh(new THREE.IcosahedronGeometry(1.22, 1), wireMat));

    // ── ALL SHARDS — always visible, assembled at hover=0, explode at hover=1 ──
    const positions = flatGeom.getAttribute("position") as THREE.BufferAttribute;
    const shards: THREE.Mesh[] = [];
    const shardUniforms: Array<Record<string, THREE.IUniform>> = [];
    const shardDirs: THREE.Vector3[] = [];

    for (let i = 0; i < positions.count; i += 3) {
      const v0 = new THREE.Vector3().fromBufferAttribute(positions, i);
      const v1 = new THREE.Vector3().fromBufferAttribute(positions, i + 1);
      const v2 = new THREE.Vector3().fromBufferAttribute(positions, i + 2);

      const center = v0.clone().add(v1).add(v2).divideScalar(3);
      const explodeDir = center.clone().normalize();
      const explodeDist = 0.35 + Math.random() * 0.3;   // Dramatic but controlled

      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(
        new Float32Array([v0.x, v0.y, v0.z, v1.x, v1.y, v1.z, v2.x, v2.y, v2.z]), 3
      ));
      geo.computeVertexNormals();

      const sUniforms: Record<string, THREE.IUniform> = {
        uTime: timeUniform,            // shared — updated once per frame
        uHover: { value: 0 },
        uShardHover: { value: 1.0 },   // default: full directional weight until overridden
        uExplodeDir: { value: explodeDir.clone() },
        uExplodeDist: { value: explodeDist },
      };

      const shardMesh = new THREE.Mesh(geo, new THREE.ShaderMaterial({
        vertexShader: shardVertexShader, fragmentShader, uniforms: sUniforms,
        transparent: true,
        side: THREE.FrontSide,   // FrontSide only — back faces were causing the "missing half"
        depthWrite: true,         // MUST be true so shards occlude each other correctly
        depthTest: true,
      }));
      // Always visible — at hover=0 they sit in their original positions = assembled crystal
      shardMesh.visible = true;
      crystalGroup.add(shardMesh);
      shards.push(shardMesh);
      shardUniforms.push(sUniforms);
      shardDirs.push(explodeDir.clone());
    }
    shardsRef.current = shards;
    shardUniformsRef.current = shardUniforms;
    shardDirsRef.current = shardDirs;
  }, []);

  const animate = useCallback(() => {
    const renderer = rendererRef.current;
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const crystalGroup = crystalGroupRef.current;

    if (!renderer || !scene || !camera || !crystalGroup) {
      frameRef.current = requestAnimationFrame(animate);
      return;
    }

    const time = performance.now() * 0.001;

    // Update shared time uniform once
    timeUniformRef.current.value = time;

    // Faster mouse tracking
    mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.1;
    mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.1;

    // Faster hover response — feels snappy
    hoverRef.current += (targetHoverRef.current - hoverRef.current) * 0.08;
    const hover = hoverRef.current;


    // Crystal group rotation
    crystalGroup.rotation.y = time * 0.1 + mouseRef.current.x * 0.7;
    crystalGroup.rotation.x = Math.sin(time * 0.08) * 0.07 + mouseRef.current.y * 0.45;
    crystalGroup.rotation.z = Math.cos(time * 0.06) * 0.03;
    crystalGroup.position.y = Math.sin(time * 0.3) * 0.06;

    // Mouse direction in crystal's local space for directional shatter
    const mouseDir3D = new THREE.Vector3(
      mouseRef.current.x, mouseRef.current.y, 1.0
    ).normalize();
    const localMouseDir = mouseDir3D.clone().applyQuaternion(
      crystalGroup.quaternion.clone().invert()
    );

    // Shards are ALWAYS visible — at hover=0 they sit assembled
    const shards = shardsRef.current;
    const shardUniforms = shardUniformsRef.current;
    const shardDirs = shardDirsRef.current;

    for (let i = 0; i < shards.length; i++) {
      const su = shardUniforms[i];
      if (!su) continue;

      // Wider cone than pow(4): pow(2.5) opens up ~70deg spread so more shards respond
      const rawDot = shardDirs[i].dot(localMouseDir);
      const shardWeight = Math.pow(Math.max(0.0, rawDot), 2.5);

      su.uHover.value = hover;
      su.uShardHover.value = shardWeight;
      shards[i].visible = true;
    }

    renderer.render(scene, camera);
    frameRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    initScene();

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    frameRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      const container = containerRef.current;
      const renderer = rendererRef.current;
      const camera = cameraRef.current;
      if (!container || !renderer || !camera) return;
      renderer.setSize(container.clientWidth, container.clientHeight);
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameRef.current);
      const dom = rendererRef.current?.domElement;
      if (dom?.parentNode) dom.parentNode.removeChild(dom);
      rendererRef.current?.dispose();
    };
  }, [initScene, animate]);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ width: "380px", height: "380px", cursor: "crosshair" }}
      onMouseEnter={() => { targetHoverRef.current = 1; }}
      onMouseLeave={() => { targetHoverRef.current = 0; }}
    >
      {/* Ambient glow layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 55% at 50% 52%, rgba(0,80,180,0.16) 0%, rgba(0,30,100,0.05) 45%, transparent 70%)",
          filter: "blur(18px)",
        }}
      />
    </div>
  );
}
