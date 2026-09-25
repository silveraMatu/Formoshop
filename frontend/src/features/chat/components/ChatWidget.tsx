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
        <div className="bg-white dark:bg-neutral-800 w-80 h-[400px] rounded-xl shadow-2xl flex flex-col overflow-hidden mb-4 border border-neutral-200 dark:border-neutral-700">
          <div className="bg-blue-600 text-white p-4 font-semibold flex justify-between items-center shadow-md">
            <span>Asistente PAIPPA</span>
            <button onClick={() => setIsOpen(false)} className="hover:text-neutral-200 text-xl leading-none">&times;</button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-neutral-50 dark:bg-neutral-900">
            {messages.length === 0 && (
              <div className="text-center text-sm text-neutral-500 mt-4">
                ¡Hola! ¿En qué puedo ayudarte hoy?
              </div>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className={`max-w-[85%] p-3 rounded-lg text-sm ${msg.sender === 'user' ? 'bg-blue-600 text-white self-end rounded-br-none shadow-sm' : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100 self-start rounded-bl-none shadow-sm'}`}>
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100 self-start rounded-lg rounded-bl-none p-3 text-sm flex gap-1 items-center shadow-sm">
                <span className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Escribe un mensaje..."
              className="flex-1 p-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white"
            />
            <button onClick={handleSend} disabled={isLoading} className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium transition-colors">
              Enviar
            </button>
          </div>
        </div>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-xl hover:bg-blue-700 flex items-center justify-center text-2xl transition-transform hover:scale-105"
        >
          💬
        </button>
      )}
    </div>
  );
}
