"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { courses } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CheckCircle, PlayCircle, Lock, Download } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CourseDetailsPage() {
    const params = useParams();
    const courseId = params.id as string;
    const course = courses.find((c) => c.id === courseId);

    const [completedLessons, setCompletedLessons] = useState<number[]>([]);
    const [activeLesson, setActiveLesson] = useState<number>(1);
    const [showDownloadSuccess, setShowDownloadSuccess] = useState(false);

    // Handle PDF Download
    const handleDownload = () => {
        // Simulate PDF download
        const link = document.createElement('a');
        link.href = '#'; // In production, this would be the actual PDF URL
        link.download = `${course?.title.replace(/\s+/g, '_')}_Lesson_${activeLesson}.pdf`;
        link.click();

        // Show success message
        setShowDownloadSuccess(true);
        setTimeout(() => setShowDownloadSuccess(false), 3000);
    };

    // Load progress from local storage
    useEffect(() => {
        const savedProgress = localStorage.getItem(`course-progress-${courseId}`);
        if (savedProgress) {
            setCompletedLessons(JSON.parse(savedProgress));
        }
    }, [courseId]);

    // Save progress
    const toggleLessonCompletion = (lessonId: number) => {
        setCompletedLessons((prev) => {
            const newProgress = prev.includes(lessonId)
                ? prev.filter((id) => id !== lessonId)
                : [...prev, lessonId];

            localStorage.setItem(`course-progress-${courseId}`, JSON.stringify(newProgress));
            return newProgress;
        });
    };

    if (!course) {
        return <div className="text-center py-20 text-white">Course not found</div>;
    }

    const progress = Math.round((completedLessons.length / course.lessons.length) * 100);

    return (
        <div className="max-w-7xl mx-auto px-6 py-10 relative">
            {/* Download Success Popup */}
            <AnimatePresence>
                {showDownloadSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed top-24 right-6 z-50 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-lg shadow-[0_0_30px_rgba(34,197,94,0.5)] border border-green-400"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                <CheckCircle className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-heading font-bold">Download Successful!</p>
                                <p className="text-sm text-green-100">PDF saved to your downloads folder</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content (Video Player) */}
                <div className="lg:col-span-2 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="aspect-video bg-black rounded-xl overflow-hidden border border-white/10 relative group"
                    >
                        {(() => {
                            const activeVideo = course.lessons.find(l => l.id === activeLesson);
                            if (activeVideo?.videoUrl) {
                                // Extract YouTube video ID from URL
                                const getYouTubeId = (url: string) => {
                                    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
                                    const match = url.match(regExp);
                                    return (match && match[2].length === 11) ? match[2] : null;
                                };

                                const videoId = getYouTubeId(activeVideo.videoUrl);

                                return videoId ? (
                                    <iframe
                                        className="w-full h-full"
                                        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
                                        title={activeVideo.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <PlayCircle className="w-20 h-20 text-neon-cyan opacity-50" />
                                    </div>
                                );
                            }
                            return (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <PlayCircle className="w-20 h-20 text-neon-cyan opacity-50" />
                                </div>
                            );
                        })()}
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent pointer-events-none">
                            <h2 className="text-xl font-bold text-white">
                                {course.lessons.find(l => l.id === activeLesson)?.title || "Select a lesson"}
                            </h2>
                        </div>
                    </motion.div>

                    {/* Video Description */}
                    {course.lessons.find(l => l.id === activeLesson)?.description && (
                        <div className="space-y-2">
                            <h3 className="text-lg font-heading font-bold text-white">About this lesson</h3>
                            <p className="text-gray-300 leading-relaxed">
                                {course.lessons.find(l => l.id === activeLesson)?.description}
                            </p>

                            {/* Download PDF Button */}
                            <button
                                onClick={handleDownload}
                                className="mt-4 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-neon-cyan to-neon-blue text-black font-heading font-bold rounded-lg hover:shadow-[0_0_20px_rgba(0,243,255,0.5)] transition-all duration-300 group"
                            >
                                <Download className="w-5 h-5 group-hover:animate-bounce" />
                                DOWNLOAD LESSON PDF
                            </button>
                        </div>
                    )}

                    {/* Instructor Notes Section */}
                    {course.lessons.find(l => l.id === activeLesson)?.notes && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="border border-neon-purple/30 bg-gradient-to-br from-neon-purple/5 to-transparent rounded-xl p-6 backdrop-blur-sm"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-neon-purple/20 border border-neon-purple/50 flex items-center justify-center shrink-0">
                                    <span className="text-lg text-neon-purple">✎</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-mono text-gray-400 mb-2 uppercase tracking-wider flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-neon-purple animate-pulse"></span>
                                        Instructor Notes
                                    </h3>
                                    <p className="text-base text-neon-purple/90 italic leading-relaxed" style={{ fontFamily: "'Caveat', cursive", fontSize: "1.1rem" }}>
                                        {course.lessons.find(l => l.id === activeLesson)?.notes}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Comments Section */}
                    <div className="space-y-6 mt-8">
                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                            <h3 className="text-xl font-heading font-bold text-white">Discussion</h3>
                            <span className="text-sm text-gray-400">5 comments</span>
                        </div>

                        {/* Sample Comments */}
                        <div className="space-y-4">
                            {[
                                {
                                    id: 1,
                                    author: "Alex Chen",
                                    avatar: "AC",
                                    time: "2 days ago",
                                    comment: "This explanation is crystal clear! The water analogy really helped me understand current flow. I've been struggling with this concept for weeks. Thank you!",
                                    likes: 24
                                },
                                {
                                    id: 2,
                                    author: "Sarah Martinez",
                                    avatar: "SM",
                                    time: "5 days ago",
                                    comment: "Excellent video! Could you please make a follow-up covering more complex circuit analysis techniques? I'd love to see practical examples with real components.",
                                    likes: 18
                                },
                                {
                                    id: 3,
                                    author: "James Wilson",
                                    avatar: "JW",
                                    time: "1 week ago",
                                    comment: "The step-by-step approach is perfect for beginners. I'm building my first circuit board and this helped me understand why certain components are placed where they are.",
                                    likes: 31
                                },
                                {
                                    id: 4,
                                    author: "Maria Rodriguez",
                                    avatar: "MR",
                                    time: "1 week ago",
                                    comment: "As an engineering student, I wish my professors explained things this clearly. The visual diagrams make all the difference. Bookmarking this entire series!",
                                    likes: 42
                                },
                                {
                                    id: 5,
                                    author: "David Kim",
                                    avatar: "DK",
                                    time: "2 weeks ago",
                                    comment: "Just passed my electronics exam thanks to this course! The practice problems at the end were especially helpful. Keep up the amazing work! 🚀",
                                    likes: 56
                                }
                            ].map((comment) => (
                                <div key={comment.id} className="border border-white/10 bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center text-white font-bold text-sm shrink-0">
                                            {comment.avatar}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="font-heading font-bold text-white">{comment.author}</span>
                                                <span className="text-xs text-gray-500">•</span>
                                                <span className="text-xs text-gray-400">{comment.time}</span>
                                            </div>
                                            <p className="text-gray-300 leading-relaxed mb-3">{comment.comment}</p>
                                            <div className="flex items-center gap-4">
                                                <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-neon-cyan transition-colors">
                                                    <span>👍</span>
                                                    <span>{comment.likes}</span>
                                                </button>
                                                <button className="text-xs text-gray-400 hover:text-neon-cyan transition-colors">
                                                    Reply
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Add Comment Form */}
                        <div className="border border-white/10 bg-white/5 rounded-lg p-4">
                            <textarea
                                placeholder="Add a comment..."
                                className="w-full bg-transparent text-white placeholder-gray-500 resize-none focus:outline-none mb-3"
                                rows={3}
                            />
                            <div className="flex justify-end">
                                <button className="px-4 py-2 bg-neon-cyan text-black font-heading font-bold text-sm rounded hover:bg-white transition-colors">
                                    POST COMMENT
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold text-white">{course.title}</h1>
                        <p className="text-gray-400">{course.description}</p>
                    </div>
                </div>

                {/* Sidebar (Lesson List) */}
                <div className="space-y-6">
                    <Card className="p-6">
                        <h3 className="text-xl font-bold mb-4 text-white">Course Progress</h3>
                        <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                            <div
                                className="bg-neon-cyan h-2 rounded-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <p className="text-right text-sm text-neon-cyan">{progress}% Completed</p>
                    </Card>

                    <Card className="p-0 overflow-hidden">
                        <div className="p-4 border-b border-white/10 bg-white/5">
                            <h3 className="font-bold text-white">Curriculum</h3>
                        </div>
                        <div className="divide-y divide-white/5">
                            {course.lessons.map((lesson) => {
                                const isCompleted = completedLessons.includes(lesson.id);
                                const isActive = activeLesson === lesson.id;

                                return (
                                    <div
                                        key={lesson.id}
                                        className={cn(
                                            "p-4 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer",
                                            isActive && "bg-neon-cyan/10 border-l-2 border-neon-cyan"
                                        )}
                                        onClick={() => setActiveLesson(lesson.id)}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleLessonCompletion(lesson.id);
                                                }}
                                                className={cn(
                                                    "w-5 h-5 rounded-full border flex items-center justify-center transition-colors",
                                                    isCompleted
                                                        ? "bg-neon-cyan border-neon-cyan text-black"
                                                        : "border-gray-500 hover:border-neon-cyan"
                                                )}
                                            >
                                                {isCompleted && <CheckCircle className="w-3 h-3" />}
                                            </div>
                                            <div>
                                                <p className={cn("text-sm font-medium", isActive ? "text-neon-cyan" : "text-gray-300")}>
                                                    {lesson.title}
                                                </p>
                                                <p className="text-xs text-gray-500">{lesson.duration}</p>
                                            </div>
                                        </div>
                                        {isActive ? (
                                            <PlayCircle className="w-4 h-4 text-neon-cyan" />
                                        ) : (
                                            <Lock className="w-3 h-3 text-gray-600" />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
