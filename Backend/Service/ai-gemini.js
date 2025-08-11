
const { GoogleGenAI, Type } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function analyzeResume(resumeText) {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
            {
                role: "user",
                parts: [
                    {
                        text: `Analyze the following resume and return results. 
                        -matchScore (0 to 100): how well this resume aligns with the most suitable job role based on the candidate's profile.`,
                    },
                    {
                        text: resumeText,
                    },
                ],
            },
        ],
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    matchScore: { type: Type.NUMBER },
                    detectedJobs: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                    },
                    skills: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                    },
                    achievements: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                    },
                    experience: { type: Type.STRING },
                    projects: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                title: { type: Type.STRING },
                                techStack: {
                                    type: Type.ARRAY,
                                    items: { type: Type.STRING },
                                },
                            },
                            propertyOrdering: ["title", "techStack"],
                        },
                    },
                    feedback: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                    },
                },
                propertyOrdering: [
                    "matchScore",
                    "detectedJobs",
                    "skills",
                    "achievements",
                    "experience",
                    "projects",
                    "feedback",
                ],
            },
        },
    });

    return JSON.parse(response.text);// Already a JS object, no JSON.parse needed!
}

module.exports = analyzeResume;

