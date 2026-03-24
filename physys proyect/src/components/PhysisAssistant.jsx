// src/components/PhysisAssistant.jsx
import React, { useState, useRef, useEffect } from 'react';

const PhysisAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Mensaje inicial de la IA
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Saludos. Soy Physis, tu red neuronal de asistencia. ¿Qué vector de tu vida optimizaremos hoy?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Referencia para hacer scroll automático hacia abajo
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // 1. Mostrar el mensaje del usuario
    const userText = inputValue;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputValue('');
    setIsTyping(true);

    // 2. Simular el "Cerebro" de Physis procesando la información (1.5 segundos)
    setTimeout(() => {
      let aiResponse = "Analizando variables bio-métricas... Sugiero mantener la consistencia en tus protocolos actuales para maximizar la plasticidad celular.";
      
      const lowerText = userText.toLowerCase();
      
      // Lógica de detección de palabras clave
      if (lowerText.includes('cansado') || lowerText.includes('dormir') || lowerText.includes('sueño')) {
        aiResponse = "Detecto necesidad de recuperación celular. El protocolo de Homeostasis es crítico ahora. Reduce la exposición a luz azul de inmediato.";
      } else if (lowerText.includes('entrenar') || lowerText.includes('fuerza') || lowerText.includes('ejercicio')) {
        aiResponse = "La tensión mecánica es necesaria para la evolución. Recuerda aplicar sobrecarga progresiva en tu sesión biomecánica de hoy.";
      } else if (lowerText.includes('estudiar') || lowerText.includes('leer') || lowerText.includes('aprender')) {
        aiResponse = "Tu cerebro está en estado receptivo. Utiliza bloques de 90 minutos de enfoque profundo seguidos de 20 minutos de escaneo pasivo (descanso ocular).";
      } else if (lowerText.includes('hola') || lowerText.includes('physis')) {
        aiResponse = "Mis sistemas están en línea y a tu disposición. ¿Iniciamos diagnóstico?";
      }

      setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      
      {/* --- VENTANA DEL CHAT --- */}
      {isOpen && (
        <div className="mb-4 w-[90vw] sm:w-96 h-[30rem] flex flex-col rounded-3xl border border-accent/30 bg-black/70 backdrop-blur-2xl shadow-2xl overflow-hidden transition-all duration-300 animate-in slide-in-from-bottom-10 fade-in">
          
          {/* Cabecera del Chat */}
          <div className="bg-accent/20 border-b border-accent/20 p-4 flex justify-between items-center backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="text-2xl animate-pulse">✨</span>
              <h3 className="font-bold text-accent tracking-widest uppercase text-sm">Physis AI Core</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Área de Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-accent text-white rounded-tr-sm shadow-lg' 
                    : 'bg-white/10 border border-white/10 text-gray-200 rounded-tl-sm'
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
          <form onSubmit={handleSend} className="p-3 border-t border-white/10 bg-black/40">
            <div className="relative flex items-center">
              <input 
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Transmite tu consulta..."
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-4 pr-12 text-sm text-white placeholder-white/40 focus:outline-none focus:border-accent/50 transition-colors"
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

      {/* --- BOTÓN FLOTANTE (FAB) --- */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-14 h-14 rounded-full shadow-[0_0_20px_rgba(var(--accent-primary-rgb),0.5)] transition-all duration-300 hover:scale-110 cursor-pointer ${isOpen ? 'bg-white text-accent' : 'bg-accent text-white'}`}
        title="Conectar con Physis AI"
      >
        {isOpen ? (
          // Icono X para cerrar
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
        ) : (
          // Icono Estrellas/Sparkles para abrir
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clipRule="evenodd" /></svg>
        )}
      </button>
    </div>
  );
};

export default PhysisAssistant;