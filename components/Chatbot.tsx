"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, Minimize2, Sparkles } from "lucide-react";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";
import { useChat } from "@/context/ChatContext";

interface Message {
    id: string;
    role: "user" | "bot";
    content: string;
}

export function Chatbot() {
    const { isOpen, closeChat } = useChat();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Load conversation history
    useEffect(() => {
        const saved = localStorage.getItem("chatHistory");
        if (saved) {
            try {
                setMessages(JSON.parse(saved));
            } catch {
                setMessages([{ id: "1", role: "bot", content: "Greetings! I can help with electronics, math, or general knowledge! Type 'continue' for more details on any topic." }]);
            }
        } else {
            setMessages([{ id: "1", role: "bot", content: "Greetings! I can help with electronics, math, or general knowledge! Type 'continue' for more details on any topic." }]);
        }
    }, []);

    // Save conversation history
    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem("chatHistory", JSON.stringify(messages));
        }
    }, [messages]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                body: JSON.stringify({ message: input }),
            });
            const data = await res.json();

            setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: "bot", content: data.reply }]);
        } catch (e) {
            setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: "bot", content: "Communication error. Please try again." }]);
        } finally {
            setIsTyping(false);
        }
    };

    const clearHistory = () => {
        if (confirm("Clear all conversation history?")) {
            const welcomeMsg: Message = { id: "1", role: "bot", content: "History cleared! How can I help you?" };
            setMessages([welcomeMsg]);
            localStorage.removeItem("chatHistory");
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    className="fixed top-24 right-6 w-96 h-[500px] glass-panel rounded-2xl flex flex-col overflow-hidden z-50 border-neon-cyan/30 shadow-[0_0_50px_rgba(0,243,255,0.15)] bg-black/80 backdrop-blur-xl"
                >
                    {/* Header */}
                    <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/10 to-neon-purple/10" />
                        <div className="flex items-center gap-2 relative z-10">
                            <div className="w-8 h-8 rounded-full bg-neon-cyan/20 flex items-center justify-center border border-neon-cyan/50">
                                <Bot className="w-5 h-5 text-neon-cyan" />
                            </div>
                            <div>
                                <span className="font-bold text-white block leading-none">AI Assistant</span>
                                <span className="text-[10px] text-neon-cyan uppercase tracking-wider">Online</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 relative z-10">

                            <button onClick={closeChat} className="text-gray-400 hover:text-white transition-colors">
                                <Minimize2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
                        {messages.map((msg) => (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                key={msg.id}
                                className={cn(
                                    "max-w-[85%] p-3 rounded-2xl text-sm relative",
                                    msg.role === "user"
                                        ? "bg-neon-cyan/20 text-white self-end ml-auto rounded-tr-sm border border-neon-cyan/30"
                                        : "bg-white/10 text-gray-200 self-start rounded-tl-sm border border-white/10"
                                )}
                            >
                                <div className="whitespace-pre-wrap">{msg.content}</div>
                                {msg.role === "bot" && (
                                    <div className="absolute -left-2 -top-2">
                                        <Sparkles className="w-4 h-4 text-neon-purple opacity-50" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                        {isTyping && (
                            <div className="bg-white/10 text-gray-200 self-start rounded-2xl rounded-tl-sm p-4 border border-white/10 w-16 flex items-center justify-center gap-1">
                                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 h-1.5 bg-neon-cyan rounded-full" />
                                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-neon-cyan rounded-full" />
                                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-neon-cyan rounded-full" />
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-white/10 bg-white/5">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                placeholder="Ask anything or type 'continue'..."
                                className="flex-1 bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-neon-cyan/50 placeholder:text-gray-500 transition-colors"
                            />
                            <Button size="sm" onClick={clearHistory} className="px-3 rounded-xl bg-red-500/20 hover:bg-red-500/40 text-red-400 border-red-500/50" title="Clear History">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </Button>
                            <Button size="sm" onClick={handleSend} className="px-3 rounded-xl bg-neon-cyan/20 hover:bg-neon-cyan/40 text-neon-cyan border-neon-cyan/50">
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

