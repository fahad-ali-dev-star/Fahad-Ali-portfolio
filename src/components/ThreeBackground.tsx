import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const shapesRef = useRef<THREE.Mesh[]>([]);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Store container reference for cleanup
    const container = containerRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00d4ff, 1, 100);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff0055, 0.8, 100);
    pointLight2.position.set(-10, -10, 10);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x9d4edd, 0.6, 100);
    pointLight3.position.set(0, 10, -10);
    scene.add(pointLight3);

    // Create floating geometric shapes
    const shapes: THREE.Mesh[] = [];
    const geometryTypes = [
      new THREE.IcosahedronGeometry(1, 0),
      new THREE.TorusKnotGeometry(0.6, 0.2, 100, 16),
      new THREE.OctahedronGeometry(1, 0),
      new THREE.TorusGeometry(1, 0.4, 16, 100),
      new THREE.DodecahedronGeometry(1, 0),
      new THREE.SphereGeometry(1, 32, 32),
    ];

    const colors = [0x00d4ff, 0xff0055, 0x9d4edd, 0x00ff88, 0xffaa00, 0xff00aa];

    // Create multiple floating shapes
    for (let i = 0; i < 15; i++) {
      const geometry = geometryTypes[i % geometryTypes.length];
      const material = new THREE.MeshStandardMaterial({
        color: colors[i % colors.length],
        metalness: 0.8,
        roughness: 0.2,
        transparent: true,
        opacity: 0.7,
        emissive: colors[i % colors.length],
        emissiveIntensity: 0.2,
      });

      const mesh = new THREE.Mesh(geometry, material);

      // Random position spread across the screen
      mesh.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15 - 5
      );

      // Random scale
      const scale = Math.random() * 0.4 + 0.3;
      mesh.scale.set(scale, scale, scale);

      // Store animation data
      mesh.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.01,
        },
        floatSpeed: Math.random() * 0.001 + 0.0005,
        floatAmplitude: Math.random() * 0.8 + 0.4,
        initialY: mesh.position.y,
        initialX: mesh.position.x,
        initialZ: mesh.position.z,
        phase: Math.random() * Math.PI * 2,
      };

      scene.add(mesh);
      shapes.push(mesh);
    }

    shapesRef.current = shapes;

    // Camera position
    camera.position.z = 12;

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      const time = Date.now();

      // Animate shapes
      shapes.forEach((shape, index) => {
        // Rotation
        shape.rotation.x += shape.userData.rotationSpeed.x;
        shape.rotation.y += shape.userData.rotationSpeed.y;
        shape.rotation.z += shape.userData.rotationSpeed.z;

        // Floating animation with sine wave
        const floatOffset = Math.sin(time * shape.userData.floatSpeed + shape.userData.phase);
        shape.position.y = shape.userData.initialY + floatOffset * shape.userData.floatAmplitude;

        // Subtle horizontal floating
        shape.position.x = shape.userData.initialX + Math.cos(time * shape.userData.floatSpeed * 0.7 + shape.userData.phase) * 0.3;

        // Mouse parallax effect - shapes move based on mouse position
        const parallaxStrength = 0.5 + (index % 3) * 0.3;
        shape.position.x += (mouseRef.current.x * parallaxStrength - (shape.position.x - shape.userData.initialX) * 0.02) * 0.1;
        shape.position.y += (mouseRef.current.y * parallaxStrength * 0.5) * 0.05;

        // Subtle rotation based on mouse
        shape.rotation.y += mouseRef.current.x * 0.002;
        shape.rotation.x += mouseRef.current.y * 0.002;
      });

      // Camera follows mouse with smooth easing
      camera.position.x += (mouseRef.current.x * 2 - camera.position.x) * 0.03;
      camera.position.y += (mouseRef.current.y * 1 - camera.position.y) * 0.03;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      shapes.forEach((shape) => {
        shape.geometry.dispose();
        (shape.material as THREE.Material).dispose();
      });
      
      renderer.dispose();
      const domElement = renderer.domElement;
      if (container && domElement && container.contains(domElement)) {
        container.removeChild(domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
};

export default ThreeBackground;
