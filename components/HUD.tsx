"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Layers, User, Menu, X, Cpu, Zap, Activity, Radio, Bot, MessageSquare } from "lucide-react";
import { EnergyBar } from "./GamificationComponents";

export function HUD() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [systemTime, setSystemTime] = useState("00:00:00");

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setSystemTime(now.toLocaleTimeString('en-US', { hour12: false }));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const navItems = [
        { href: "/", label: "BRIDGE", icon: <Home className="w-4 h-4" /> },
        { href: "/missions", label: "MISSIONS", icon: <Layers className="w-4 h-4" /> },
        { href: "/profile", label: "PILOT", icon: <User className="w-4 h-4" /> }
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
            {/* Top Bar Background with Tech Borders */}
            <div className="absolute inset-0 h-20 bg-gradient-to-b from-[#020205] to-transparent pointer-events-auto border-b border-white/5 backdrop-blur-sm">
                <div className="absolute bottom-0 left-0 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />
                <div className="absolute bottom-0 right-0 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />
            </div>

            <div className="container mx-auto h-20 flex items-center justify-between px-6 relative pointer-events-auto">
                {/* Logo Area - Cockpit Style */}
                <Link href="/" className="flex items-center gap-4 group">
                    <div className="relative w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-sm tech-border group-hover:border-neon-cyan/50 transition-colors">
                        <Cpu className="w-6 h-6 text-neon-cyan animate-pulse-slow" />
                        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-neon-cyan/50" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-xl font-heading font-bold text-white tracking-widest group-hover:text-neon-cyan transition-colors">
                            ANTI-GRAVITY
                        </h1>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-neon-cyan tracking-[0.2em]">
                                SYS.VER.2.0
                            </span>
                            <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                        </div>
                    </div>
                </Link>

                {/* Center - System Status (Decorative) */}
                <div className="hidden lg:flex items-center gap-8 opacity-60">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-mono text-gray-400">COORDS</span>
                        <span className="text-xs font-mono text-neon-cyan">45.22.91</span>
                    </div>
                    <div className="h-8 w-[1px] bg-white/10" />
                    <div className="flex flex-col items-start">
                        <span className="text-[10px] font-mono text-gray-400">TIME</span>
                        <span className="text-xs font-mono text-neon-cyan">{systemTime}</span>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`relative px-6 py-2 flex items-center gap-2 font-heading font-bold text-sm tracking-wide transition-all duration-300 clip-path-slant ${isActive
                                    ? "text-black bg-neon-cyan shadow-[0_0_15px_rgba(0,243,255,0.4)]"
                                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"
                                    }`}
                                style={{
                                    clipPath: "polygon(10% 0, 100% 0, 90% 100%, 0% 100%)"
                                }}
                            >
                                {item.icon}
                                {item.label}
                            </Link>
                        );
                    })}

                    {/* Chatbot Link Button */}
                    <Link
                        href="/chat"
                        className={`relative px-6 py-2 flex items-center gap-2 font-heading font-bold text-sm tracking-wide transition-all duration-300 clip-path-slant border border-transparent hover:border-white/10 ${pathname === "/chat"
                            ? "text-neon-cyan bg-white/10 border-neon-cyan/50 shadow-[0_0_15px_rgba(0,243,255,0.2)]"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                            }`}
                        style={{
                            clipPath: "polygon(10% 0, 100% 0, 90% 100%, 0% 100%)"
                        }}
                    >
                        <Bot className="w-4 h-4" />
                        AI ASSIST
                    </Link>
                </nav>

                {/* Energy Bar & Status (Desktop) */}
                <div className="hidden md:flex items-center gap-6 pl-6 border-l border-white/10">
                    <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-2 text-[10px] font-mono text-neon-purple">
                            <Zap className="w-3 h-3" /> SHIELD INTEGRITY
                        </div>
                        <div className="w-32">
                            <EnergyBar current={750} max={1000} level={3} />
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden p-2 text-white hover:text-neon-cyan transition-colors border border-white/10 bg-white/5"
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        className="md:hidden fixed inset-0 z-50 bg-[#020205]/95 backdrop-blur-xl border-l border-white/10 flex flex-col pointer-events-auto"
                    >
                        <div className="p-6 flex justify-end border-b border-white/10">
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 text-white hover:text-neon-cyan"
                            >
                                <X />
                            </button>
                        </div>
                        <div className="p-6 flex flex-col gap-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-4 p-4 border border-white/10 bg-white/5 hover:bg-neon-cyan/10 hover:border-neon-cyan/50 text-white font-heading font-bold tracking-wider transition-all"
                                >
                                    {item.icon}
                                    {item.label}
                                </Link>
                            ))}

                            <Link
                                href="/chat"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center gap-4 p-4 border border-white/10 bg-white/5 hover:bg-neon-cyan/10 hover:border-neon-cyan/50 text-white font-heading font-bold tracking-wider transition-all"
                            >
                                <Bot className="w-4 h-4" />
                                AI ASSISTANT
                            </Link>

                            <div className="mt-8 pt-8 border-t border-white/10">
                                <div className="text-xs font-mono text-gray-400 mb-2">SHIELD STATUS</div>
                                <EnergyBar current={750} max={1000} level={3} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
