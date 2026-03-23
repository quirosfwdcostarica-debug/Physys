import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner'; // Importamos Sonner para las alertas de Physis

/**
 * PHYSIS_KNOWLEDGE_BASE
 * Lógica Local (IQ 300). Base de datos autocontenida para ejecución pura en cliente.
 * Restricciones de Contexto aplicadas.
 */
const PHYSIS_KNOWLEDGE_BASE = [
  {
    keywords: ["rutina", "ciclo", "mañana", "noche", "habito"],
    topic: "Sistemas de Rutinas",
    response: "La optimización de tus ciclos diarios no es negociable. Sugiero analizar tus picos de energía biométrica para asignar las tareas de alta carga cognitiva. Reestructura tu 'Morning Ritual' para priorizar la hidratación celular y el enfoque neuronal antes de la estimulación externa."
  },
  {
    keywords: ["meta", "escalada", "limite", "climbing", "lograr"],
    topic: "Metas de Escalada (Climbing Goals)",
    response: "Visualiza tu meta no como un punto final, sino como una adaptación biológica necesaria. Para superar tu límite actual, debemos aplicar un 'estrés progresivo' calculado en tus acciones diarias. Divide la escalada en micro-adaptaciones sostenibles."
  },
  {
    keywords: ["biometria", "evolucion", "datos", "analisis", "progreso"],
    topic: "Análisis Biométrico Simulado",
    response: "Interpretando tus datos de evolución... Detecto una latencia en tu recuperación adaptativa. Tu índice de consistencia ha subido un 12%, pero la intensidad fluctúa. Necesitamos estabilizar la homeostasis del sistema antes de la próxima fase de expansión."
  },
  {
    keywords: ["filosofia", "physis", "que es", "diseño"],
    topic: "Filosofia Physis",
    response: "Physis es la fuerza inherente de la naturaleza que impulsa el crecimiento. No somos una agenda; somos un sistema de optimización del potencial humano. Nuestra ética dicta que el diseño debe ser minimalista para reducir la carga cognitiva y potenciar la ejecución orgánica."
  },
  {
    keywords: ["energia", "enfoque", "cansado", "tiempo", "gestión"],
    topic: "Gestión de Energía",
    response: "El tiempo es una métrica lineal irrelevante si tu energía colapsa. Protege tu enfoque como tu recurso biológico más preciado. Implementa bloques de 'Deep Work' alineados con tus ritmos circadianos y elimina los parásitos atencionales inmediatamente."
  }
];

// Respuesta por defecto para consultas ajenas al protocolo
const RESPUESTA_FUERA_DE_PROTOCOLO = "Esa consulta diverge del protocolo de optimización de Physis. Enfoquémonos en tu evolución actual.";

const PhysisAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Sintetizando entorno... Asistente Physis activo. ¿En qué área de tu evolución focalizaremos el análisis hoy?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Lógica de filtrado inteligente (iq 300 local)
  const getBotResponse = (userInput) => {
    const inputLimpio = userInput.toLowerCase().trim();
    
    // Buscamos si alguna palabra clave coincide
    const conocimientoEncontrado = PHYSIS_KNOWLEDGE_BASE.find(item => 
      item.keywords.some(keyword => inputLimpio.includes(keyword))
    );

    if (conocimientoEncontrado) {
      return conocimientoEncontrado.response;
    } else {
      return RESPUESTA_FUERA_DE_PROTOCOLO;
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // 1. Mensaje del Usuario
    const userMessage = { role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // 2. Simular procesamiento y respuesta del Bot
    // Usamos toast para notificar que el bot está analizando (ux profesional)
    toast.info("Sintetizando respuesta biométrica...", { duration: 1000 });

    setTimeout(() => {
      const botResponseText = getBotResponse(userMessage.text);
      const botMessage = { role: 'bot', text: botResponseText };
      setMessages(prev => [...prev, botMessage]);
    }, 1200);
  };

  return (
    <>
      {/* Activador Orgánico (Botón Flotante) 
          Estilos: Gradiente específico, shadow, smooth scale en hover
      */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full 
                   bg-linear-to-br from-[#3D1B5D] to-[#D5006D] text-white shadow-2xl 
                   transition-all duration-300 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#D5006D] focus:ring-offset-2"
        aria-label="Activar Asistente Physis"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 002.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
      </button>

      {/* Interfaz de Síntesis (Panel del Chat)
          Estilos: Glassmorphism puro v4 (backdrop-blur, fondo translucido rosa pálido, borde fino)
          Animación: Slide-up suave con CSS transitions
      */}
      <div
        className={`fixed bottom-28 right-6 z-50 flex h-[500px] w-[380px] flex-col overflow-hidden rounded-2xl 
                   border border-white/20 shadow-3xl transition-all duration-500 ease-in-out
                   ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}
        style={{
          // Fondo: Rosa Pálido Translúcido (#D5006D a baja opacidad sobre el fondo blurreado)
          backgroundColor: 'rgba(213, 0, 109, 0.05)',
          backdropFilter: 'blur(16px)',
        }}
      >
        {/* Header del Asistente */}
        <div className="flex items-center justify-between border-b border-white/10 bg-[#3D1B5D]/20 p-4">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-[#D5006D] animate-pulse"></div>
            <h2 className="text-lg font-semibold text-[#3D1B5D]">Estratega de Evolución</h2>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-[#3D1B5D] hover:text-[#D5006D]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Message Bubbles (Estado Persistente de la sesión) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] rounded-xl px-4 py-2 text-sm shadow-md 
                           ${msg.role === 'user' 
                             ? 'bg-white text-[#3D1B5D] rounded-br-none' 
                             : 'bg-linear-to-br from-[#3D1B5D]/90 to-[#3D1B5D] text-white/90 rounded-bl-none'}`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSendMessage} className="border-t border-white/10 p-3 bg-white/5 flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Analizar siguiente micro-adaptación..."
            className="flex-1 rounded-full bg-white/50 border border-white/20 px-4 py-2 text-sm text-[#3D1B5D] placeholder:text-[#3D1B5D]/60 focus:outline-none focus:ring-1 focus:ring-[#D5006D]"
          />
          <button
            type="submit"
            className="rounded-full bg-[#3D1B5D] p-2 text-white hover:bg-[#D5006D] transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.874L6 12zm0 0l7.5 0" />
            </svg>
          </button>
        </form>
      </div>
    </>
  );
};

export default PhysisAssistant;