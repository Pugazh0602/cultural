import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export const KineticHero3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [modelStatus, setModelStatus] = useState<string>('Loading /models/shoe.glb...');
  const [isGlbActive, setIsGlbActive] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  // Store sneaker group ref so we can dynamically swap loaded GLTF models
  const sneakerGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 520;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38c6ec, 2.5);
    dirLight1.position.set(5, 8, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x0db5ed, 1.8);
    dirLight2.position.set(-6, -4, 4);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 2, 20);
    pointLight.position.set(0, 2, 4);
    scene.add(pointLight);

    // Master Group for 3D kinetic rig
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 1. Sleek Basketball / Geodesic Kinetic Sphere
    const ballGeo = new THREE.SphereGeometry(1.3, 32, 32);
    const ballMat = new THREE.MeshPhongMaterial({
      color: 0x111111,
      emissive: 0x051a22,
      specular: 0x38c6ec,
      shininess: 90,
      wireframe: false,
    });
    const ballMesh = new THREE.Mesh(ballGeo, ballMat);

    // Cyan energy seam rings around the ball
    const ringGeo1 = new THREE.TorusGeometry(1.32, 0.025, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x38c6ec });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat);
    const ring2 = new THREE.Mesh(ringGeo1, ringMat);
    ring2.rotation.x = Math.PI / 2;
    const ring3 = new THREE.Mesh(ringGeo1, ringMat);
    ring3.rotation.y = Math.PI / 2;
    ballMesh.add(ring1);
    ballMesh.add(ring2);
    ballMesh.add(ring3);
    ballMesh.position.set(-2.2, 0.4, 0.5);
    masterGroup.add(ballMesh);

    // 2. Futuristic Sneaker Group
    const sneakerGroup = new THREE.Group();
    sneakerGroup.position.set(2.2, -0.2, 0.8);
    sneakerGroup.rotation.set(0.2, -0.6, 0.3);
    masterGroup.add(sneakerGroup);
    sneakerGroupRef.current = sneakerGroup;

    // Procedural Fallback Mesh for Sneaker
    const proceduralShoe = new THREE.Group();
    const soleGeo = new THREE.BoxGeometry(2.4, 0.35, 0.9);
    const soleMat = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 80 });
    const sole = new THREE.Mesh(soleGeo, soleMat);
    proceduralShoe.add(sole);

    const upperGeo = new THREE.CylinderGeometry(0.42, 0.52, 1.2, 16);
    const upperMat = new THREE.MeshPhongMaterial({ color: 0x181818, shininess: 40 });
    const upper = new THREE.Mesh(upperGeo, upperMat);
    upper.rotation.z = Math.PI / 5;
    upper.position.set(-0.3, 0.6, 0);
    proceduralShoe.add(upper);

    const toeGeo = new THREE.SphereGeometry(0.48, 16, 16);
    const toeMat = new THREE.MeshPhongMaterial({ color: 0x38c6ec, shininess: 60 });
    const toe = new THREE.Mesh(toeGeo, toeMat);
    toe.scale.set(1.4, 0.65, 0.95);
    toe.position.set(0.65, 0.3, 0);
    proceduralShoe.add(toe);

    const heelGeo = new THREE.BoxGeometry(0.7, 0.8, 0.85);
    const heelMat = new THREE.MeshPhongMaterial({ color: 0x0db5ed, shininess: 70 });
    const heel = new THREE.Mesh(heelGeo, heelMat);
    heel.position.set(-0.75, 0.55, 0);
    proceduralShoe.add(heel);

    sneakerGroup.add(proceduralShoe);

    // Load custom GLB shoe model from /models/shoe.glb
    const loader = new GLTFLoader();
    loader.load(
      '/models/shoe.glb',
      (gltf) => {
        try {
          const loadedModel = gltf.scene;

          // Compute bounding box to normalize scale
          const box = new THREE.Box3().setFromObject(loadedModel);
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = maxDim > 0 ? 2.5 / maxDim : 1;
          loadedModel.scale.set(scale, scale, scale);

          // Center the model
          const center = box.getCenter(new THREE.Vector3());
          loadedModel.position.x = -center.x * scale;
          loadedModel.position.y = -center.y * scale;
          loadedModel.position.z = -center.z * scale;

          // Apply high-tech material enhancements
          loadedModel.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              mesh.castShadow = true;
              mesh.receiveShadow = true;
              if (!mesh.material || (mesh.material as any).color) {
                mesh.material = new THREE.MeshStandardMaterial({
                  color: 0x111111,
                  metalness: 0.8,
                  roughness: 0.25,
                  emissive: 0x051a22,
                });
              }
            }
          });

          // Replace procedural mesh with loaded GLB model
          sneakerGroup.clear();
          sneakerGroup.add(loadedModel);
          setIsGlbActive(true);
          setModelStatus('shoe.glb mounted');
          console.log('[ThreeJS] Successfully mounted shoe.glb');
        } catch (err) {
          console.warn('[ThreeJS] GLB model setup notice:', err);
        }
      },
      undefined,
      (error) => {
        console.warn('[ThreeJS] /models/shoe.glb loading note (procedural active):', error);
        setModelStatus('Procedural kinetic shoe active');
      }
    );

    // 3. Central Quantum Gyroscope
    const gyroGroup = new THREE.Group();
    const gyroRing1 = new THREE.Mesh(
      new THREE.TorusGeometry(2.2, 0.04, 16, 80),
      new THREE.MeshStandardMaterial({ color: 0x38c6ec, roughness: 0.2, metalness: 0.8 })
    );
    const gyroRing2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.8, 0.03, 16, 80),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3, metalness: 0.7 })
    );
    gyroRing2.rotation.x = Math.PI / 3;
    const gyroRing3 = new THREE.Mesh(
      new THREE.TorusGeometry(2.6, 0.02, 16, 80),
      new THREE.MeshStandardMaterial({ color: 0x0db5ed, roughness: 0.1, metalness: 0.9 })
    );
    gyroRing3.rotation.y = Math.PI / 4;
    gyroGroup.add(gyroRing1);
    gyroGroup.add(gyroRing2);
    gyroGroup.add(gyroRing3);
    gyroGroup.position.set(0, 0, -0.5);
    masterGroup.add(gyroGroup);

    // 4. Floating Kinetic Octahedrons
    const shards: { mesh: THREE.Mesh; speed: number; initY: number }[] = [];
    const shardGeo = new THREE.OctahedronGeometry(0.3, 0);
    const shardMat = new THREE.MeshPhongMaterial({ color: 0x38c6ec, shininess: 100 });
    for (let i = 0; i < 9; i++) {
      const mesh = new THREE.Mesh(shardGeo, shardMat);
      const angle = (i / 9) * Math.PI * 2;
      const radius = 3.2 + Math.sin(i * 1.5) * 0.8;
      mesh.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * 1.8 + (Math.random() - 0.5) * 1.2,
        (Math.random() - 0.5) * 2.5
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      masterGroup.add(mesh);
      shards.push({ mesh, speed: 0.01 + Math.random() * 0.02, initY: mesh.position.y });
    }

    // Mouse / Touch Interaction Tracking with Drag Inertia
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let isDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;
    let dragDeltaX = 0;
    let dragDeltaY = 0;

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      if (isDragging) {
        const deltaX = clientX - previousPointerX;
        const deltaY = clientY - previousPointerY;
        dragDeltaX += deltaX * 0.005;
        dragDeltaY += deltaY * 0.005;
        previousPointerX = clientX;
        previousPointerY = clientY;
      } else {
        targetMouseX = (x / (rect.width || 1) - 0.5) * 2;
        targetMouseY = (y / (rect.height || 1) - 0.5) * 2;
      }
    };

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      previousPointerX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      previousPointerY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    window.addEventListener('mousemove', onPointerMove);
    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mouseup', onPointerUp);
    container.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      masterGroup.rotation.y = time * 0.2 + mouseX * 0.45 + dragDeltaX;
      masterGroup.rotation.x = mouseY * 0.35 + Math.sin(time * 0.4) * 0.05 + dragDeltaY;

      // Kinetic spinning of items
      ballMesh.rotation.y += 0.012;
      ballMesh.rotation.x += 0.007;
      ballMesh.position.y = 0.4 + Math.sin(time * 1.5) * 0.15;

      sneakerGroup.rotation.y = -0.6 + Math.cos(time * 1.2) * 0.25;
      sneakerGroup.position.y = -0.2 + Math.sin(time * 1.8 + 1.0) * 0.18;

      gyroRing1.rotation.z += 0.008;
      gyroRing2.rotation.x += 0.012;
      gyroRing3.rotation.y += 0.006;

      shards.forEach((s, idx) => {
        s.mesh.rotation.x += s.speed;
        s.mesh.rotation.y += s.speed * 1.5;
        s.mesh.position.y = s.initY + Math.sin(time * 2 + idx) * 0.25;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onPointerMove);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Handle local GLB upload for instant testing
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !sneakerGroupRef.current) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const contents = event.target?.result;
      if (!contents) return;

      const loader = new GLTFLoader();
      loader.parse(
        contents as ArrayBuffer,
        '',
        (gltf) => {
          const loadedModel = gltf.scene;
          const box = new THREE.Box3().setFromObject(loadedModel);
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = maxDim > 0 ? 2.5 / maxDim : 1;
          loadedModel.scale.set(scale, scale, scale);

          const center = box.getCenter(new THREE.Vector3());
          loadedModel.position.x = -center.x * scale;
          loadedModel.position.y = -center.y * scale;
          loadedModel.position.z = -center.z * scale;

          if (sneakerGroupRef.current) {
            sneakerGroupRef.current.clear();
            sneakerGroupRef.current.add(loadedModel);
          }
          setIsGlbActive(true);
          setModelStatus(`Loaded ${file.name}`);
        },
        (error) => {
          console.error('Failed to parse uploaded GLB:', error);
          alert('Failed to parse GLB file. Please check file formatting.');
        }
      );
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="relative w-full h-[460px] md:h-[520px] rounded-3xl overflow-hidden bg-black shadow-2xl p-1 select-none">
      {/* Three.js Canvas Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Orbit Active Badge */}
      <div className="absolute top-5 left-5 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md text-white border border-white/10 shadow-lg">
        <span className="w-2.5 h-2.5 rounded-full bg-[#2A9A30] animate-pulse" />
        <span className="text-[12px] font-semibold tracking-wider text-[#0db5ed] uppercase">
          KINETIC 3D LAB
        </span>
        <span className="text-[12px] text-[#b8b8b8]">· {modelStatus}</span>
      </div>

      {/* Model Replacement Controls */}
      <div className="absolute top-5 right-5 z-20 flex items-center gap-2">
        <input
          type="file"
          ref={fileInputRef}
          accept=".glb,.gltf"
          onChange={handleFileUpload}
          className="hidden"
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          title="Upload / Replace GLB 3D shoe model"
          className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-[11px] font-semibold uppercase hover:bg-[#0db5ed] hover:text-black transition-colors border border-white/15 flex items-center gap-1.5 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[14px]">view_in_ar</span>
          <span>Swap GLB</span>
        </button>

        <button
          onClick={() => setShowInfo(!showInfo)}
          title="GLB Model Import Instructions"
          className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-md text-white text-[11px] flex items-center justify-center hover:bg-white hover:text-black transition-colors border border-white/15 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">info</span>
        </button>
      </div>

      {/* GLB Helper Tooltip */}
      {showInfo && (
        <div className="absolute top-16 right-5 z-30 w-72 p-4 bg-black/95 backdrop-blur-md text-white rounded-2xl border border-white/20 shadow-2xl text-xs space-y-2 animate-in fade-in">
          <div className="flex justify-between items-center font-bold text-[#0db5ed] uppercase">
            <span>3D GLB Model Ready</span>
            <button onClick={() => setShowInfo(false)} className="text-gray-400 hover:text-white">
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          </div>
          <p className="text-gray-300 leading-relaxed text-[11px]">
            Dummy model is linked at <code className="text-[#0db5ed] bg-white/10 px-1 py-0.5 rounded">public/models/shoe.glb</code>.
          </p>
          <p className="text-gray-300 leading-relaxed text-[11px]">
            You can drop your actual 3D shoe <code className="text-white">.glb</code> file into <code className="text-[#0db5ed] bg-white/10 px-1 py-0.5 rounded">public/models/shoe.glb</code>, or use the <strong>Swap GLB</strong> button to test in real-time.
          </p>
        </div>
      )}

      {/* Prompt Instruction Badge */}
      <div className="absolute bottom-5 right-5 z-20 flex items-center gap-2">
        <div className="px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-white flex items-center gap-2 border border-white/10 shadow-lg">
          <span className="material-symbols-outlined text-[16px] text-[#0db5ed] animate-spin">
            sync
          </span>
          <span className="text-[11px] font-medium uppercase tracking-wider text-slate-200">
            Drag to Inspect Garment Kinetics
          </span>
        </div>
      </div>
    </div>
  );
};
