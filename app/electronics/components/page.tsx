"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { electronicsData } from "@/lib/data";

export default function ComponentsPage() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <h1 className="text-4xl font-bold mb-10 text-white border-b border-white/10 pb-4">
                Basic <span className="text-neon-cyan">Components</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {electronicsData.components.map((component, index) => (
                    <Card key={component.name} className="overflow-hidden group">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="h-48 mb-4 overflow-hidden rounded-lg relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                                <img
                                    src={component.image}
                                    alt={component.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-neon-cyan">{component.name}</h3>
                            <p className="text-gray-400">{component.description}</p>
                        </motion.div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
