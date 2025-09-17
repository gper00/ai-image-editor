import { GoogleGenAI, Modality } from "@google/genai";
import { EditResult } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Edits an image using the 'Banana' model (gemini-2.5-flash-image-preview).
 * @param base64ImageData The base64 encoded string of the image.
 * @param mimeType The MIME type of the image (e.g., 'image/png').
 * @param prompt The text prompt describing the desired edit.
 * @returns A promise that resolves to an EditResult object containing the new image URL and any text response.
 */
export const editImageWithBanana = async (
  base64ImageData: string,
  mimeType: string,
  prompt: string
): Promise<EditResult> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData.split(',')[1], // Remove the data URL prefix
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    const result: EditResult = { imageUrl: null, text: null };

    if (response.candidates && response.candidates.length > 0) {
      for (const part of response.candidates[0].content.parts) {
        if (part.text) {
          result.text = part.text;
        } else if (part.inlineData) {
          const base64ImageBytes: string = part.inlineData.data;
          result.imageUrl = `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
        }
      }
    }

    if (!result.imageUrl) {
        throw new Error("The AI did not return an image. It might have refused the request.");
    }

    return result;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to edit image with Banana model. Please check the browser console for more details.");
  }
};
