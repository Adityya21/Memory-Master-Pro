
import { GoogleGenAI } from "@google/genai";

export const getProjectInsights = async (score: number, moves: number, difficulty: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  const model = "gemini-3-flash-preview";

  const prompt = `
    As a cognitive performance coach, provide a short (2-sentence) analysis of a user's performance in a Memory Matching Game.
    User Stats:
    - Moves: ${moves}
    - Score (Time): ${score}s
    - Difficulty: ${difficulty}
    
    Mention aspects of focus and efficiency.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text || "No insights available.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Failed to fetch AI insights.";
  }
};
