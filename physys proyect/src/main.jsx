// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'sonner'; 
import PhysisAssistant from './components/PhysisAssistant';
import Navbar from './components/Navbar';
import BiologicalBackground from './components/BiologicalBackground';
// 1. IMPORTAMOS EL DASHBOARD
import Dashboard from './components/Dashboard';

import './styles/index.css';
import './styles/themes.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="min-h-screen font-sans relative overflow-hidden text-white">
      
      {/* El fondo de video animado infinito */}
      <BiologicalBackground />

      <Navbar />

      <main className="p-8 pt-32 relative z-10">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold text-accent mb-4 tracking-tight drop-shadow-md">Physis</h1>
          <p className="text-xl md:text-2xl font-light opacity-90">Sistema de Optimización del Potencial Humano.</p>
        </div>

        {/* 2. AQUÍ INYECTAMOS TU NUEVO MOTOR DE DATOS */}
        <Dashboard />

      </main>

      <Toaster position="top-right" richColors />
      <PhysisAssistant />
      
    </div>
  </React.StrictMode>,
); 