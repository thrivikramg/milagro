"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { electronicsData } from "@/lib/data";
import { Zap, Cpu, Wifi, Bot } from "lucide-react";

const iconMap: any = {
    Zap,
    Cpu,
    Wifi,
    Bot,
};

export default function ApplicationsPage() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <h1 className="text-4xl font-bold mb-10 text-white border-b border-white/10 pb-4">
                Real-World <span className="text-neon-purple">Applications</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {electronicsData.applications.map((app, index) => {
                    const Icon = iconMap[app.icon] || Zap;
                    return (
                        <Card key={app.name} className="flex items-start gap-6 p-8 hover:border-neon-purple/50 transition-colors">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.1, type: "spring" }}
                                className="w-16 h-16 rounded-2xl bg-neon-purple/10 flex items-center justify-center flex-shrink-0 text-neon-purple"
                            >
                                <Icon className="w-8 h-8" />
                            </motion.div>
                            <div>
                                <h3 className="text-2xl font-bold mb-2 text-white">{app.name}</h3>
                                <p className="text-gray-400 leading-relaxed">{app.description}</p>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
