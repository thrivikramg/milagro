"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { electronicsData } from "@/lib/data";
import { FileText, Video, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ResourcesPage() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <h1 className="text-4xl font-bold mb-10 text-white border-b border-white/10 pb-4">
                Learning <span className="text-holo-pink">Resources</span>
            </h1>

            <div className="grid grid-cols-1 gap-4">
                {electronicsData.resources.map((resource, index) => (
                    <motion.div
                        key={resource.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="flex items-center justify-between p-6 hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center text-holo-pink">
                                    {resource.type === "PDF" ? <FileText className="w-6 h-6" /> : <Video className="w-6 h-6" />}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">{resource.title}</h3>
                                    <span className="text-xs text-gray-500 uppercase tracking-wider">{resource.type}</span>
                                </div>
                            </div>
                            <Button variant="outline" size="sm" className="gap-2">
                                <Download className="w-4 h-4" /> Download
                            </Button>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
