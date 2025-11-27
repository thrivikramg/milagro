"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GlassCard, HoloBadge } from "@/components/GamificationComponents";
import { CommsPanel } from "@/components/CommsPanel";
import { Layers, Zap, Cpu, Clock, Star, ChevronRight, Lock, Activity, Rocket, Globe, Shield, AlertCircle } from "lucide-react";

export default function Dashboard() {
  const activeStudies = [
    {
      id: 1,
      title: "Volume I: Circuit Fundamentals",
      subtitle: "The Laws of Voltage and Current",
      description: "Dive deep into the foundational principles of electrical engineering. Master Ohm's Law, Kirchhoff's Laws, and circuit analysis techniques that form the bedrock of all electronic systems.",
      notes: "Start here! Understanding voltage, current & resistance is crucial. Practice with real circuits.",
      progress: 45,
      xp: 500,
      status: "IN_PROGRESS",
      link: "/courses/fundamentals"
    },
    {
      id: 2,
      title: "Volume II: Microcontrollers",
      subtitle: "The Art of Digital Logic",
      description: "Unlock the power of programmable electronics. Learn to code microcontrollers, build embedded systems, and bring your circuits to life with intelligent control.",
      notes: "Complete Vol I first. You'll need to understand basic circuits before diving into digital logic.",
      progress: 0,
      xp: 800,
      status: "LOCKED",
      link: "/courses/arduino"
    }
  ];

  const dailyTasks = [
    { id: 1, title: "Analyze 5 Components", xp: 50, completed: true },
    { id: 2, title: "Simulate 'Ohm's Law'", xp: 100, completed: false },
    { id: 3, title: "Debug Circuit Diagram", xp: 150, completed: false },
  ];

  const features = [
    {
      icon: <Globe className="w-8 h-8 text-neon-cyan" />,
      title: "Immersive Simulations",
      desc: "Manipulate 3D circuits in a holographic environment."
    },
    {
      icon: <Rocket className="w-8 h-8 text-neon-purple" />,
      title: "Gamified Progression",
      desc: "Earn XP, rank up, and unlock advanced engineering modules."
    },
    {
      icon: <Cpu className="w-8 h-8 text-neon-blue" />,
      title: "Real-World Skills",
      desc: "Master industry-standard tools and concepts."
    }
  ];

  const systemUpdates = [
    { id: 1, title: "New Mission Available: 'Quantum Logic'", type: "MISSION", date: "2h ago" },
    { id: 2, title: "System Maintenance Scheduled", type: "SYSTEM", date: "5h ago" },
    { id: 3, title: "Pilot 'StarChaser' reached Elite Rank", type: "COMMUNITY", date: "1d ago" },
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 relative overflow-hidden">

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center max-w-7xl mx-auto mb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-mono text-neon-cyan tracking-widest">SYSTEM ONLINE // READY FOR LAUNCH</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-heading font-bold text-white mb-6 leading-tight">
            MASTER THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-purple neon-text">
              UNIVERSE
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 font-sans max-w-3xl mx-auto mb-12 leading-relaxed">
            Anti-Gravity is the ultimate platform for learning engineering through
            <span className="text-neon-cyan"> gamified missions</span> and
            <span className="text-neon-purple"> immersive simulations</span>.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Link href="/missions">
              <button className="px-8 py-4 bg-neon-cyan text-black font-heading font-bold text-lg rounded-sm hover:bg-white transition-colors shadow-[0_0_20px_rgba(0,243,255,0.4)] clip-path-slant">
                START MISSION
              </button>
            </Link>
            <Link href="/projects">
              <button className="px-8 py-4 bg-transparent border border-white/20 text-white font-heading font-bold text-lg rounded-sm hover:bg-white/5 transition-colors clip-path-slant">
                PROJECTS LAB
              </button>
            </Link>
          </div>
        </motion.div>

        {/* "What to Expect" Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 w-full">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.2 }}
            >
              <GlassCard className="h-full flex flex-col items-center text-center p-8 group hover:bg-white/5 transition-colors">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-white/10 group-hover:border-neon-cyan/50">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 font-sans">{feature.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>


      {/* Dashboard Section */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12 border-b border-white/10 pb-4">
          <Activity className="w-6 h-6 text-neon-cyan animate-pulse" />
          <h2 className="text-2xl font-heading font-bold text-white tracking-widest">
            MISSION CONTROL
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Column - Active Modules & Updates */}
          <div className="lg:col-span-2 space-y-12">

            {/* Active Modules */}
            <div className="space-y-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-heading font-bold text-gray-300 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-neon-blue" /> ACTIVE MODULES
                </h3>
                <span className="text-xs font-mono text-neon-cyan">SYNCING...</span>
              </div>

              {activeStudies.map((study, index) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={study.link} className={study.status === "LOCKED" ? "pointer-events-none" : ""}>
                    <div className={`relative group ${study.status === "LOCKED" ? "opacity-50 grayscale" : ""}`}>
                      {/* Tech Border Decoration */}
                      <div className="absolute -inset-[1px] bg-gradient-to-r from-neon-cyan/0 via-neon-cyan/50 to-neon-cyan/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

                      <GlassCard className="relative tech-border bg-[#050a14]/80">
                        <div className="flex flex-col gap-6">
                          {/* Top Section - Icon and Title */}
                          <div className="flex flex-col md:flex-row gap-6 items-start">
                            <div className={`w-24 h-24 shrink-0 rounded-sm border border-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] ${study.status === "LOCKED" ? "bg-white/5" : "bg-gradient-to-br from-neon-blue/10 to-neon-purple/10"}`}>
                              {study.status === "LOCKED" ? <Lock className="w-8 h-8 text-gray-500" /> : <Cpu className="w-10 h-10 text-neon-cyan animate-pulse-slow" />}
                            </div>

                            <div className="flex-1">
                              <h3 className="text-2xl font-heading font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors">
                                {study.title}
                              </h3>
                              <p className="text-gray-400 font-sans mb-3 font-light">{study.subtitle}</p>

                              {/* Description */}
                              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                                {study.description}
                              </p>

                              {study.status !== "LOCKED" && (
                                <div className="w-full">
                                  <div className="flex justify-between text-xs mb-2 font-mono">
                                    <span className="text-neon-cyan">SYNC STATUS</span>
                                    <span className="text-white">{study.progress}%</span>
                                  </div>
                                  <div className="h-1 bg-white/10 w-full">
                                    <div
                                      className="h-full bg-neon-cyan shadow-[0_0_10px_rgba(0,243,255,0.5)]"
                                      style={{ width: `${study.progress}%` }}
                                    />
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="flex flex-col items-center gap-2 min-w-[100px] border-l border-white/5 pl-6">
                              <span className="text-[10px] font-mono text-gray-500">REWARD</span>
                              <span className="text-xl font-bold text-neon-purple font-heading drop-shadow-[0_0_5px_rgba(188,19,254,0.5)]">
                                +{study.xp} XP
                              </span>
                              {study.status !== "LOCKED" && (
                                <ChevronRight className="w-5 h-5 text-neon-cyan group-hover:translate-x-2 transition-transform mt-2" />
                              )}
                            </div>
                          </div>

                          {/* Hand-written Notes Section */}
                          <div className="border-t border-white/10 pt-4 mt-2">
                            <div className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-neon-purple/20 border border-neon-purple/50 flex items-center justify-center shrink-0 mt-0.5">
                                <span className="text-xs text-neon-purple">✎</span>
                              </div>
                              <div className="flex-1">
                                <p className="text-xs font-mono text-gray-400 mb-1 uppercase tracking-wider">Instructor Notes</p>
                                <p className="text-sm text-neon-purple/90 italic leading-relaxed font-handwriting" style={{ fontFamily: "'Caveat', cursive" }}>
                                  {study.notes}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </GlassCard>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* System Updates Section */}
            <div>
              <h3 className="text-xl font-heading font-bold text-gray-300 flex items-center gap-2 mb-6">
                <AlertCircle className="w-5 h-5 text-neon-purple" /> SYSTEM UPDATES
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {systemUpdates.map((update) => (
                  <GlassCard key={update.id} className="p-4 hover:bg-white/5 transition-colors border-l-2 border-l-neon-purple">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-mono text-neon-cyan px-2 py-1 bg-neon-cyan/10 rounded-sm">{update.type}</span>
                      <span className="text-[10px] text-gray-500 font-mono">{update.date}</span>
                    </div>
                    <p className="text-white font-sans text-sm">{update.title}</p>
                  </GlassCard>
                ))}
              </div>
            </div>

          </div>

          {/* Side Column - Tasks, Status & Comms */}
          <div className="space-y-10">

            {/* Comms Panel */}
            <CommsPanel />

            {/* Daily Tasks */}
            <div>
              <h3 className="text-xl font-heading font-bold text-gray-300 flex items-center gap-3 mb-6">
                <Activity className="w-5 h-5 text-neon-purple" /> DAILY OPS
              </h3>
              <div className="space-y-4">
                {dailyTasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <div className={`p-4 rounded-sm border ${task.completed ? "bg-neon-cyan/5 border-neon-cyan/30" : "bg-white/5 border-white/10"} flex items-center justify-between backdrop-blur-sm transition-colors hover:bg-white/10`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 border flex items-center justify-center ${task.completed ? "border-neon-cyan bg-neon-cyan text-black" : "border-gray-600"}`}>
                          {task.completed && <Activity className="w-3 h-3" />}
                        </div>
                        <span className={`font-mono text-sm ${task.completed ? "text-neon-cyan line-through opacity-70" : "text-gray-300"}`}>
                          {task.title}
                        </span>
                      </div>
                      <span className="text-xs font-mono font-bold text-neon-purple">+{task.xp}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* System Status */}
            <GlassCard className="bg-gradient-to-b from-white/5 to-transparent tech-border">
              <h3 className="text-lg font-heading font-bold text-white mb-6 flex items-center gap-2 border-b border-white/10 pb-2">
                <Clock className="w-4 h-4 text-neon-blue" /> FLIGHT LOG
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-mono text-sm">PILOT RANK</span>
                  <span className="text-white font-bold font-heading">#42</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-mono text-sm">MODULES CLEARED</span>
                  <span className="text-white font-bold font-heading">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-mono text-sm">SYSTEM RATING</span>
                  <span className="text-neon-cyan font-bold font-heading drop-shadow-[0_0_5px_rgba(0,243,255,0.8)]">S-CLASS</span>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}

