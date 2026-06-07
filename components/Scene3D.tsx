'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface Scene3DProps {
  onPlanetClick?: (section: string) => void
}

export default function Scene3D({ onPlanetClick }: Scene3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!containerRef.current) return

    // === SETUP ===
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x050b1a)
    scene.fog = new THREE.FogExp2(0x050b1a, 0.0003)

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 1.5, 12)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.enabled = true
    containerRef.current.appendChild(renderer.domElement)

    // === DENSE STARFIELD (Tiny twinkling stars + starbursts) ===
    const starCount = 12000
    const starGeometry = new THREE.BufferGeometry()
    const starPositions = new Float32Array(starCount * 3)
    const starSizes = new Float32Array(starCount)
    const starColors = new Float32Array(starCount * 3)
    
    for (let i = 0; i < starCount; i++) {
      // Spherical distribution for depth
      const radius = 50 + Math.random() * 100
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      
      starPositions[i*3] = radius * Math.sin(phi) * Math.cos(theta)
      starPositions[i*3+1] = radius * Math.sin(phi) * Math.sin(theta) * 0.5
      starPositions[i*3+2] = radius * Math.cos(phi) - 30
      
      // Star size variation
      starSizes[i] = 0.04 + Math.random() * 0.12
      
      // Star colors (white, pale blue, distant blue)
      const colorType = Math.random()
      if (colorType < 0.7) {
        starColors[i*3] = 1
        starColors[i*3+1] = 1
        starColors[i*3+2] = 1
      } else if (colorType < 0.85) {
        starColors[i*3] = 0.7
        starColors[i*3+1] = 0.8
        starColors[i*3+2] = 1
      } else {
        starColors[i*3] = 0.5
        starColors[i*3+1] = 0.6
        starColors[i*3+2] = 1
      }
    }
    
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1))
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3))
    
    const starMaterial = new THREE.PointsMaterial({ size: 0.08, vertexColors: true, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending })
    const stars = new THREE.Points(starGeometry, starMaterial)
    scene.add(stars)

    // === STARBURSTS (Bright distant stars with cross effect) ===
    const starburstCount = 200
    const starbursts: { x: number; y: number; z: number; size: number; intensity: number }[] = []
    
    for (let i = 0; i < starburstCount; i++) {
      const pos = {
        x: (Math.random() - 0.5) * 80,
        y: (Math.random() - 0.5) * 50,
        z: (Math.random() - 0.5) * 40 - 20,
        size: 0.3 + Math.random() * 0.5,
        intensity: 0.5 + Math.random() * 0.5
      }
      starbursts.push(pos)
    }

    // === THE MAIN ANNULAR ECLIPSE SEQUENCE ===
    const eclipseGroup = new THREE.Group()
    
    // === THE CORE: Pitch-black perfect sphere ===
    const coreGeometry = new THREE.SphereGeometry(1.2, 256, 256)
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x000000,
      emissive: 0x000000,
      metalness: 0.95,
      roughness: 0.05,
      emissiveIntensity: 0
    })
    const coreSphere = new THREE.Mesh(coreGeometry, coreMaterial)
    eclipseGroup.add(coreSphere)
    
    // === CORONA & GLOW (Electric dark blue and cyan aura) ===
    // Inner corona glow
    const innerCoronaGeo = new THREE.SphereGeometry(1.35, 128, 128)
    const innerCoronaMat = new THREE.MeshBasicMaterial({
      color: 0x00aaff,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide
    })
    const innerCorona = new THREE.Mesh(innerCoronaGeo, innerCoronaMat)
    eclipseGroup.add(innerCorona)
    
    // Mid corona glow
    const midCoronaGeo = new THREE.SphereGeometry(1.55, 128, 128)
    const midCoronaMat = new THREE.MeshBasicMaterial({
      color: 0x0088cc,
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide
    })
    const midCorona = new THREE.Mesh(midCoronaGeo, midCoronaMat)
    eclipseGroup.add(midCorona)
    
    // Outer corona glow
    const outerCoronaGeo = new THREE.SphereGeometry(1.85, 128, 128)
    const outerCoronaMat = new THREE.MeshBasicMaterial({
      color: 0x0066aa,
      transparent: true,
      opacity: 0.06,
      side: THREE.BackSide
    })
    const outerCorona = new THREE.Mesh(outerCoronaGeo, outerCoronaMat)
    eclipseGroup.add(outerCorona)
    
    // === RING OF BLUE FIRE (The perfect ring) ===
    const ringOfFireGeo = new THREE.TorusGeometry(1.28, 0.045, 256, 400)
    const ringOfFireMat = new THREE.MeshStandardMaterial({
      color: 0xff6600,
      emissive: 0xff4400,
      emissiveIntensity: 0.9,
      metalness: 0.3,
      roughness: 0.2
    })
    const ringOfFire = new THREE.Mesh(ringOfFireGeo, ringOfFireMat)
    ringOfFire.rotation.x = Math.PI / 2
    eclipseGroup.add(ringOfFire)
    
    // === ECLIPSE PHASES (Eleven chronological phases in a circle) ===
    const phases = [
      { angle: 0, progress: 0.95, color: 0xffaa66 },      // Almost full
      { angle: 32.7, progress: 0.85, color: 0xffaa55 },   // Slight crescent
      { angle: 65.4, progress: 0.7, color: 0xff9944 },    // Crescent
      { angle: 98.1, progress: 0.55, color: 0xff8833 },   // Thin crescent
      { angle: 130.8, progress: 0.4, color: 0xff7722 },   // Very thin
      { angle: 163.5, progress: 0.25, color: 0xff6611 },  // Extremely thin
      { angle: 196.2, progress: 0.1, color: 0xff5500 },   // Almost gone
      { angle: 228.9, progress: 0.25, color: 0xff6611 },  // Growing back
      { angle: 261.6, progress: 0.4, color: 0xff7722 },   // Thickening
      { angle: 294.3, progress: 0.55, color: 0xff8833 },  // Crescent growing
      { angle: 327, progress: 0.7, color: 0xff9944 }      // Almost full again
    ]
    
    const phaseDistance = 2.8
    const phaseMeshes: THREE.Mesh[] = []
    
    phases.forEach((phase) => {
      // Calculate position in circle
      const rad = (phase.angle * Math.PI) / 180
      const x = Math.cos(rad) * phaseDistance
      const z = Math.sin(rad) * phaseDistance
      const y = Math.sin(rad * 0.5) * 0.3
      
      // Create crescent shape using torus with partial visibility
      const crescentGeo = new THREE.TorusGeometry(0.32, 0.025, 64, 128, Math.PI * 2 * phase.progress)
      const crescentMat = new THREE.MeshStandardMaterial({
        color: phase.color,
        emissive: 0xff4400,
        emissiveIntensity: 0.4,
        transparent: true,
        opacity: 0.9
      })
      const crescent = new THREE.Mesh(crescentGeo, crescentMat)
      crescent.position.set(x, y + 0.2, z)
      crescent.rotation.x = Math.PI / 2
      crescent.rotation.z = phase.angle
      eclipseGroup.add(crescent)
      phaseMeshes.push(crescent)
      
      // Add tiny glow to each phase
      const phaseGlowGeo = new THREE.SphereGeometry(0.08, 16, 16)
      const phaseGlowMat = new THREE.MeshBasicMaterial({
        color: phase.color,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending
      })
      const phaseGlow = new THREE.Mesh(phaseGlowGeo, phaseGlowMat)
      phaseGlow.position.set(x, y + 0.2, z)
      eclipseGroup.add(phaseGlow)
    })
    
    scene.add(eclipseGroup)
    eclipseGroup.position.set(0, 0.2, 0)

    // === DYNAMIC CORONA LIGHT RAYS ===
    const rayCount = 24
    const rays: THREE.Mesh[] = []
    
    for (let i = 0; i < rayCount; i++) {
      const angle = (i / rayCount) * Math.PI * 2
      const rayGeometry = new THREE.CylinderGeometry(0.03, 0.08, 1.2, 4)
      const rayMaterial = new THREE.MeshStandardMaterial({
        color: 0x44aaff,
        emissive: 0x2288cc,
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.6
      })
      const ray = new THREE.Mesh(rayGeometry, rayMaterial)
      ray.position.set(Math.cos(angle) * 1.45, Math.sin(angle) * 1.45, 0)
      ray.rotation.z = angle
      eclipseGroup.add(ray)
      rays.push(ray)
    }

    // === ORBITING PLANETS (Subtle, distant) ===
    const planetsData = [
      { type: "courses", color: 0x6a5acd, emissive: 0x3a2a8a, pos: [4.5, 0.8, -3.2], scale: 0.55, rotationSpeed: 0.003 },
      { type: "services", color: 0x9b6bcb, emissive: 0x5a3a9a, pos: [-4.2, 1.0, -3.0], scale: 0.52, rotationSpeed: 0.004 },
      { type: "library", color: 0x4a8acc, emissive: 0x2a5a9a, pos: [2.2, -2.0, -2.5], scale: 0.58, rotationSpeed: 0.0035 },
      { type: "art", color: 0xba6bdd, emissive: 0x8a4aaa, pos: [-2.5, -1.8, 3.2], scale: 0.5, rotationSpeed: 0.0045 },
      { type: "identity", color: 0xdd8a55, emissive: 0xaa5a33, pos: [3.2, -1.2, 3.5], scale: 0.62, rotationSpeed: 0.003 },
      { type: "contact", color: 0x4a8acc, emissive: 0x2a5a9a, pos: [-3.5, -1.0, 3.0], scale: 0.48, rotationSpeed: 0.005 }
    ]
    
    const planets: THREE.Mesh[] = []
    
    planetsData.forEach((data) => {
      const geometry = new THREE.SphereGeometry(data.scale, 96, 96)
      const material = new THREE.MeshStandardMaterial({
        color: data.color,
        emissive: data.emissive,
        emissiveIntensity: 0.2,
        metalness: 0.3,
        roughness: 0.6
      })
      const planet = new THREE.Mesh(geometry, material)
      planet.userData = { type: data.type }
      planet.position.set(data.pos[0], data.pos[1], data.pos[2])
      planet.castShadow = true
      scene.add(planet)
      planets.push(planet)
      
      // Atmosphere for each planet
      const atmosGeo = new THREE.SphereGeometry(data.scale + 0.04, 48, 48)
      const atmosMat = new THREE.MeshBasicMaterial({
        color: data.color,
        transparent: true,
        opacity: 0.1,
        side: THREE.BackSide
      })
      const atmosphere = new THREE.Mesh(atmosGeo, atmosMat)
      planet.add(atmosphere)
    })

    // === LIGHTING ===
    const ambientLight = new THREE.AmbientLight(0x111133, 0.4)
    scene.add(ambientLight)
    
    const mainLight = new THREE.DirectionalLight(0xffeedd, 0.8)
    mainLight.position.set(3, 5, 4)
    mainLight.castShadow = true
    scene.add(mainLight)
    
    const backLight = new THREE.PointLight(0x3366aa, 0.5)
    backLight.position.set(-2, 1, -5)
    scene.add(backLight)
    
    const fillLight = new THREE.PointLight(0x6644aa, 0.3)
    fillLight.position.set(2, 2, 3)
    scene.add(fillLight)
    
    const coronaLight = new THREE.PointLight(0x00aaff, 0.6)
    coronaLight.position.set(0, 0.2, 0.5)
    eclipseGroup.add(coronaLight)

    // === FLOATING COSMIC DUST ===
    const dustCount = 5000
    const dustGeometry = new THREE.BufferGeometry()
    const dustPositions = new Float32Array(dustCount * 3)
    for (let i = 0; i < dustCount; i++) {
      dustPositions[i*3] = (Math.random() - 0.5) * 50
      dustPositions[i*3+1] = (Math.random() - 0.5) * 35
      dustPositions[i*3+2] = (Math.random() - 0.5) * 40 - 15
    }
    dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3))
    const dustMaterial = new THREE.PointsMaterial({
      color: 0x88aaff,
      size: 0.02,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending
    })
    const dust = new THREE.Points(dustGeometry, dustMaterial)
    scene.add(dust)

    // === INTERACTIONS ===
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()
    let mouseX = 0, mouseY = 0
    
    const onClick = (event: MouseEvent) => {
      if (!onPlanetClick) return
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(planets)
      if (intersects.length > 0) {
        onPlanetClick(intersects[0].object.userData.type)
      }
    }
    
    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = (event.clientY / window.innerHeight) * 2 - 1
    }
    
    window.addEventListener('click', onClick)
    window.addEventListener('mousemove', onMouseMove)
    
    // === ANIMATION LOOP ===
    let time = 0
    let rayPulse = 0
    
    const animate = () => {
      requestAnimationFrame(animate)
      time += 0.008
      rayPulse += 0.03
      
      // Animate ring of fire pulse
      const pulse = Math.sin(time * 3) * 0.1 + 0.9
      ringOfFireMat.emissiveIntensity = 0.7 + Math.sin(time * 4) * 0.3
      
      // Animate corona glow pulse
      const coronaPulse = Math.sin(time * 2) * 0.3 + 0.7
      innerCoronaMat.opacity = 0.12 + Math.sin(time * 2.5) * 0.05
      midCoronaMat.opacity = 0.08 + Math.sin(time * 2) * 0.03
      outerCoronaMat.opacity = 0.05 + Math.sin(time * 1.5) * 0.02
      coronaLight.intensity = 0.5 + Math.sin(time * 2.2) * 0.2
      
      // Animate rays
      rays.forEach((ray, i) => {
        const intensity = 0.4 + Math.sin(rayPulse + i) * 0.2
        ;(ray.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity
      })
      
      // Animate phases (subtle pulsing)
      phaseMeshes.forEach((phase, i) => {
        const phasePulse = Math.sin(time * 2 + i) * 0.1 + 0.8
        ;(phase.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.3 * phasePulse
      })
      
      // Rotate the entire eclipse group very slowly
      eclipseGroup.rotation.y += 0.0005
      
      // Animate planets
      planets.forEach((planet, i) => {
        planet.rotation.y += planetsData[i].rotationSpeed
      })
      
      // Animate stars
      stars.rotation.y += 0.0001
      dust.rotation.y += 0.00005
      
      // Subtle camera movement
      camera.position.x += (mouseX * 0.15 - camera.position.x) * 0.02
      camera.position.y += (-mouseY * 0.1 - camera.position.y) * 0.02
      camera.lookAt(0, 0.2, 0)
      
      renderer.render(scene, camera)
    }
    
    animate()
    
    // === RESIZE HANDLER ===
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    
    window.addEventListener('resize', handleResize)
    
    // === CLEANUP ===
    return () => {
      window.removeEventListener('click', onClick)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', handleResize)
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [onPlanetClick])
  
  return <div ref={containerRef} className="w-full h-full cursor-pointer" />
}