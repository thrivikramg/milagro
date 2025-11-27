"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/GamificationComponents";
import { Layers, Lock, Clock, Zap } from "lucide-react";
import Link from "next/link";

export default function CoursesPage() {
    const volumes = [
        {
            id: "basics",
            title: "Basics of Electronics",
            description: "Introduction to voltage, current, resistance, and basic components.",
            difficulty: "NOVICE",
            xp: 200,
            duration: "1h 30m",
            status: "AVAILABLE",
            link: "/courses/basics",
        },
        {
            id: "fundamentals",
            title: "Volume I: Circuit Fundamentals",
            description: "A comprehensive guide to the laws of electronics. Covers Voltage, Current, and Resistance.",
            difficulty: "NOVICE",
            xp: 500,
            duration: "2h 30m",
            status: "AVAILABLE",
            link: "/courses/fundamentals",
        },
        {
            id: "components",
            title: "Volume II: Component Mastery",
            description: "Detailed studies of core components: Resistors, Capacitors, and Inductors.",
            difficulty: "APPRENTICE",
            xp: 750,
            duration: "3h 15m",
            status: "LOCKED",
            link: "/courses/components",
        },
        {
            id: "arduino",
            title: "Volume III: Digital Logic",
            description: "Introduction to microcontrollers and the art of programming logic.",
            difficulty: "SCHOLAR",
            xp: 1000,
            duration: "4h 00m",
            status: "LOCKED",
            link: "/courses/arduino",
        },
    ];

    return (
        <div className="space-y-8 max-w-7xl mx-auto pt-8 px-4">
            <div className="flex flex-col gap-2 border-b border-white/10 pb-6">
                <h1 className="text-4xl font-heading font-bold text-white flex items-center gap-3 neon-text">
                    <Layers className="w-8 h-8 text-neon-blue" />
                    TRAINING MODULES
                </h1>
                <p className="text-gray-400 font-sans text-lg">
                    Select a module to begin your training. Knowledge is power.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {volumes.map((volume, index) => (
                    <motion.div
                        key={volume.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Link href={volume.link} className={volume.status === "LOCKED" ? "pointer-events-none" : ""}>
                            <GlassCard hoverEffect={true} className={`h-full flex flex-col gap-6 group transition-all duration-300 ${volume.status === "LOCKED" ? "opacity-50 grayscale" : ""}`}>
                                <div className="flex justify-between items-start">
                                    <div className={`px-3 py-1 rounded-sm text-xs font-bold font-heading border tracking-wider ${volume.difficulty === "NOVICE" ? "bg-green-500/10 text-green-400 border-green-500/30" :
                                            volume.difficulty === "APPRENTICE" ? "bg-neon-blue/10 text-neon-blue border-neon-blue/30" :
                                                "bg-neon-purple/10 text-neon-purple border-neon-purple/30"
                                        }`}>
                                        {volume.difficulty}
                                    </div>
                                    {volume.status === "LOCKED" && <Lock className="w-5 h-5 text-gray-500" />}
                                </div>

                                <div>
                                    <h3 className="text-2xl font-heading font-bold text-white mb-3 group-hover:text-neon-cyan transition-colors">
                                        {volume.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm font-sans leading-relaxed">
                                        {volume.description}
                                    </p>
                                </div>

                                <div className="mt-auto pt-4 border-t border-white/10 flex justify-between items-center text-sm font-sans">
                                    <div className="flex items-center gap-1 text-gray-400">
                                        <Clock className="w-4 h-4 text-neon-blue" />
                                        {volume.duration}
                                    </div>
                                    <div className="flex items-center gap-1 text-neon-purple font-bold font-heading drop-shadow-[0_0_5px_rgba(188,19,254,0.5)]">
                                        <Zap className="w-4 h-4" />
                                        {volume.xp} XP
                                    </div>
                                </div>
                            </GlassCard>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
