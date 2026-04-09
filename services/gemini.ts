
import { GoogleGenAI } from "@google/genai";

const PROMPT = `
Edit this image: transform the entire scene into a hilarious, professional hand-drawn caricature that captures a striking likeness of the user.

Style & Character Guidelines:
- Style: A high-quality artistic drawing with bold, confident ink outlines and vibrant watercolor or colored pencil shading. Avoid any 3D render look.
- Face Caricature: Transform the person's face into a B&W detailed ink sketch. IMPORTANT: You must preserve the user's core facial features and unique landmarks (eye shape, nose structure, smile lines) so they are clearly recognizable, but push these features to a comical extreme.
- The face and hair should be strictly B&W, looking like a masterfully hand-shaded pencil or ink drawing on textured paper.
- Body: A funny "bobble-head" style with a large torso and tiny, energetic legs.
- Clothing: The character must be wearing the official Egypt national football team kit (vibrant red jersey with black and white trim) with the eagle emblem clearly visible on the heart.

The Funny Twist:
- Place the character in a ridiculous, high-energy football situation in Egypt. 
- Example Twist: The character is balancing on top of a flying soccer ball that is shaped like an ancient Egyptian scarab, or they are executing a bicycle kick while accidentally knocking the crown off a Sphinx's head.
- Background: A whimsical "desert stadium" where the Great Pyramids serve as the goalposts and the crowd consists of cheering mummies and camels holding "Go Egypt!" flags.

Overall Aesthetic:
- The final output must feel like a personalized gift or an editorial cartoon. 
- High contrast, dynamic energy, and a clear preservation of the user's identity through the comical exaggeration.
`;

export async function generateCaricature(base64Image: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Extract pure base64 from data URL
  const imageData = base64Image.split(',')[1];
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: imageData,
              mimeType: 'image/jpeg',
            },
          },
          {
            text: PROMPT
          },
        ],
      },
    });

    let resultUrl = '';
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          resultUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (!resultUrl) {
      throw new Error("No image was generated in the response.");
    }

    return resultUrl;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}
