"use client";

import React, { useRef, useEffect, useCallback } from "react";
import * as THREE from "three";

// ─── Fragment Shader ──────────────────────────────────────────────────────────
const fragmentShader = `
  uniform float uTime;
  uniform float uActivation;
  varying vec3  vNormal;
  varying float vFresnel;
  varying vec3  vViewDir;

  void main() {
    vec3 n = normalize(vNormal);
    vec3 v = normalize(vViewDir);
    vec3 r = reflect(-v, n);

    // Dark environment — readable text on top
    float ry  = r.y * 0.5 + 0.5;
    vec3 env  = mix(vec3(0.0, 0.0, 0.04), vec3(0.03, 0.02, 0.15), ry);

    // Specular highlights — sharp "cut glass" sparkle
    vec3  L1 = normalize(vec3( 1.0, 1.3, 2.0));
    vec3  L2 = normalize(vec3(-1.2, 0.4, 0.8));
    float s1 = pow(max(dot(r, L1), 0.0), 300.0) * 3.0;
    float s2 = pow(max(dot(r, L2), 0.0), 65.0)  * 0.6;

    // Iridescence — time-animated blue/purple
    float iri      = pow(1.0 - abs(dot(v, n)), 3.0);
    float iriShift = iri * (0.3 + 0.2 * sin(uTime * 0.1));
    vec3  iriCol   = mix(
      vec3(0.1, 0.04, 0.45),
      vec3(0.55, 0.1, 0.8),
      sin(iriShift * 3.14159)
    );

    // Base: semi-opaque dark blue glass
    vec3 col = vec3(0.01, 0.01, 0.08) + env * 0.45;
    col += iriCol * iri * 0.55;
    col += mix(vec3(0.5, 0.7, 1.0), vec3(1.0, 0.95, 1.0), s1) * s1;
    col += vec3(0.15, 0.3, 0.75) * s2;

    // Faint inner glow (face centers)
    col += vec3(0.04, 0.02, 0.22) * pow(1.0 - vFresnel, 2.0) * 0.5;

    // Fresnel rim — vivid purple/blue at edges
    float rim = 0.6 + uActivation * 0.8;
    col += mix(vec3(0.25, 0.06, 0.7), vec3(0.1, 0.55, 1.0), vFresnel)
           * vFresnel * rim;

    // Exploding shards glow brighter
    col += vec3(0.5, 0.2, 1.0) * uActivation * 0.5;

    // Alpha: faces solid enough to look like glass, not invisible
    float alpha = 0.52 + vFresnel * 0.4 + s1 * 0.18 + uActivation * 0.12;
    gl_FragColor = vec4(clamp(col, 0.0, 1.0), clamp(alpha, 0.0, 1.0));
  }
`;

