/**
 * Premium Glassmorphism Authentication - Sophisticated login experience
 * Inspired by top design systems from Apple, Notion, and premium startups
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  IconHome, 
  IconMail, 
  IconLock, 
  IconEye, 
  IconEyeOff, 
  IconUser, 
  IconArrowRight,
  IconCheck,
  IconX,
  IconShield,
  IconStar
} from '@tabler/icons-react';
import { useAuth } from '@/lib/contexts/AuthContext';
import { UserLogin, UserCreate } from '@/lib/api/types';

interface AuthPageProps {
  isDark: boolean;
}

const AuthPage: React.FC<AuthPageProps> = ({ isDark }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [nameFocused, setNameFocused] = useState(false);
  const { login, register } = useAuth();

  const [loginForm, setLoginForm] = useState<UserLogin>({
    email: '',
    password: '',
  });

  const [registerForm, setRegisterForm] = useState<UserCreate>({
    name: '',
    email: '',
    password: '',
    avatar_color: 'violet',
  });

  // Form validation
  const [validation, setValidation] = useState({
    email: { isValid: false, message: '' },
    password: { isValid: false, message: '' },
    name: { isValid: false, message: '' }
  });

  // Real-time validation
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const currentEmail = isLogin ? loginForm.email : registerForm.email;
    const currentPassword = isLogin ? loginForm.password : registerForm.password;
    
    setValidation(prev => ({
      ...prev,
      email: {
        isValid: emailRegex.test(currentEmail),
        message: currentEmail && !emailRegex.test(currentEmail) ? 'Please enter a valid email' : ''
      },
      password: {
        isValid: currentPassword.length >= 6,
        message: currentPassword && currentPassword.length < 6 ? 'Password must be at least 6 characters' : ''
      },
      name: {
        isValid: registerForm.name.length >= 2,
        message: registerForm.name && registerForm.name.length < 2 ? 'Name must be at least 2 characters' : ''
      }
    }));
  }, [loginForm, registerForm, isLogin]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validation.email.isValid || !validation.password.isValid) return;

    setIsLoading(true);
    try {
      await login(loginForm);
    } catch (error) {
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
    'violet', 'blue', 'emerald', 'amber', 'rose', 'indigo', 'cyan', 'orange'
  ];

  // Premium input component
  const PremiumInput = ({ 
    type, 
    placeholder, 
    value, 
    onChange, 
    icon: Icon, 
    focused, 
    onFocus, 
    onBlur, 
    validation, 
    showToggle = false, 
    onToggle 
  }: any) => (
    <motion.div 
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`relative group transition-all duration-300 ${
        focused ? 'transform -translate-y-1' : ''
      }`}>
        <div className={`absolute inset-0 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-2xl blur-lg transition-opacity duration-300 ${
          focused ? 'opacity-100' : 'opacity-0'
        }`} />
        
        <div className={`relative flex items-center px-5 py-4 bg-white/10 dark:bg-black/20 backdrop-blur-xl border-2 rounded-2xl transition-all duration-300 ${
          focused 
            ? 'border-violet-400/50 shadow-lg shadow-violet-500/25' 
            : validation.message 
              ? 'border-red-400/50' 
              : 'border-white/20 hover:border-white/30'
        }`}>
          <Icon className={`w-5 h-5 mr-4 transition-colors duration-300 ${
            focused ? 'text-violet-400' : 'text-gray-400'
          }`} />
          
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none font-medium"
          />
          
          {showToggle && (
            <button
              type="button"
              onClick={onToggle}
              className="ml-3 p-1 text-gray-400 hover:text-violet-400 transition-colors"
            >
              {type === 'password' ? <IconEye className="w-5 h-5" /> : <IconEyeOff className="w-5 h-5" />}
            </button>
          )}
          
          {validation.isValid && value && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="ml-3 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center"
            >
              <IconCheck className="w-3 h-3 text-white" />
            </motion.div>
          )}
        </div>
      </div>
      
      {validation.message && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="text-red-400 text-sm mt-2 ml-2"
        >
          {validation.message}
        </motion.p>
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Floating orbs */}
        <motion.div
          className="absolute top-20 left-1/4 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl"
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl"
          animate={{ 
            x: [0, -80, 0],
            y: [0, 30, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.5, 1]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Premium Glass Card */}
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/30 to-purple-500/30 rounded-3xl blur-2xl scale-105" />
            
            {/* Main card */}
            <div className="relative bg-white/10 dark:bg-black/20 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl">
              
              {/* Header */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="relative mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl shadow-lg shadow-violet-500/25 flex items-center justify-center"
                >
                  <IconHome className="w-10 h-10 text-white" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2"
                >
                  Welcome to Homey
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-gray-300"
                >
                  {isLogin ? 'Sign in to your home' : 'Create your account'}
                </motion.p>
              </div>

              {/* Tab Switcher */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex mb-8 p-1 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10"
              >
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    isLogin
                      ? 'bg-white/20 text-white shadow-lg backdrop-blur-xl border border-white/20'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    !isLogin
                      ? 'bg-white/20 text-white shadow-lg backdrop-blur-xl border border-white/20'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Sign Up
                </button>
              </motion.div>

              {/* Login Form */}
              {isLogin && (
                <motion.form 
                  onSubmit={handleLogin} 
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <PremiumInput
                    type="email"
                    placeholder="Email address"
                    value={loginForm.email}
                    onChange={(e: any) => setLoginForm({ ...loginForm, email: e.target.value })}
                    icon={IconMail}
                    focused={emailFocused}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    validation={validation.email}
                  />
                  
                  <PremiumInput
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={loginForm.password}
                    onChange={(e: any) => setLoginForm({ ...loginForm, password: e.target.value })}
                    icon={IconLock}
                    focused={passwordFocused}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    validation={validation.password}
                    showToggle={true}
                    onToggle={() => setShowPassword(!showPassword)}
                  />

                  <motion.button
                    type="submit"
                    disabled={isLoading || !validation.email.isValid || !validation.password.isValid}
                    className="w-full py-4 px-6 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold rounded-2xl shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center justify-center">
                      {isLoading ? (
                        <>
                          <motion.div 
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Signing in...
                        </>
                      ) : (
                        <>
                          Sign In
                          <IconArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </motion.button>
                </motion.form>
              )}

              {/* Register Form */}
              {!isLogin && (
                <motion.form 
                  onSubmit={handleRegister} 
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <PremiumInput
                    type="text"
                    placeholder="Full name"
                    value={registerForm.name}
                    onChange={(e: any) => setRegisterForm({ ...registerForm, name: e.target.value })}
                    icon={IconUser}
                    focused={nameFocused}
                    onFocus={() => setNameFocused(true)}
                    onBlur={() => setNameFocused(false)}
                    validation={validation.name}
                  />
                  
                  <PremiumInput
                    type="email"
                    placeholder="Email address"
                    value={registerForm.email}
                    onChange={(e: any) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    icon={IconMail}
                    focused={emailFocused}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    validation={validation.email}
                  />
                  
                  <PremiumInput
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={registerForm.password}
                    onChange={(e: any) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    icon={IconLock}
                    focused={passwordFocused}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    validation={validation.password}
                    showToggle={true}
                    onToggle={() => setShowPassword(!showPassword)}
                  />

                  {/* Avatar Color Selection */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Choose your color
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {avatarColors.map((color) => (
                        <motion.button
                          key={color}
                          type="button"
                          onClick={() => setRegisterForm({ ...registerForm, avatar_color: color })}
                          className={`w-12 h-12 rounded-xl transition-all duration-300 ${
                            registerForm.avatar_color === color
                              ? 'ring-2 ring-white ring-offset-2 ring-offset-transparent scale-110 shadow-lg'
                              : 'hover:scale-105'
                          }`}
                          style={{
                            background: `linear-gradient(135deg, var(--color-${color}-500), var(--color-${color}-600))`,
                          }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {registerForm.avatar_color === color && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="flex items-center justify-center h-full"
                            >
                              <IconCheck className="w-5 h-5 text-white" />
                            </motion.div>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={isLoading || !validation.email.isValid || !validation.password.isValid || !validation.name.isValid}
                    className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-2xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center justify-center">
                      {isLoading ? (
                        <>
                          <motion.div 
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Creating account...
                        </>
                      ) : (
                        <>
                          Create Account
                          <IconArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </motion.button>
                </motion.form>
              )}

              {/* Premium Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-8 pt-6 border-t border-white/10"
              >
                <div className="flex items-center justify-center space-x-1 text-sm text-gray-400">
                  <IconShield className="w-4 h-4" />
                  <span>Secured with enterprise-grade encryption</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
