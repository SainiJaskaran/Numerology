"use client"

import { Canvas } from "@react-three/fiber"
import { PerspectiveCamera, Environment, Text } from "@react-three/drei"
import { Suspense, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

function FloatingNumbers() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ camera, clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.2
      groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.5
    }
  })

  const numbers = [
    { position: [0, 0, 0] as [number, number, number], value: "1" },
    { position: [3, 2, -2] as [number, number, number], value: "3" },
    { position: [-3, -1, -2] as [number, number, number], value: "7" },
    { position: [2, -2, -1] as [number, number, number], value: "9" },
  ]

  return (
    <group ref={groupRef}>
      {numbers.map((num, i) => (
        <group key={i} position={num.position}>
          <mesh castShadow>
            <sphereGeometry args={[0.4, 32, 32]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#b39ddb" : "#ffd54f"}
              emissive={i % 2 === 0 ? "#9575cd" : "#ffb74d"}
              emissiveIntensity={0.3}
              roughness={0.3}
              metalness={0.6}
            />
          </mesh>
          <Text position={[0, 0, 0.5]} fontSize={0.3} color="#ffffff" fontWeight="bold">
            {num.value}
          </Text>
        </group>
      ))}
    </group>
  )
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null)

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x = clock.getElapsedTime() * 0.05
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.03
    }
  })

  const particleCount = 200
  const positions = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 20
    positions[i + 1] = (Math.random() - 0.5) * 20
    positions[i + 2] = (Math.random() - 0.5) * 20
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={particleCount} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#b39ddb" sizeAttenuation transparent opacity={0.6} />
    </points>
  )
}

function GeometricShapes() {
  const group1Ref = useRef<THREE.Group>(null)
  const group2Ref = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (group1Ref.current) {
      group1Ref.current.rotation.x = clock.getElapsedTime() * 0.3
      group1Ref.current.rotation.z = clock.getElapsedTime() * 0.2
      group1Ref.current.position.z = Math.sin(clock.getElapsedTime() * 0.4) * 2
    }
    if (group2Ref.current) {
      group2Ref.current.rotation.y = clock.getElapsedTime() * 0.25
      group2Ref.current.rotation.x = clock.getElapsedTime() * 0.15
      group2Ref.current.position.z = Math.cos(clock.getElapsedTime() * 0.4) * 2
    }
  })

  return (
    <>
      {/* Rotating Octahedron */}
      <group ref={group1Ref} position={[-4, 2, -5]}>
        <mesh castShadow>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#ffd54f"
            emissive="#ffb74d"
            emissiveIntensity={0.2}
            wireframe={false}
            transparent
            opacity={0.8}
          />
        </mesh>
      </group>

      {/* Rotating Icosahedron */}
      <group ref={group2Ref} position={[4, -1, -5]}>
        <mesh castShadow>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#b39ddb"
            emissive="#9575cd"
            emissiveIntensity={0.2}
            wireframe={false}
            transparent
            opacity={0.8}
          />
        </mesh>
      </group>
    </>
  )
}

export function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 50 }} style={{ width: "100%", height: "100%" }}>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} />
      <color attach="background" args={["#f5f3ff"]} />

      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} castShadow />
      <pointLight position={[-10, -10, 5]} intensity={0.5} color="#b39ddb" />

      <Suspense fallback={null}>
        <Environment preset="studio" />
        <FloatingNumbers />
        <ParticleField />
        <GeometricShapes />
      </Suspense>
    </Canvas>
  )
}
