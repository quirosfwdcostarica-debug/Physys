// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'sonner'; 
import PhysisAssistant from './components/PhysisAssistant';
import Navbar from './components/Navbar';
// 1. IMPORTAMOS EL NUEVO COMPONENTE DE FONDO
import BiologicalBackground from './components/BiologicalBackground';
import './styles/index.css';
import './styles/themes.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="min-h-screen font-sans relative overflow-hidden">
      
      {/* 2. INYECTAMOS EL FONDO DINÁMICO AQUÍ, DETRÁS DE TODO */}
      <BiologicalBackground />

      <Navbar />

      <main className="p-8 pt-32 relative z-10">
        <h1 className="text-4xl font-bold text-accent">Physis</h1>
        <p className="mt-2 text-lg">Sistema de Optimización del Potencial Humano.</p>

        {/* Contenedor Falso para Scroll (solo para pruebas) */}
        <div className="mt-12 flex h-[200vh] items-start justify-center rounded-2xl border-2 border-dashed border-gray-400/30 p-8 relative z-20">
          <p className="text-center font-medium">
            Prueba cambiar los temas y activar el Dark Mode. 👇 <br /> 
            Verás cómo la red biológica de fondo cambia de color suavemente. 👆
          </p>
        </div>
      </main>

      <Toaster position="top-right" richColors />
      <PhysisAssistant />
      
    </div>
  </React.StrictMode>,
);