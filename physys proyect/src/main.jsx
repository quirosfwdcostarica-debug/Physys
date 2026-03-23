import React from 'react';
import { Toaster } from 'sonner'; // Importamos el proveedor de alertas profesionales
import PhysisAssistant from './components/PhysisAssistant';
import './styles/App.css'; // Asegúrate de haber movido el archivo

function App() {
  return (
    <div className="min-h-screen bg-[#fdf5f8] text-[#3D1B5D] font-sans">
      {/* Aquí irá el Routing de tus páginas en el futuro.
        Por ahora, dejamos un contenedor base para probar.
      */}
      <main className="p-8">
        <h1 className="text-4xl font-bold text-[#D5006D]">Physis</h1>
        <p className="mt-2 text-lg">Sistema de Optimización del Potencial Humano.</p>
      </main>

      {/* Proveedor Global de Notificaciones (Sonner) */}
      <Toaster position="top-right" richColors />

      {/* Nodo del Asistente (Global) */}
      <PhysisAssistant />
    </div>
  );
}

export default App;