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
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import UserProfilePanel from './UserProfilePanel';
import FocusTimer from './FocusTimer';

const Dashboard = () => {
  const { usuario } = useAuth();
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
          obtenerMetasAPI(usuario.id) 
        ]);
        setCategorias(dataCategorias);
        setMetas(dataMetas);
      } catch (error) {
        toast.error("Error al sincronizar con la base de datos.");
      } finally {
        setCargando(false);
      }
    };
    if(usuario) cargarDatos();
  }, [usuario]);

  const totalTareas = metas.length;
  const tareasCompletadas = metas.filter(meta => meta.completada).length;

  // Función para determinar qué imagen mostrar
  const getBackgroundImage = (cat) => {
    if (cat.imagen) return cat.imagen; // Si el admin sube una propia
    // Imágenes estéticas por defecto basadas en la clave
    switch (cat.icono) {
      case 'muscle': return 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop';
      case 'brain': return 'https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=1470&auto=format&fit=crop';
      case 'zen': return 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=1470&auto=format&fit=crop';
      case 'gear': return 'https://images.unsplash.com/photo-1635048424329-a9bfb104d581?q=80&w=1470&auto=format&fit=crop';
      default: return 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1364&auto=format&fit=crop';
    }
  };

  const manejarSeleccion = async (categoria) => {
    setCategoriaSeleccionada(categoria);
    setConsejoActual(null); 
    try {
      const consejo = await obtenerConsejoPorCategoriaAPI(categoria.id);
      if (consejo && consejo.texto) {
        setConsejoActual(consejo);
        toast.success(`Protocolo de ${categoria.nombre} cargado.`);
      } else {
        setConsejoActual({ texto: "Sin directrices detectadas en el sistema." });
      }
    } catch (error) {
      toast.error("Error al obtener la directriz.");
    }
  };

  const agregarProtocolo = async () => {
    if (!consejoActual || consejoActual.texto.includes("Sin directrices")) return;
    const nuevaMeta = {
      id: crypto.randomUUID(), 
      userId: usuario.id,
      texto: consejoActual.texto,
      rubro: categoriaSeleccionada.rubro,
      icono: categoriaSeleccionada.icono, // Guardamos la clave
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
      if (!meta.completada) toast.success("¡Protocolo cumplido!");
    } catch (error) { toast.error("Error al actualizar."); }
  };

  const borrarMeta = async (id) => {
    try {
      await eliminarMetaAPI(id);
      setMetas(metas.filter(m => m.id !== id));
      toast.info("Protocolo descartado.");
    } catch (error) { toast.error("Error al eliminar."); }
  };

  if (cargando) return <div className="h-64 flex justify-center items-center"><p className="text-xl animate-pulse text-accent">Sincronizando Módulos Visuales...</p></div>;

  return (
    <div className="w-full max-w-6xl mx-auto pb-24 animate-in fade-in duration-700">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {categorias.map((cat) => (
          <button 
            key={cat.id} 
            onClick={() => manejarSeleccion(cat)} 
            className={`relative overflow-hidden flex flex-col items-center justify-end p-6 rounded-3xl border transition-all duration-500 text-left w-full h-56 cursor-pointer group
              ${categoriaSeleccionada?.id === cat.id 
                ? 'border-accent shadow-[0_0_25px_rgba(var(--accent-primary-rgb),0.5)] transform scale-105 ring-2 ring-accent/50' 
                : 'border-white/10 hover:border-accent/40 hover:-translate-y-1 shadow-lg'
              }`}
          >
            {/* Imagen de Fondo Rica */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-90"
              style={{ backgroundImage: `url(${getBackgroundImage(cat)})` }}
            />
            {/* Gradiente para que el texto sea legible */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            
            {/* Contenido (Texto) */}
            <div className="relative z-10 w-full flex flex-col items-center translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-lg font-bold mb-1 w-full text-center tracking-tight text-white drop-shadow-md">{cat.nombre}</h3>
              <p className="text-xs text-gray-300 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2">{cat.descripcion}</p>
            </div>
          </button>
        ))}
      </div>

      {categoriaSeleccionada && (
        <div className="mt-8 p-8 rounded-3xl border border-accent/30 bg-black/60 backdrop-blur-2xl transition-all duration-500 animate-in slide-in-from-bottom-4 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-accent animate-pulse shadow-[0_0_10px_var(--accent-primary)]"></span>
              Análisis: <span className="text-accent">{categoriaSeleccionada.rubro}</span>
            </h3>
            {consejoActual && !consejoActual.texto.includes("Sin directrices") && (
              <button onClick={agregarProtocolo} className="bg-accent/20 border border-accent/50 text-accent px-5 py-2.5 rounded-xl font-bold hover:bg-accent hover:text-white transition-all cursor-pointer shadow-[0_0_15px_rgba(var(--accent-primary-rgb),0.2)] hover:shadow-[0_0_25px_rgba(var(--accent-primary-rgb),0.6)]">
                + Integrar Protocolo
              </button>
            )}
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 relative overflow-hidden">
            <div className="absolute left-0 top-0 w-1.5 h-full bg-gradient-to-b from-accent to-transparent"></div>
            {consejoActual ? (
              <p className="text-lg leading-relaxed text-gray-200 ml-2">
                <span className="font-bold text-accent mr-2 uppercase tracking-widest text-sm">Directriz:</span>
                {consejoActual.texto}
              </p>
            ) : (<p className="text-lg text-gray-400 animate-pulse ml-2">Analizando variables bio-métricas...</p>)}
          </div>
        </div>
      )}

      {metas.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-accent">Protocolos Activos</h2>
          <div className="space-y-4">
            {metas.map((meta) => (
              <div key={meta.id} className={`flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 backdrop-blur-md shadow-lg ${meta.completada ? 'bg-green-900/10 border-green-500/30' : 'bg-black/50 border-white/10 hover:border-accent/40'}`}>
                <div className="flex items-center gap-5">
                  {/* Custom Checkbox Bio-Tech */}
                  <div className="relative flex items-center justify-center">
                    <input type="checkbox" checked={meta.completada} onChange={() => toggleMeta(meta)} className="peer relative appearance-none w-6 h-6 border-2 border-white/30 rounded-full bg-transparent cursor-pointer checked:border-accent checked:bg-accent/20 transition-all" />
                    <span className="absolute text-accent opacity-0 peer-checked:opacity-100 pointer-events-none text-sm font-bold">✓</span>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-accent/80 mb-1">{meta.rubro}</span>
                    <span className={`text-lg transition-all duration-300 ${meta.completada ? 'line-through text-gray-600' : 'text-gray-100'}`}>{meta.texto}</span>
                  </div>
                </div>
                <button onClick={() => borrarMeta(meta.id)} className="text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-full w-8 h-8 flex items-center justify-center transition-colors cursor-pointer">✖</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;