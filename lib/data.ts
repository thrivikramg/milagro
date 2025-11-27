export interface Lesson {
    id: number;
    title: string;
    duration: string;
    videoUrl: string;
    description?: string;
    notes?: string;
}

export interface Course {
    id: string;
    title: string;
    category: string;
    description: string;
    image: string;
    lessons: Lesson[];
}

export const courses: Course[] = [
    {
        id: "basics",
        title: "Basics of Electronics",
        category: "Electronics",
        description: "Introduction to voltage, current, resistance, and basic components.",
        image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1000",
        lessons: [
            { id: 1, title: "What is Electricity?", duration: "12:45", videoUrl: "https://www.youtube.com/watch?v=mc979OhitAg" },
            { id: 2, title: "Voltage, Current & Resistance Explained", duration: "15:20", videoUrl: "https://www.youtube.com/watch?v=mc979OhitAg" },
            { id: 3, title: "Understanding Ohm's Law", duration: "10:30", videoUrl: "https://www.youtube.com/watch?v=HsLLq6Rm5tU" },
            { id: 4, title: "Series vs Parallel Circuits", duration: "14:15", videoUrl: "https://www.youtube.com/watch?v=VV6tZ3Aqfuc" },
            { id: 5, title: "Introduction to Resistors", duration: "11:50", videoUrl: "https://www.youtube.com/watch?v=7w5I-KbJ1_Y" },
            { id: 6, title: "Reading Resistor Color Codes", duration: "8:25", videoUrl: "https://www.youtube.com/watch?v=THTXMgHdZ_g" },
        ],
    },
    {
        id: "fundamentals",
        title: "Volume I: Circuit Fundamentals",
        category: "Electronics",
        description: "A comprehensive guide to the laws of electronics. Covers Voltage, Current, and Resistance.",
        image: "https://images.unsplash.com/photo-1517420704952-d9f3971d3321?auto=format&fit=crop&q=80&w=1000",
        lessons: [
            {
                id: 1,
                title: "Introduction to Circuit Analysis",
                duration: "18:00",
                videoUrl: "https://www.youtube.com/watch?v=VV6tZ3Aqfuc",
                description: "Learn the fundamental concepts of circuit analysis including series and parallel circuits. This video covers how current flows through different circuit configurations and how to calculate total resistance. You'll understand the difference between series circuits (where current has only one path) and parallel circuits (where current can take multiple paths).",
                notes: "This is your foundation! Pay close attention to the systematic approach. Circuit analysis is like solving a puzzle - once you understand the rules, everything clicks into place."
            },
            {
                id: 2,
                title: "Kirchhoff's Current Law (KCL)",
                duration: "16:30",
                videoUrl: "https://www.youtube.com/watch?v=HsLLq6Rm5tU",
                description: "Master Ohm's Law, the most fundamental equation in electronics: V = I × R. This video explains the relationship between voltage, current, and resistance with practical examples. You'll learn how to calculate any unknown value when you know the other two, and understand how these three quantities interact in real circuits.",
                notes: "Remember: Current IN = Current OUT at any node. Think of it like water flowing through pipes - what goes in must come out! Practice with at least 5 different circuits."
            },
            {
                id: 3,
                title: "Kirchhoff's Voltage Law (KVL)",
                duration: "17:45",
                videoUrl: "https://www.youtube.com/watch?v=mc979OhitAg",
                description: "Discover what electricity really is at the atomic level. This video explains electrons, current flow, voltage potential, and the basic principles that make all electronic devices work. You'll understand the difference between AC and DC, and learn about conductors, insulators, and semiconductors.",
                notes: "The voltage around any closed loop = 0. Imagine walking around a hill - you end up at the same height you started! Draw the loop direction first, then apply signs carefully."
            },
            {
                id: 4,
                title: "Node Voltage Analysis",
                duration: "22:10",
                videoUrl: "https://www.youtube.com/watch?v=mc979OhitAg",
                description: "Deep dive into electrical fundamentals covering voltage (electrical pressure), current (flow of electrons), and resistance (opposition to flow). This comprehensive video uses water analogies to make these abstract concepts concrete and easy to understand. Perfect for building a solid foundation in electronics.",
                notes: "This technique is POWERFUL for complex circuits. Pick a ground node wisely (usually the one with most connections). Write KCL at each node, then solve the system of equations."
            },
            {
                id: 5,
                title: "Mesh Current Analysis",
                duration: "20:35",
                videoUrl: "https://www.youtube.com/watch?v=7w5I-KbJ1_Y",
                description: "Learn everything about resistors - the most common electronic component. This video covers resistor types, power ratings, tolerance, and how to select the right resistor for your circuit. You'll understand fixed vs variable resistors, and when to use each type in practical applications.",
                notes: "Alternative to node analysis - sometimes easier! Define mesh currents in the same direction (clockwise is standard). Great for circuits with many voltage sources."
            },
            {
                id: 6,
                title: "Thevenin's Theorem",
                duration: "19:20",
                videoUrl: "https://www.youtube.com/watch?v=THTXMgHdZ_g",
                description: "Master the resistor color code system used to identify resistor values. This video teaches you how to read the colored bands on resistors to determine their resistance value and tolerance. Includes memory tricks and practice examples to help you quickly identify resistor values in any circuit.",
                notes: "This is a game-changer! Any complex circuit can be simplified to ONE voltage source + ONE resistor. Super useful for analyzing loads. Master this!"
            },
            {
                id: 7,
                title: "Norton's Theorem",
                duration: "18:50",
                videoUrl: "https://www.youtube.com/watch?v=HsLLq6Rm5tU",
                description: "Advanced application of Ohm's Law with practical problem-solving techniques. This video shows you how to apply V = I × R in complex scenarios, including circuits with multiple resistors. You'll learn systematic approaches to circuit analysis and common pitfalls to avoid.",
                notes: "Norton is Thevenin's twin - current source instead of voltage source. You can convert between them easily. Use whichever makes your calculation simpler."
            },
            {
                id: 8,
                title: "Superposition Theorem",
                duration: "21:15",
                videoUrl: "https://www.youtube.com/watch?v=VV6tZ3Aqfuc",
                description: "Comprehensive comparison of series and parallel circuit configurations. This video explains how components behave differently in each configuration, how to calculate equivalent resistance, and practical applications of each type. Includes real-world examples and troubleshooting tips.",
                notes: "When you have multiple sources, analyze each one separately (turn off others), then add the results. Only works for LINEAR circuits - remember this limitation!"
            },
        ],
    },
    {
        id: "components",
        title: "Volume II: Component Mastery",
        category: "Electronics",
        description: "Detailed studies of core components: Resistors, Capacitors, and Inductors.",
        image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1000",
        lessons: [
            { id: 1, title: "Deep Dive into Capacitors", duration: "24:30", videoUrl: "https://www.youtube.com/watch?v=mc979OhitAg" },
            { id: 2, title: "Capacitor Types and Applications", duration: "19:45", videoUrl: "https://www.youtube.com/watch?v=mc979OhitAg" },
            { id: 3, title: "RC Circuits and Time Constants", duration: "26:15", videoUrl: "https://www.youtube.com/watch?v=mc979OhitAg" },
            { id: 4, title: "Introduction to Inductors", duration: "22:40", videoUrl: "https://www.youtube.com/watch?v=THTXMgHdZ_g" },
            { id: 5, title: "RL Circuits", duration: "23:55", videoUrl: "https://www.youtube.com/watch?v=THTXMgHdZ_g" },
            { id: 6, title: "Transformers Explained", duration: "28:10", videoUrl: "https://www.youtube.com/watch?v=7w5I-KbJ1_Y" },
            { id: 7, title: "Diodes and Rectification", duration: "25:20", videoUrl: "https://www.youtube.com/watch?v=VV6tZ3Aqfuc" },
            { id: 8, title: "Zener Diodes and Voltage Regulation", duration: "20:30", videoUrl: "https://www.youtube.com/watch?v=VV6tZ3Aqfuc" },
        ],
    },
    {
        id: "arduino",
        title: "Volume III: Digital Logic",
        category: "Microcontrollers",
        description: "Introduction to microcontrollers and the art of programming logic.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
        lessons: [
            { id: 1, title: "Introduction to Arduino", duration: "15:40", videoUrl: "https://www.youtube.com/watch?v=nL34zDTPkcs" },
            { id: 2, title: "Arduino IDE Setup", duration: "12:20", videoUrl: "https://www.youtube.com/watch?v=nL34zDTPkcs" },
            { id: 3, title: "Digital Input and Output", duration: "18:35", videoUrl: "https://www.youtube.com/watch?v=fJWR7dBuc18" },
            { id: 4, title: "Analog Input with Sensors", duration: "21:15", videoUrl: "https://www.youtube.com/watch?v=fJWR7dBuc18" },
            { id: 5, title: "PWM and Analog Output", duration: "19:50", videoUrl: "https://www.youtube.com/watch?v=fJWR7dBuc18" },
            { id: 6, title: "Serial Communication", duration: "17:25", videoUrl: "https://www.youtube.com/watch?v=c7AHVQ_2Bxg" },
            { id: 7, title: "Working with LCD Displays", duration: "23:10", videoUrl: "https://www.youtube.com/watch?v=wEbGhYjn4QI" },
            { id: 8, title: "Motor Control with Arduino", duration: "25:45", videoUrl: "https://www.youtube.com/watch?v=fJWR7dBuc18" },
            { id: 9, title: "Building Your First Arduino Project", duration: "32:20", videoUrl: "https://www.youtube.com/watch?v=nL34zDTPkcs" },
        ],
    },
];

