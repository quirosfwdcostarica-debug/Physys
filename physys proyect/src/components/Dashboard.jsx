// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { 
  obtenerCategoriasAPI, 
  obtenerConsejoPorCategoriaAPI,
  obtenerMetasAPI,
  agregarMetaAPI,
  actualizarMetaAPI,
  eliminarMetaAPI
} from '../services/Fetch';
import { toast } from 'sonner';
import UserProfilePanel from './UserProfilePanel';
// 1. IMPORTAMOS EL TEMPORIZADOR
import FocusTimer from './FocusTimer';

const Dashboard = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [consejoActual, setConsejoActual] = useState(null);
  const [metas, setMetas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [dataCategorias, dataMetas] = await Promise.all([
          obtenerCategoriasAPI(),
          obtenerMetasAPI()
        ]);
        setCategorias(dataCategorias);
        setMetas(dataMetas);
      } catch (error) {
        toast.error("Error al sincronizar con la base de datos de Physis.");
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, []);

  const totalTareas = metas.length;
  const tareasCompletadas = metas.filter(meta => meta.completada).length;

  const manejarSeleccion = async (categoria) => {
    setCategoriaSeleccionada(categoria);
    setConsejoActual(null); 
    
    try {
      const consejo = await obtenerConsejoPorCategoriaAPI(categoria.id);
      
      if (consejo && consejo.texto) {
        setConsejoActual(consejo);
        toast.success(`Protocolo de ${categoria.nombre} cargado.`);
      } else {
        setConsejoActual({ texto: "Error de conexión: No se encontró el protocolo en la base de datos." });
        toast.error("Datos incompletos.");
      }
    } catch (error) {
      setConsejoActual({ texto: "Error crítico al contactar al servidor." });
      toast.error("No se pudo obtener el consejo del servidor.");
    }
  };

  const agregarProtocolo = async () => {
    if (!consejoActual || consejoActual.texto.includes("Error")) return;
    
    const nuevaMeta = {
      id: crypto.randomUUID(), 
      texto: consejoActual.texto,
      rubro: categoriaSeleccionada.rubro,
      icono: categoriaSeleccionada.icono,
      completada: false
    };

    try {
      const metaGuardada = await agregarMetaAPI(nuevaMeta);
      setMetas([...metas, metaGuardada]);
      toast.success("Protocolo integrado a tus Metas Activas.");
    } catch (error) {
      toast.error("No se pudo guardar el protocolo.");
    }
  };

  const toggleMeta = async (meta) => {
    try {
      const metaActualizada = await actualizarMetaAPI(meta.id, !meta.completada);
      setMetas(metas.map(m => m.id === meta.id ? metaActualizada : m));
      
      if (!meta.completada) {
        toast.success("¡Excelente! Protocolo cumplido. Tu nivel de optimización aumenta.");
      }
    } catch (error) {
      toast.error("Error al actualizar la meta.");
    }
  };

  const borrarMeta = async (id) => {
    try {
      await eliminarMetaAPI(id);
      setMetas(metas.filter(m => m.id !== id));
      toast.info("Protocolo descartado. Tus métricas se han ajustado.");
    } catch (error) {
      toast.error("Error al eliminar la meta.");
    }
  };

  if (cargando) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl font-medium animate-pulse text-accent">Sincronizando Red Neuronal de Evolución...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto pb-24">
      
      {/* --- SECCIÓN SUPERIOR: METRICAS Y TEMPORIZADOR --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4 text-accent">Nivel de Optimización Personal</h2>
          <UserProfilePanel totalTasks={totalTareas} completedTasks={tareasCompletadas} />
        </div>
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-bold mb-4 text-accent text-center lg:text-left">Módulo de Enfoque</h2>
          <FocusTimer />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-6 text-accent">Vectores de Optimización</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {categorias.map((cat) => (
          <button
            key={cat.id}
            onClick={() => manejarSeleccion(cat)}
            className={`flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-300 backdrop-blur-md text-left w-full cursor-pointer
              ${categoriaSeleccionada?.id === cat.id 
                ? 'border-accent bg-accent/20 shadow-[0_0_20px_rgba(var(--accent-primary-rgb),0.3)] transform scale-105' 
                : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30'
              }`}
          >
            <span className="text-5xl mb-4">{cat.icono}</span>
            <h3 className="text-lg font-bold mb-2 w-full text-center tracking-tight">{cat.nombre}</h3>
            <p className="text-xs opacity-70 text-center">{cat.descripcion}</p>
          </button>
        ))}
      </div>

      {categoriaSeleccionada && (
        <div className="mt-8 p-8 rounded-3xl border border-accent/30 bg-black/50 backdrop-blur-xl transition-all duration-500">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <span className="text-3xl">{categoriaSeleccionada.icono}</span>
              <h3 className="text-2xl font-bold text-accent">Análisis: {categoriaSeleccionada.rubro}</h3>
            </div>
            
            {consejoActual && !consejoActual.texto.includes("Error") && (
              <button 
                onClick={agregarProtocolo}
                className="bg-accent text-white px-4 py-2 rounded-lg font-bold hover:bg-white hover:text-accent transition-colors shadow-lg cursor-pointer"
              >
                + Integrar Protocolo
              </button>
            )}
          </div>
          
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 relative overflow-hidden">
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

      {metas.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-accent">Protocolos Activos</h2>
          <div className="space-y-4">
            {metas.map((meta) => (
              <div 
                key={meta.id} 
                className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 backdrop-blur-sm
                  ${meta.completada ? 'bg-green-900/20 border-green-500/30' : 'bg-black/40 border-white/10 hover:border-accent/50'}
                `}
              >
                <div className="flex items-center gap-4">
                  <input 
                    type="checkbox" 
                    checked={meta.completada}
                    onChange={() => toggleMeta(meta)}
                    className="w-6 h-6 rounded border-white/30 text-accent focus:ring-accent cursor-pointer accent-current text-accent"
                  />
                  <span className="text-2xl">{meta.icono}</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-wider text-accent/80">{meta.rubro}</span>
                    <span className={`text-lg transition-all duration-300 ${meta.completada ? 'line-through text-gray-500' : 'text-gray-100'}`}>
                      {meta.texto}
                    </span>
                  </div>
                </div>
                
                <button 
                  onClick={() => borrarMeta(meta.id)}
                  className="text-gray-500 hover:text-red-500 transition-colors p-2 cursor-pointer"
                  title="Descartar Protocolo"
                >
                  ✖
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;