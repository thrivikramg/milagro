"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Bot, Radio, Wifi } from "lucide-react";
import { GlassCard } from "./GamificationComponents";

interface Message {
    id: string;
    role: "user" | "bot";
    content: string;
}

export function CommsPanel() {
    const [messages, setMessages] = useState<Message[]>([
        { id: "1", role: "bot", content: "Comms Link Established. Systems Nominal." },
        { id: "2", role: "bot", content: "Awaiting pilot input..." }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

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

        // Simulate network delay
        setTimeout(() => {
            const botResponses = [
                "Copy that, Pilot.",
                "Analyzing telemetry...",
                "Trajectory confirmed.",
                "Systems are operating at 98% efficiency.",
                "I'm detecting a variance in the flux capacitor.",
                "Roger. Stand by for data uplink."
            ];
            const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

            setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: "bot", content: randomResponse }]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <GlassCard className="h-[500px] flex flex-col p-0 overflow-hidden border-neon-cyan/30">
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-sm bg-neon-cyan/20 border border-neon-cyan/50 flex items-center justify-center relative">
                        <Bot className="w-5 h-5 text-neon-cyan" />
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    </div>
                    <div>
                        <h3 className="font-heading font-bold text-white text-sm tracking-wider">COMMS CHANNEL</h3>
                        <div className="flex items-center gap-2 text-[10px] text-neon-cyan font-mono">
                            <Wifi className="w-3 h-3" />
                            SECURE LINK
                        </div>
                    </div>
                </div>
                <Radio className="w-5 h-5 text-neon-purple animate-pulse-slow" />
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/20" ref={scrollRef}>
                {messages.map((msg) => (
                    <motion.div
                        initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={msg.id}
                        className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                    >
                        <div className={`max-w-[85%] p-3 text-xs font-mono border ${msg.role === "user"
                                ? "bg-neon-cyan/10 border-neon-cyan/30 text-neon-cyan rounded-tl-lg rounded-bl-lg rounded-br-lg"
                                : "bg-white/5 border-white/10 text-gray-300 rounded-tr-lg rounded-br-lg rounded-bl-lg"
                            }`}>
                            {msg.content}
                        </div>
                        <span className="text-[9px] text-gray-600 mt-1 font-mono">
                            {new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </motion.div>
                ))}
                {isTyping && (
                    <div className="flex items-center gap-1 p-2">
                        <span className="w-1 h-1 bg-neon-cyan animate-bounce" />
                        <span className="w-1 h-1 bg-neon-cyan animate-bounce delay-100" />
                        <span className="w-1 h-1 bg-neon-cyan animate-bounce delay-200" />
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-white/10 bg-white/5">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder="Transmit message..."
                        className="flex-1 bg-black/50 border border-white/10 rounded-sm px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-neon-cyan/50 placeholder:text-gray-600"
                    />
                    <button
                        onClick={handleSend}
                        className="p-2 bg-neon-cyan/20 border border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/40 transition-colors rounded-sm"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </GlassCard>
    );
}
