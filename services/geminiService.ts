
import { GoogleGenAI, Type } from "@google/genai";
import { ParsedOrder } from '../types';
import { RESTAURANTS } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const orderSchema = {
  type: Type.OBJECT,
  properties: {
    restaurantName: {
      type: Type.STRING,
      description: "The name of the restaurant the user wants to order from. Must be one of the available restaurant names."
    },
    items: {
      type: Type.ARRAY,
      description: "An array of items the user wants to order.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: {
            type: Type.STRING,
            description: "The name of the menu item. It must exactly match an item from the restaurant's menu."
          },
          quantity: {
            type: Type.INTEGER,
            description: "The quantity of this item."
          },
          notes: {
            type: Type.STRING,
            description: "Any special requests or notes for this item, e.g., 'extra spicy' or 'no onions'."
          }
        },
        required: ["name", "quantity"]
      }
    }
  },
  required: ["restaurantName", "items"]
};

const getMenuContext = (): string => {
  return RESTAURANTS.map(r => 
    `Restaurant: "${r.name}"\nMenu:\n${r.menu.map(m => `- ${m.name}`).join('\n')}`
  ).join('\n\n');
};

export const parseOrderFromText = async (text: string): Promise<ParsedOrder | null> => {
  if (!text.trim()) {
    return null;
  }

  const prompt = `
You are an expert food ordering assistant for an app called AIFoodie.
Your task is to parse the user's spoken food order and structure it into JSON format.
The user's order is: "${text}"

Here are the available restaurants and their menus:
${getMenuContext()}

Please identify the restaurant and the items being ordered.
- The restaurant name must be one of the available restaurants.
- Each item name must exactly match an item on that restaurant's menu.
- If the user doesn't specify a restaurant, try to infer it from the items they mention.
- If you cannot determine the restaurant or the items, return a response with an empty items array.
- Extract quantities and any special notes for each item.
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: orderSchema,
      },
    });

    const jsonString = response.text;
    const parsedJson = JSON.parse(jsonString);
    
    // Basic validation
    if (parsedJson && parsedJson.restaurantName && Array.isArray(parsedJson.items)) {
       return parsedJson as ParsedOrder;
    }
    
    return null;

  } catch (error) {
    console.error("Error parsing order with Gemini:", error);
    return null;
  }
};
