/**
 * House Entrance Authentication - A beautiful home where users "enter" through the door
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as UI from '@/components/ui/index';
import { useAuth } from '@/lib/contexts/AuthContext';
import { UserLogin, UserCreate } from '@/lib/api/types';

interface AuthPageProps {
  isDark: boolean;
}

const AuthPage: React.FC<AuthPageProps> = ({ isDark }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isDoorOpen, setIsDoorOpen] = useState(false);
  const [showKeypad, setShowKeypad] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening' | 'night'>('afternoon');
  const { login, register } = useAuth();

  const [loginForm, setLoginForm] = useState<UserLogin>({
    email: '',
    password: '',
  });

  const [registerForm, setRegisterForm] = useState<UserCreate>({
    name: '',
    email: '',
    password: '',
    avatar_color: 'purple',
  });

  // Set realistic time of day for atmospheric lighting
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) setTimeOfDay('morning');
    else if (hour >= 12 && hour < 17) setTimeOfDay('afternoon');
    else if (hour >= 17 && hour < 20) setTimeOfDay('evening');
    else setTimeOfDay('night');
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) return;

    setIsLoading(true);
    try {
      // First, open the door with anticipation
      setIsDoorOpen(true);
      
      // Simulate key turning and authentication
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Start entering animation
      setIsEntering(true);
      
      // Actually perform login
      await login(loginForm);
      
      // The door stays open and user "enters" - handled by App component routing
    } catch (error) {
      // Door closes on failed authentication
      setIsDoorOpen(false);
      setIsEntering(false);
      // Error is handled in the auth context
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerForm.name || !registerForm.email || !registerForm.password) return;

    setIsLoading(true);
    try {
      // Generate initials from name
      const words = registerForm.name.trim().split(' ');
      const initials = words.length >= 2 
        ? `${words[0][0]}${words[1][0]}`.toUpperCase()
        : words[0].substring(0, 2).toUpperCase();

      await register({
        ...registerForm,
        avatar_initials: initials,
      });
    } catch (error) {
      // Error is handled in the auth context
    } finally {
      setIsLoading(false);
    }
  };

  const avatarColors = [
    'purple', 'blue', 'green', 'red', 'orange', 'pink', 'indigo', 'teal'
  ];

  // Dynamic sky colors based on time of day
  const skyGradients = {
    morning: 'from-orange-200 via-yellow-200 to-blue-200',
    afternoon: 'from-blue-400 via-blue-300 to-blue-200', 
    evening: 'from-orange-400 via-pink-300 to-purple-300',
    night: 'from-gray-800 via-purple-900 to-black'
  };

  const houseShadow = timeOfDay === 'night' ? 'shadow-2xl shadow-purple-900/50' : 'shadow-2xl shadow-black/20';

  return (
    <div className={`min-h-screen relative overflow-hidden bg-gradient-to-b ${skyGradients[timeOfDay]}`}>
      {/* Atmospheric Background Elements */}
      <div className="absolute inset-0">
        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-600 to-green-500"></div>
        
        {/* Trees and Environment */}
        <div className="absolute bottom-32 left-8 w-16 h-24 bg-green-700 rounded-full opacity-60"></div>
        <div className="absolute bottom-32 right-12 w-12 h-20 bg-green-700 rounded-full opacity-60"></div>
        
        {/* Clouds */}
        {timeOfDay !== 'night' && (
          <>
            <motion.div 
              className="absolute top-20 left-1/4 w-20 h-12 bg-white/30 rounded-full blur-sm"
              animate={{ x: [0, 20, 0] }}
              transition={{ duration: 20, repeat: Infinity }}
            />
            <motion.div 
              className="absolute top-32 right-1/3 w-16 h-8 bg-white/20 rounded-full blur-sm"
              animate={{ x: [0, -15, 0] }}
              transition={{ duration: 25, repeat: Infinity, delay: 5 }}
            />
          </>
        )}

        {/* Stars for night */}
        {timeOfDay === 'night' && (
          <div className="absolute inset-0">
            <div className="absolute top-16 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse"></div>
            <div className="absolute top-24 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse delay-300"></div>
            <div className="absolute top-40 left-2/3 w-1 h-1 bg-white rounded-full animate-pulse delay-700"></div>
          </div>
        )}
      </div>

      {/* Main House Structure */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div 
          className={`relative ${houseShadow}`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* House Base */}
          <div className="relative w-96 h-80 bg-gradient-to-b from-amber-100 to-amber-200 dark:from-amber-200 dark:to-amber-300 rounded-lg border-4 border-amber-300">
            
            {/* Roof */}
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[200px] border-r-[200px] border-b-[80px] border-l-transparent border-r-transparent border-b-red-600"></div>
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[190px] border-r-[190px] border-b-[75px] border-l-transparent border-r-transparent border-b-red-500"></div>
            
            {/* Chimney */}
            <div className="absolute -top-20 right-16 w-8 h-16 bg-red-800 border border-red-900">
              {timeOfDay === 'evening' || timeOfDay === 'night' ? (
                <motion.div 
                  className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-8 bg-gray-400 rounded-full opacity-60"
                  animate={{ y: [-5, -15], opacity: [0.6, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              ) : null}
            </div>

            {/* Windows */}
            <div className="absolute top-8 left-8 w-16 h-16 bg-gradient-to-br from-blue-200 to-blue-300 border-4 border-white rounded-lg">
              <div className="absolute inset-2 border border-white"></div>
              <div className="absolute top-1/2 left-0 right-0 h-px bg-white"></div>
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white"></div>
              {/* Window glow at night */}
              {timeOfDay === 'night' && (
                <div className="absolute inset-0 bg-yellow-300/60 rounded"></div>
              )}
            </div>

            <div className="absolute top-8 right-8 w-16 h-16 bg-gradient-to-br from-blue-200 to-blue-300 border-4 border-white rounded-lg">
              <div className="absolute inset-2 border border-white"></div>
              <div className="absolute top-1/2 left-0 right-0 h-px bg-white"></div>
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white"></div>
              {timeOfDay === 'night' && (
                <div className="absolute inset-0 bg-yellow-300/60 rounded"></div>
              )}
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-2xl">🏠</div>
            
            {/* House Number */}
            <div className="absolute top-32 left-4 w-8 h-8 bg-white rounded-full flex items-center justify-center border-2 border-gray-300">
              <span className="text-sm font-bold text-gray-800">42</span>
            </div>

            {/* Door Frame */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-40 bg-gradient-to-b from-amber-800 to-amber-900 rounded-t-2xl border-4 border-amber-900">
              
              {/* Door */}
              <motion.div 
                className="absolute inset-1 bg-gradient-to-b from-amber-700 to-amber-800 rounded-t-xl overflow-hidden"
                style={{ transformOrigin: 'left center' }}
                animate={{ 
                  rotateY: isDoorOpen ? -85 : 0,
                  transformStyle: 'preserve-3d'
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                {/* Door panels */}
                <div className="absolute top-2 left-2 right-2 h-16 bg-amber-600 rounded border border-amber-500"></div>
                <div className="absolute bottom-2 left-2 right-2 h-16 bg-amber-600 rounded border border-amber-500"></div>
                
                {/* Door knob */}
                <div className="absolute top-1/2 right-2 transform -translate-y-1/2 w-3 h-3 bg-yellow-400 rounded-full border border-yellow-500 shadow-lg"></div>
                
                {/* Decorative glass */}
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-200 rounded border border-white opacity-80">
                  {timeOfDay === 'night' && (
                    <div className="absolute inset-0 bg-yellow-200/50 rounded"></div>
                  )}
                </div>
              </motion.div>

              {/* Door interior view when open */}
              <AnimatePresence>
                {isDoorOpen && (
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-purple-900 via-purple-800 to-purple-700 rounded-t-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="absolute inset-4 border border-purple-400/30 rounded">
                      <div className="text-purple-200 text-xs text-center mt-8">Welcome Home!</div>
                      {isEntering && (
                        <motion.div 
                          className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-2xl"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: -100, opacity: [0, 1, 0] }}
                          transition={{ duration: 2 }}
                        >
                          🚶‍♂️
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Doorbell */}
            <motion.button
              className="absolute bottom-28 right-2 w-6 h-6 bg-white rounded-full border-2 border-gray-300 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
              onClick={() => setShowKeypad(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            </motion.button>

            {/* Pathway lights */}
            {timeOfDay === 'evening' || timeOfDay === 'night' ? (
              <>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 -translate-x-8 w-3 h-6 bg-yellow-200 rounded-t-full opacity-80 shadow-lg shadow-yellow-200/50"></div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 translate-x-8 w-3 h-6 bg-yellow-200 rounded-t-full opacity-80 shadow-lg shadow-yellow-200/50"></div>
              </>
            ) : null}
          </div>

          {/* Front Garden */}
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-32 h-16">
            <div className="absolute bottom-0 left-4 w-4 h-8 bg-green-600 rounded-full"></div>
            <div className="absolute bottom-0 right-4 w-4 h-8 bg-green-600 rounded-full"></div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-lg">🌸</div>
          </div>

          {/* Mailbox */}
          <div className="absolute bottom-0 -right-20 w-8 h-12 bg-blue-600 rounded-t-lg border-2 border-blue-700">
            <div className="absolute top-1 left-1 right-1 h-2 bg-white rounded"></div>
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-1 h-6 bg-gray-600"></div>
          </div>
        </motion.div>

        {/* Keypad Interface */}
        <AnimatePresence>
          {showKeypad && (
            <motion.div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowKeypad(false)}
            >
              <motion.div 
                className="bg-white/95 backdrop-blur-xl p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 border border-white/20"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl">🏠</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Home</h2>
                  <p className="text-gray-600">
                    {isLogin ? 'Enter your credentials to unlock the door' : 'Register to get your keys'}
                  </p>
                </div>

                {/* Mode Toggle */}
                <div className="flex mb-6 p-1 bg-gray-100 rounded-xl">
            <button
              onClick={() => setIsLogin(true)}
                    className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all ${
                isLogin
                        ? 'bg-white text-gray-800 shadow-md'
                        : 'text-gray-500 hover:text-gray-700'
              }`}
            >
                    🗝️ Unlock Door
            </button>
            <button
              onClick={() => setIsLogin(false)}
                    className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all ${
                !isLogin
                        ? 'bg-white text-gray-800 shadow-md'
                        : 'text-gray-500 hover:text-gray-700'
              }`}
            >
                    🔑 Get Keys
            </button>
          </div>

          {/* Login Form */}
          {isLogin && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                </label>
                      <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                        placeholder="your@email.com"
                  required
                />
              </div>
              
              <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                      <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                  placeholder="Enter your password"
                  required
                />
              </div>

                    <motion.button
                type="submit"
                      className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-xl shadow-lg hover:from-amber-600 hover:to-amber-700 transition-all disabled:opacity-50"
                disabled={isLoading}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center">
                          <motion.div 
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Unlocking Door...
                        </span>
                      ) : (
                        '🔓 Unlock & Enter'
                      )}
                    </motion.button>
            </form>
          )}

          {/* Register Form */}
          {!isLogin && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                      <input
                  type="text"
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                        placeholder="Your full name"
                  required
                />
              </div>

              <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                </label>
                      <input
                  type="email"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                        placeholder="your@email.com"
                  required
                />
              </div>
              
              <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                      <input
                  type="password"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                        placeholder="Create a secure password"
                  required
                />
              </div>

              <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Choose Your Key Color
                </label>
                      <div className="flex flex-wrap gap-3 justify-center">
                  {avatarColors.map((color) => (
                          <motion.button
                      key={color}
                      type="button"
                      onClick={() => setRegisterForm({ ...registerForm, avatar_color: color })}
                            className={`w-10 h-10 rounded-full border-4 transition-all ${
                        registerForm.avatar_color === color
                                ? 'border-white shadow-lg scale-110 ring-2 ring-gray-300'
                                : 'border-gray-200 hover:scale-105'
                      }`}
                      style={{
                        background: `var(--homey-${color}-500)`,
                      }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                    />
                  ))}
                </div>
              </div>

                    <motion.button
                type="submit"
                      className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:from-emerald-600 hover:to-emerald-700 transition-all disabled:opacity-50"
                disabled={isLoading}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center">
                          <motion.div 
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Cutting Keys...
                        </span>
                      ) : (
                        '🗝️ Get My Keys'
                      )}
                    </motion.button>
            </form>
          )}

                {/* Demo Info */}
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                  <p className="text-xs text-gray-600 text-center leading-relaxed">
                    🎭 <strong>Demo Mode:</strong> Use any email/password combination to explore your beautiful home!
                  </p>
          </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AuthPage;
