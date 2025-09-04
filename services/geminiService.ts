import { GoogleGenAI, Type } from "@google/genai";
import type { PersonalityInsights } from "../types";

// FIX: Per coding guidelines, API key should be passed directly without casting.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchPersonalityInsights = async (personalityType: string): Promise<PersonalityInsights> => {
  // FIX: Per coding guidelines, API key is assumed to be present and valid, so this check is removed.

  const prompt = `
    Analyze the personality type: ${personalityType}.
    Provide a detailed, insightful, wholesome, and encouraging analysis. The tone should be quirky, retro, and fun.
    Generate content for the following sections:
    1.  A creative, cool, and fitting title for this personality type.
    2.  A comprehensive overview of their core traits, motivations, and worldview.
    3.  A list of key strengths.
    4.  A list of potential weaknesses or areas for growth, framed constructively.
    5.  A list of suitable career paths that align with their strengths.
    6.  An analysis of how they approach relationships (friendships, romantic).
    7.  A list of actionable personal growth suggestions.
    8.  A list of famous figures (real people) who are believed to have this personality type.
    9.  A list of iconic fictional characters with this personality type.
    10. A "Vibe Check" section, including a signature color, a defining aesthetic (e.g., 'Cozy Academia', 'Cyberpunk Navigator'), and a short, fun description of their overall vibe.
    11. A "Recommendations" section with lists of hobbies, books, movies, and music genres/artists that would likely appeal to this type.

    Please provide the response in a structured JSON format. Ensure all lists contain at least 3-5 items.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "A creative title for the personality type." },
          overview: { type: Type.STRING, description: "A detailed overview of the personality." },
          strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
          weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
          careerPaths: { type: Type.ARRAY, items: { type: Type.STRING } },
          relationships: { type: Type.STRING, description: "Analysis of their approach to relationships." },
          personalGrowth: { type: Type.ARRAY, items: { type: Type.STRING } },
          famousFigures: { type: Type.ARRAY, items: { type: Type.STRING } },
          fictionalCharacters: { type: Type.ARRAY, items: { type: Type.STRING } },
          vibe: {
            type: Type.OBJECT,
            properties: {
              color: { type: Type.STRING, description: "A signature color." },
              aesthetic: { type: Type.STRING, description: "A defining aesthetic." },
              description: { type: Type.STRING, description: "A short vibe description." },
            },
            required: ["color", "aesthetic", "description"]
          },
          recommendations: {
            type: Type.OBJECT,
            properties: {
              hobbies: { type: Type.ARRAY, items: { type: Type.STRING } },
              books: { type: Type.ARRAY, items: { type: Type.STRING } },
              movies: { type: Type.ARRAY, items: { type: Type.STRING } },
              music: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["hobbies", "books", "movies", "music"]
          },
        },
        required: ["title", "overview", "strengths", "weaknesses", "careerPaths", "relationships", "personalGrowth", "famousFigures", "fictionalCharacters", "vibe", "recommendations"],
      },
    },
  });

  const jsonText = response.text.trim();
  try {
    return JSON.parse(jsonText) as PersonalityInsights;
  } catch (e) {
    console.error("Failed to parse JSON from Gemini API:", jsonText);
    throw new Error("The API returned an invalid format. Please try again.");
  }
};
