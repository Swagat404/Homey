/**
 * Immersive 3D Home Authentication Experience
 * Professional 3D scene with realistic camera movements and home models
 * No popups - seamless scene transitions for login/signup
 */

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { AnimatePresence } from 'framer-motion';
import { 
  Text, 
  Plane, 
  ContactShadows,
  Html,
  Sky,
  OrbitControls
} from '@react-three/drei';
import { 
  EffectComposer, 
  Bloom
} from '@react-three/postprocessing';
import { motion } from 'framer-motion';
import chroma from 'chroma-js';
import * as THREE from 'three';
import { useAuth } from '@/lib/contexts/AuthContext';
import { UserLogin, UserCreate } from '@/lib/api/types';

interface AuthPageProps {
  isDark: boolean;
}



// Professional 3D House Model with PBR Materials
const ProfessionalHouseModel = ({ isDoorOpen, timeOfDay = 0.5 }: any) => {
  const houseRef = useRef<THREE.Group>(null);
  const doorRef = useRef<THREE.Group>(null);
  
  // Dynamic lighting colors based on time of day
  const sunColors = chroma.scale([
    "#008CFF", "#FF7ECC", "#FFC5B8", "#FFEBB8", 
    "#ffffff", "#FFC5B8", "#FF7ECC", "#008CFF"
  ]).domain([0, 0.15, 0.21, 0.27, 0.7, 0.75, 0.81, 1]);
  
  return (
    <group ref={houseRef} position={[0, 0, 0]}>
      {/* Professional Foundation with Enhanced Stone Texture */}
      <mesh position={[0, 0.15, 0]} receiveShadow>
        <boxGeometry args={[6, 0.3, 6]} />
        <meshStandardMaterial 
          color="#2c2c2c"
          roughness={0.8}
          metalness={0.05}
        />
      </mesh>
      
      {/* Foundation Trim */}
      <mesh position={[0, 0.32, 0]} receiveShadow>
        <boxGeometry args={[6.1, 0.04, 6.1]} />
        <meshStandardMaterial 
          color="#3a3a3a"
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>
      
      {/* Main House Structure - Professional Concrete Wall */}
      <mesh position={[0, 1.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[5, 3.2, 5]} />
        <meshStandardMaterial 
          color="#f4e4d5"
          roughness={0.8}
          metalness={0.0}
          normalScale={[1.5, 1.5]}
        />
      </mesh>
      
      {/* Architectural Wall Details */}
      {/* Horizontal Wall Trim Band */}
      <mesh position={[0, 3.35, 2.51]} castShadow>
        <boxGeometry args={[5.1, 0.12, 0.06]} />
        <meshStandardMaterial 
          color="#ffffff"
          roughness={0.3}
          metalness={0.0}
        />
      </mesh>
      
      {/* Vertical Corner Trim */}
      {[[-2.5, 2.5], [2.5, 2.5], [-2.5, -2.5], [2.5, -2.5]].map(([x, z], index) => (
        <mesh key={`corner-detail-${index}`} position={[x, 1.8, z]} castShadow>
          <boxGeometry args={[0.1, 3.2, 0.1]} />
          <meshStandardMaterial 
            color="#e8e8e8"
            roughness={0.4}
            metalness={0.0}
          />
        </mesh>
      ))}
      
      {/* Base Wall Trim */}
      <mesh position={[0, 0.4, 2.51]} castShadow>
        <boxGeometry args={[5.1, 0.08, 0.04]} />
        <meshStandardMaterial 
          color="#d0d0d0"
          roughness={0.5}
          metalness={0.0}
        />
      </mesh>
      
      {/* Second Floor - Rough Concrete Texture */}
      <mesh position={[0, 4.2, -1]} castShadow receiveShadow>
        <boxGeometry args={[3.5, 2, 3]} />
        <meshStandardMaterial 
          color="#ddd9d5"
          roughness={0.92}
          metalness={0.0}
        />
      </mesh>
      
      {/* Complex Roof System */}
      <group>
        {/* Main Roof - Enhanced Shingle Material */}
        <mesh position={[0, 4.5, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
          <coneGeometry args={[4.2, 2.2, 4]} />
          <meshStandardMaterial 
            color="#2d3e52"
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>
        
        {/* Second Floor Roof - Matching Material */}
        <mesh position={[0, 5.8, -1]} rotation={[0, 0, 0]} castShadow>
          <coneGeometry args={[2.8, 1.5, 4]} />
          <meshStandardMaterial 
            color="#374a60"
            roughness={0.8}
            metalness={0.15}
          />
        </mesh>
        
        {/* Professional Roof Details */}
        {/* Roof Edge Trim - Border between roof and wall */}
        <mesh position={[0, 3.45, 2.55]} castShadow>
          <boxGeometry args={[5.1, 0.15, 0.08]} />
          <meshStandardMaterial 
            color="#ffffff"
            roughness={0.3}
            metalness={0.0}
          />
        </mesh>
        <mesh position={[0, 3.45, -2.55]} castShadow>
          <boxGeometry args={[5.1, 0.15, 0.08]} />
          <meshStandardMaterial 
            color="#ffffff"
            roughness={0.3}
            metalness={0.0}
          />
        </mesh>
        <mesh position={[2.55, 3.45, 0]} castShadow>
          <boxGeometry args={[0.08, 0.15, 5.1]} />
          <meshStandardMaterial 
            color="#ffffff"
            roughness={0.3}
            metalness={0.0}
          />
        </mesh>
        <mesh position={[-2.55, 3.45, 0]} castShadow>
          <boxGeometry args={[0.08, 0.15, 5.1]} />
          <meshStandardMaterial 
            color="#ffffff"
            roughness={0.3}
            metalness={0.0}
          />
        </mesh>
        
        {/* Roof Gutters */}
        <mesh position={[0, 3.35, 2.6]} castShadow>
          <boxGeometry args={[5.0, 0.08, 0.12]} />
          <meshStandardMaterial 
            color="#95a5a6"
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        <mesh position={[0, 3.35, -2.6]} castShadow>
          <boxGeometry args={[5.0, 0.08, 0.12]} />
          <meshStandardMaterial 
            color="#95a5a6"
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        
        {/* Roof Ridge Cap */}
        <mesh position={[0, 5.7, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
          <boxGeometry args={[0.15, 0.1, 4.5]} />
          <meshStandardMaterial 
            color="#1a252f"
            roughness={0.6}
            metalness={0.3}
          />
        </mesh>
        

        
        {/* Soffit Under Roof Overhang */}
        <mesh position={[0, 3.3, 0]} rotation={[Math.PI, Math.PI / 4, 0]}>
          <ringGeometry args={[3.8, 4.4, 4]} />
          <meshStandardMaterial 
            color="#f8f9fa"
            roughness={0.3}
            metalness={0.0}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
      
      {/* Enhanced Professional Entryway */}
      <group position={[0, 0, 2.55]}>
        {/* Entryway Platform */}
        <mesh position={[0, 0.05, 0.3]} receiveShadow>
          <boxGeometry args={[3, 0.1, 1]} />
          <meshStandardMaterial 
            color="#34495e"
            roughness={0.6}
            metalness={0.1}
          />
        </mesh>
        
        {/* Door Frame - Rich Wood Finish */}
        <mesh position={[0, 1.2, 0]} castShadow>
          <boxGeometry args={[1.2, 2.6, 0.2]} />
          <meshStandardMaterial 
            color="#8b5a2b"
            roughness={0.4}
            metalness={0.1}
          />
        </mesh>
        
        {/* Side Trim Panels */}
        {[-0.7, 0.7].map((x, index) => (
          <mesh key={`trim-${index}`} position={[x, 1.2, 0.05]} castShadow>
            <boxGeometry args={[0.1, 2.6, 0.15]} />
            <meshStandardMaterial 
              color="#7a4f1e"
              roughness={0.5}
              metalness={0.05}
            />
          </mesh>
        ))}
        
        {/* Entryway Steps */}
        {[0.6, 0.3].map((z, index) => (
          <mesh key={`step-${index}`} position={[0, -0.05 + index * 0.08, z]} receiveShadow>
            <boxGeometry args={[3.2, 0.08, 0.3]} />
            <meshStandardMaterial 
              color="#2c3e50"
              roughness={0.7}
              metalness={0.1}
            />
          </mesh>
        ))}
        
        {/* Entryway Side Planters */}
        {[-1.8, 1.8].map((x, index) => (
          <group key={`planter-${index}`} position={[x, 0.1, 0.5]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.3, 0.25, 0.4]} />
              <meshStandardMaterial 
                color="#5d4037"
                roughness={0.8}
                metalness={0.0}
              />
            </mesh>
            {/* Small decorative plants */}
            <mesh position={[0, 0.3, 0]} castShadow>
              <coneGeometry args={[0.08, 0.25, 8]} />
              <meshStandardMaterial 
                color="#2e7d32"
                roughness={0.9}
                metalness={0.0}
              />
            </mesh>
          </group>
        ))}
        
        {/* Door Threshold Detail */}
        <mesh position={[0, -0.02, 0.15]} receiveShadow>
          <boxGeometry args={[1.3, 0.04, 0.1]} />
          <meshStandardMaterial 
            color="#8b5a2b"
            roughness={0.3}
            metalness={0.2}
          />
        </mesh>
        

        
        {/* Professional Door with Panels */}
        <group 
          ref={doorRef} 
          position={[-0.5, 1.2, 0.12]}
          rotation={[0, isDoorOpen ? -Math.PI/2.2 : 0, 0]}
        >
          <mesh castShadow>
            <boxGeometry args={[1, 2.4, 0.08]} />
            <meshStandardMaterial 
              color="#6b4423"
              roughness={0.3}
              metalness={0.05}
            />
          </mesh>
          
          {/* Door Panels - Professional Design */}
          {[-0.6, 0.6].map((yPos, index) => 
            [-0.25, 0.25].map((xPos, subIndex) => (
              <mesh key={`${index}-${subIndex}`} position={[xPos, yPos, 0.05]}>
                <boxGeometry args={[0.35, 0.8, 0.02]} />
                <meshStandardMaterial 
                  color="#5d4037"
                  roughness={0.5}
                />
              </mesh>
            ))
          )}
          
          {/* Brass Door Hardware */}
          <mesh position={[0.4, -0.1, 0.06]}>
            <sphereGeometry args={[0.04]} />
            <meshStandardMaterial 
              color="#b8860b"
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>
          
          {/* Door Knocker */}
          <mesh position={[0, 0.8, 0.06]}>
            <torusGeometry args={[0.08, 0.02]} />
            <meshStandardMaterial 
              color="#cd7f32"
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
          
          {/* Interior Door Details (visible when open) */}
          {isDoorOpen && (
            <group>
              {/* Interior Door Frame */}
              <mesh position={[0, 0, -0.05]}>
                <boxGeometry args={[0.98, 2.35, 0.03]} />
                <meshStandardMaterial 
                  color="#f5f5f5"
                  roughness={0.4}
                  metalness={0.0}
                />
              </mesh>
              
              {/* Interior Door Trim */}
              <mesh position={[0, 0, -0.08]}>
                <boxGeometry args={[1.0, 2.37, 0.02]} />
                <meshStandardMaterial 
                  color="#e0e0e0"
                  roughness={0.3}
                  metalness={0.1}
                />
              </mesh>
            </group>
          )}
        </group>
      </group>
      
      {/* Professional Window System */}
      <group>
        {/* Ground Floor Windows */}
        {[[-1.8, 0], [1.8, 0]].map(([x], index) => (
          <group key={`ground-${index}`} position={[x, 1.5, 2.55]}>
            {/* Window Frame */}
            <mesh>
              <boxGeometry args={[1.2, 1.4, 0.1]} />
              <meshStandardMaterial color="#2c3e50" roughness={0.4} metalness={0.3} />
            </mesh>
            
            {/* Glass with Subtle Interior Light Reflection */}
            <mesh position={[0, 0, 0.06]}>
              <boxGeometry args={[1.1, 1.3, 0.02]} />
              <meshStandardMaterial 
                color="#e3f2fd"
                transparent 
                opacity={0.6}
                roughness={0.1}
                metalness={0.3}
                emissive="#fff8e1"
                emissiveIntensity={0.02}
              />
            </mesh>
            
            {/* Window Mullions */}
            <mesh position={[0, 0, 0.07]}>
              <boxGeometry args={[0.02, 1.3, 0.01]} />
              <meshStandardMaterial color="#1a252f" />
            </mesh>
            <mesh position={[0, 0, 0.07]} rotation={[0, 0, Math.PI/2]}>
              <boxGeometry args={[0.02, 1.2, 0.01]} />
              <meshStandardMaterial color="#1a252f" />
            </mesh>
          </group>
        ))}
        
        {/* Second Floor Windows */}
        {[[-1, -1.5], [1, -1.5]].map(([x, z], index) => (
          <group key={`second-${index}`} position={[x, 4.5, z]}>
            <mesh>
              <boxGeometry args={[0.8, 1, 0.1]} />
              <meshStandardMaterial color="#2c3e50" roughness={0.4} metalness={0.3} />
            </mesh>
            <mesh position={[0, 0, 0.06]}>
              <boxGeometry args={[0.7, 0.9, 0.02]} />
              <meshStandardMaterial 
                color="#e8f5e8"
                transparent 
                opacity={0.5}
                roughness={0.1}
                metalness={0.3}
                emissive="#fff9c4"
                emissiveIntensity={0.015}
              />
            </mesh>
          </group>
        ))}
      </group>
      
      {/* Interior Lighting System */}
      <group>
        {/* Main Interior Warm Glow */}
        <mesh position={[0, 1.5, 1.8]}>
          <sphereGeometry args={[2]} />
          <meshStandardMaterial 
            color="#ffa500"
            transparent
            opacity={0.08}
            emissive="#ffa500"
            emissiveIntensity={0.2}
          />
        </mesh>
        
        {/* Living Room Light Sources - Subtle */}
        {[[-1.5, 1.5], [1.5, 1.5]].map(([x, z], index) => (
          <pointLight
            key={`interior-light-${index}`}
            position={[x, 2.5, z]}
            color="#fff8e1"
            intensity={0.15}
            distance={5}
            decay={2}
          />
        ))}
        
        {/* Second Floor Bedroom Lights - Subtle */}
        {[[-1, 4], [1, 4]].map(([x, y], index) => (
          <pointLight
            key={`bedroom-light-${index}`}
            position={[x, y, -1]}
            color="#fff3e0"
            intensity={0.1}
            distance={4}
            decay={2}
          />
        ))}
        

      </group>
      
      {/* Architectural Details */}
      <group>
        {/* Front Porch with Columns */}
        <mesh position={[0, 0.05, 3.2]}>
          <boxGeometry args={[3, 0.1, 1.2]} />
          <meshStandardMaterial 
            color="#2c3e50"
            roughness={0.7}
            metalness={0.2}
          />
        </mesh>
        
        {/* Enhanced Classical Columns with Visible Bases */}
        {[-1.2, 1.2].map((x, index) => (
          <group key={`column-${index}`} position={[x, 1.5, 3.5]}>
            {/* Column Base - Positioned at Ground Level */}
            <mesh position={[0, -1.2, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.28, 0.25, 0.4]} />
              <meshStandardMaterial 
                color="#2c3e50"
                roughness={0.8}
                metalness={0.1}
              />
            </mesh>
            {/* Column Shaft */}
            <mesh castShadow receiveShadow>
              <cylinderGeometry args={[0.15, 0.15, 3]} />
              <meshStandardMaterial 
                color="#f8f9fa"
                roughness={0.7}
                metalness={0.02}
              />
            </mesh>
            {/* Column Capital */}
            <mesh position={[0, 1.6, 0]} castShadow>
              <cylinderGeometry args={[0.22, 0.15, 0.25]} />
              <meshStandardMaterial 
                color="#ecf0f1"
                roughness={0.6}
                metalness={0.05}
              />
            </mesh>
          </group>
        ))}
        
        {/* Chimney with Details */}
        <mesh position={[2, 5.2, -1.5]} castShadow>
          <boxGeometry args={[0.6, 2, 0.6]} />
          <meshStandardMaterial 
            color="#8b4513"
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>
        
        {/* Chimney Cap */}
        <mesh position={[2, 6.4, -1.5]} castShadow>
          <boxGeometry args={[0.8, 0.15, 0.8]} />
          <meshStandardMaterial 
            color="#2c3e50"
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
        
        {/* Garden Landscaping */}
        {/* Flower Boxes under Windows */}
        {[[-1.8, 2.55], [1.8, 2.55]].map(([x, z], index) => (
          <group key={`flowerbox-${index}`} position={[x, 0.8, z]}>
            <mesh>
              <boxGeometry args={[1.3, 0.2, 0.3]} />
              <meshStandardMaterial 
                color="#8b4513"
                roughness={0.8}
                metalness={0.1}
              />
            </mesh>
            {/* Flowers */}
            {Array.from({ length: 3 }, (_, i) => (
              <mesh key={i} position={[(i - 1) * 0.3, 0.15, 0]}>
                <sphereGeometry args={[0.05]} />
                <meshStandardMaterial 
                  color={["#e74c3c", "#f39c12", "#9b59b6"][i]}
                  roughness={0.6}
                />
              </mesh>
            ))}
          </group>
        ))}
        
        {/* Side Garden Bushes */}
        {[[-3, 0, 1], [3, 0, 1], [-3, 0, -2], [3, 0, -2]].map(([x, , z], index) => (
          <mesh key={`bush-${index}`} position={[x, 0.3, z]} castShadow>
            <sphereGeometry args={[0.4, 8, 6]} />
            <meshStandardMaterial 
              color="#2d5016"
              roughness={0.9}
              metalness={0.0}
            />
          </mesh>
        ))}
        
        {/* Roof Gutters */}
        <group>
          <mesh position={[0, 3.4, 2.5]} rotation={[0, 0, 0]}>
            <boxGeometry args={[5.2, 0.1, 0.15]} />
            <meshStandardMaterial 
              color="#95a5a6"
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
          <mesh position={[0, 3.4, -2.5]} rotation={[0, 0, 0]}>
            <boxGeometry args={[5.2, 0.1, 0.15]} />
            <meshStandardMaterial 
              color="#95a5a6"
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        </group>
        
        {/* Window Trim Details */}
        {[[-1.8, 1.5, 2.56], [1.8, 1.5, 2.56]].map(([x, y, z], index) => (
          <group key={`trim-${index}`} position={[x, y, z]}>
            <mesh>
              <boxGeometry args={[1.3, 1.5, 0.05]} />
              <meshStandardMaterial 
                color="#ecf0f1"
                roughness={0.4}
                metalness={0.1}
              />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
};

// Professional Dynamic Lighting System
const DynamicLighting: React.FC<{ timeOfDay: number }> = ({ timeOfDay }) => {
  // Color scales based on the CodeSandbox example
  const sunColors = chroma.scale([
    "#008CFF", "#FF7ECC", "#FFC5B8", "#FFEBB8", 
    "#ffffff", "#FFC5B8", "#FF7ECC", "#008CFF"
  ]).domain([0, 0.15, 0.21, 0.27, 0.7, 0.75, 0.81, 1]);
  
  const moonColors = chroma.scale([
    "#61A0FF", "#FFFFFF", "#FFFFFF", "#61A0FF"
  ]).domain([0.2, 0.33, 0.67, 0.8]);
  
  // Interpolation function from the example
  const interpolate = (scale: number[], value: number) => {
    const count = scale.length - 1;
    const low = Math.max(Math.floor(count * value), 0);
    const high = Math.min(Math.ceil(count * value), count);
    const lerp = (start: number, end: number, t: number) => (1 - t) * start + t * end;
    const rescale = (val: number, srcRange: [number, number], dstRange: [number, number]) => {
      const [dstMin, dstMax] = dstRange;
      const [srcMin, srcMax] = srcRange;
      if (srcMin === srcMax) return dstMin;
      const t = (val - srcMin) / (srcMax - srcMin);
      return t * (dstMax - dstMin) + dstMin;
    };
    return lerp(scale[low], scale[high], rescale(value, [low / count, high / count], [0, 1]));
  };
  
  // Reduced and more realistic lighting intensities
  const sunBrightness = interpolate([
    0, 0, 0, 0, 0.3, 0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.3, 0.3, 0.3, 0.3, 0.3, 0, 0, 0
  ], timeOfDay);
  
  const moonBrightness = interpolate([
    0.4, 0.4, 0.4, 0.4, 0.4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.1, 0.2, 0.4, 0.4
  ], timeOfDay);
  
  const skyBrightness = interpolate([
    0.05, 0.05, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.05
  ], timeOfDay);
  
  // Sun rotation for realistic day cycle
  const rotation = THREE.MathUtils.degToRad(timeOfDay * 360 - 180);
  
  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={skyBrightness} color="#ffffff" />
      
      {/* Sun (directional light) */}
      <group position={[0, 40, 0]} rotation={[0, 0, rotation]}>
        <directionalLight
          position={[0, 50, 20]}
          intensity={sunBrightness}
          color={sunColors(timeOfDay).toString()}
          castShadow
          shadow-mapSize={[4096, 4096]}
          shadow-camera-far={100}
          shadow-camera-left={-15}
          shadow-camera-right={15}
          shadow-camera-top={15}
          shadow-camera-bottom={-15}
          shadow-bias={-0.00005}
          shadow-normalBias={0.02}
        />
      </group>
      
      {/* Moon (directional light) */}
      <group position={[0, -20, 0]} rotation={[0, 0, rotation]}>
        <directionalLight
          position={[10, -50, 20]}
          intensity={moonBrightness}
          color={moonColors(timeOfDay).toString()}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
          shadow-bias={-0.00005}
          shadow-normalBias={0.02}
        />
      </group>
      
      {/* Subtle fill light only */}
      <pointLight position={[0, 8, 8]} intensity={0.1} color="#ffffff" />
    </>
  );
};

// Enhanced Camera Controller with B-roll movements for mobile form positioning
const CameraController = ({ mode, isAuthenticated, showWelcomeText }: any) => {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3(0, 3, 12));
  const currentPosition = useRef(new THREE.Vector3(0, 3, 12));
  const targetLookAt = useRef(new THREE.Vector3(0, 1, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 1, 0));
  const timeRef = useRef(0);

  useEffect(() => {
    console.log('Camera mode changed:', mode, 'isAuthenticated:', isAuthenticated);
    
    if (isAuthenticated) {
      // Move camera inside house
      targetPosition.current.set(0, 1.5, 1);
      targetLookAt.current.set(0, 1, -1);
    }
  }, [mode, isAuthenticated]);

  useFrame((_, delta) => {
    timeRef.current += delta;
    
    if (!isAuthenticated) {
      if (showWelcomeText) {
        // Initial position: Center view for easy house clicking
        targetPosition.current.set(0, 3, 12);
        targetLookAt.current.set(0, 1, 0);
      } else {
        // B-roll camera movements with different angles for login/signup forms (after house click)
        if (mode === 'login') {
          // Login: Camera on right side for left form placement
          const angle = timeRef.current * 0.15; // Slow rotation
          targetPosition.current.set(
            6 + Math.sin(angle) * 2, // Orbit around house
            3.5 + Math.cos(timeRef.current * 0.1) * 0.3, // Gentle vertical float
            8 + Math.cos(angle) * 1.5
          );
          targetLookAt.current.set(-0.5, 1.2, 0); // Look toward house with offset for form
        } else {
          // Signup: Camera on left side for right form placement  
          const angle = timeRef.current * 0.15; // Slow rotation
          targetPosition.current.set(
            -6 - Math.sin(angle) * 2, // Orbit around house (opposite direction)
            3.5 + Math.cos(timeRef.current * 0.1) * 0.3, // Gentle vertical float
            8 + Math.cos(angle) * 1.5
          );
          targetLookAt.current.set(0.5, 1.2, 0); // Look toward house with offset for form
        }
      }
    }

    // Smooth camera movement with cinematic feel
    currentPosition.current.lerp(targetPosition.current, delta * 1.2);
    currentLookAt.current.lerp(targetLookAt.current, delta * 1.2);
    
    camera.position.copy(currentPosition.current);
    camera.lookAt(currentLookAt.current);
  });

  return null;
};

// Glassmorphic Floating Form in 3D Space
const FloatingForm = ({ mode, position, onSubmit, formData, setFormData, isLoading }: any) => {
  return (
    <Html position={position} center>
      <motion.div 
        className="bg-white/20 backdrop-blur-2xl p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-2xl w-[280px] sm:min-w-[320px] border border-white/30 shadow-black/20"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            {mode === 'login' ? 'Welcome Home!' : 'Join Our Home!'}
          </h2>
          <p className="text-white/80 font-medium">
            {mode === 'login' ? 'Enter your credentials to unlock' : 'Become a roommate today'}
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          {mode === 'signup' && (
            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl text-white placeholder-white/60 focus:border-white/40 focus:bg-white/15 outline-none transition-all font-medium"
                required
              />
            </div>
          )}
          
          <div>
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl text-white placeholder-white/60 focus:border-white/40 focus:bg-white/15 outline-none transition-all font-medium"
              required
            />
          </div>
          
          <div>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl text-white placeholder-white/60 focus:border-white/40 focus:bg-white/15 outline-none transition-all font-medium"
              required
            />
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500/80 to-teal-500/80 backdrop-blur-xl text-white font-bold rounded-2xl shadow-lg border border-white/20 hover:from-emerald-500 hover:to-teal-500 transition-all disabled:opacity-50"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-3">
                <motion.div
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span>Processing...</span>
              </span>
            ) : (
              <span className="font-bold tracking-wide">
                {mode === 'login' ? 'Enter Home' : 'Join Home'}
              </span>
            )}
          </motion.button>
        </form>
      </motion.div>
    </Html>
  );
};

const AuthPage: React.FC<AuthPageProps> = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [isDoorOpen, setIsDoorOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showWelcomeText, setShowWelcomeText] = useState(true);
  const { login, register, isAuthenticated } = useAuth();

  console.log('AuthPage render:', { mode, isDoorOpen, showForm, isAuthenticated });

  const [loginForm, setLoginForm] = useState<UserLogin>({
    email: '',
    password: '',
  });

  const [registerForm, setRegisterForm] = useState<UserCreate>({
    name: '',
    email: '',
    password: '',
    avatar_color: 'blue',
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) return;

    setIsLoading(true);
    setIsDoorOpen(true);
    
    try {
      await login(loginForm);
    } catch (error) {
      setIsDoorOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerForm.name || !registerForm.email || !registerForm.password) return;

    setIsLoading(true);
    
    try {
      const words = registerForm.name.trim().split(' ');
      const initials = words.length >= 2 
        ? `${words[0][0]}${words[1][0]}`.toUpperCase()
        : words[0].substring(0, 2).toUpperCase();

      await register({
        ...registerForm,
        avatar_initials: initials,
      });
    } catch (error) {
      // Error handled in auth context
    } finally {
      setIsLoading(false);
    }
  };

  const handleHouseClick = () => {
    console.log('House clicked, current mode:', mode);
    setShowWelcomeText(false); // Hide welcome text after first click
    if (mode === 'login') {
      setIsDoorOpen(true);
      setShowForm(true);
    } else {
      setShowForm(true);
    }
  };

  return (
    <div className="auth-page-container w-full h-screen relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900" style={{ touchAction: 'pan-x pan-y' }}>
      
                  {/* Enhanced Glassmorphic Mode Switch UI */}
      <div className="absolute top-4 right-4 z-[9999] flex gap-2 pointer-events-auto" style={{ isolation: 'isolate', pointerEvents: 'auto' }}>
        <motion.button
          onClick={() => {
            console.log('Enter Home button clicked');
            setMode('login');
            setShowForm(true);
          }}
          onTouchStart={() => {
            console.log('Enter Home button touched');
          }}
          className={`px-4 py-2 rounded-2xl text-sm font-semibold transition-all backdrop-blur-2xl border shadow-xl pointer-events-auto ${
            mode === 'login'
              ? 'bg-gradient-to-r from-emerald-500/30 to-teal-500/30 text-white border-emerald-400/50 shadow-emerald-500/20' 
              : 'bg-white/10 text-white/90 border-white/20 hover:bg-emerald-500/20 hover:border-emerald-400/40'
          }`}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          style={{ touchAction: 'manipulation' }}
        >
          <span className="font-bold tracking-wide">Enter Home</span>
        </motion.button>
        <motion.button
          onClick={() => {
            console.log('Join Home button clicked');
            setMode('signup');
            setShowForm(true);
          }}
          onTouchStart={() => {
            console.log('Join Home button touched');
          }}
          className={`px-4 py-2 rounded-2xl text-sm font-semibold transition-all backdrop-blur-2xl border shadow-xl pointer-events-auto ${
            mode === 'signup'
              ? 'bg-gradient-to-r from-violet-500/30 to-purple-500/30 text-white border-violet-400/50 shadow-violet-500/20'
              : 'bg-white/10 text-white/90 border-white/20 hover:bg-violet-500/20 hover:border-violet-400/40'
          }`}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          style={{ touchAction: 'manipulation' }}
        >
          <span className="font-bold tracking-wide">Join Home</span>
        </motion.button>
          </div>



            {/* Transparent Welcome Text Overlay - Disappears after click */}
            <AnimatePresence>
              {showWelcomeText && (
                <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.5 } }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center"
                  >
                    <motion.h1 
                      className="text-white text-2xl sm:text-3xl font-bold mb-2 drop-shadow-2xl"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {mode === 'login' ? 'Welcome Back!' : 'Join Our Family!'}
                    </motion.h1>
                    <motion.p 
                      className="text-white/90 text-sm sm:text-base font-medium drop-shadow-xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    >
                      {mode === 'login' ? 'Click the house to enter your home' : 'Click the house to start your journey'}
                    </motion.p>
                  </motion.div>
              </div>
              )}
            </AnimatePresence>
              
      {/* Main 3D Scene - Mobile Optimized */}
      <Canvas
        camera={{ position: [0, 3, 12], fov: 65 }}
        style={{ 
          width: '100%', 
          height: '100%', 
          pointerEvents: 'auto',
          zIndex: 1
        }}
        gl={{ 
          antialias: true, 
          alpha: false,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]}
        shadows
        onPointerMissed={() => {
          // This ensures Canvas doesn't interfere with UI elements
        }}
      >
        <Suspense fallback={
          <Html center>
            <div className="text-white text-xl">Loading 3D Scene...</div>
          </Html>
        }>
          {/* Professional Dynamic Lighting System */}
          <DynamicLighting timeOfDay={0.6} />
          
          {/* Mouse Controls for 3D Navigation - House Centered */}
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={8}
            maxDistance={25}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.2}
            autoRotate={false}
            autoRotateSpeed={0.5}
            target={[0, 1, 0]}
            enableDamping={true}
            dampingFactor={0.05}
          />
          
          {/* Realistic Sky Environment */}
          <Sky 
            distance={450000}
            sunPosition={[10, 20, 10]}
            inclination={0}
            azimuth={0.25}
            turbidity={8}
            rayleigh={0.5}
            mieCoefficient={0.02}
            mieDirectionalG={0.8}
          />
          
          {/* Enhanced Realistic Ground with Professional Details */}
          <group>
            {/* Main Ground - Improved Material */}
            <Plane 
              args={[50, 50]} 
              rotation={[-Math.PI / 2, 0, 0]} 
              position={[0, 0, 0]}
              receiveShadow
            >
              <meshStandardMaterial
                color="#3e4a4f"
                roughness={0.85}
                metalness={0.05}
              />
            </Plane>
            
            {/* Enhanced Grass Patches with Natural Variation */}
            {Array.from({ length: 12 }, (_, i) => (
              <Plane
                key={`grass-${i}`}
                args={[2.5 + Math.random() * 1.5, 2 + Math.random() * 1.5]}
                rotation={[-Math.PI / 2, 0, Math.random() * Math.PI]}
                position={[
                  (Math.random() - 0.5) * 16,
                  0.005,
                  (Math.random() - 0.5) * 16
                ]}
                receiveShadow
              >
                <meshStandardMaterial
                  color={i % 3 === 0 ? "#2d5a3d" : i % 3 === 1 ? "#357a49" : "#1e4a32"}
                  roughness={0.9}
                  metalness={0.0}
                  transparent
                  opacity={0.8}
                />
              </Plane>
            ))}
            
            {/* Professional Cobblestone Pathway Base */}
            <Plane
              args={[2.5, 10]}
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, 0.01, 1]}
              receiveShadow
            >
              <meshStandardMaterial
                color="#2c2c2c"
                roughness={0.9}
                metalness={0.1}
              />
            </Plane>
            
            {/* Individual Cobblestones with Realistic Variation */}
            {Array.from({ length: 60 }, (_, i) => {
              const row = Math.floor(i / 10);
              const col = i % 10;
              const size = 0.18 + Math.random() * 0.08;
              const height = 0.03 + Math.random() * 0.02;
              return (
                <mesh
                  key={`cobblestone-${i}`}
                  position={[
                    (col - 4.5) * 0.25 + (Math.random() - 0.5) * 0.08,
                    0.02 + height/2,
                    (row - 2.5) * 0.5 + 1 + (Math.random() - 0.5) * 0.1
                  ]}
                  rotation={[0, Math.random() * Math.PI, 0]}
                  castShadow
                  receiveShadow
                >
                  <cylinderGeometry args={[size, size * 0.9, height, 6]} />
                  <meshStandardMaterial
                    color={
                      i % 5 === 0 ? "#4a4a4a" : 
                      i % 5 === 1 ? "#5a5a5a" : 
                      i % 5 === 2 ? "#3a3a3a" : 
                      i % 5 === 3 ? "#6a6a6a" : "#505050"
                    }
                    roughness={0.8 + Math.random() * 0.15}
                    metalness={0.05 + Math.random() * 0.1}
                  />
                </mesh>
              );
            })}
            
            {/* Cobblestone Mortar/Grout Lines */}
            {Array.from({ length: 15 }, (_, i) => (
              <mesh
                key={`mortar-${i}`}
                position={[
                  (Math.random() - 0.5) * 2.3,
                  0.005,
                  (Math.random() - 0.5) * 9 + 1
                ]}
                rotation={[-Math.PI / 2, 0, Math.random() * Math.PI]}
                receiveShadow
              >
                <planeGeometry args={[0.15 + Math.random() * 0.1, 0.8 + Math.random() * 0.4]} />
                <meshStandardMaterial
                  color="#1a1a1a"
                  roughness={0.95}
                  metalness={0.0}
                />
              </mesh>
            ))}
            
            {/* Realistic Professional Garden Layout */}
            {/* Garden Beds on Both Sides of Pathway */}
            {[-3.5, 3.5].map((x, sideIndex) => (
              <group key={`garden-side-${sideIndex}`}>
                {/* Rich Soil Garden Bed with Texture */}
                <mesh position={[x, 0.02, 2]} receiveShadow>
                  <boxGeometry args={[2.2, 0.12, 6]} />
                  <meshStandardMaterial
                    color="#3d2914"
                    roughness={0.95}
                    metalness={0.0}
                    normalScale={[0.8, 0.8]}
                  />
                </mesh>
                
                {/* Garden Border Edging */}
                <mesh position={[x + (sideIndex === 0 ? 1.1 : -1.1), 0.08, 2]} receiveShadow>
                  <boxGeometry args={[0.08, 0.16, 6]} />
                  <meshStandardMaterial
                    color="#5d4037"
                    roughness={0.7}
                    metalness={0.0}
                  />
                </mesh>
                
                {/* Realistic Natural Stones with Variation */}
                {Array.from({ length: 4 }, (_, i) => {
                  const stoneScale = 0.12 + Math.random() * 0.08;
                  return (
                    <mesh
                      key={`natural-stone-${i}`}
                      position={[
                        x + (Math.random() - 0.5) * 1.8,
                        0.06 + stoneScale/2,
                        2 + (Math.random() - 0.5) * 5
                      ]}
                      rotation={[
                        Math.random() * 0.3,
                        Math.random() * Math.PI,
                        Math.random() * 0.3
                      ]}
                      scale={[
                        stoneScale,
                        stoneScale * (0.7 + Math.random() * 0.6),
                        stoneScale * (0.8 + Math.random() * 0.4)
                      ]}
                      receiveShadow
                      castShadow
                    >
                      <dodecahedronGeometry args={[1]} />
                      <meshStandardMaterial
                        color={i % 4 === 0 ? "#8d8d8d" : i % 4 === 1 ? "#a8a8a8" : i % 4 === 2 ? "#707070" : "#9e9e9e"}
                        roughness={0.9}
                        metalness={0.0}
                        normalScale={[1.2, 1.2]}
                      />
                    </mesh>
                  );
                })}
                
                {/* Professional Landscaping Bushes */}
                {Array.from({ length: 3 }, (_, i) => {
                  const bushSize = 0.35 + Math.random() * 0.25;
                  const bushHeight = bushSize * (0.8 + Math.random() * 0.4);
                  return (
                    <group key={`professional-bush-${i}`} position={[
                      x + (Math.random() - 0.5) * 1.6,
                      0.05,
                      2 + (Math.random() - 0.5) * 4
                    ]}>
                      {/* Main Bush Structure - Irregular Shape */}
                      <mesh castShadow receiveShadow position={[0, bushHeight/2, 0]}>
                        <sphereGeometry args={[bushSize, 16, 12]} />
                        <meshStandardMaterial
                          color="#1b5e20"
                          roughness={0.9}
                          metalness={0.0}
                        />
                      </mesh>
                      
                      {/* Organic Foliage Clusters */}
                      {Array.from({ length: 8 }, (_, j) => {
                        const clusterSize = bushSize * (0.2 + Math.random() * 0.3);
                        return (
                          <mesh
                            key={`foliage-cluster-${j}`}
                            position={[
                              (Math.random() - 0.5) * bushSize * 1.8,
                              (Math.random() - 0.2) * bushHeight * 1.2,
                              (Math.random() - 0.5) * bushSize * 1.8
                            ]}
                            scale={[
                              0.8 + Math.random() * 0.4,
                              0.6 + Math.random() * 0.8,
                              0.8 + Math.random() * 0.4
                            ]}
                            rotation={[
                              Math.random() * 0.5,
                              Math.random() * Math.PI * 2,
                              Math.random() * 0.5
                            ]}
                            castShadow
                          >
                            <sphereGeometry args={[clusterSize, 10, 8]} />
                            <meshStandardMaterial
                              color={j % 4 === 0 ? "#2e7d32" : j % 4 === 1 ? "#43a047" : j % 4 === 2 ? "#4caf50" : "#388e3c"}
                              roughness={0.95}
                              metalness={0.0}
                            />
                          </mesh>
                        );
                      })}
                      
                      {/* Small Branch Details */}
                      {Array.from({ length: 4 }, (_, k) => (
                        <mesh
                          key={`branch-${k}`}
                          position={[
                            (Math.random() - 0.5) * bushSize * 2,
                            bushHeight * (0.3 + Math.random() * 0.7),
                            (Math.random() - 0.5) * bushSize * 2
                          ]}
                          rotation={[
                            Math.random() * Math.PI,
                            Math.random() * Math.PI * 2,
                            Math.random() * Math.PI
                          ]}
                          castShadow
                        >
                          <cylinderGeometry args={[0.008, 0.012, 0.1 + Math.random() * 0.08]} />
                          <meshStandardMaterial
                            color="#5d4037"
                            roughness={0.9}
                            metalness={0.0}
                          />
                        </mesh>
                      ))}
                    </group>
                  );
                })}
                
                {/* Realistic Flowers with Stems */}
                {Array.from({ length: 6 }, (_, i) => (
                  <group
                    key={`flower-${i}`}
                    position={[
                      x + (Math.random() - 0.5) * 1.5,
                      0.05,
                      2 + (Math.random() - 0.5) * 4
                    ]}
                    rotation={[0, Math.random() * Math.PI * 2, 0]}
                  >
                    {/* Flower Stem */}
                    <mesh position={[0, 0.1, 0]} castShadow>
                      <cylinderGeometry args={[0.008, 0.008, 0.2]} />
                      <meshStandardMaterial
                        color="#2e7d32"
                        roughness={0.8}
                        metalness={0.0}
                      />
                    </mesh>
                    
                    {/* Flower Head */}
                    <mesh position={[0, 0.2, 0]} castShadow>
                      <sphereGeometry args={[0.03, 8, 6]} />
                      <meshStandardMaterial
                        color={i % 6 === 0 ? "#e91e63" : i % 6 === 1 ? "#ff9800" : i % 6 === 2 ? "#9c27b0" : i % 6 === 3 ? "#f44336" : i % 6 === 4 ? "#ff5722" : "#e53935"}
                        roughness={0.6}
                        metalness={0.0}
                        emissive={i % 6 === 0 ? "#e91e63" : i % 6 === 1 ? "#ff9800" : i % 6 === 2 ? "#9c27b0" : i % 6 === 3 ? "#f44336" : i % 6 === 4 ? "#ff5722" : "#e53935"}
                        emissiveIntensity={0.05}
                      />
                    </mesh>
                    
                    {/* Flower Petals */}
                    {Array.from({ length: 6 }, (_, j) => (
                      <mesh
                        key={`petal-${j}`}
                        position={[
                          Math.cos((j / 6) * Math.PI * 2) * 0.025,
                          0.2,
                          Math.sin((j / 6) * Math.PI * 2) * 0.025
                        ]}
                        rotation={[0, (j / 6) * Math.PI * 2, Math.PI / 6]}
                        castShadow
                      >
                        <boxGeometry args={[0.015, 0.04, 0.002]} />
                        <meshStandardMaterial
                          color={i % 6 === 0 ? "#f8bbd9" : i % 6 === 1 ? "#ffcc80" : i % 6 === 2 ? "#ce93d8" : i % 6 === 3 ? "#ffab91" : i % 6 === 4 ? "#ff8a65" : "#ef9a9a"}
                          roughness={0.4}
                          metalness={0.0}
                        />
                      </mesh>
                    ))}
                  </group>
                ))}
                
                {/* Mulch Ground Cover */}
                <mesh position={[x, 0.005, 2]} receiveShadow>
                  <boxGeometry args={[2.1, 0.01, 5.8]} />
                  <meshStandardMaterial
                    color="#5d4037"
                    roughness={0.9}
                    metalness={0.0}
                  />
                </mesh>
              </group>
            ))}
          </group>
          
          {/* Interactive Professional House Model - Centered */}
          <group onClick={handleHouseClick} scale={0.8} position={[0, -0.5, 0]}>
            <ProfessionalHouseModel isDoorOpen={isDoorOpen} timeOfDay={0.6} />
          </group>

          

          
          {/* Form in 3D Space - Mobile Optimized with Camera Movement */}
          {showForm && (
            <FloatingForm
              mode={mode}
              position={mode === 'login' ? [-3, 2, 2] : [3, 2, 2]}
              onSubmit={mode === 'login' ? handleLogin : handleRegister}
              formData={mode === 'login' ? loginForm : registerForm}
              setFormData={mode === 'login' ? setLoginForm : setRegisterForm}
              isLoading={isLoading}
            />
          )}
          
          {/* Camera Controller */}
          <CameraController mode={mode} isAuthenticated={isAuthenticated} showWelcomeText={showWelcomeText} />
          
          {/* Shadows */}
          <ContactShadows 
            position={[0, 0, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={1} 
            far={10} 
          />
          
          
        </Suspense>
        
        {/* Subtle Post-Processing */}
        <EffectComposer>
          <Bloom 
            intensity={0.2} 
            kernelSize={2} 
            luminanceThreshold={1.2} 
            luminanceSmoothing={0.3} 
          />
        </EffectComposer>
      </Canvas>
      
            {/* Glassmorphic Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            className="bg-white/20 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl border border-white/30"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="flex items-center space-x-4">
              <motion.div
                className="w-8 h-8 border-4 border-white/60 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <span className="text-xl font-semibold text-white">
                {mode === 'login' ? 'Entering home...' : 'Joining family...'}
              </span>
                </div>
          </motion.div>
              </div>
      )}
      
    </div>
  );
};

export default AuthPage;
