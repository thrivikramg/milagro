"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Bot, Send, Sparkles, Cpu, Wifi } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/GamificationComponents";

interface Message {
    id: string;
    role: "user" | "bot";
    content: string;
}

export default function ChatPage() {
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
                setMessages([{ id: "1", role: "bot", content: "Greetings, Pilot! I am your AI Co-Pilot. I can assist with mission data, engineering concepts, or general inquiries. Systems are online and ready." }]);
            }
        } else {
            setMessages([{ id: "1", role: "bot", content: "Greetings, Pilot! I am your AI Co-Pilot. I can assist with mission data, engineering concepts, or general inquiries. Systems are online and ready." }]);
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
            setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: "bot", content: "Communication uplink failed. Retrying..." }]);
        } finally {
            setIsTyping(false);
        }
    };

    const clearHistory = () => {
        if (confirm("Clear all conversation history?")) {
            const welcomeMsg: Message = { id: "1", role: "bot", content: "Memory banks purged. Ready for new input." };
            setMessages([welcomeMsg]);
            localStorage.removeItem("chatHistory");
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 container mx-auto flex flex-col items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-4xl h-[80vh] flex flex-col"
            >
                {/* Header Section */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-sm bg-neon-cyan/10 border border-neon-cyan/50 flex items-center justify-center relative tech-border">
                            <Bot className="w-6 h-6 text-neon-cyan animate-pulse-slow" />
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-heading font-bold text-white tracking-widest">AI CO-PILOT</h1>
                            <div className="flex items-center gap-2 text-xs font-mono text-neon-cyan">
                                <Wifi className="w-3 h-3" />
                                SECURE UPLINK ESTABLISHED
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-sm text-xs font-mono text-gray-400">
                            CPU LOAD: <span className="text-neon-purple">12%</span>
                        </div>
                        <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-sm text-xs font-mono text-gray-400">
                            LATENCY: <span className="text-green-400">24ms</span>
                        </div>
                    </div>
                </div>

                {/* Chat Interface */}
                <GlassCard className="flex-1 flex flex-col overflow-hidden border-neon-cyan/30 relative">
                    {/* Decorative Grid Background */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10" ref={scrollRef}>
                        {messages.map((msg) => (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                key={msg.id}
                                className={cn(
                                    "flex gap-4 max-w-[80%]",
                                    msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                                )}
                            >
                                <div className={cn(
                                    "w-8 h-8 rounded-sm flex items-center justify-center border shrink-0",
                                    msg.role === "user"
                                        ? "bg-neon-purple/20 border-neon-purple/50 text-neon-purple"
                                        : "bg-neon-cyan/20 border-neon-cyan/50 text-neon-cyan"
                                )}>
                                    {msg.role === "user" ? <span className="font-heading font-bold">P</span> : <Bot className="w-4 h-4" />}
                                </div>

                                <div className={cn(
                                    "p-4 rounded-sm border text-sm font-sans leading-relaxed relative",
                                    msg.role === "user"
                                        ? "bg-neon-purple/10 border-neon-purple/30 text-white rounded-tr-none"
                                        : "bg-white/5 border-white/10 text-gray-200 rounded-tl-none"
                                )}>
                                    {/* Corner Accents */}
                                    <div className={cn(
                                        "absolute w-2 h-2 border-t border-l",
                                        msg.role === "user" ? "border-neon-purple -top-[1px] -left-[1px]" : "border-neon-cyan -top-[1px] -right-[1px]"
                                    )} />
                                    <div className={cn(
                                        "absolute w-2 h-2 border-b border-r",
                                        msg.role === "user" ? "border-neon-purple -bottom-[1px] -right-[1px]" : "border-neon-cyan -bottom-[1px] -left-[1px]"
                                    )} />

                                    <div className="whitespace-pre-wrap">{msg.content}</div>
                                </div>
                            </motion.div>
                        ))}

                        {isTyping && (
                            <div className="flex gap-4 max-w-[80%]">
                                <div className="w-8 h-8 rounded-sm bg-neon-cyan/20 border border-neon-cyan/50 flex items-center justify-center shrink-0">
                                    <Bot className="w-4 h-4 text-neon-cyan" />
                                </div>
                                <div className="p-4 rounded-sm bg-white/5 border border-white/10 text-gray-200 rounded-tl-none flex items-center gap-1">
                                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 h-1.5 bg-neon-cyan rounded-full" />
                                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-neon-cyan rounded-full" />
                                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-neon-cyan rounded-full" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t border-white/10 bg-black/40 backdrop-blur-md relative z-20">
                        <div className="flex gap-4">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                placeholder="Enter command or query..."
                                className="flex-1 bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-neon-cyan/50 placeholder:text-gray-600 font-mono text-sm transition-colors"
                            />
                            <Button
                                onClick={clearHistory}
                                className="px-4 rounded-sm bg-red-500/20 hover:bg-red-500/40 text-red-400 border border-red-500/50 font-heading font-bold tracking-wider"
                                title="Clear History"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </Button>
                            <Button
                                onClick={handleSend}
                                className="px-6 rounded-sm bg-neon-cyan/20 hover:bg-neon-cyan/40 text-neon-cyan border border-neon-cyan/50 font-heading font-bold tracking-wider"
                            >
                                <Send className="w-4 h-4 mr-2" />
                                TRANSMIT
                            </Button>
                        </div>
                    </div>
                </GlassCard>
            </motion.div>
        </div>
    );
}
