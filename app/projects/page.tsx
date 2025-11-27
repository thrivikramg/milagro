"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/GamificationComponents";
import { Plus, Trash2, CheckCircle, Circle, Lightbulb, MessageSquare, Users, ArrowRight } from "lucide-react";

// Types
interface Project {
    id: number;
    title: string;
    description: string;
    status: "planning" | "in-progress" | "completed";
    tasks: Task[];
    createdAt: string;
}

interface Task {
    id: number;
    text: string;
    completed: boolean;
}

interface ProjectIdea {
    id: number;
    title: string;
    description: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    components: string[];
    author: string;
    likes: number;
}

interface Message {
    id: number;
    author: string;
    text: string;
}

interface Community {
    id: number;
    name: string;
    description: string;
    members: number;
    messages: Message[];
}

export default function ProjectsPage() {
    // ----- Projects -----
    const [projects, setProjects] = useState<Project[]>([
        {
            id: 1,
            title: "LED Blink Circuit",
            description: "Basic circuit to make an LED blink using a 555 timer IC",
            status: "completed",
            tasks: [
                { id: 1, text: "Gather components (555 IC, LED, resistors, capacitors)", completed: true },
                { id: 2, text: "Design circuit schematic", completed: true },
                { id: 3, text: "Build on breadboard", completed: true },
                { id: 4, text: "Test and debug", completed: true },
            ],
            createdAt: "2024-01-15",
        },
        {
            id: 2,
            title: "Arduino Temperature Monitor",
            description: "Display temperature readings on LCD using DHT11 sensor",
            status: "in-progress",
            tasks: [
                { id: 1, text: "Connect DHT11 sensor to Arduino", completed: true },
                { id: 2, text: "Write code to read temperature", completed: true },
                { id: 3, text: "Connect LCD display", completed: false },
                { id: 4, text: "Display readings on LCD", completed: false },
            ],
            createdAt: "2024-02-01",
        },
    ]);

    const [showNewProjectForm, setShowNewProjectForm] = useState(false);
    const [newProjectTitle, setNewProjectTitle] = useState("");
    const [newProjectDescription, setNewProjectDescription] = useState("");

    // ----- Dream Projects -----
    const [dreamProjects, setDreamProjects] = useState<string[]>([]);
    const [newDream, setNewDream] = useState("");

    // ----- Community -----
    const [communities, setCommunities] = useState<Community[]>([
        { id: 1, name: "Project Ideas Hub", description: "Share and discover innovative project concepts.", members: 12, messages: [] },
        { id: 2, name: "Debug & Help", description: "Ask questions, discuss problems, get help.", members: 8, messages: [] },
    ]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newCommName, setNewCommName] = useState("");
    const [newCommDesc, setNewCommDesc] = useState("");
    const [activeCommunityId, setActiveCommunityId] = useState<number | null>(null);
    const [newMessage, setNewMessage] = useState("");

    // ----- Community Ideas -----
    const communityIdeas: ProjectIdea[] = [
        {
            id: 1,
            title: "Smart Plant Watering System",
            description: "Automated plant watering using soil moisture sensor and Arduino. Waters plants when soil is dry.",
            difficulty: "Beginner",
            components: ["Arduino Uno", "Soil Moisture Sensor", "Water Pump", "Relay Module"],
            author: "Sarah Chen",
            likes: 142,
        },
        {
            id: 2,
            title: "Bluetooth Controlled Robot Car",
            description: "Build a robot car controlled via smartphone Bluetooth. Includes obstacle avoidance.",
            difficulty: "Intermediate",
            components: ["Arduino", "HC-05 Bluetooth", "Motor Driver L298N", "Ultrasonic Sensor"],
            author: "Mike Rodriguez",
            likes: 98,
        },
        {
            id: 3,
            title: "Home Automation System",
            description: "Control lights, fans, and appliances using ESP8266 and mobile app.",
            difficulty: "Advanced",
            components: ["ESP8266", "Relay Modules", "MQTT Broker", "Mobile App"],
            author: "Alex Kumar",
            likes: 215,
        },
        {
            id: 4,
            title: "Digital Thermometer",
            description: "Simple digital thermometer using LM35 sensor and 7-segment display.",
            difficulty: "Beginner",
            components: ["LM35 Sensor", "7-Segment Display", "Arduino Nano"],
            author: "Emma Wilson",
            likes: 76,
        },
    ];

    // ----- YouTube Tutorials Data -----
    const youtubeChannels = [
        {
            id: 1,
            title: "Free Electronics Tutorials",
            url: "https://www.youtube.com/watch?v=Z1Yd7upQsXY",
        },
        {
            id: 2,
            title: "Arduino Basics",
            url: "https://www.youtube.com/watch?v=6Lz9e5F8b1c",
        },
        {
            id: 3,
            title: "DIY PCB Design",
            url: "https://www.youtube.com/watch?v=KfK8M4P5nK0",
        },
    ];

    // Helper to convert a normal YouTube link to an embed URL
    const getYouTubeEmbedUrl = (url: string) => {
        const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        const videoId = match ? match[1] : "";
        return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
    };

    // ----- Handlers -----
    const handleAddProject = () => {
        if (newProjectTitle.trim() && newProjectDescription.trim()) {
            const newProject: Project = {
                id: Date.now(),
                title: newProjectTitle,
                description: newProjectDescription,
                status: "planning",
                tasks: [],
                createdAt: new Date().toISOString().split('T')[0],
            };
            setProjects([...projects, newProject]);
            setNewProjectTitle("");
            setNewProjectDescription("");
            setShowNewProjectForm(false);
        }
    };

    const handleCreateCommunity = () => {
        if (newCommName.trim() && newCommDesc.trim()) {
            const newComm: Community = {
                id: Date.now(),
                name: newCommName.trim(),
                description: newCommDesc.trim(),
                members: 1,
                messages: [],
            };
            setCommunities([...communities, newComm]);
            setNewCommName("");
            setNewCommDesc("");
            setShowCreateForm(false);
        }
    };

    const handleJoinCommunity = (id: number) => {
        setCommunities(communities.map(c => c.id === id ? { ...c, members: c.members + 1 } : c));
    };

    const handleSendMessage = () => {
        if (activeCommunityId !== null && newMessage.trim()) {
            const msg: Message = { id: Date.now(), author: "You", text: newMessage.trim() };
            setCommunities(communities.map(c => c.id === activeCommunityId ? { ...c, messages: [...c.messages, msg] } : c));
            setNewMessage("");
        }
    };

    const handleDeleteProject = (id: number) => {
        setProjects(projects.filter(p => p.id !== id));
    };

    const handleToggleTask = (projectId: number, taskId: number) => {
        setProjects(projects.map(project => {
            if (project.id === projectId) {
                return { ...project, tasks: project.tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task) };
            }
            return project;
        }));
    };

    const handleAddTask = (projectId: number, taskText: string) => {
        if (taskText.trim()) {
            setProjects(projects.map(project => {
                if (project.id === projectId) {
                    return { ...project, tasks: [...project.tasks, { id: Date.now(), text: taskText, completed: false }] };
                }
                return project;
            }));
        }
    };

    const addDreamProject = () => {
        if (newDream.trim()) {
            setDreamProjects([...dreamProjects, newDream.trim()]);
            setNewDream("");
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed": return "text-green-400 border-green-400/50 bg-green-400/10";
            case "in-progress": return "text-neon-cyan border-neon-cyan/50 bg-neon-cyan/10";
            case "planning": return "text-neon-purple border-neon-purple/50 bg-neon-purple/10";
            default: return "text-gray-400 border-gray-400/50 bg-gray-400/10";
        }
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "Beginner": return "text-green-400 border-green-400/50 bg-green-400/10";
            case "Intermediate": return "text-yellow-400 border-yellow-400/50 bg-yellow-400/10";
            case "Advanced": return "text-red-400 border-red-400/50 bg-red-400/10";
            default: return "text-gray-400 border-gray-400/50 bg-gray-400/10";
        }
    };

    return (
        <div className="min-h-screen pt-20 pb-12 px-4 bg-gradient-to-br from-[#0d0d2b] to-[#1a1a40] text-white">
            <div className="max-w-5xl mx-auto space-y-12">
                {/* Header */}
                <h1 className="text-4xl font-heading font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-600">
                    Projects Lab
                </h1>

                {/* Community Section */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-heading font-bold text-white">Community</h2>
                    <div className="flex items-center justify-between mb-4">
                        <button onClick={() => setShowCreateForm(!showCreateForm)} className="flex items-center gap-2 px-4 py-2 bg-neon-cyan text-black font-heading font-bold rounded hover:bg-white transition">
                            <Plus className="w-5 h-5" /> Create Community
                        </button>
                    </div>
                    <AnimatePresence>
                        {showCreateForm && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                                <GlassCard className="p-6 border-neon-cyan/50 mb-6">
                                    <h3 className="text-lg font-heading font-bold mb-4">New Community</h3>
                                    <div className="space-y-4">
                                        <input type="text" value={newCommName} onChange={e => setNewCommName(e.target.value)} placeholder="Community name" className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400" />
                                        <textarea value={newCommDesc} onChange={e => setNewCommDesc(e.target.value)} placeholder="Description" rows={3} className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400" />
                                        <div className="flex gap-3">
                                            <button onClick={handleCreateCommunity} className="px-4 py-2 bg-pink-600 rounded-md hover:bg-pink-500 transition">Create</button>
                                            <button onClick={() => setShowCreateForm(false)} className="px-4 py-2 bg-white/10 text-white rounded-md hover:bg-white/20 transition">Cancel</button>
                                        </div>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div className="grid gap-6 md:grid-cols-2">
                        {communities.map(c => (
                            <GlassCard key={c.id} className="p-6 border-neon-cyan/30">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-heading font-bold">{c.name}</h3>
                                        <p className="text-sm opacity-80">{c.description}</p>
                                    </div>
                                    <button onClick={() => handleJoinCommunity(c.id)} className="flex items-center gap-1 px-3 py-1 bg-neon-cyan/20 text-neon-cyan rounded hover:bg-neon-cyan/40 transition">
                                        <Users className="w-4 h-4" /> Join ({c.members})
                                    </button>
                                </div>
                                <button onClick={() => setActiveCommunityId(c.id)} className="flex items-center gap-2 text-pink-400 hover:text-pink-300">
                                    <MessageSquare className="w-4 h-4" /> Open Discussion
                                </button>
                            </GlassCard>
                        ))}
                    </div>
                    {activeCommunityId !== null && (
                        <GlassCard className="mt-8 p-6 border-pink-500/30">
                            <h3 className="text-2xl font-heading font-bold mb-4">{communities.find(c => c.id === activeCommunityId)?.name} – Discussion</h3>
                            <div className="max-h-64 overflow-y-auto space-y-3 mb-4">
                                {communities.find(c => c.id === activeCommunityId)?.messages.length === 0 ? (
                                    <p className="text-gray-400">No messages yet. Start the conversation!</p>
                                ) : (
                                    communities.find(c => c.id === activeCommunityId)?.messages.map(msg => (
                                        <div key={msg.id} className="flex items-start gap-2">
                                            <span className="font-medium text-pink-300">{msg.author}:</span>
                                            <span>{msg.text}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                            <div className="flex gap-2">
                                <input type="text" value={newMessage} onChange={e => setNewMessage(e.target.value)} placeholder="Write a message…" className="flex-1 bg-white/10 border border-white/20 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400" onKeyPress={e => e.key === 'Enter' && handleSendMessage()} />
                                <button onClick={handleSendMessage} className="flex items-center gap-1 px-4 py-2 bg-pink-600 rounded-md hover:bg-pink-500 transition">
                                    <ArrowRight className="w-4 h-4" /> Send
                                </button>
                            </div>
                        </GlassCard>
                    )}
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* My Projects */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-heading font-bold text-white">My Projects</h2>
                            <button onClick={() => setShowNewProjectForm(!showNewProjectForm)} className="flex items-center gap-2 px-4 py-2 bg-neon-cyan text-black font-heading font-bold rounded hover:bg-white transition">
                                <Plus className="w-5 h-5" /> NEW PROJECT
                            </button>
                        </div>
                        <AnimatePresence>
                            {showNewProjectForm && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                                    <GlassCard className="p-6 border-neon-cyan/50">
                                        <h3 className="text-lg font-heading font-bold mb-4">Create New Project</h3>
                                        <div className="space-y-4">
                                            <input type="text" value={newProjectTitle} onChange={e => setNewProjectTitle(e.target.value)} placeholder="e.g., Smart Home Controller" className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan" />
                                            <textarea value={newProjectDescription} onChange={e => setNewProjectDescription(e.target.value)} placeholder="Describe your project..." rows={3} className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan resize-none" />
                                            <div className="flex gap-3">
                                                <button onClick={handleAddProject} className="px-6 py-2 bg-neon-cyan text-black font-heading font-bold rounded hover:bg-white transition">CREATE</button>
                                                <button onClick={() => setShowNewProjectForm(false)} className="px-6 py-2 bg-white/10 text-white font-heading font-bold rounded hover:bg-white/20 transition">CANCEL</button>
                                            </div>
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <div className="space-y-4">
                            {projects.map(project => (
                                <ProjectCard key={project.id} project={project} onDelete={handleDeleteProject} onToggleTask={handleToggleTask} onAddTask={handleAddTask} getStatusColor={getStatusColor} />
                            ))}
                        </div>
                    </div>

                    {/* Community Ideas */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <Lightbulb className="w-6 h-6 text-neon-purple" />
                            <h2 className="text-2xl font-heading font-bold text-white">Project Ideas</h2>
                        </div>
                        <div className="space-y-4">
                            {communityIdeas.map(idea => (
                                <GlassCard key={idea.id} className="p-4 hover:bg-white/10 transition-colors">
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="text-lg font-heading font-bold text-white">{idea.title}</h3>
                                        <span className={`text-xs px-2 py-1 rounded border ${getDifficultyColor(idea.difficulty)}`}>{idea.difficulty}</span>
                                    </div>
                                    <p className="text-sm text-gray-300 mb-3">{idea.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {idea.components.slice(0, 2).map((c, i) => (
                                            <span key={i} className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded text-gray-400">{c}</span>
                                        ))}
                                        {idea.components.length > 2 && (
                                            <span className="text-xs px-2 py-1 text-gray-500">+{idea.components.length - 2} more</span>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-gray-400">
                                        <span>by {idea.author}</span>
                                        <span className="flex items-center gap-1"><span>👍</span> {idea.likes}</span>
                                    </div>
                                </GlassCard>
                            ))}
                        </div>
                    </div>
                </div>

                {/* YouTube Tutorials */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-heading font-bold text-white">Tutorials</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {youtubeChannels.map(channel => (
                            <GlassCard key={channel.id} className="p-4 bg-white/5 border-neon-cyan/30">
                                <h3 className="text-lg font-heading font-bold text-white mb-2">{channel.title}</h3>
                                <div className="relative" style={{ paddingTop: "56.25%" }}>
                                    <iframe
                                        src={getYouTubeEmbedUrl(channel.url)}
                                        title={channel.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="absolute top-0 left-0 w-full h-full rounded"
                                    ></iframe>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </div>

                {/* Dream Projects */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-heading font-bold text-white">Dream Projects</h2>
                    <div className="flex gap-2 mb-4">
                        <input type="text" value={newDream} onChange={e => setNewDream(e.target.value)} placeholder="What would you love to build?" className="flex-1 rounded-md bg-white/10 backdrop-blur-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-400" />
                        <button onClick={addDreamProject} className="px-4 py-2 bg-pink-600 rounded-md hover:bg-pink-500 transition">Add</button>
                    </div>
                    <ul className="space-y-2">
                        {dreamProjects.map((d, i) => (
                            <li key={i} className="bg-white/5 backdrop-blur-sm rounded-md p-2 text-white">{d}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

function ProjectCard({ project, onDelete, onToggleTask, onAddTask, getStatusColor }: any) {
    const [newTaskText, setNewTaskText] = useState("");
    const [showAddTask, setShowAddTask] = useState(false);

    const handleAddTaskSubmit = () => {
        onAddTask(project.id, newTaskText);
        setNewTaskText("");
        setShowAddTask(false);
    };

    const completedTasks = project.tasks.filter((t: Task) => t.completed).length;
    const totalTasks = project.tasks.length;

    return (
        <GlassCard className="p-6 tech-border">
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-heading font-bold text-white">{project.title}</h3>
                        <span className={`text-xs px-3 py-1 rounded border uppercase ${getStatusColor(project.status)}`}>{project.status.replace("-", " ")}</span>
                    </div>
                    <p className="text-gray-400 text-sm">{project.description}</p>
                </div>
                <button onClick={() => onDelete(project.id)} className="text-red-400 hover:text-red-300 transition-colors ml-4">
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>
            {totalTasks > 0 && (
                <div className="mb-4">
                    <div className="flex justify-between text-xs mb-2">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-neon-cyan">{completedTasks}/{totalTasks} tasks</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-neon-cyan shadow-[0_0_10px_rgba(0,243,255,0.5)] transition-all duration-300" style={{ width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%` }}></div>
                    </div>
                </div>
            )}
            <div className="space-y-2 mb-4">
                {project.tasks.map((task: Task) => (
                    <div key={task.id} onClick={() => onToggleTask(project.id, task.id)} className="flex items-center gap-3 p-2 rounded hover:bg-white/5 cursor-pointer transition-colors">
                        {task.completed ? <CheckCircle className="w-5 h-5 text-green-400 shrink-0" /> : <Circle className="w-5 h-5 text-gray-500 shrink-0" />}
                        <span className={`text-sm ${task.completed ? "text-gray-500 line-through" : "text-gray-300"}`}>{task.text}</span>
                    </div>
                ))}
            </div>
            {showAddTask ? (
                <div className="flex gap-2">
                    <input type="text" value={newTaskText} onChange={e => setNewTaskText(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleAddTaskSubmit()} placeholder="New task..." className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan" autoFocus />
                    <button onClick={handleAddTaskSubmit} className="px-4 py-2 bg-neon-cyan text-black font-bold text-sm rounded hover:bg-white transition-colors">ADD</button>
                </div>
            ) : (
                <button onClick={() => setShowAddTask(true)} className="text-sm text-neon-cyan hover:text-white transition-colors flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add task
                </button>
            )}
        </GlassCard>
    );
}
