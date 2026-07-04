"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import * as THREE from "three";

// ── Vertex Shader ──
const vertexShader = `
  uniform float uTime;
  uniform float uHover;
  uniform vec2 uMouse;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;
  varying float vFresnel;
  
  void main() {
    // Subtle vertex displacement for organic feel
    vec3 pos = position;
    float displacement = sin(pos.x * 3.0 + uTime * 0.5) * cos(pos.y * 2.0 + uTime * 0.3) * 0.02;
    pos += normal * displacement * (1.0 + uHover * 0.5);
    
    vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
    vWorldPosition = worldPosition.xyz;
    vPosition = pos;
    vNormal = normalize(normalMatrix * normal);
    
    // Fresnel
    vec3 viewDir = normalize(cameraPosition - worldPosition.xyz);
    vFresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 3.0);
    
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

// ── Fragment Shader ──
const fragmentShader = `
  uniform float uTime;
  uniform float uHover;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;
  varying float vFresnel;
  
  void main() {
    // Faceted lighting
    vec3 lightDir1 = normalize(vec3(1.0, 1.0, 2.0));
    vec3 lightDir2 = normalize(vec3(-1.0, -0.5, 1.0));
    vec3 lightDir3 = normalize(vec3(0.0, 1.0, -1.0));
    
    float diffuse1 = max(dot(vNormal, lightDir1), 0.0);
    float diffuse2 = max(dot(vNormal, lightDir2), 0.0) * 0.5;
    float diffuse3 = max(dot(vNormal, lightDir3), 0.0) * 0.3;
    float totalDiffuse = diffuse1 + diffuse2 + diffuse3;
    
    // Specular highlights
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    vec3 halfDir = normalize(lightDir1 + viewDir);
    float specular = pow(max(dot(vNormal, halfDir), 0.0), 120.0) * 2.0;
    float specular2 = pow(max(dot(vNormal, normalize(lightDir2 + viewDir)), 0.0), 60.0) * 0.8;
    
    // Color mixing based on normal and position
    float colorMix = dot(vNormal, vec3(0.0, 1.0, 0.0)) * 0.5 + 0.5;
    colorMix += sin(vPosition.y * 5.0 + uTime * 0.3) * 0.15;
    vec3 baseColor = mix(uColor1, uColor2, clamp(colorMix, 0.0, 1.0));
    
    // Inner glow on hover
    float innerGlow = uHover * 0.4 * (1.0 - length(vPosition) * 0.4);
    
    // Combine
    vec3 color = baseColor * (0.2 + totalDiffuse * 0.8);
    color += vec3(0.7, 0.85, 1.0) * specular;
    color += vec3(0.4, 0.6, 0.9) * specular2;
    color += vec3(0.3, 0.6, 1.0) * vFresnel * (0.5 + uHover * 0.5);
    color += vec3(0.4, 0.7, 1.0) * max(innerGlow, 0.0);
    
    // Edge glow
    float edge = vFresnel * (0.6 + uHover * 0.4);
    color += vec3(0.5, 0.8, 1.0) * edge * 0.5;
    
    float alpha = 0.7 + vFresnel * 0.3 + specular * 0.3;
    alpha = clamp(alpha, 0.0, 1.0);
    
    gl_FragColor = vec4(color, alpha);
  }
`;

// ── Fragment Shard Vertex Shader ──
const shardVertexShader = `
  uniform float uTime;
  uniform float uHover;
  uniform vec3 uExplodeDir;
  uniform float uExplodeDist;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;
  varying float vFresnel;
  
  void main() {
    vec3 pos = position;
    
    // Move shard outward on hover
    pos += uExplodeDir * uExplodeDist * uHover;
    
    // Subtle rotation per shard
    float rotAngle = uHover * uExplodeDist * 0.3;
    float c = cos(rotAngle);
    float s = sin(rotAngle);
    vec3 axis = normalize(cross(uExplodeDir, vec3(0.0, 1.0, 0.0)));
    if (length(axis) < 0.001) axis = vec3(1.0, 0.0, 0.0);
    mat3 rot = mat3(
      c + axis.x * axis.x * (1.0 - c), axis.x * axis.y * (1.0 - c) - axis.z * s, axis.x * axis.z * (1.0 - c) + axis.y * s,
      axis.y * axis.x * (1.0 - c) + axis.z * s, c + axis.y * axis.y * (1.0 - c), axis.y * axis.z * (1.0 - c) - axis.x * s,
      axis.z * axis.x * (1.0 - c) - axis.y * s, axis.z * axis.y * (1.0 - c) + axis.x * s, c + axis.z * axis.z * (1.0 - c)
    );
    pos = rot * pos;
    
    vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
    vWorldPosition = worldPosition.xyz;
    vPosition = pos;
    vNormal = normalize(normalMatrix * normal);
    
    vec3 viewDir = normalize(cameraPosition - worldPosition.xyz);
    vFresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 3.0);
    
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