// ─── Shard Vertex Shader ──────────────────────────────────────────────────────
const shardVert = `
  uniform float uActivation;
  uniform vec3  uExplodeDir;
  uniform float uExplodeDist;
  varying vec3  vNormal;
  varying float vFresnel;
  varying vec3  vViewDir;

  void main() {
    vec3 pos = position;

    if (uActivation > 0.001) {
      pos += uExplodeDir * uActivation * uExplodeDist;

      // Tumble only when exploding
      float angle = uActivation * uExplodeDist * 2.0;
      vec3 ax = normalize(cross(uExplodeDir, vec3(0.4472, 0.8944, 0.0)));
      if (length(ax) < 0.001) ax = vec3(0.0, 1.0, 0.0);
      float c = cos(angle), s = sin(angle), t = 1.0 - c;
      mat3 R = mat3(
        t*ax.x*ax.x+c,       t*ax.x*ax.y-s*ax.z,  t*ax.x*ax.z+s*ax.y,
        t*ax.x*ax.y+s*ax.z,  t*ax.y*ax.y+c,        t*ax.y*ax.z-s*ax.x,
        t*ax.x*ax.z-s*ax.y,  t*ax.y*ax.z+s*ax.x,   t*ax.z*ax.z+c
      );
      pos = R * pos;
    }

    vec4 wp   = modelMatrix * vec4(pos, 1.0);
    vNormal   = normalize(normalMatrix * normal);
    vViewDir  = normalize(cameraPosition - wp.xyz);
    vFresnel  = pow(1.0 - max(dot(vViewDir, vNormal), 0.0), 4.0);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

// Crystal sphere radius (must match geometry)
const SPHERE_RADIUS = 2.5;

export default function InteractiveCrystal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const frameRef = useRef<number>(0);

  const rawMouseRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });

  const shardUniformsRef = useRef<Array<Record<string, THREE.IUniform>>>([]);
  const shardDirsRef = useRef<THREE.Vector3[]>([]);
  const timeUniformRef = useRef<THREE.IUniform>({ value: 0 });

  const _camPos = useRef(new THREE.Vector3(0, 0, 7));
  const _localCamPos = useRef(new THREE.Vector3());
  const _rayView = useRef(new THREE.Vector3());
  const _rayWorld = useRef(new THREE.Vector3());
  const _hitNormal = useRef(new THREE.Vector3());
  const _localNorm = useRef(new THREE.Vector3());
  const _closestPt = useRef(new THREE.Vector3());
  const _invQ = useRef(new THREE.Quaternion());
  // Smoothed proximity factor (0 = far away, 1 = cursor on surface)
  const smoothProxRef = useRef(0);

  const initScene = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const W = el.clientWidth || window.innerWidth;
    const H = el.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 200);
    camera.position.set(0, 0, 4.5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true, alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const group = new THREE.Group();
    groupRef.current = group;
    scene.add(group);

    const timeU: THREE.IUniform = { value: 0 };
    timeUniformRef.current = timeU;

    // detail=4 → 5120 fine triangles; very small shards
    const flatGeom = new THREE.IcosahedronGeometry(SPHERE_RADIUS, 4).toNonIndexed();
    flatGeom.computeVertexNormals();

    // Faint wireframe for facet lines
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x220055, wireframe: true,
      transparent: true, opacity: 0.04, depthWrite: false,
    });
    group.add(new THREE.Mesh(
      new THREE.IcosahedronGeometry(SPHERE_RADIUS * 1.003, 4), wireMat
    ));

    const posAttr = flatGeom.getAttribute("position") as THREE.BufferAttribute;
    const shardUs: Array<Record<string, THREE.IUniform>> = [];
    const shardDs: THREE.Vector3[] = [];

    for (let i = 0; i < posAttr.count; i += 3) {
      const v0 = new THREE.Vector3().fromBufferAttribute(posAttr, i);
      const v1 = new THREE.Vector3().fromBufferAttribute(posAttr, i + 1);
      const v2 = new THREE.Vector3().fromBufferAttribute(posAttr, i + 2);

      const centroid = v0.clone().add(v1).add(v2).divideScalar(3);
      const explodeDir = centroid.clone().normalize();
      const explodeDist = 0.45 + Math.random() * 0.45;

      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(
        new Float32Array([v0.x, v0.y, v0.z, v1.x, v1.y, v1.z, v2.x, v2.y, v2.z]), 3
      ));
      geo.computeVertexNormals();

      const su: Record<string, THREE.IUniform> = {
        uTime: timeU,
        uActivation: { value: 0 },
        uExplodeDir: { value: explodeDir.clone() },
        uExplodeDist: { value: explodeDist },
      };

      const mesh = new THREE.Mesh(geo, new THREE.ShaderMaterial({
        vertexShader: shardVert, fragmentShader,
        uniforms: su,
        transparent: true,
        side: THREE.FrontSide,
        depthWrite: true,
        depthTest: true,
      }));
      mesh.visible = true;
      group.add(mesh);
      shardUs.push(su);
      shardDs.push(explodeDir.clone());
    }

    shardUniformsRef.current = shardUs;
    shardDirsRef.current = shardDs;
  }, []);

  const animate = useCallback(() => {
    const renderer = rendererRef.current;
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const group = groupRef.current;
    if (!renderer || !scene || !camera || !group) {
      frameRef.current = requestAnimationFrame(animate);
      return;
    }

    const time = performance.now() * 0.001;
    timeUniformRef.current.value = time;

    // Smooth mouse
    mouseRef.current.x += (rawMouseRef.current.x - mouseRef.current.x) * 0.14;
    mouseRef.current.y += (rawMouseRef.current.y - mouseRef.current.y) * 0.14;

    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    // Slow idle rotation (minimal so mouse ray stays meaningful)
    group.rotation.y = time * 0.06 + mx * 0.08;
    group.rotation.x = Math.sin(time * 0.05) * 0.03 + my * 0.06;
    group.rotation.z = Math.cos(time * 0.04) * 0.015;
    group.position.y = Math.sin(time * 0.25) * 0.05;

    // ── Ray-sphere intersection ──────────────────────────────────────────────
    // 1. Build camera-space ray from NDC mouse coords
    const fovRad = camera.fov * (Math.PI / 180);
    const tanHalf = Math.tan(fovRad / 2);
    const aspect = camera.aspect;

    // Ray direction in view/camera space (camera looks down -Z in OpenGL)
    _rayView.current.set(
      mx * tanHalf * aspect,
      my * tanHalf,
      -1.0                    // into the scene
    ).normalize();

    // 2. Rotate into world space via camera quaternion
    _rayWorld.current.copy(_rayView.current)
      .applyQuaternion(camera.quaternion)
      .normalize();

    // 3. Ray–sphere intersection
    //    Ray: P(t) = localCamPos + t * rd
    //    Sphere at origin radius R: t² + 2(localCam·rd)t + (|localCam|²-R²) = 0
    const camPos = _camPos.current;   // (0,0,7) — camera world position
    _localCamPos.current.subVectors(camPos, group.position);
    const localCamPos = _localCamPos.current;

    const rd = _rayWorld.current;
    const b = 2.0 * localCamPos.dot(rd);
    const cCoeff = localCamPos.lengthSq() - SPHERE_RADIUS * SPHERE_RADIUS;
    const disc = b * b - 4.0 * cCoeff;

    // 4. Proximity factor — how close the ray gets to the sphere center
    //    t_c: parameter of closest approach on the ray
    const t_c = Math.max(0, -b * 0.5);   // = -localCamPos·rd (simplified, a=1)
    _closestPt.current.copy(localCamPos).addScaledVector(rd, t_c);
    const minDist = _closestPt.current.length();

    // Proximity zone: feel the crystal from 1.2× its radius away (decreased distance)
    const PROX_OUTER = SPHERE_RADIUS * 1.2;
    const rawProx = 1.0 - Math.min(1.0, Math.max(0.0,
      (minDist - SPHERE_RADIUS) / (PROX_OUTER - SPHERE_RADIUS)
    ));
    // Smooth it — fade in slowly (0.05), fade out quickly (0.1)
    const proxTarget = rawProx;
    const proxSpeed = proxTarget > smoothProxRef.current ? 0.05 : 0.09;
    smoothProxRef.current += (proxTarget - smoothProxRef.current) * proxSpeed;
    const prox = smoothProxRef.current;

    const sus = shardUniformsRef.current;
    const sds = shardDirsRef.current;

    // 5. Choose the opening direction:
    //    • ray hits sphere → exact surface normal at hit point (most precise)
    //    • ray misses but nearby → closest-approach direction (feel the glow)
    _invQ.current.copy(group.quaternion).invert();

    if (disc >= 0) {
      const t = (-b - Math.sqrt(disc)) * 0.5;
      _hitNormal.current.copy(localCamPos)
        .addScaledVector(rd, t)
        .divideScalar(SPHERE_RADIUS);
    } else {
      // Near-miss: use direction from origin to closest point on ray
      _hitNormal.current.copy(_closestPt.current).normalize();
    }

    _localNorm.current.copy(_hitNormal.current)
      .applyQuaternion(_invQ.current)
      .normalize();

    const localNorm = _localNorm.current;

    for (let i = 0; i < sus.length; i++) {
      const su = sus[i];
      if (!su) continue;
      const dot = sds[i].dot(localNorm);
      // pow(4) = tight ~50° cone; multiply by proximity so shards fade in as cursor approaches
      const weight = Math.pow(Math.max(0, dot), 4.0) * prox;
      su.uActivation.value = weight;
    }

    renderer.render(scene, camera);
    frameRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    initScene();
    frameRef.current = requestAnimationFrame(animate);

    const onMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      rawMouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: -((e.clientY - rect.top) / rect.height) * 2 + 1,
      };
    };
    const onResize = () => {
      const el = containerRef.current;
      const rnd = rendererRef.current;
      const cam = cameraRef.current;
      if (!el || !rnd || !cam) return;
      rnd.setSize(el.clientWidth, el.clientHeight);
      cam.aspect = el.clientWidth / el.clientHeight;
      cam.updateProjectionMatrix();
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frameRef.current);
      const dom = rendererRef.current?.domElement;
      if (dom?.parentNode) dom.parentNode.removeChild(dom);
      rendererRef.current?.dispose();
    };
  }, [initScene, animate]);

  return (
    <div
      ref={containerRef}
      className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px]"
      style={{ cursor: "crosshair" }}
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
