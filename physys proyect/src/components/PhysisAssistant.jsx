// src/components/PhysisAssistant.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const PhysisAssistant = () => {
  const { usuario } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  
  // Estado inicial vacío, se llena en el useEffect
  const [messages, setMessages] = useState([]);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // --- DETECTOR DE BUENOS DÍAS ---
  useEffect(() => {
    if (!usuario) return;

    const nombreUsuario = usuario.nombre ? usuario.nombre.split(' ')[0] : 'colega';
    const hoy = new Date().toLocaleDateString();
    const ultimoSaludo = localStorage.getItem('physis_ultimo_saludo');

    if (ultimoSaludo !== hoy) {
      // Es el primer login del día
      setMessages([
        { sender: 'ai', text: `¡Buenos días, ${nombreUsuario}! Qué gusto verte por aquí hoy. ¿Cómo te sientes para empezar con tus metas? Recuerda que dar el primer paso es la mitad del trabajo.` }
      ]);
      setIsOpen(true); // Abrir el chat automáticamente
      localStorage.setItem('physis_ultimo_saludo', hoy);
    } else if (messages.length === 0) {
      // Si ya saludó pero recargas la página
      setMessages([
        { sender: 'ai', text: `¡Hola de nuevo, ${nombreUsuario}! Estoy aquí si necesitas un consejo, ayuda con la app o un poco de motivación.` }
      ]);
    }
  }, [usuario]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputValue('');
    setIsTyping(true);

    // --- CEREBRO DE COACHING Y MANUAL DE LA APP ---
    setTimeout(() => {
      let aiResponse = "Ese es un punto muy interesante. Cuéntame un poco más para poder darte el mejor enfoque posible.";
      const input = userText.toLowerCase();
      
      // 1. MOTIVACIÓN Y EMOCIONES
      if (input.includes('cansado') || input.includes('fatiga') || input.includes('sin energia')) {
        aiResponse = "Te entiendo perfectamente, todos tenemos días así. No te exijas al 100% hoy. Te sugiero tomar mucha agua, hacer solo las tareas más críticas de tu panel y descansar temprano. Escuchar a tu cuerpo también es ser productivo.";
      } else if (input.includes('triste') || input.includes('mal') || input.includes('deprimido')) {
        aiResponse = "Siento mucho que te sientas así. A veces la mejor 'optimización' es ser amable contigo mismo. Sal a caminar unos 15 minutos sin el teléfono, respira aire fresco. Las tareas pueden esperar un poco.";
      } else if (input.includes('procrastinando') || input.includes('pereza') || input.includes('no quiero')) {
        aiResponse = "La fricción de empezar es lo peor. Hagamos un trato: abre el Módulo de Enfoque (el reloj que está en el panel), ponlo en solo 5 minutos y haz la tarea más fácil que tengas. Si después de 5 minutos quieres parar, paras. ¿Te animas?";
      } 
      // 2. SALUD Y FITNESS
      else if (input.includes('entrenar') || input.includes('gimnasio') || input.includes('ejercicio')) {
        aiResponse = "¡Excelente iniciativa! Si vas a entrenar fuerza, recuerda que la técnica y descansar bien entre series importa más que levantar súper pesado. Asegúrate de comer algo de proteína después para recuperarte.";
      } else if (input.includes('comer') || input.includes('dieta') || input.includes('nutricion')) {
        aiResponse = "El mejor consejo nutricional es el que puedes mantener a largo plazo. Prioriza alimentos de un solo ingrediente (carnes, huevos, vegetales, frutas) e intenta que tu última comida sea unas 2 o 3 horas antes de dormir para descansar mejor.";
      }
      // 3. FINANZAS Y TRABAJO
      else if (input.includes('dinero') || input.includes('finanzas') || input.includes('ahorrar')) {
        aiResponse = "Las finanzas pueden ser estresantes. La regla de oro es pagarte a ti mismo primero: en cuanto recibas dinero, separa un pequeño porcentaje al ahorro antes de gastar en nada más. Automatiza ese proceso si es posible.";
      } else if (input.includes('estudiar') || input.includes('aprender') || input.includes('trabajar')) {
        aiResponse = "Para trabajo profundo, el Módulo de Enfoque es tu mejor amigo. Apaga las notificaciones de tu teléfono, ponlo en otra habitación si puedes, e intenta hacer bloques de 45 a 90 minutos de trabajo puro.";
      }
      // 4. MANUAL DE LA APLICACIÓN (CÓMO USAR PHYSIS)
      else if (input.includes('diagnostico') || input.includes('plan') || input.includes('pasos')) {
        aiResponse = "El túnel de diagnóstico que hiciste al principio nos sirvió para crear tu 'Protocolo Diario'. Son esas 5 tareas que ves en tu panel. Mi sugerencia es que trates de completar las 5 todos los días. Al marcarlas, verás cómo sube tu gráfico circular de optimización.";
      } else if (input.includes('reloj') || input.includes('pomodoro') || input.includes('temporizador')) {
        aiResponse = "¡Ah! Ese es el Módulo de Enfoque. Úsalo cuando necesites trabajar sin distracciones. Por defecto está en 25 minutos de trabajo (Enfoque) y 5 de descanso (Reposo). Presiona 'Play' y concéntrate solo en una tarea a la vez.";
      } else if (input.includes('tema') || input.includes('color') || input.includes('oscuro')) {
        aiResponse = "¡Puedes personalizar casi todo! Arriba en el menú (Navbar) tienes un botón con un icono de paleta de colores para cambiar el tema visual. También está el botón de la luna/sol para el modo oscuro, y en el engranaje puedes ajustar qué tan transparente quieres que sea el panel (el cristal).";
      } else if (input.includes('gracias') || input.includes('genial')) {
        aiResponse = "¡Con mucho gusto! Estoy aquí para apoyarte en tu proceso. ¡A darle con todo!";
      }

      setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      
      {/* --- VENTANA DEL CHAT --- */}
      {isOpen && (
        <div className="mb-4 w-[90vw] sm:w-96 h-[30rem] flex flex-col rounded-3xl border border-accent/30 bg-black/80 backdrop-blur-2xl shadow-2xl overflow-hidden transition-all duration-300 animate-in slide-in-from-bottom-10 fade-in">
          
          {/* Cabecera del Chat */}
          <div className="bg-accent/20 border-b border-accent/20 p-4 flex justify-between items-center backdrop-blur-md">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center border border-accent/50">
                <span className="text-xl">🧑‍🏫</span>
              </div>
              <div>
                <h3 className="font-bold text-accent tracking-wide text-sm leading-tight">Physis Coach</h3>
                <p className="text-[10px] text-gray-400">En línea y listo para ayudar</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors cursor-pointer p-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Área de Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans scrollbar-hide">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl p-3.5 text-sm leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-accent text-white rounded-tr-sm shadow-md' 
                    : 'bg-white/10 border border-white/10 text-gray-200 rounded-tl-sm shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {/* Animación "Escribiendo..." */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 text-gray-400 rounded-2xl rounded-tl-sm p-4 text-sm flex gap-1.5 items-center">
                  <span className="w-2 h-2 bg-accent/70 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-accent/70 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                  <span className="w-2 h-2 bg-accent/70 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input para Escribir */}
          <form onSubmit={handleSend} className="p-3 border-t border-white/10 bg-black/50">
            <div className="relative flex items-center">
              <input 
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Pregúntame lo que necesites..."
                className="w-full bg-white/5 border border-white/10 rounded-full py-3.5 pl-4 pr-12 text-sm text-white placeholder-white/40 focus:outline-none focus:border-accent/50 transition-colors"
              />
              <button 
                type="submit" 
                disabled={!inputValue.trim()}
                className="absolute right-2 p-2 bg-accent text-white rounded-full hover:bg-white hover:text-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" /></svg>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* --- BOTÓN FLOTANTE --- */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-14 h-14 rounded-full shadow-[0_0_20px_rgba(var(--accent-primary-rgb),0.5)] transition-all duration-300 hover:scale-110 cursor-pointer ${isOpen ? 'bg-white text-accent' : 'bg-accent text-white'}`}
        title="Hablar con Physis Coach"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.43 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" /></svg>
        )}
      </button>
    </div>
  );
};

export default PhysisAssistant;