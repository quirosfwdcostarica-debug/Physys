import React from 'react';
import '../styles/BiologicalBackground.css';

// Importamos el video directamente
import videoFondo from '../assets/video/fondo-animado.mp4';

const BiologicalBackground = () => {
  return (
    <div className="biological-bg-layer">
      {/* Etiqueta de video en bucle infinito */}
      <video 
        className="biological-video" 
        autoPlay 
        loop 
        muted 
        playsInline
      >
        <source src={videoFondo} type="video/mp4" />
        Tu navegador no soporta videos HTML5.
      </video>

      {/* Capa invisible que inyecta el color del tema sobre el video */}
      <div className="biological-color-overlay"></div>
    </div>
  );
};

export default BiologicalBackground;