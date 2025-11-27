"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function EnergyBar({ current, max, level }: { current: number; max: number; level: number }) {
    const percentage = Math.min((current / max) * 100, 100);

    return (
        <div className="flex items-center gap-4 w-full max-w-md">
            <div className="flex flex-col items-end">
                <span className="text-neon-cyan font-heading font-bold text-sm tracking-wider">LEVEL {level}</span>
                <span className="text-xs text-gray-400 font-sans">{current}/{max} XP</span>
            </div>
            <div className="flex-1 h-3 bg-black/40 border border-white/10 rounded-full overflow-hidden relative shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="h-full bg-gradient-to-r from-neon-blue to-neon-cyan relative"
                >
                    {/* Glow effect */}
                    <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/50 blur-[4px]" />
                </motion.div>
            </div>
        </div>
    );
}

export function HoloBadge({ icon, label, locked = false }: { icon: ReactNode; label: string; locked?: boolean }) {
    return (
        <div className={`flex flex-col items-center gap-3 p-4 transition-all hover:scale-105 ${locked ? 'opacity-40 grayscale' : ''}`}>
            <div className={`relative w-16 h-16 flex items-center justify-center rounded-full ${locked ? 'bg-white/5 border border-white/10' : 'bg-white/5 border border-neon-purple/50 shadow-[0_0_15px_rgba(188,19,254,0.3)]'}`}>
                {/* Rotating Ring */}
                {!locked && (
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border border-t-neon-cyan border-r-transparent border-b-neon-purple border-l-transparent rounded-full"
                    />
                )}
                <div className={`${locked ? 'text-gray-500' : 'text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]'}`}>
                    {icon}
                </div>
            </div>
            <span className={`text-xs font-heading font-bold text-center tracking-widest uppercase ${locked ? 'text-gray-600' : 'text-neon-cyan'}`}>{label}</span>
        </div>
    );
}

export function GlassCard({ children, className = "", hoverEffect = false }: { children: ReactNode; className?: string; hoverEffect?: boolean }) {
    return (
        <div className={`glass-card p-6 ${hoverEffect ? 'hover:border-neon-cyan/50 hover:shadow-[0_0_20px_rgba(0,243,255,0.15)] transition-all duration-300' : ''} ${className}`}>
            {children}
        </div>
    );
}

export function HoloRadar({ stats }: { stats: { label: string; value: number }[] }) {
    return (
        <div className="relative w-full aspect-square max-w-[200px] mx-auto">
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                {/* Background Grid */}
                <polygon points="50,5 95,27 95,72 50,95 5,72 5,27" fill="rgba(0, 243, 255, 0.05)" stroke="rgba(0, 243, 255, 0.2)" strokeWidth="0.5" />
                <polygon points="50,20 80,35 80,65 50,80 20,65 20,35" fill="none" stroke="rgba(0, 243, 255, 0.1)" strokeWidth="0.5" />

                {/* Data Shape */}
                <motion.polygon
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    points="50,20 85,35 75,70 50,80 25,65 30,30"
                    fill="rgba(188, 19, 254, 0.2)"
                    stroke="#bc13fe"
                    strokeWidth="1.5"
                    filter="url(#glow)"
                />

                {/* Center Point */}
                <circle cx="50" cy="50" r="1" fill="#fff" />

                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[10px] text-neon-cyan font-heading font-bold tracking-[0.2em] opacity-80">
                ANALYSIS
            </div>
        </div>
    );
}
