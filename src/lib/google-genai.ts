"use client";

import { GoogleGenAI } from "@google/genai";

export interface FigurineOption {
  id: string;
  title: string;
  prompt: string;
}

export const FIGURINE_OPTIONS: FigurineOption[] = [
  {
    id: "original",
    title: "Original (AI Content Team)",
    prompt:
      'Create a 1/7 scale commercialized figurine of the characters in the picture, in a realistic style, in a real environment. The figurine is placed on a computer desk. The figurine has a round transparent acrylic base which is written as "AI Content Team", with no text on the base. The content on the computer screen is the Zbrush modeling process of this figurine. Next to the computer screen is a packaging box printed with the original artwork and written as "Family". The packaging features two-dimensional flat illustrations and written as "Product by \'Family\'"',
  },
  {
    id: "studio",
    title: "Creative Studio Edition",
    prompt:
      'Create a 1/6 scale professional figurine of the characters in the picture, in a realistic style, in a creative studio environment. The figurine is displayed on an artist\'s workbench. The figurine has a hexagonal transparent acrylic base engraved with "Creative Studio", with no text on the base. The content on the computer screen shows Blender 3D modeling process of this figurine. Next to the screen is a premium packaging box with metallic foil printing and written as "Studio Collection". The packaging features detailed product illustrations and written as "Designed by \'Studio\'"',
  },
  {
    id: "collector",
    title: "Collector's Edition",
    prompt:
      'Create a 1/8 scale collectible figurine of the characters in the picture, in a realistic style, in a modern display case. The figurine is showcased in a glass display cabinet. The figurine has a square transparent acrylic base with laser-etched "Collector\'s Edition", with no text on the base. The content on the computer screen displays Maya modeling software with this figurine in progress. Adjacent to the screen is an elegant packaging box with embossed artwork and written as "Premium Series". The packaging features high-resolution illustrations and written as "Crafted by \'Premium\'"',
  },
  {
    id: "professional",
    title: "Professional Photography",
    prompt:
      'Create a 1/7 scale commercial figurine of the characters in the picture, in a realistic style, in a professional photography setup. The figurine is positioned on a photography table with studio lighting. The figurine has a circular transparent acrylic base marked with "Professional Grade", with no text on the base. The content on the computer screen shows Cinema 4D rendering process of this figurine. Beside the screen is a sophisticated packaging box with holographic printing and written as "Elite Collection". The packaging features dimensional illustrations and written as "Produced by \'Elite\'"',
  },
  {
    id: "artisan",
    title: "Artisan Workshop",
    prompt:
      'Create a 1/6 scale artisan figurine of the characters in the picture, in a realistic style, in a workshop environment. The figurine is placed on a wooden crafting table. The figurine has an octagonal transparent acrylic base inscribed with "Artisan Made", with no text on the base. The content on the computer screen displays Fusion 360 modeling process of this figurine. Next to the screen is a rustic packaging box with hand-drawn artwork and written as "Workshop Series". The packaging features artistic illustrations and written as "Created by \'Workshop\'"',
  },
  {
    id: "museum",
    title: "Museum Quality",
    prompt:
      'Create a 1/8 scale premium figurine of the characters in the picture, in a realistic style, in a museum display. The figurine is exhibited in a climate-controlled display case. The figurine has a diamond-shaped transparent acrylic base engraved with "Museum Quality", with no text on the base. The content on the computer screen shows Houdini procedural modeling of this figurine. Adjacent to the screen is a luxury packaging box with gold foil printing and written as "Heritage Collection". The packaging features archival illustrations and written as "Preserved by \'Heritage\'"',
  },
];

/**
 * Helper function to convert File to base64
 */
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the data:image/jpeg;base64, prefix
      const base64 = result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
}

/**
 * Generate figurine image using Google's Gemini 2.5 Flash model
 */
export async function generateFigurineImage(
  imageFile: File,
  promptType: string,
  apiKey: string,
): Promise<string> {
  if (!apiKey) {
    throw new Error("API key is required");
  }

  console.log({ apiKey });

  const ai = new GoogleGenAI({ apiKey });

  // Convert file to base64
  const base64Image = await fileToBase64(imageFile);

  // Determine MIME type
  const mimeType = imageFile.type || "image/jpeg";

  const prompt = promptType;

  // Follow the official SDK example: text + inlineData parts
  const contents = [
    { text: prompt },
    {
      inlineData: {
        mimeType,
        data: base64Image,
      },
    },
  ];

  const genResponse = await ai.models.generateContent({
    model: "gemini-2.5-flash-image-preview",
    contents,
  });

  const candidates = genResponse.candidates ?? [];
  if (candidates.length === 0) {
    throw new Error("Gemini returned no candidates");
  }

  // Find first inlineData part with image data
  let b64Out: string | null = null;
  const parts = candidates[0].content?.parts ?? [];
  for (const part of parts) {
    const inline = (part as { inlineData?: { data?: string } })?.inlineData;
    if (inline?.data) {
      b64Out = inline.data;
      break;
    }
  }

  if (!b64Out) {
    throw new Error("Gemini response did not include image data");
  }

  // Convert base64 to data URL for display
  return `data:image/png;base64,${b64Out}`;
}
