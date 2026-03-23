import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'sonner'; 
import PhysisAssistant from './components/PhysisAssistant';
import Navbar from './components/Navbar';
import './styles/index.css';
import './styles/themes.css'; // <-- 1. IMPORTAMOS LOS TEMAS GLOBALES

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Quitamos bg-[#fdf5f8] porque themes.css ahora controla el fondo */}
    <div className="min-h-screen font-sans">
      
      <Navbar />

      <main className="p-8 pt-32">
        {/* Usamos text-accent para que el color cambie con el tema */}
        <h1 className="text-4xl font-bold text-accent">Physis</h1>
        <p className="mt-2 text-lg">Sistema de Optimización del Potencial Humano.</p>

        <div className="mt-12 flex h-[200vh] items-start justify-center rounded-2xl border-2 border-dashed border-gray-400/30 p-8">
          <p className="text-center font-medium">
            Prueba elegir "Tema: Bioluminiscente" o "Sintético". 👇 <br /> 
            Verás que el logo y este texto cambian, al igual que el fondo general. 👆
          </p>
        </div>
      </main>

      <Toaster position="top-right" richColors />
      <PhysisAssistant />
      
    </div>
  </React.StrictMode>,
);