import { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

// Hook to get responsive 3D settings
function useResponsive3D() {
  const [settings, setSettings] = useState({
    scale: 45,
    cameraPosition: [0, 22, 3] as [number, number, number],
    fov: 30,
    modelY: -4,
  })

  useEffect(() => {
    const updateSettings = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const isPortrait = height > width

      if (isPortrait) {
        // Portrait / Mobile - straight on view, offset down for more title margin
        if (width < 400) {
          setSettings({
            scale: 14,
            cameraPosition: [0, 2, 12],
            fov: 35,
            modelY: -1.2,
          })
        } else if (width < 600) {
          setSettings({
            scale: 14,
            cameraPosition: [0, 2, 14],
            fov: 32,
            modelY: -1.5,
          })
        } else {
          setSettings({
            scale: 18,
            cameraPosition: [0, 2, 15],
            fov: 30,
            modelY: -1.8,
          })
        }
      } else {
        // Landscape / Desktop - straight on view
        if (width < 900) {
          setSettings({
            scale: 11,
            cameraPosition: [0, 1.5, 10],
            fov: 35,
            modelY: -1,
          })
        } else if (width < 1200) {
          setSettings({
            scale: 16,
            cameraPosition: [0, 1.5, 12],
            fov: 32,
            modelY: -1.5,
          })
        } else {
          // Large screens - straight on view
          setSettings({
            scale: 20,
            cameraPosition: [0, 1.5, 14],
            fov: 30,
            modelY: -2,
          })
        }
      }
    }

    updateSettings()
    window.addEventListener('resize', updateSettings)
    return () => window.removeEventListener('resize', updateSettings)
  }, [])

  return settings
}

interface AlarmClockModelProps {
  scale?: number
  rotation?: [number, number, number]
  onReady?: () => void
}