// ── Particle system vertex / fragment ──
const particleVertexShader = `
  uniform float uTime;
  attribute float aSize;
  attribute float aSpeed;
  attribute float aOffset;
  varying float vAlpha;
  
  void main() {
    vec3 pos = position;
    float t = uTime * aSpeed + aOffset;
    
    // Orbital motion
    float radius = length(pos.xz);
    float angle = atan(pos.z, pos.x) + t * 0.2;
    pos.x = cos(angle) * radius;
    pos.z = sin(angle) * radius;
    pos.y += sin(t * 0.5 + aOffset) * 0.3;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    float dist = length(mvPosition.xyz);
    
    gl_PointSize = aSize * (80.0 / dist);
    gl_Position = projectionMatrix * mvPosition;
    
    vAlpha = 0.3 + sin(t * 2.0) * 0.2;
    vAlpha *= smoothstep(8.0, 3.0, dist);
  }
`;

const particleFragmentShader = `
  varying float vAlpha;
  
  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.1, d) * vAlpha;
    gl_FragColor = vec4(0.5, 0.8, 1.0, alpha);
  }
`;

export default function InteractiveCrystal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const crystalGroupRef = useRef<THREE.Group | null>(null);
  const shardsRef = useRef<THREE.Mesh[]>([]);
  const mainCrystalRef = useRef<THREE.Mesh | null>(null);
  const innerGlowRef = useRef<THREE.Mesh | null>(null);
  const frameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const hoverRef = useRef(0);
  const targetHoverRef = useRef(0);
  const uniformsRef = useRef<any>(null);
  const shardUniformsRef = useRef<any[]>([]);
  const particleUniformsRef = useRef<any>(null);
  const [mounted, setMounted] = useState(false);

  const initScene = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // ── Scene ──
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // ── Camera ──
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);
    cameraRef.current = camera;

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      premultipliedAlpha: false,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.background = "transparent";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // ── Crystal Group ──
    const crystalGroup = new THREE.Group();
    crystalGroupRef.current = crystalGroup;
    scene.add(crystalGroup);

    // ── Main Crystal (Icosahedron) ──
    const mainUniforms = {
      uTime: { value: 0 },
      uHover: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColor1: { value: new THREE.Color(0x1a3a5c) }, // Deep navy blue
      uColor2: { value: new THREE.Color(0x4a8ab5) }, // Lighter steel blue
    };
    uniformsRef.current = mainUniforms;

    const crystalGeom = new THREE.IcosahedronGeometry(1.1, 1);
    // Use flatShading by computing flat normals
    crystalGeom.computeVertexNormals();
    // Make it truly flat-shaded by splitting vertices
    const flatGeom = crystalGeom.toNonIndexed();
    flatGeom.computeVertexNormals();

    const crystalMat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: mainUniforms,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const mainCrystal = new THREE.Mesh(flatGeom, crystalMat);
    mainCrystalRef.current = mainCrystal;
    crystalGroup.add(mainCrystal);

    // ── Shards (Fragmented pieces for hover) ──
    // Create individual faces as separate meshes
    const positions = flatGeom.getAttribute("position");
    const shards: THREE.Mesh[] = [];
    const shardUniforms: any[] = [];

    for (let i = 0; i < positions.count; i += 3) {
      const v0 = new THREE.Vector3().fromBufferAttribute(positions, i);
      const v1 = new THREE.Vector3().fromBufferAttribute(positions, i + 1);
      const v2 = new THREE.Vector3().fromBufferAttribute(positions, i + 2);

      // Calculate face center for explosion direction
      const center = new THREE.Vector3()
        .add(v0)
        .add(v1)
        .add(v2)
        .divideScalar(3);
      const explodeDir = center.clone().normalize();
      const explodeDist = 0.15 + Math.random() * 0.25; // Subtle separation

      // Create individual triangle geometry
      const shardGeom = new THREE.BufferGeometry();
      const verts = new Float32Array([
        v0.x, v0.y, v0.z, v1.x, v1.y, v1.z, v2.x, v2.y, v2.z,
      ]);
      shardGeom.setAttribute("position", new THREE.BufferAttribute(verts, 3));
      shardGeom.computeVertexNormals();

      const sUniforms = {
        uTime: mainUniforms.uTime,
        uHover: { value: 0 },
        uExplodeDir: { value: explodeDir },
        uExplodeDist: { value: explodeDist },
        uColor1: mainUniforms.uColor1,
        uColor2: mainUniforms.uColor2,
      };

      const shardMat = new THREE.ShaderMaterial({
        vertexShader: shardVertexShader,
        fragmentShader,
        uniforms: sUniforms,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
      });

      const shardMesh = new THREE.Mesh(shardGeom, shardMat);
      shardMesh.visible = false;
      crystalGroup.add(shardMesh);
      shards.push(shardMesh);
      shardUniforms.push(sUniforms);
    }
    shardsRef.current = shards;
    shardUniformsRef.current = shardUniforms;

    // ── Inner Glow Sphere (visible during fragmentation) ──
    const glowGeom = new THREE.SphereGeometry(0.7, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x2266aa),
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const innerGlow = new THREE.Mesh(glowGeom, glowMat);
    innerGlowRef.current = innerGlow;
    crystalGroup.add(innerGlow);

    // ── Particle Field ──
    const particleCount = 300;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);
    const particleSpeeds = new Float32Array(particleCount);
    const particleOffsets = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const r = 1.5 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = r * Math.cos(phi);

      particleSizes[i] = Math.random() * 3 + 1;
      particleSpeeds[i] = Math.random() * 0.3 + 0.1;
      particleOffsets[i] = Math.random() * Math.PI * 2;
    }

    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    particleGeom.setAttribute(
      "aSize",
      new THREE.BufferAttribute(particleSizes, 1)
    );
    particleGeom.setAttribute(
      "aSpeed",
      new THREE.BufferAttribute(particleSpeeds, 1)
    );
    particleGeom.setAttribute(
      "aOffset",
      new THREE.BufferAttribute(particleOffsets, 1)
    );

    const pUniforms = { uTime: { value: 0 } };
    particleUniformsRef.current = pUniforms;

    const particleMat = new THREE.ShaderMaterial({
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      uniforms: pUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    setMounted(true);
  }, []);

  // ── Animation Loop ──
  const animate = useCallback(() => {
    const renderer = rendererRef.current;
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const crystalGroup = crystalGroupRef.current;
    const mainCrystal = mainCrystalRef.current;

    if (!renderer || !scene || !camera || !crystalGroup || !mainCrystal) {
      frameRef.current = requestAnimationFrame(animate);
      return;
    }

    const time = performance.now() * 0.001;

    // Smooth mouse following
    const mouse = mouseRef.current;
    const target = targetMouseRef.current;
    mouse.x += (target.x - mouse.x) * 0.05;
    mouse.y += (target.y - mouse.y) * 0.05;

    // Smooth hover transition
    hoverRef.current += (targetHoverRef.current - hoverRef.current) * 0.04;

    // Update uniforms
    if (uniformsRef.current) {
      uniformsRef.current.uTime.value = time;
      uniformsRef.current.uHover.value = hoverRef.current;
      uniformsRef.current.uMouse.value.set(mouse.x, mouse.y);
    }

    if (particleUniformsRef.current) {
      particleUniformsRef.current.uTime.value = time;
    }

    // Crystal rotation: slow idle spin + mouse influence
    crystalGroup.rotation.y = time * 0.15 + mouse.x * 0.8;
    crystalGroup.rotation.x = Math.sin(time * 0.1) * 0.1 + mouse.y * 0.5;
    crystalGroup.rotation.z = Math.sin(time * 0.08) * 0.05;

    // Gentle floating
    crystalGroup.position.y = Math.sin(time * 0.4) * 0.08;

    // Toggle main crystal vs shards based on hover
    const hover = hoverRef.current;
    mainCrystal.visible = hover < 0.01;

    // Inner glow sphere
    if (innerGlowRef.current) {
      const glowMat = innerGlowRef.current.material as THREE.MeshBasicMaterial;
      glowMat.opacity = hover * 0.35;
      innerGlowRef.current.scale.setScalar(1 + hover * 0.3);
    }

    const shards = shardsRef.current;
    const shardUniforms = shardUniformsRef.current;
    for (let i = 0; i < shards.length; i++) {
      shards[i].visible = hover > 0.01;
      if (shardUniforms[i]) {
        shardUniforms[i].uHover.value = hover;
      }
    }

    renderer.render(scene, camera);
    frameRef.current = requestAnimationFrame(animate);
  }, []);

  // ── Setup & Cleanup ──
  useEffect(() => {
    initScene();

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetMouseRef.current = {
        x: (e.clientX / innerWidth - 0.5) * 2,
        y: -(e.clientY / innerHeight - 0.5) * 2,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    frameRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      const container = containerRef.current;
      const renderer = rendererRef.current;
      const camera = cameraRef.current;
      if (!container || !renderer || !camera) return;

      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameRef.current);
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (containerRef.current && rendererRef.current.domElement.parentNode) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
      }
    };
  }, [initScene, animate]);

  return (
    <div
      ref={containerRef}
      className="relative w-[220px] sm:w-[280px] lg:w-[340px] aspect-square"
      onMouseEnter={() => { targetHoverRef.current = 1; }}
      onMouseLeave={() => { targetHoverRef.current = 0; }}
      style={{ cursor: "crosshair" }}
    >
      {/* Ambient glow behind crystal */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(30,100,200,0.15) 0%, rgba(0,60,150,0.05) 50%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />
    </div>
  );
}
