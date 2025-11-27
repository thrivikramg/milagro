"use client";

import { motion } from "framer-motion";
import { GlassCard, HoloBadge, HoloRadar } from "@/components/GamificationComponents";
import { User, Zap, Star, Shield, Target, Award, Activity, Cpu } from "lucide-react";

export default function ProfilePage() {
    const stats = [
        { label: "Theory", value: 80 },
        { label: "Practical", value: 65 },
        { label: "Design", value: 40 },
        { label: "Safety", value: 90 },
        { label: "Speed", value: 70 },
        { label: "Accuracy", value: 85 },
    ];

    const badges = [
        { icon: <Zap className="w-5 h-5 text-neon-cyan" />, label: "First Spark", locked: false },
        { icon: <Target className="w-5 h-5 text-neon-purple" />, label: "Precision", locked: false },
        { icon: <Shield className="w-5 h-5 text-neon-blue" />, label: "Safety First", locked: false },
        { icon: <Award className="w-5 h-5 text-white" />, label: "Master Engineer", locked: true },
        { icon: <Star className="w-5 h-5 text-gold-leaf" />, label: "Top Pilot", locked: true },
        { icon: <Cpu className="w-5 h-5 text-neon-cyan" />, label: "Tech Wizard", locked: true },
    ];

    return (
        <div className="space-y-8 max-w-7xl mx-auto pt-8 px-4">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start border-b border-white/10 pb-8">
                <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-black/50 border-2 border-neon-cyan p-1 shadow-[0_0_20px_rgba(0,243,255,0.3)]">
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center overflow-hidden">
                            <User className="w-16 h-16 text-white" />
                        </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-neon-purple border border-white/20 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg font-heading tracking-wider">
                        LVL 3
                    </div>
                </div>

                <div className="flex-1 text-center md:text-left space-y-2">
                    <h1 className="text-4xl font-heading font-bold text-white neon-text">PILOT THRIVIKRAM</h1>
                    <p className="text-gray-400 font-sans text-lg">Specialization: Microcontrollers & Robotics</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                        <div className="px-4 py-2 rounded bg-white/5 border border-white/10 flex flex-col items-center min-w-[100px]">
                            <span className="text-xs text-neon-cyan font-heading font-bold tracking-wider">TOTAL XP</span>
                            <span className="text-xl font-bold text-white font-heading">2,450</span>
                        </div>
                        <div className="px-4 py-2 rounded bg-white/5 border border-white/10 flex flex-col items-center min-w-[100px]">
                            <span className="text-xs text-neon-purple font-heading font-bold tracking-wider">MODULES</span>
                            <span className="text-xl font-bold text-white font-heading">12</span>
                        </div>
                        <div className="px-4 py-2 rounded bg-white/5 border border-white/10 flex flex-col items-center min-w-[100px]">
                            <span className="text-xs text-neon-blue font-heading font-bold tracking-wider">RANK</span>
                            <span className="text-xl font-bold text-white font-heading">#42</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Stats Radar */}
                <GlassCard className="md:col-span-1 flex flex-col items-center justify-center min-h-[300px]">
                    <h3 className="text-xl font-heading font-bold text-white mb-6 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-neon-cyan" /> SKILL MATRIX
                    </h3>
                    <HoloRadar stats={stats} />
                </GlassCard>

                {/* Badges Grid */}
                <GlassCard className="md:col-span-2">
                    <h3 className="text-xl font-heading font-bold text-white mb-6 flex items-center gap-2">
                        <Award className="w-5 h-5 text-neon-purple" /> ACHIEVEMENTS
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        {badges.map((badge, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <HoloBadge icon={badge.icon} label={badge.label} locked={badge.locked} />
                            </motion.div>
                        ))}
                    </div>
                </GlassCard>
            </div>

            {/* Recent Activity */}
            <GlassCard>
                <h3 className="text-xl font-heading font-bold text-white mb-6">FLIGHT LOG</h3>
                <div className="space-y-4">
                    {[1, 2, 3].map((_, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 rounded border-b border-white/5 hover:bg-white/5 transition-colors">
                            <div className="w-2 h-2 rounded-full bg-neon-cyan shadow-[0_0_5px_rgba(0,243,255,0.8)]" />
                            <div className="flex-1">
                                <p className="text-white font-sans font-medium">Completed "Ohm's Law" Simulation</p>
                                <p className="text-xs text-gray-500">2 hours ago</p>
                            </div>
                            <span className="text-neon-purple font-bold text-sm font-heading drop-shadow-[0_0_5px_rgba(188,19,254,0.5)]">+100 XP</span>
                        </div>
                    ))}
                </div>
            </GlassCard>
        </div>
    );
}
