import { NextResponse } from "next/server";
import { chatbotRules, generalResponses } from "@/lib/chatbot-data";

const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;
const HF_MODEL = "HuggingFaceH4/zephyr-7b-beta";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { message } = body;

        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        const lowerMessage = message.toLowerCase();

        // Check for "continue" command
        if (lowerMessage === "continue" || lowerMessage === "more" || lowerMessage === "tell me more") {
            return NextResponse.json({
                reply: "To use 'continue', first ask me a question! I'll then provide more details when you type 'continue'.",
                source: "continue-help"
            });
        }

        // Check Rule-based Logic (Fast Path)
        const ruleMatch = chatbotRules.find((rule) =>
            rule.keywords.some((keyword) => lowerMessage.includes(keyword))
        );

        if (ruleMatch) {
            await new Promise(resolve => setTimeout(resolve, 500));
            return NextResponse.json({ reply: ruleMatch.response, source: "rule-based" });
        }

        // Math Problem Solver
        if (/\d+[\s]*[+\-*/]\s*\d+/.test(message)) {
            try {
                const expression = message.replace(/[^0-9+\-*/().]/g, '').trim();
                if (expression) {
                    const result = Function('"use strict"; return (' + expression + ')')();
                    if (typeof result === 'number' && !isNaN(result)) {
                        return NextResponse.json({
                            reply: `The answer is: **${result}**\n\nCalculation: ${expression} = ${result}`,
                            source: "math-solver"
                        });
                    }
                }
            } catch (e) {
                console.error("Math error:", e);
            }
        }

        // Hugging Face Inference API
        if (HF_API_KEY) {
            try {
                const systemPrompt = "You are a helpful and knowledgeable AI assistant for an electronics and engineering learning platform called 'Anti-Gravity'. You help users with circuits, coding, and science concepts. Keep answers concise and encouraging.";
                const prompt = `<|system|>\n${systemPrompt}</s>\n<|user|>\n${message}</s>\n<|assistant|>\n`;

                const response = await fetch(`https://api-inference.huggingface.co/models/${HF_MODEL}`, {
                    headers: {
                        Authorization: `Bearer ${HF_API_KEY}`,
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify({
                        inputs: prompt,
                        parameters: {
                            max_new_tokens: 512,
                            temperature: 0.7,
                            top_p: 0.95,
                            return_full_text: false,
                        }
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    // HF Inference API returns an array or object depending on the task. For text-generation it's usually an array.
                    let botReply = "";
                    if (Array.isArray(data) && data[0]?.generated_text) {
                        botReply = data[0].generated_text.trim();
                    } else if (data?.generated_text) {
                        botReply = data.generated_text.trim();
                    }

                    if (botReply) {
                        return NextResponse.json({
                            reply: botReply,
                            source: "hugging-face"
                        });
                    }
                } else {
                    console.error("HF API Error:", await response.text());
                }
            } catch (error) {
                console.error("Hugging Face integration error:", error);
            }
        }

        // Fallback if HF fails or no key
        // Wikipedia Fallback
        try {
            const topic = message.replace(/^(what is|who is|tell me about|explain|define)\s+/i, "").split("?")[0].trim();
            if (topic.length > 2) {
                const wikiRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topic)}`);
                if (wikiRes.ok) {
                    const wikiData = await wikiRes.json();
                    if (wikiData.type === "standard" && wikiData.extract) {
                        return NextResponse.json({
                            reply: wikiData.extract,
                            source: "wikipedia"
                        });
                    }
                }
            }
        } catch (e) {
            console.error("Wikipedia error:", e);
        }

        // Final Fallback
        const randomResponse = generalResponses[Math.floor(Math.random() * generalResponses.length)];
        return NextResponse.json({
            reply: HF_API_KEY ? "I'm having trouble connecting to my brain (Hugging Face). " + randomResponse : "I'm currently running in offline mode. Please configure my HUGGINGFACE_API_KEY to unlock my full potential! " + randomResponse,
            source: "fallback",
        });

    } catch (error) {
        console.error("Chat API Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
