// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { obtenerCategoriasAPI, obtenerConsejoPorCategoriaAPI } from '../services/Fetch';
import { toast } from 'sonner';

const Dashboard = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [consejoActual, setConsejoActual] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Cargar las categorías al iniciar el componente
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const data = await obtenerCategoriasAPI();
        setCategorias(data);
      } catch (error) {
        toast.error("Error al sincronizar con la base de datos de Physis.");
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, []);

  // Manejar el clic en una tarjeta
  const manejarSeleccion = async (categoria) => {
    setCategoriaSeleccionada(categoria);
    setConsejoActual(null); // Limpiar el consejo anterior mientras carga el nuevo
    
    try {
      const consejo = await obtenerConsejoPorCategoriaAPI(categoria.id);
      if (consejo) {
        setConsejoActual(consejo);
        toast.success(`Protocolo ${categoria.nombre} activado.`);
      } else {
        toast.info("No hay consejos disponibles para este rubro aún.");
      }
    } catch (error) {
      toast.error("No se pudo obtener el consejo del servidor.");
    }
  };

  if (cargando) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl font-medium animate-pulse text-accent">Sincronizando Sistemas...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      
      {/* Sección de Tarjetas (Grid) */}
      <h2 className="text-2xl font-bold mb-6 text-accent">Vectores de Optimización</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categorias.map((cat) => (
          <button
            key={cat.id}
            onClick={() => manejarSeleccion(cat)}
            className={`flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-300 backdrop-blur-md text-left w-full
              ${categoriaSeleccionada?.id === cat.id 
                ? 'border-accent bg-accent/20 shadow-[0_0_20px_rgba(var(--accent-primary-rgb),0.3)] transform scale-105' 
                : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30'
              }`}
          >
            <span className="text-5xl mb-4">{cat.icono}</span>
            <h3 className="text-lg font-bold mb-2 w-full text-center">{cat.nombre}</h3>
            <p className="text-xs opacity-70 text-center">{cat.descripcion}</p>
          </button>
        ))}
      </div>

      {/* Sección de Análisis / Consejo (Aparece al seleccionar una tarjeta) */}
      {categoriaSeleccionada && (
        <div className="mt-12 p-8 rounded-3xl border border-accent/30 bg-black/40 backdrop-blur-xl transition-all duration-500 animate-in fade-in slide-in-from-bottom-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-3xl">{categoriaSeleccionada.icono}</span>
            <h3 className="text-2xl font-bold text-accent">Análisis: {categoriaSeleccionada.rubro}</h3>
          </div>
          
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 relative overflow-hidden">
             {/* Un pequeño toque visual de "escaneo" */}
            <div className="absolute top-0 left-0 w-1 h-full bg-accent animate-pulse"></div>
            
            {consejoActual ? (
              <p className="text-lg leading-relaxed text-gray-200">
                <span className="font-bold text-accent mr-2">DIRECTRIZ:</span>
                {consejoActual.texto}
              </p>
            ) : (
              <p className="text-lg leading-relaxed text-gray-400 animate-pulse">Analizando variables bio-métricas...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;