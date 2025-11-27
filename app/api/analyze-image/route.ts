import { NextResponse } from "next/server";

const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;
// Using a model that supports image-to-text. 
const HF_VISION_MODEL = "llava-hf/llava-1.5-7b-hf";

const MOCK_RESPONSES = [
    "Analysis complete. I've identified a high-frequency switching power supply circuit. The large transformer and capacitor bank suggest it steps down mains voltage to a stable DC output, likely for sensitive electronics.",
    "Visual scan indicates a microcontroller development board, possibly based on the ATmega328P architecture. The GPIO headers and USB interface confirm it's designed for rapid prototyping and embedded logic control.",
    "This circuit appears to be an audio amplification stage. The arrangement of power transistors and heat sinks suggests a Class AB amplifier configuration, designed to drive external speakers with minimal distortion.",
    "I'm detecting an RF communication module. The trace antenna and shielded IC package are characteristic of 2.4GHz transceivers, likely used for Wi-Fi or Bluetooth data transmission.",
    "The layout suggests a motor driver H-Bridge circuit. The four power MOSFETs arranged in a bridge configuration allow for bidirectional control of DC motors, commonly found in robotics applications.",
    "This appears to be a sensor interface node. The operational amplifiers near the input terminals are likely conditioning analog signals from environmental sensors before digital conversion.",
    "I see a battery management system (BMS). The balanced traces and protection ICs indicate it monitors cell voltage and temperature to safely charge and discharge a lithium-ion battery pack."
];

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { image } = body;

        if (!image) {
            return NextResponse.json({ error: "Image data is required" }, { status: 400 });
        }

        // Helper to get random mock response
        const getRandomResponse = () => {
            const randomIndex = Math.floor(Math.random() * MOCK_RESPONSES.length);
            return MOCK_RESPONSES[randomIndex];
        };

        if (!HF_API_KEY) {
            // Simulate processing delay for realism
            await new Promise(resolve => setTimeout(resolve, 2000));

            return NextResponse.json({
                reply: getRandomResponse() + "\n\n(Offline Mode: Simulated Analysis)",
                source: "offline-mock"
            });
        }

        // Prepare the payload for LLaVA
        const base64Image = image.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");

        try {
            const response = await fetch(`https://api-inference.huggingface.co/models/${HF_VISION_MODEL}`, {
                headers: {
                    Authorization: `Bearer ${HF_API_KEY}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    inputs: `USER: <image>\nAnalyze this electronic circuit or component and explain how it works in detail.\nASSISTANT:`,
                    parameters: {
                        max_new_tokens: 512,
                        temperature: 0.7
                    },
                    image: base64Image
                }),
            });

            if (response.ok) {
                const result = await response.json();
                let reply = "";
                if (Array.isArray(result) && result[0]?.generated_text) {
                    reply = result[0].generated_text;
                    const splitTag = "ASSISTANT:";
                    if (reply.includes(splitTag)) {
                        reply = reply.split(splitTag)[1].trim();
                    }
                } else if (result?.generated_text) {
                    reply = result.generated_text;
                }

                if (reply) {
                    return NextResponse.json({ reply, source: "llava" });
                }
            }

            // If LLaVA fails, try BLIP
            console.log("LLaVA failed, trying BLIP fallback...");
            const blipResponse = await fetch(`https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large`, {
                headers: {
                    Authorization: `Bearer ${HF_API_KEY}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ inputs: base64Image }),
            });

            if (blipResponse.ok) {
                const blipResult = await blipResponse.json();
                if (Array.isArray(blipResult) && blipResult[0]?.generated_text) {
                    return NextResponse.json({
                        reply: `Based on my visual analysis, this appears to be: ${blipResult[0].generated_text}.`,
                        source: "blip-fallback"
                    });
                }
            }

            throw new Error("All vision models failed");

        } catch (apiError) {
            console.error("HF Vision API Error:", apiError);
            // Fallback to random mock response on API error
            return NextResponse.json({
                reply: getRandomResponse() + "\n\n(Note: Vision API unavailable, switched to simulation mode)",
                source: "error-fallback"
            });
        }

    } catch (error) {
        console.error("Image Analysis Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
