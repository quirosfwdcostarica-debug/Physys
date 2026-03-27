// src/App.jsx
import React, { useState } from 'react';
import { Toaster } from 'sonner';
import PhysisAssistant from './components/PhysisAssistant';
import Navbar from './components/Navbar';
import BiologicalBackground from './components/BiologicalBackground';
import Dashboard from './components/Dashboard';
import Auth from './components/Auth';
import AdminDashboard from './components/AdminDashboard';
import Home from './pages/Home';
import { useAuth } from './context/AuthContext';


function Rutas() {
    const { usuario, cargandoAuth } = useAuth();
    const [mostrarHome, setMostrarHome] = useState(true);

    if (cargandoAuth) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <p className="text-xl font-medium animate-pulse text-accent">Sincronizando Módulos de Memoria...</p>
            </div>
        );
    }

    return(
        <div className="min-h-screen font-sans relative overflow-x-hidden text-white w-full bg-[#0a0a0a]">
      
      {/* CAPA 1: Fondo Biológico Reactivado */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <BiologicalBackground />
      </div>

      {/* CAPA 2: Navegación Interna (Solo si estás logueado) */}
      {usuario && <Navbar />}

      {/* CAPA 3: Contenido Principal */}
      <main className={`relative z-10 w-full max-w-[100vw] overflow-x-hidden ${usuario ? 'p-4 pt-24 md:p-8 md:pt-32' : ''}`}>
        
        {!usuario ? (
          // RUTA PÚBLICA
          mostrarHome ? (
            <Home onGoToAuth={() => setMostrarHome(false)} />
          ) : (
            <div className="relative z-20 w-full pt-16 md:pt-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <button 
                onClick={() => setMostrarHome(true)} 
                className="absolute top-4 left-4 md:left-8 text-white hover:text-accent font-bold cursor-pointer bg-black/60 p-2 px-4 rounded-xl border border-white/10 transition-colors z-50 backdrop-blur-md"
              >
                ← Volver al Inicio
              </button>
              <Auth />
            </div>
          )
        ) : (
          // RUTA PRIVADA (Logueado)
          <div className="w-full max-w-6xl mx-auto">
            <div className="mb-8 md:mb-12 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-accent mb-2 md:mb-4 tracking-tight drop-shadow-md">
                Physis
              </h1>
              <p className="text-base md:text-xl lg:text-2xl font-light opacity-90 px-2 md:px-0">
                Sistema de Optimización del Potencial Humano.
              </p>
            </div>
            {usuario.rol === 'admin' ? <AdminDashboard /> : <Dashboard />}
          </div>
        )}

      </main>

      {/* CAPA 4: Herramientas Globales */}
      <Toaster position="top-right" richColors theme="dark" />
      {usuario && usuario.rol !== 'admin' && <PhysisAssistant />}
      
    </div>
    )
}
export default Rutas;