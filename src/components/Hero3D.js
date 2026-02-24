import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { useTheme } from '../contexts/ThemeContext';

const AnimatedSphere = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.5}>
      <MeshDistortMaterial
        color="#CDB4DB"
        attach="material"
        distort={0.2}
        speed={1}
        roughness={0.4}
        metalness={0.3}
      />
    </Sphere>
  );
};

const Hero3DBackground = () => {
  const { darkMode } = useTheme();

  return (
    <div className="absolute right-0 top-0 w-full h-full md:w-1/2 opacity-30 md:opacity-40 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={darkMode ? 0.4 : 0.6} />
        <directionalLight position={[10, 10, 5]} intensity={darkMode ? 0.4 : 0.7} />
        <pointLight position={[-10, -10, -5]} intensity={darkMode ? 0.2 : 0.4} />
        <AnimatedSphere />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
        />
      </Canvas>
    </div>
  );
};

export default Hero3DBackground;

