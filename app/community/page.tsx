"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/GamificationComponents";
import { Plus, Users, MessageSquare, ArrowRight, Check } from "lucide-react";

// Types
interface Community {
    id: number;
    name: string;
    description: string;
    members: number;
    messages: Message[];
}

interface Message {
    id: number;
    author: string;
    text: string;
}

export default function CommunityPage() {
    // ----- Communities -----
    const [communities, setCommunities] = useState<Community[]>([
        {
            id: 1,
            name: "Project Ideas Hub",
            description: "Share and discover innovative project concepts.",
            members: 12,
            messages: [],
        },
        {
            id: 2,
            name: "Debug & Help",
            description: "Ask questions, discuss problems, get help.",
            members: 8,
            messages: [],
        },
    ]);

    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newName, setNewName] = useState("");
    const [newDesc, setNewDesc] = useState("");

    // ----- Create Community -----
    const handleCreate = () => {
        if (newName.trim() && newDesc.trim()) {
            const newCommunity: Community = {
                id: Date.now(),
                name: newName.trim(),
                description: newDesc.trim(),
                members: 1, // creator is first member
                messages: [],
            };
            setCommunities([...communities, newCommunity]);
            setNewName("");
            setNewDesc("");
            setShowCreateForm(false);
        }
    };

    // ----- Join Community -----
    const handleJoin = (id: number) => {
        setCommunities(
            communities.map((c) =>
                c.id === id ? { ...c, members: c.members + 1 } : c
            )
        );
    };

    // ----- Discussion -----
    const [activeCommunityId, setActiveCommunityId] = useState<number | null>(null);
    const [newMessage, setNewMessage] = useState("");

    const activeCommunity = communities.find((c) => c.id === activeCommunityId);

    const handleSendMessage = () => {
        if (activeCommunity && newMessage.trim()) {
            const msg: Message = {
                id: Date.now(),
                author: "You",
                text: newMessage.trim(),
            };
            setCommunities(
                communities.map((c) =>
                    c.id === activeCommunity.id
                        ? { ...c, messages: [...c.messages, msg] }
                        : c
                )
            );
            setNewMessage("");
        }
    };

    return (
        <div className="min-h-screen pt-20 pb-12 px-4 bg-gradient-to-br from-[#0d0d2b] to-[#1a1a40] text-white">
            <div className="max-w-5xl mx-auto space-y-12">
                {/* Header */}
                <h1 className="text-4xl font-heading font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-600">
                    Community Hub
                </h1>

                {/* Create / Join Section */}
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-heading font-semibold">Communities</h2>
                    <button
                        onClick={() => setShowCreateForm(!showCreateForm)}
                        className="flex items-center gap-2 px-4 py-2 bg-neon-cyan text-black font-heading font-bold rounded hover:bg-white transition"
                    >
                        <Plus className="w-5 h-5" /> Create Community
                    </button>
                </div>

                {/* Create Community Form */}
                <AnimatePresence>
                    {showCreateForm && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <GlassCard className="p-6 border-neon-cyan/50 mb-6">
                                <h3 className="text-lg font-heading font-bold mb-4">New Community</h3>
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                        placeholder="Community name"
                                        className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                                    />
                                    <textarea
                                        value={newDesc}
                                        onChange={(e) => setNewDesc(e.target.value)}
                                        placeholder="Description"
                                        rows={3}
                                        className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                                    />
                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleCreate}
                                            className="px-4 py-2 bg-pink-600 rounded-md hover:bg-pink-500 transition"
                                        >
                                            Create
                                        </button>
                                        <button
                                            onClick={() => setShowCreateForm(false)}
                                            className="px-4 py-2 bg-white/10 text-white rounded-md hover:bg-white/20 transition"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Communities List */}
                <div className="grid gap-6 md:grid-cols-2">
                    {communities.map((c) => (
                        <GlassCard key={c.id} className="p-6 border-neon-cyan/30">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-heading font-bold">{c.name}</h3>
                                    <p className="text-sm opacity-80">{c.description}</p>
                                </div>
                                <button
                                    onClick={() => handleJoin(c.id)}
                                    className="flex items-center gap-1 px-3 py-1 bg-neon-cyan/20 text-neon-cyan rounded hover:bg-neon-cyan/40 transition"
                                >
                                    <Users className="w-4 h-4" /> Join ({c.members})
                                </button>
                            </div>
                            <button
                                onClick={() => setActiveCommunityId(c.id)}
                                className="flex items-center gap-2 text-pink-400 hover:text-pink-300"
                            >
                                <MessageSquare className="w-4 h-4" /> Open Discussion
                            </button>
                        </GlassCard>
                    ))}
                </div>

                {/* Discussion Panel */}
                {activeCommunity && (
                    <GlassCard className="mt-8 p-6 border-pink-500/30">
                        <h2 className="text-2xl font-heading font-bold mb-4">
                            {activeCommunity.name} – Discussion
                        </h2>
                        <div className="max-h-64 overflow-y-auto space-y-3 mb-4">
                            {activeCommunity.messages.length === 0 ? (
                                <p className="text-gray-400">No messages yet. Start the conversation!</p>
                            ) : (
                                activeCommunity.messages.map((msg) => (
                                    <div key={msg.id} className="flex items-start gap-2">
                                        <span className="font-medium text-pink-300">{msg.author}:</span>
                                        <span>{msg.text}</span>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Write a message…"
                                className="flex-1 bg-white/10 border border-white/20 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                            />
                            <button
                                onClick={handleSendMessage}
                                className="flex items-center gap-1 px-4 py-2 bg-pink-600 rounded-md hover:bg-pink-500 transition"
                            >
                                <ArrowRight className="w-4 h-4" /> Send
                            </button>
                        </div>
                    </GlassCard>
                )}
            </div>
        </div>
    );
}
