import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'sonner'; 
import PhysisAssistant from './components/PhysisAssistant';
import Navbar from './components/Navbar'; // <-- 1. Importamos la Navbar
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="min-h-screen bg-[#fdf5f8] text-[#3D1B5D] font-sans">
      
      {/* 2. Inyectamos la Navbar aquí arriba */}
      <Navbar />

      {/* Contenido Principal (le agregamos pt-32 para que la Navbar no tape el título) */}
      <main className="p-8 pt-32">
        <h1 className="text-4xl font-bold text-[#D5006D]">Physis</h1>
        <p className="mt-2 text-lg">Sistema de Optimización del Potencial Humano.</p>

        {/* CONTENEDOR FALSO PARA PROBAR EL SCROLL */}
        <div className="mt-12 flex h-[200vh] items-start justify-center rounded-2xl border-2 border-dashed border-[#3D1B5D]/20 p-8 text-[#3D1B5D]/60">
          <p className="text-center font-medium">
            Haz scroll hacia abajo para esconder la Navbar. 👇 <br /> 
            Haz un mínimo movimiento hacia arriba para que reaparezca. 👆
          </p>
        </div>
      </main>

      <Toaster position="top-right" richColors />
      <PhysisAssistant />
      
    </div>
  </React.StrictMode>,
);