"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "@/context/ChatContext";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { toggleChat } = useChat();

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/courses", label: "Courses" },
        { href: "/electronics", label: "Electronics" },
        { href: "/dashboard", label: "Dashboard" },
        { href: "/projects", label: "Projects" },
    ];

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/90 border-b border-slate-800">
            <div className="container mx-auto">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-cyan to-cosmic-blue flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                            <div className="absolute -top-1 -right-1 led-indicator led-indicator-blue"></div>
                        </div>
                        <div>
                            <span className="text-xl font-bold text-slate-50">
                                Electronics Academy
                            </span>
                            <p className="text-xs text-slate-400">Learn. Build. Innovate.</p>
                        </div>
                    </Link>
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-4 py-2 rounded-lg font-medium ${link.label === "Projects" ? "text-neon-cyan" : "text-slate-300"} hover:text-neon-cyan hover:bg-slate-800 transition-all duration-200`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <button
                            onClick={toggleChat}
                            className="ml-4 px-5 py-2 bg-gradient-to-r from-neon-cyan to-cosmic-blue text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-neon-cyan/50 transition-all"
                        >
                            AI Chat
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-neon-cyan transition-colors"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div >

            {/* Mobile Navigation */}
            <AnimatePresence>
                {
                    isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-slate-800/95 border-t border-slate-700"
                        >
                            <div className="container mx-auto px-4 py-4 space-y-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="block px-4 py-3 rounded-lg text-slate-300 font-medium hover:text-neon-cyan hover:bg-slate-700 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <button
                                    onClick={() => {
                                        toggleChat();
                                        setIsOpen(false);
                                    }}
                                    className="w-full px-4 py-3 bg-gradient-to-r from-neon-cyan to-cosmic-blue text-white rounded-lg font-semibold"
                                >
                                    AI Chat
                                </button>
                            </div>
                        </motion.div>
                    )
                }
            </AnimatePresence >
        </nav >
    );
}
