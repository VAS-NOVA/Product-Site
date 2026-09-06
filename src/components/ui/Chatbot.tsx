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
            className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-[#18181b] backdrop-blur-xl text-white shadow-2xl shadow-emerald-500/10 border border-white/10 flex items-center justify-center overflow-hidden group hover:border-emerald-500/50 transition-colors"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
            className="fixed bottom-6 right-6 z-50 w-[380px] h-[600px] max-h-[80vh] max-w-[calc(100vw-3rem)] rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 bg-slate-900 flex flex-col"
          >
            {/* Engineering Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />
            
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08),transparent_70%)] pointer-events-none z-0" />

            {/* Background Watermark Logo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <img 
                src="/vas-logo-transparent.png" 
                alt="" 
                className="w-64 h-auto opacity-20 mix-blend-plus-lighter"
              />
            </div>

            {/* Floating Island Header */}
            <div className="absolute top-4 left-4 right-4 z-20 bg-slate-800/80 backdrop-blur-xl border border-white/5 rounded-2xl p-3 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center shadow-inner">
                  <Zap className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white tracking-wide text-sm flex items-center gap-2">
                    NOVA
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 uppercase tracking-wider ml-1">Beta</span>
                  </h3>
                  <p className="text-[11px] text-zinc-400">Intelligent Solar Guide</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-white/5 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 pt-24 pb-28 space-y-5 scroll-smooth chatbot-scroll relative z-10">
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
                  <div className={twMerge("flex gap-3 max-w-[90%]", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}>
                    
                    <div className={twMerge(
                      "px-4 py-3 text-sm leading-relaxed shadow-lg backdrop-blur-md relative overflow-hidden",
                      msg.role === 'user'
                        ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-2xl rounded-tr-sm shadow-emerald-500/20 border border-emerald-400/30"
                        : "bg-slate-800 text-zinc-100 rounded-2xl rounded-tl-sm border border-white/5 shadow-black/20"
                    )}>
                      {msg.role === 'assistant' && (
                         <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.01)_50%,transparent_100%)] bg-[length:100%_4px] opacity-50 pointer-events-none" />
                      )}
                      <span className="relative z-10 whitespace-pre-wrap">{text}</span>
                    </div>
                  </div>
                  
                  {/* Quick Reply Options */}
                  {options.length > 0 && index === messages.length - 1 && !isLoading && (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => submitMessage(opt)}
                          className="px-4 py-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/5 border border-emerald-500/20 rounded-full hover:bg-emerald-500/10 hover:border-emerald-500/50 hover:text-emerald-300 transition-all duration-300"
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
                  <div className="px-4 py-3 rounded-2xl bg-slate-800 rounded-tl-sm border border-white/5 flex items-center gap-1.5 shadow-lg">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Floating Pill Input */}
            <div className="absolute bottom-4 left-4 right-4 z-20">
              <form onSubmit={handleSubmit} className="relative flex gap-2 bg-slate-800/80 backdrop-blur-xl border border-white/5 rounded-full p-1.5 shadow-2xl">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask NOVA..."
                  className="flex-1 bg-transparent px-4 py-2 text-sm text-zinc-100 placeholder-zinc-400 outline-none"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:hover:bg-emerald-500 text-slate-900 p-2.5 rounded-full transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center group"
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