function AlarmClockModel({ scale = 2, rotation = [0, 0, 0], onReady }: AlarmClockModelProps) {
  const { scene } = useGLTF('/old_alarm_clock/scene.gltf')
  const hasCalledReady = useRef(false)
  const meshRef = useRef<THREE.Group>(null)
  const [isIntroComplete, setIsIntroComplete] = useState(false)
  const introStartTime = useRef<number | null>(null)
  const introDuration = 0.8 // seconds for the spin-in animation

  // Change only gold/metallic parts to black, keep clock face white
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const processMaterial = (mat: THREE.Material) => {
          // Check if this is a metallic/gold material (not the clock face)
          // Gold materials typically have names containing 'gold', 'metal', 'scratched' 
          // or have yellowish/orange colors
          const matName = mat.name.toLowerCase()
          const isGoldMaterial = matName.includes('gold') || 
                                  matName.includes('metal') || 
                                  matName.includes('scratched')
          
          // Also check by color - gold is typically warm/yellow
          let isWarmColor = false
          if ('color' in mat && mat.color instanceof THREE.Color) {
            const hsl = { h: 0, s: 0, l: 0 }
            mat.color.getHSL(hsl)
            // Gold/warm colors have hue between 0.05-0.15 (yellow/orange range)
            isWarmColor = hsl.h > 0.02 && hsl.h < 0.2 && hsl.s > 0.3
          }
          
          // Check if it's a metallic material
          const isMetallic = 'metalness' in mat && (mat as THREE.MeshStandardMaterial).metalness > 0.3
          
          if (isGoldMaterial || isWarmColor || isMetallic) {
            const newMat = mat.clone()
            if ('color' in newMat) newMat.color = new THREE.Color(0x1a1a1a)
            if ('metalness' in newMat) (newMat as THREE.MeshStandardMaterial).metalness = 0.85
            if ('roughness' in newMat) (newMat as THREE.MeshStandardMaterial).roughness = 0.25
            return newMat
          }
          return mat
        }
        
        if (Array.isArray(child.material)) {
          child.material = child.material.map(processMaterial)
        } else {
          child.material = processMaterial(child.material)
        }
      }
    })
    
    // Signal that the model is ready after processing
    if (!hasCalledReady.current && onReady) {
      hasCalledReady.current = true
      // Small delay to ensure first render is complete
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          onReady()
        })
      })
    }
  }, [scene, onReady])

  // Intro spin animation + periodic ringing animation with floating
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime
      
      // Initialize intro start time
      if (introStartTime.current === null) {
        introStartTime.current = time
      }
      
      const introElapsed = time - introStartTime.current
      const introProgress = Math.min(introElapsed / introDuration, 1)
      
      // Easing function (easeOutCubic)
      const eased = 1 - Math.pow(1 - introProgress, 3)
      
      if (introProgress < 1) {
        // INTRO ANIMATION: Spin fast while scaling up
        // Total spin: 3 full rotations (6π) that eases out to final position
        const totalSpin = Math.PI * 6
        const currentSpin = totalSpin * (1 - Math.pow(1 - introProgress, 2)) // easeOutQuad for spin
        const currentScale = eased * scale
        
        meshRef.current.scale.setScalar(currentScale)
        meshRef.current.rotation.y = rotation[1] + currentSpin
        meshRef.current.rotation.x = rotation[0]
        meshRef.current.rotation.z = rotation[2]
      } else {
        // INTRO COMPLETE - normal behavior
        if (!isIntroComplete) {
          setIsIntroComplete(true)
          meshRef.current.scale.setScalar(scale)
          meshRef.current.rotation.y = rotation[1]
        }
        
        // Floating animation - intensified
        meshRef.current.position.y = Math.sin(time * 0.6) * 0.25
        
        // Periodic ringing: 2 seconds of shaking, 5 seconds pause
        const cycleTime = time % 7 // 7 second cycle
        
        if (cycleTime < 2) {
          // Ringing phase - fast oscillating rotation
          const ringIntensity = Math.sin(cycleTime * Math.PI) // Fade in/out
          const shake = Math.sin(time * 35) * 0.08 * ringIntensity
          const tilt = Math.sin(time * 25) * 0.04 * ringIntensity
          
          meshRef.current.rotation.z = rotation[2] + shake
          meshRef.current.rotation.x = rotation[0] + tilt
        } else {
          // Rest phase - return to normal
          meshRef.current.rotation.z = rotation[2]
          meshRef.current.rotation.x = rotation[0]
        }
      }
    }
  })

  return (
    <group ref={meshRef} rotation={rotation} scale={0}>
      <primitive object={scene} />
    </group>
  )
}

interface AlarmClock3DProps {
  className?: string
  onReady?: () => void
}

export function AlarmClock3D({ className = '', onReady }: AlarmClock3DProps) {
  const { scale, cameraPosition, fov, modelY } = useResponsive3D()

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Canvas extends beyond container to prevent cropping */}
      <div 
        className="absolute pointer-events-auto"
        style={{
          top: '-30%',
          left: '-10%',
          right: '-10%',
          bottom: '-10%',
        }}
      >
        <Canvas
          camera={{ position: cameraPosition, fov: fov }}
          style={{ background: 'transparent', width: '100%', height: '100%' }}
          gl={{ alpha: true, antialias: true }}
        >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          <directionalLight position={[-10, 5, -5]} intensity={0.3} />
          
          {/* 3D Model */}
          <group position={[0, modelY, 0]}>
            <AlarmClockModel scale={scale} rotation={[0.1, 0.3, 0]} onReady={onReady} />
          </group>
          
          {/* Environment for reflections */}
          <Environment preset="city" />
          
          {/* Contact shadow for grounding */}
          <ContactShadows
            position={[0, -2.5, 0]}
            opacity={0.35}
            scale={12}
            blur={2}
            far={5}
          />
          
          {/* Allow user to rotate view */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
          />
        </Suspense>
        </Canvas>
      </div>
    </div>
  )
}

// Preload the model
useGLTF.preload('/old_alarm_clock/scene.gltf')
