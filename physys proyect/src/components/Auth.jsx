// src/components/Auth.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Auth = () => {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (isLogin) {
      await login(email, password);
    } else {
      const registroExitoso = await register(nombre, email, password);
      if (registroExitoso) {
        // SI EL REGISTRO FUE BIEN, VOLVEMOS AL LOGIN Y LIMPIAMOS LA CONTRASEÑA
        setIsLogin(true);
        setPassword('');
      }
    }
    
    setIsLoading(false);
  };

  return (
    <div className="flex justify-center items-center w-full py-12 animate-in fade-in zoom-in duration-500">
      <div className="w-full max-w-md p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl">
        
        <div className="text-center mb-8">
          <span className="text-5xl mb-4 block">{isLogin ? '🔐' : '🧬'}</span>
          <h2 className="text-3xl font-bold text-accent mb-2">
            {isLogin ? 'Enlace Neuronal' : 'Nuevo Perfil'}
          </h2>
          <p className="text-gray-400 text-sm">
            {isLogin ? 'Ingresa tus credenciales para acceder al sistema.' : 'Regístrate para comenzar tu optimización.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Nombre de Usuario</label>
              <input 
                type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                placeholder="Ej. Arquitecto Physis"
              />
            </div>
          )}
          
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Identificador (Email)</label>
            <input 
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Código de Acceso</label>
            <input 
              type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" disabled={isLoading}
            className="w-full bg-accent text-white font-bold rounded-xl px-4 py-3 mt-4 hover:shadow-[0_0_20px_var(--accent-primary)] hover:scale-[1.02] transition-all cursor-pointer disabled:opacity-50"
          >
            {isLoading ? 'Procesando...' : (isLogin ? 'Iniciar Sesión' : 'Crear Perfil')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            type="button" 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-gray-400 hover:text-accent transition-colors cursor-pointer"
          >
            {isLogin ? '¿No tienes una cuenta? Regístrate aquí.' : '¿Ya tienes perfil? Inicia sesión.'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Auth;