export const electronicsData = {
    components: [
        { name: "Resistor", description: "Limits current flow in a circuit.", image: "https://images.unsplash.com/photo-1580894742597-87bc8789db3d?auto=format&fit=crop&q=80&w=500" },
        { name: "Capacitor", description: "Stores electrical energy in an electric field.", image: "https://images.unsplash.com/photo-1628126235206-5260b9ea6441?auto=format&fit=crop&q=80&w=500" },
        { name: "Transistor", description: "Semiconductor device used to amplify or switch electrical signals.", image: "https://images.unsplash.com/photo-1555664424-778a6902201b?auto=format&fit=crop&q=80&w=500" },
        { name: "Diode", description: "Allows current to flow in only one direction.", image: "https://images.unsplash.com/photo-1631553128966-26798246d821?auto=format&fit=crop&q=80&w=500" },
        { name: "IC (Integrated Circuit)", description: "A set of electronic circuits on one small flat piece of semiconductor material.", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=500" },
    ],
    applications: [
        { name: "Power Systems", description: "Generation, transmission, and distribution of electric power.", icon: "Zap" },
        { name: "Embedded Systems", description: "Computing systems with a dedicated function within a larger mechanical or electrical system.", icon: "Cpu" },
        { name: "IoT", description: "Network of physical objects embedded with sensors and software.", icon: "Wifi" },
        { name: "Robotics", description: "Design, construction, operation, and use of robots.", icon: "Bot" },
    ],
    resources: [
        { title: "Basic Electronics Tutorial", type: "PDF", link: "#" },
        { title: "Arduino for Beginners", type: "Video", link: "#" },
        { title: "Circuit Analysis Techniques", type: "PDF", link: "#" },
    ],
};
