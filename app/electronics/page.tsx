"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Cpu, Zap, BookOpen, ArrowRight } from "lucide-react";

const sections = [
    {
        title: "Components",
        description: "Deep dive into resistors, capacitors, transistors, and more.",
        href: "/electronics/components",
        icon: Cpu,
        color: "text-neon-cyan",
        border: "border-neon-cyan/50",
    },
    {
        title: "Applications",
        description: "Explore real-world uses in IoT, Robotics, and Power Systems.",
        href: "/electronics/applications",
        icon: Zap,
        color: "text-neon-purple",
        border: "border-neon-purple/50",
    },
    {
        title: "Resources",
        description: "Access datasheets, tutorials, and video guides.",
        href: "/electronics/resources",
        icon: BookOpen,
        color: "text-holo-pink",
        border: "border-holo-pink/50",
    },
];

export default function ElectronicsPage() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h1 className="text-5xl font-bold mb-4 text-white">
                    Electronics <span className="text-neon-cyan">Hub</span>
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Your central station for hardware knowledge. Select a module to begin your journey.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {sections.map((section, index) => (
                    <Link href={section.href} key={section.title}>
                        <Card
                            className={`h-full flex flex-col items-center text-center p-10 group cursor-pointer border-white/10 hover:${section.border} transition-colors`}
                            hoverEffect={true}
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.2, type: "spring" }}
                                className={`w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 ${section.color} group-hover:scale-110 transition-transform duration-300`}
                            >
                                <section.icon className="w-10 h-10" />
                            </motion.div>
                            <h2 className="text-2xl font-bold mb-3 text-white">{section.title}</h2>
                            <p className="text-gray-400 mb-8">{section.description}</p>
                            <span className={`mt-auto flex items-center gap-2 text-sm font-bold uppercase tracking-wider ${section.color}`}>
                                Enter Module <ArrowRight className="w-4 h-4" />
                            </span>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
