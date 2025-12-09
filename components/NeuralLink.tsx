import React, { useState, useRef, useEffect } from 'react';
import { generateResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Send, Cpu, Loader2, AlertTriangle, Square } from 'lucide-react';

const NeuralLink: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: 'NEURAL_LINK ESTABLISHED. PROTO_OS ONLINE. WAITING FOR INPUT...', timestamp: new Date().toLocaleTimeString() }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = {
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Convert internal message format to API format
    const history = messages.map(m => ({ role: m.role, content: m.content }));
    const responseText = await generateResponse(userMsg.content, history);

    const botMsg: ChatMessage = {
      role: 'model',
      content: responseText,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, botMsg]);
    setLoading(false);
  };

  return (
    <section id="neural" className="bg-ind-light py-20 border-b-4 border-black relative">
       <div className="absolute top-0 left-0 w-full h-4 bg-hazard"></div>
       
       <div className="max-w-5xl mx-auto px-4">
         <div className="mb-8 text-center">
            <h2 className="text-4xl md:text-6xl font-display font-bold uppercase text-black mb-2">
                Neural_Link
            </h2>
            <p className="font-mono text-sm bg-black text-ind-yellow inline-block px-2 py-1">
                POWERED BY GEMINI 2.5 FLASH /// RESTRICTED ACCESS
            </p>
         </div>

         <div className="bg-black border-4 border-neutral-800 p-2 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
            {/* Terminal Header */}
            <div className="bg-neutral-900 px-4 py-2 flex justify-between items-center border-b border-neutral-700">
                <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="font-mono text-xs text-neutral-500">/usr/bin/proto_os_chat</span>
                <Cpu className="text-neutral-600 w-4 h-4" />
            </div>

            {/* Chat Area */}
            <div className="h-[400px] overflow-y-auto p-6 font-mono text-sm bg-black custom-scrollbar relative">
                {/* CRT Scanline Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none z-10 opacity-20"></div>

                {messages.map((msg, idx) => (
                    <div key={idx} className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                            <div className="flex items-center gap-2 mb-1 opacity-50 text-xs">
                                {msg.role === 'model' ? <Square size={10} className="text-ind-orange" /> : null}
                                <span className={msg.role === 'user' ? 'text-ind-yellow' : 'text-ind-orange'}>
                                    {msg.role === 'user' ? 'USER_INPUT' : 'SYS_OUTPUT'} 
                                    <span className="mx-1">::</span> 
                                    {msg.timestamp}
                                </span>
                            </div>
                            <div className={`
                                p-3 border 
                                ${msg.role === 'user' 
                                    ? 'border-ind-yellow text-ind-yellow bg-ind-yellow/10' 
                                    : 'border-ind-orange text-ind-orange bg-ind-orange/10'
                                }
                            `}>
                                {msg.content}
                            </div>
                        </div>
                    </div>
                ))}
                
                {loading && (
                    <div className="flex items-center gap-2 text-ind-orange animate-pulse">
                        <Loader2 className="animate-spin w-4 h-4" />
                        <span>PROCESSING_TENSOR_DATA...</span>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-neutral-900 p-4 border-t border-neutral-700 flex gap-4">
                <span className="text-ind-yellow font-mono pt-3">{'>'}</span>
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="ENTER COMMAND OR QUERY..."
                    className="flex-1 bg-transparent border-b-2 border-neutral-700 focus:border-ind-yellow outline-none text-white font-mono p-2 placeholder-neutral-600"
                    autoComplete="off"
                />
                <button 
                    onClick={handleSend}
                    disabled={loading}
                    className="bg-ind-yellow text-black px-6 py-2 font-mono font-bold uppercase hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    TX_Data <Send size={16} />
                </button>
            </div>
         </div>
       </div>
    </section>
  );
};

export default NeuralLink;
