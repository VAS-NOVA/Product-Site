"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Zap, Sparkles, BatteryCharging, Sun } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from cache or set initial greeting
  useEffect(() => {
    const cached = localStorage.getItem('vasnova_chat_cache');
    if (cached) {
      try {
        setMessages(JSON.parse(cached));
      } catch (e) {
        console.error("Failed to parse chat cache", e);
      }
    } else {
      const hour = new Date().getHours();
      let greeting = 'Good morning';
      if (hour >= 12 && hour < 17) greeting = 'Good afternoon';
      else if (hour >= 17) greeting = 'Good evening';
      
      setMessages([
        { role: 'assistant', content: `${greeting}! Welcome to VAS NOVA. I am NOVA, your intelligent guide. How can I help you discover our clean-energy solutions today?` }
      ]);
    }
    setIsInitialized(true);
  }, []);

  // Save to cache whenever messages update
  useEffect(() => {
    if (isInitialized && messages.length > 0) {
      localStorage.setItem('vasnova_chat_cache', JSON.stringify(messages));
    }
  }, [messages, isInitialized]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const submitMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessagesCount = messages.filter(m => m.role === 'user').length;

    setMessages((prev) => [...prev, { role: 'user', content: messageText }]);
    setIsLoading(true);

    // Limit to 2 messages during testing phase
    if (userMessagesCount >= 2) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev, 
          { role: 'assistant', content: 'Thank you for exploring! NOVA is currently in its testing phase, so interactions are temporarily limited. We will roll out full functionalities shortly. Please check back soon or contact the developer at kunamsanthosh994@gmail.com.' }
        ]);
        setIsLoading(false);
      }, 1500); // Small artificial delay
      return;
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: messageText }].map(m => ({
            role: m.role,
            content: m.content
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';

      if (reader) {
        setIsLoading(false);
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value, { stream: true });
          
          // Artificial slow typing effect
          for (let i = 0; i < chunk.length; i++) {
            assistantMessage += chunk[i];
            setMessages((prev) => {
              const newMessages = [...prev];
              newMessages[newMessages.length - 1].content = assistantMessage;
              return newMessages;
            });
            // 20ms delay per character
            await new Promise(resolve => setTimeout(resolve, 20));
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => {
        const newMessages = [...prev];
        if (newMessages[newMessages.length - 1].role === 'assistant' && newMessages[newMessages.length - 1].content === '') {
           newMessages[newMessages.length - 1].content = 'System malfunction: Unable to connect to neural network. Please try again later.';
           return newMessages;
        }
        return [...prev, { role: 'assistant', content: 'System malfunction: Unable to connect to neural network. Please try again later.' }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input;
    setInput('');
    await submitMessage(text);
  };

  const parseMessage = (content: string) => {
    const optionsRegex = /\[OPTION:\s*(.*?)\]/g;
    let text = content;
    const options: string[] = [];
    
    let match;
    while ((match = optionsRegex.exec(content)) !== null) {
      options.push(match[1]);
      text = text.replace(match[0], '');
    }
    
    return { text: text.trim(), options };
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-slate-900 text-white shadow-xl shadow-cyan-500/20 border border-slate-700/50 flex items-center justify-center overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <MessageSquare className="w-6 h-6 relative z-10 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
            
            {/* Ping animation */}
            <span className="absolute flex h-full w-full inset-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-20"></span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] h-[600px] max-h-[80vh] max-w-[calc(100vw-3rem)] rounded-2xl overflow-hidden shadow-2xl shadow-cyan-900/20 border border-slate-700/50 bg-slate-900/80 backdrop-blur-xl flex flex-col"
          >
            {/* Header */}
            <div className="relative p-4 border-b border-slate-700/50 bg-slate-900/50 flex items-center justify-between">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 pointer-events-none" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white tracking-wide text-sm flex items-center gap-2">
                    NOVA
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider ml-1">Beta</span>
                  </h3>
                  <p className="text-xs text-slate-400">Intelligent Product Guide (Testing)</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="relative z-10 p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth chatbot-scroll relative">
              {/* Background Energy Pattern */}
              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex flex-col items-center justify-around opacity-[0.03]">
                 <Zap className="w-48 h-48 text-emerald-500 transform rotate-12" />
                 <BatteryCharging className="w-48 h-48 text-emerald-500 transform -rotate-12" />
                 <Sun className="w-48 h-48 text-emerald-500 transform rotate-45" />
              </div>

              {messages.map((msg, index) => {
                const { text, options } = parseMessage(msg.content);
                return (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  key={index}
                  className={twMerge("flex flex-col gap-2", msg.role === 'user' ? "items-end" : "items-start")}
                >
                  <div className={twMerge("flex gap-3", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}>
                    <div className={twMerge(
                      "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border",
                      msg.role === 'user' 
                        ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-300" 
                        : "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                    )}>
                      {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    
                    <div className={twMerge(
                      "px-4 py-3 rounded-2xl max-w-[80%] text-sm leading-relaxed backdrop-blur-md shadow-sm relative overflow-hidden",
                      msg.role === 'user'
                        ? "bg-slate-800/80 text-white rounded-tr-sm border border-slate-700/50"
                        : "bg-gradient-to-br from-slate-800 to-slate-900 text-slate-100 rounded-tl-sm border border-emerald-500/20 shadow-emerald-900/10"
                    )}>
                      {/* Futuristic scanline effect for assistant messages */}
                      {msg.role === 'assistant' && (
                         <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(52,211,153,0.03)_50%,transparent_100%)] bg-[length:100%_4px] opacity-50 pointer-events-none" />
                      )}
                      <span className="relative z-10 whitespace-pre-wrap">{text}</span>
                    </div>
                  </div>
                  
                  {/* Quick Reply Options */}
                  {options.length > 0 && index === messages.length - 1 && !isLoading && (
                    <div className="flex flex-wrap gap-2 mt-2 ml-11">
                      {options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => submitMessage(opt)}
                          className="px-3 py-1.5 text-xs font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 rounded-full hover:bg-emerald-900/60 hover:text-emerald-300 transition-colors"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              )})}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-slate-800/80 rounded-tl-sm border border-slate-700/50 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-slate-700/50 bg-slate-900/80 relative">
               <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/5 to-transparent pointer-events-none" />
              <form onSubmit={handleSubmit} className="relative z-10 flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Initiate query..."
                  className="flex-1 bg-slate-950/50 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-all shadow-inner"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:hover:bg-emerald-500 text-slate-950 p-2.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center group"
                >
                  <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
