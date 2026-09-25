import { useState, useRef, useEffect } from 'react';
import { sendMessageToIA } from '../api/chat';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => Math.random().toString(36).substring(7));
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), text: inputValue, sender: 'user' };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      // responseData contiene el { status, data: { n8n } }
      const res = await sendMessageToIA(userMsg.text, sessionId);
      
      const n8nData = res.data; 
      const botText = n8nData.data.reply

      const botMsg: Message = { id: (Date.now() + 1).toString(), text: botText, sender: 'bot' };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: Message = { id: (Date.now() + 1).toString(), text: 'Hubo un error al comunicar con la IA.', sender: 'bot' };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="w-80 h-[420px] rounded-3xl flex flex-col overflow-hidden mb-4 bg-white/75 dark:bg-neutral-950/70 backdrop-blur-2xl backdrop-saturate-150 border border-white/40 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.37)]">
          <div className="p-4 font-semibold flex justify-between items-center border-b border-black/5 dark:border-white/10 text-neutral-900 dark:text-neutral-50">
            <span>Asistente PAIPPA</span>
            <button onClick={() => setIsOpen(false)} className="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 text-xl leading-none transition-colors duration-150 active:scale-95">&times;</button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
            {messages.length === 0 && (
              <div className="text-center text-sm text-neutral-500 mt-4">
                ¡Hola! ¿En qué puedo ayudarte hoy?
              </div>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${msg.sender === 'user' ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 self-end' : 'bg-white/60 dark:bg-white/5 backdrop-blur-md border border-black/5 dark:border-white/5 text-neutral-800 dark:text-neutral-200 self-start'}`}>
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-black/5 dark:border-white/5 text-neutral-800 dark:text-neutral-200 self-start rounded-2xl p-3 text-sm flex gap-1 items-center shadow-sm">
                <span className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-black/5 dark:border-white/10 flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Escribe un mensaje..."
              className="flex-1 px-3 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-sm focus:outline-none focus:border-black/20 dark:focus:border-white/20 text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-500 transition-all duration-150"
            />
            <button onClick={handleSend} disabled={isLoading} className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-3 py-2 rounded-xl hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:opacity-50 font-medium transition-all duration-150 active:scale-[0.98]">
              Enviar
            </button>
          </div>
        </div>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-transform hover:scale-105 active:scale-95 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-white/40 dark:border-white/15 shadow-2xl"
        >
          💬
        </button>
      )}
    </div>
  );
}
