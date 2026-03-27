// src/App.jsx
import React from 'react';
import { Toaster } from 'sonner'; 
import PhysisAssistant from './components/PhysisAssistant';
import Navbar from './components/Navbar';
import BiologicalBackground from './components/BiologicalBackground';
import Dashboard from './components/Dashboard';
import Auth from './components/Auth';
import AdminDashboard from './components/AdminDashboard'; 
import FeedbackForm from './components/FeedbackForm';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { usuario, cargandoAuth } = useAuth();

  if (cargandoAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <p className="text-xl font-medium animate-pulse text-accent">Sincronizando Módulos de Memoria...</p>
      </div>
    );
  }

  const renderContenidoPrincipal = () => {
    if (!usuario) return <Auth />; 
    if (usuario.rol === 'admin') return <AdminDashboard />; 
    return <Dashboard />; 
  };

  return (
    <div className="min-h-screen font-sans relative overflow-x-hidden text-white w-full">
      <BiologicalBackground />
      <Navbar />

      {/* AJUSTE MÓVIL: Padding reducido en celulares (p-4 pt-24) y amplio en PC (md:p-8 md:pt-32) */}
      <main className="p-4 pt-24 md:p-8 md:pt-32 relative z-10 w-full max-w-[100vw] overflow-x-hidden">
        <div className="mb-8 md:mb-12 text-center md:text-left max-w-6xl mx-auto">
          {/* AJUSTE MÓVIL: Títulos fluidos (text-4xl a text-6xl) */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-accent mb-2 md:mb-4 tracking-tight drop-shadow-md">
            Physis
          </h1>
          <p className="text-base md:text-xl lg:text-2xl font-light opacity-90 px-2 md:px-0">
            Sistema de Optimización del Potencial Humano.
          </p>
        </div>

        {renderContenidoPrincipal()}

      </main>

      <Toaster position="top-right" richColors />
      {usuario && usuario.rol !== 'admin' && <PhysisAssistant />}
    </div>
  );
};

export default App;