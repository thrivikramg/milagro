"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Trophy, Flame, Book, Star } from "lucide-react";
import { courses } from "@/lib/data";

export default function DashboardPage() {
    const [stats, setStats] = useState({
        completedLessons: 0,
        streak: 3,
        xp: 1250,
    });

    const [recentCourses, setRecentCourses] = useState<any[]>([]);

    useEffect(() => {
        // Simulate loading stats from local storage or API
        // In a real app, this would be a fetch call
        const loadedCourses = courses.slice(0, 2); // Mock recent courses
        setRecentCourses(loadedCourses);
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10"
            >
                <h1 className="text-4xl font-bold text-white mb-2">
                    Welcome back, <span className="text-neon-cyan">Cadet</span>
                </h1>
                <p className="text-gray-400">Your anti-gravity training is progressing well.</p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <Card className="flex items-center gap-4 p-6 border-neon-purple/30">
                    <div className="w-12 h-12 rounded-full bg-neon-purple/20 flex items-center justify-center text-neon-purple">
                        <Book className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">Lessons Completed</p>
                        <h3 className="text-2xl font-bold text-white">{stats.completedLessons} / 50</h3>
                    </div>
                </Card>

                <Card className="flex items-center gap-4 p-6 border-holo-pink/30">
                    <div className="w-12 h-12 rounded-full bg-holo-pink/20 flex items-center justify-center text-holo-pink">
                        <Flame className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">Day Streak</p>
                        <h3 className="text-2xl font-bold text-white">{stats.streak} Days</h3>
                    </div>
                </Card>

                <Card className="flex items-center gap-4 p-6 border-neon-cyan/30">
                    <div className="w-12 h-12 rounded-full bg-neon-cyan/20 flex items-center justify-center text-neon-cyan">
                        <Trophy className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">Total XP</p>
                        <h3 className="text-2xl font-bold text-white">{stats.xp} XP</h3>
                    </div>
                </Card>
            </div>

            {/* Recent Activity */}
            <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recentCourses.map((course, index) => (
                    <motion.div
                        key={course.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="flex gap-4 p-4 hover:bg-white/5 transition-colors cursor-pointer">
                            <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <h3 className="font-bold text-white mb-1">{course.title}</h3>
                                <span className="text-xs text-neon-cyan border border-neon-cyan/30 px-2 py-0.5 rounded-full w-fit mb-2">
                                    {course.category}
                                </span>
                                <div className="w-full bg-white/10 h-1.5 rounded-full mt-auto">
                                    <div className="bg-neon-cyan h-1.5 rounded-full w-[45%]" />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">45% Complete</p>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
