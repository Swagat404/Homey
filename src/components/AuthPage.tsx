/**
 * Immersive 3D Home Authentication Experience
 * Professional 3D scene with realistic camera movements and home models
 * No popups - seamless scene transitions for login/signup
 */

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
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
      {/* Professional Foundation with Stone Texture */}
      <mesh position={[0, 0.15, 0]} receiveShadow>
        <boxGeometry args={[6, 0.3, 6]} />
        <meshStandardMaterial 
          color="#1a1a1a"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>
      
      {/* Main House Structure - Multi-level */}
      <mesh position={[0, 1.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[5, 3.2, 5]} />
        <meshStandardMaterial 
          color="#f8f9fa"
          roughness={0.3}
          metalness={0.05}
        />
      </mesh>
      
      {/* Second Floor */}
      <mesh position={[0, 4.2, -1]} castShadow receiveShadow>
        <boxGeometry args={[3.5, 2, 3]} />
        <meshStandardMaterial 
          color="#e9ecef"
          roughness={0.4}
          metalness={0.05}
        />
      </mesh>
      
      {/* Complex Roof System */}
      <group>
        {/* Main Roof */}
        <mesh position={[0, 4.5, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
          <coneGeometry args={[4.2, 2.2, 4]} />
          <meshStandardMaterial 
            color="#2c3e50"
            roughness={0.7}
            metalness={0.3}
          />
        </mesh>
        
        {/* Second Floor Roof */}
        <mesh position={[0, 5.8, -1]} rotation={[0, 0, 0]} castShadow>
          <coneGeometry args={[2.8, 1.5, 4]} />
          <meshStandardMaterial 
            color="#34495e"
            roughness={0.6}
            metalness={0.4}
          />
        </mesh>
        
        {/* Roof Details */}
        <mesh position={[0, 4.0, 0]} rotation={[0, Math.PI / 4, 0]}>
          <torusGeometry args={[3.8, 0.08, 8, 16]} />
          <meshStandardMaterial 
            color="#1a252f"
            roughness={0.4}
            metalness={0.6}
          />
        </mesh>
      </group>
      
      {/* Professional Door System */}
      <group position={[0, 0, 2.55]}>
        {/* Door Frame with Arch */}
        <mesh position={[0, 1.2, 0]} castShadow>
          <boxGeometry args={[1.2, 2.6, 0.2]} />
          <meshStandardMaterial 
            color="#8b4513"
            roughness={0.6}
            metalness={0.2}
          />
        </mesh>
        
        {/* Arched Top */}
        <mesh position={[0, 2.3, 0]} rotation={[0, 0, Math.PI/2]} castShadow>
          <torusGeometry args={[0.6, 0.1, 8, 16, Math.PI]} />
          <meshStandardMaterial 
            color="#8b4513"
            roughness={0.6}
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
              color="#654321"
              roughness={0.4}
              metalness={0.1}
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
            
            {/* Glass with Reflections */}
            <mesh position={[0, 0, 0.06]}>
              <boxGeometry args={[1.1, 1.3, 0.02]} />
              <meshStandardMaterial 
                color="#4299e1"
                transparent 
                opacity={0.6}
                roughness={0.1}
                metalness={0.1}
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
                color="#4299e1"
                transparent 
                opacity={0.6}
                roughness={0.1}
                metalness={0.1}
              />
            </mesh>
          </group>
        ))}
      </group>
      
      {/* Interior Warm Glow */}
      {isDoorOpen && (
        <mesh position={[0, 1.5, 1.8]}>
          <sphereGeometry args={[1.5]} />
          <meshStandardMaterial 
            color="#ffa500"
            transparent
            opacity={0.1}
            emissive="#ffa500"
            emissiveIntensity={0.3}
          />
        </mesh>
      )}
      
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
        
        {/* Classical Columns */}
        {[-1.2, 1.2].map((x, index) => (
          <group key={`column-${index}`} position={[x, 1.5, 3.5]}>
            <mesh>
              <cylinderGeometry args={[0.15, 0.15, 3]} />
              <meshStandardMaterial 
                color="#ecf0f1"
                roughness={0.5}
                metalness={0.1}
              />
            </mesh>
            {/* Column Capital */}
            <mesh position={[0, 1.6, 0]}>
              <cylinderGeometry args={[0.2, 0.15, 0.2]} />
              <meshStandardMaterial 
                color="#bdc3c7"
                roughness={0.4}
                metalness={0.2}
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

// Camera Controller for Scene Transitions - Mobile Optimized
const CameraController = ({ mode, isAuthenticated }: any) => {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3(0, 2, 8));
  const targetLookAt = useRef(new THREE.Vector3(0, 1, 0));

  useEffect(() => {
    console.log('Camera mode changed:', mode, 'isAuthenticated:', isAuthenticated);
    
    if (isAuthenticated) {
      // Move camera inside house
      targetPosition.current.set(0, 1.5, 1);
      targetLookAt.current.set(0, 1, -1);
    } else if (mode === 'login') {
      // Focus on door - mobile optimized
      targetPosition.current.set(0, 2, 8);
      targetLookAt.current.set(0, 1, 0);
    } else {
      // Signup - angled view for mobile
      targetPosition.current.set(-3, 3, 6);
      targetLookAt.current.set(0, 1, 0);
    }
  }, [mode, isAuthenticated]);

  useFrame(() => {
    // Smooth camera movement optimized for mobile
    camera.position.lerp(targetPosition.current, 0.05);
    camera.lookAt(targetLookAt.current);
  });

  return null;
};

// Glassmorphic Floating Form in 3D Space
const FloatingForm = ({ mode, position, onSubmit, formData, setFormData, isLoading }: any) => {
  return (
    <Html position={position} center>
      <motion.div 
        className="bg-white/20 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl min-w-[320px] border border-white/30 shadow-black/20"
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



            {/* Enhanced Glassmorphic Welcome Header */}
                    <div className="absolute top-4 left-4 right-4 z-50">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-2xl border border-emerald-400/40 rounded-2xl px-4 py-3 shadow-2xl shadow-emerald-500/10 max-w-xs"
        >
          <h1 className="text-white text-lg font-bold mb-1">
            {mode === 'login' ? 'Welcome Back!' : 'Join Our Family!'}
          </h1>
          <p className="text-emerald-100 text-xs font-medium">
            {mode === 'login' ? 'Click the house to enter your home' : 'Click the house to start your journey'}
          </p>
        </motion.div>
              </div>
              
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
          
          {/* Realistic Ground with Subtle Details */}
          <group>
            {/* Main Ground */}
            <Plane 
              args={[50, 50]} 
              rotation={[-Math.PI / 2, 0, 0]} 
              position={[0, 0, 0]}
              receiveShadow
            >
              <meshStandardMaterial
                color="#2d3436"
                roughness={0.9}
                metalness={0.1}
              />
            </Plane>
            
            {/* Grass Patches */}
            {Array.from({ length: 8 }, (_, i) => (
              <Plane
                key={`grass-${i}`}
                args={[3 + Math.random() * 2, 2 + Math.random() * 2]}
                rotation={[-Math.PI / 2, 0, Math.random() * Math.PI]}
                position={[
                  (Math.random() - 0.5) * 20,
                  0.01,
                  (Math.random() - 0.5) * 20
                ]}
                receiveShadow
              >
                <meshStandardMaterial
                  color="#27ae60"
                  roughness={0.8}
                  metalness={0.0}
                  transparent
                  opacity={0.7}
                />
              </Plane>
            ))}
            
            {/* Pathway to House */}
            <Plane
              args={[2, 8]}
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, 0.02, 1]}
              receiveShadow
            >
              <meshStandardMaterial
                color="#636e72"
                roughness={0.7}
                metalness={0.0}
              />
            </Plane>
          </group>
          
          {/* Interactive Professional House Model - Centered */}
          <group onClick={handleHouseClick} scale={0.8} position={[0, -0.5, 0]}>
            <ProfessionalHouseModel isDoorOpen={isDoorOpen} timeOfDay={0.6} />
          </group>

          
          {/* Static Text - House Focused */}
          <Text
            position={[0, 5, 0]}
            fontSize={0.6}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {mode === 'login' ? 'ENTER HOME' : 'JOIN FAMILY'}
          </Text>
          
          {/* Form in 3D Space - Mobile Positioned */}
          {showForm && (
            <FloatingForm
              mode={mode}
              position={mode === 'login' ? [2.5, 1.5, 3] : [-2.5, 1.5, 3]}
              onSubmit={mode === 'login' ? handleLogin : handleRegister}
              formData={mode === 'login' ? loginForm : registerForm}
              setFormData={mode === 'login' ? setLoginForm : setRegisterForm}
              isLoading={isLoading}
            />
          )}
          
          {/* Camera Controller */}
          <CameraController mode={mode} isAuthenticated={isAuthenticated} />
          
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
