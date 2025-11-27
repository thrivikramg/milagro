"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { courses } from "@/lib/data";
import { ArrowRight, BookOpen } from "lucide-react";

export default function CoursesPage() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 text-center"
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                    Available <span className="text-neon-cyan">Courses</span>
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Explore our comprehensive curriculum designed to take you from zero to hero in engineering and technology.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course, index) => (
                    <Link href={`/courses/${course.id}`} key={course.id}>
                        <Card
                            className="h-full flex flex-col group cursor-pointer border-white/10 hover:border-neon-purple/50 transition-colors"
                            hoverEffect={true}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="h-full flex flex-col"
                            >
                                <div className="h-48 mb-4 overflow-hidden rounded-lg relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 right-3 z-20 bg-black/50 backdrop-blur-md p-2 rounded-full border border-white/10">
                                        <BookOpen className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="absolute bottom-3 left-3 z-20 bg-neon-purple/20 border border-neon-purple/50 text-neon-purple px-2 py-1 rounded text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                                        {course.category}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-neon-purple transition-colors">{course.title}</h3>
                                <p className="text-gray-400 text-sm mb-4 flex-1">{course.description}</p>
                                <div className="flex items-center justify-between text-xs text-gray-500 mt-auto border-t border-white/5 pt-4">
                                    <span>{course.lessons.length} Lessons</span>
                                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform text-neon-purple">
                                        View Course <ArrowRight className="w-3 h-3" />
                                    </span>
                                </div>
                            </motion.div>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
