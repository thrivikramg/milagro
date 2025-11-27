export const chatbotRules = [
    // Electronics Components
    {
        keywords: ["resistor", "resistance", "ohm"],
        response: "A resistor limits current flow and divides voltage. It's fundamental for circuit protection and signal conditioning. Unit: Ohms (Ω).",
    },
    {
        keywords: ["capacitor", "capacitance", "store charge"],
        response: "A capacitor stores electrical energy in an electric field. Used for filtering, smoothing power supplies, and timing circuits. Unit: Farads (F).",
    },
    {
        keywords: ["inductor", "inductance", "coil"],
        response: "An inductor stores energy in a magnetic field when current flows through it. It opposes changes in current flow. Unit: Henry (H).",
    },
    {
        keywords: ["diode", "led", "rectifier"],
        response: "A diode allows current to flow in only one direction. LEDs are diodes that emit light. Rectifiers convert AC to DC.",
    },
    {
        keywords: ["transistor", "bjt", "mosfet", "switch", "amplify"],
        response: "Transistors are semiconductor devices used to amplify or switch electrical signals. They are the building blocks of modern electronics.",
    },
    {
        keywords: ["ic", "integrated circuit", "chip"],
        response: "An Integrated Circuit (IC) contains thousands or millions of transistors, resistors, and capacitors on a small chip to perform complex functions.",
    },

    // Concepts & Laws
    {
        keywords: ["ohm's law", "ohms law", "v=ir"],
        response: "Ohm's Law (V = IR) relates Voltage (V), Current (I), and Resistance (R). It's the most important formula in electronics.",
    },
    {
        keywords: ["kirchhoff", "kcl", "kvl"],
        response: "Kirchhoff's Laws describe how current and voltage behave in circuit loops and junctions (Conservation of Charge and Energy).",
    },
    {
        keywords: ["ac", "alternating current"],
        response: "AC (Alternating Current) changes direction periodically. It's used for power distribution grid because it's easy to transform voltages.",
    },
    {
        keywords: ["dc", "direct current"],
        response: "DC (Direct Current) flows in one direction. Used in batteries, solar panels, and digital electronics.",
    },
    {
        keywords: ["power", "watt"],
        response: "Electric Power (P) is the rate of energy transfer. Formula: P = V * I. Unit: Watts (W).",
    },

    // Microcontrollers
    {
        keywords: ["arduino", "uno", "mega"],
        response: "Arduino is an open-source platform based on easy-to-use hardware and software, perfect for prototyping interactive projects.",
    },
    {
        keywords: ["raspberry pi", "rpi", "linux"],
        response: "Raspberry Pi is a small, affordable single-board computer that runs Linux. Great for IoT, media centers, and learning programming.",
    },
    {
        keywords: ["bye", "goodbye", "exit"],
        response: "Farewell! May your potential always be high and your resistance low.",
    },
    {
        keywords: ["who are you", "what are you"],
        response: "I am a holographic AI assistant designed to help you navigate the Anti-Gravity E-Learning Platform.",
    },
];

export const generalResponses = [
    "That's an interesting topic in electronics. Could you be more specific?",
    "I'm currently calibrated for basic electronics queries. Try asking about components like resistors or capacitors.",
    "My databanks are focused on our course material. Can I help you find a specific lesson?",
    "I'm operating in offline mode. Please ask about standard components or definitions.",
    "To give you the best answer, could you rephrase that in the context of our electronics courses?",
];
