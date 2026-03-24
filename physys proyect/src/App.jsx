// src/App.jsx
import React from 'react';
import { Toaster } from 'sonner'; 
import PhysisAssistant from './components/PhysisAssistant';
import Navbar from './components/Navbar';
import BiologicalBackground from './components/BiologicalBackground';
import Dashboard from './components/Dashboard';
import Auth from './components/Auth';
import AdminDashboard from './components/AdminDashboard'; // Importamos el panel
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

  // --- EL SEMÁFORO DE ARQUITECTO (OPCIÓN A) ---
  // Función para decidir qué renderizar según el estado y rol
  const renderContenidoPrincipal = () => {
    if (!usuario) {
      return <Auth />; // Si no hay usuario, Login.
    }
    
    if (usuario.rol === 'admin') {
      return <AdminDashboard />; // Si es admin, Centro de Comando.
    }
    
    return <Dashboard />; // Si es usuario normal, Panel de Optimización.
  };

  return (
    <div className="min-h-screen font-sans relative overflow-hidden text-white">
      <BiologicalBackground />
      <Navbar />

      <main className="p-8 pt-32 relative z-10">
        <div className="mb-12 text-center md:text-left max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold text-accent mb-4 tracking-tight drop-shadow-md">Physis</h1>
          <p className="text-xl md:text-2xl font-light opacity-90">Sistema de Optimización del Potencial Humano.</p>
        </div>

        {/* Renderizamos dinámicamente el contenido */}
        {renderContenidoPrincipal()}

      </main>

      <Toaster position="top-right" richColors />
      {/* El Asistente IA solo es para usuarios normales (no para admins) */}
      {usuario && usuario.rol !== 'admin' && <PhysisAssistant />}
    </div>
  );
};

export default App;