"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import type * as THREE from "three"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, useTexture, Sphere } from "@react-three/drei"

function SphereMesh() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const { viewport } = useThree()

  // Create a gradient texture
  const texture = useTexture("/images/sphere-texture.jpg")

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.y = time * 0.1
    meshRef.current.rotation.x = time * 0.05

    // Add subtle floating motion
    meshRef.current.position.y = Math.sin(time * 0.5) * 0.1
  })

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} scale={viewport.width > 10 ? 1.5 : 1}>
      <meshStandardMaterial map={texture} emissive="#6d28d9" emissiveIntensity={0.2} roughness={0.7} metalness={0.3} />
    </Sphere>
  )
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
    </>
  )
}

export default function InteractiveHero() {
  return (
    <div className="w-full h-[500px] relative">
      <motion.div
        className="absolute inset-0 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
          <Lights />
          <SphereMesh />
          <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </motion.div>

      {/* Overlay gradient to blend with background */}
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />
    </div>
  )
}
