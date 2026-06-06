import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Gemini API client safely (lazy, with verification fallback)
let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== "MY_GEMINI_API_KEY") {
      aiClient = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
  }
  return aiClient;
}

// Full predefined Fresco HealthCraft Menu definitions for Gemini to match against
const MENU_ITEMS = [
  { name: "Fresh Orange Juice", category: "Fruit Juices", price: 80, description: "Freshly squeezed oranges, pure vitamin C booster." },
  { name: "Apple Delight", category: "Fruit Juices", price: 70, description: "Crisp green apples with a refreshing hint of fresh mint." },
  { name: "Mango Paradise", category: "Fruit Juices", price: 90, description: "Sweet Alphonso mangoes, a sun-kissed summer special." },
  { name: "Watermelon Cooler", category: "Fruit Juices", price: 60, description: "Refreshing natural red watermelon infused with subtle basil seeds." },
  { name: "Pomegranate Power", category: "Fruit Juices", price: 95, description: "Rich ruby-red pomegranate juice packed with antioxidants." },
  { name: "Pineapple Tang", category: "Fruit Juices", price: 75, description: "Tangy sweet pineapple juice with ginger and clean black salt." },
  
  { name: "Green Detox Pure", category: "Vegetable Juices", price: 85, description: "Super green blend of spinach, cucumber, celery, and green apple." },
  { name: "Carrot Glow Boost", category: "Vegetable Juices", price: 80, description: "Pure sweet carrot juice with orange juice and vital turmeric root." },
  { name: "Beetroot Vitality", category: "Vegetable Juices", price: 80, description: "Beetroot, carrot, ginger, and lemon juice for ultimate stamina." },
  { name: "Spicy Tomato Zing", category: "Vegetable Juices", price: 75, description: "Tomato, celery, black salt, and optional cayenne spice kick." },

  { name: "Banana Strawberry Blend", category: "Smoothies", price: 110, description: "Thick creamy rich banana blended with fresh sweet strawberries and oat milk." },
  { name: "Avocado Cream Green", category: "Smoothies", price: 130, description: "Buttery smooth healthy avocado, spinach, honey, and light almond milk." },
  { name: "Choco Protein Shake", category: "Smoothies", price: 120, description: "Natural protein with peanut butter, raw dark cocoa, banana, and soy milk." },
  { name: "Berry Oat Fuel", category: "Smoothies", price: 115, description: "Blueberries, strawberries, rolled oats, yogurt, and golden wild honey." },

  { name: "Karela Immunity Flush", category: "Detox & Wellness", price: 90, description: "Bitter gourd, amla, ginger, lemon, and Himalayan salt for sugar control & detox." },
  { name: "Wheatgrass Shot Mix", category: "Detox & Wellness", price: 100, description: "Highly nutritious fresh wheatgrass, green apple juice, and clean lemon." },
  { name: "Ginger Lemon Magic", category: "Detox & Wellness", price: 65, description: "Warm ginger root, zesty country lemons, wild mountain honey, and hot/cold base." },
  { name: "Amla Weight Master", category: "Detox & Wellness", price: 85, description: "Indian gooseberry (amla), aloe vera juice, and raw honey for health." }
];

// POST /api/recommend endpoint using Google Gemini 3.5 Flash Model
app.post("/api/recommend", async (req, res) => {
  try {
    const { goals, ingredients, query } = req.body;
    const client = getAiClient();

    if (!client) {
      // Graceful fallback if no API key is provided
      return res.json({
        customRecipe: {
          name: "Detox Sunshine Craft",
          ingredients: ["Fresh Orange", "Sweet Ginger Root", "Green Cucumber", "Fresh Mint Leaves"],
          benefits: "This is a pre-configured vitamin and mineral booster designed to provide instant hydration, elevate clean energy, and support skin health. (Set up your Gemini API secret key to unlock customized AI generated juices!)",
          tasteProfile: "Tangy, zesty and moderately sweet with cooling mint highlights.",
          estimatedPrice: 85
        },
        menuRecommendations: [
          { itemName: "Fresh Orange Juice", reason: "Rich in Vitamin C, promoting skin rejuvenation and body immunity." },
          { itemName: "Green Detox Pure", reason: "An excellent natural diuretic that flushes metabolic waste and purifies blood." }
        ]
      });
    }

    const systemPrompt = `You are an expert nutritionist and master juice craftsman at FresCo HealthCraft, an elite healthy beverage brand in Pune, India. 
Fresco HealthCraft specializes in premium, 100% natural, fresh juices, smooth smoothies, and clinical wellness detox drinks.
Based on the user's health goals, preferred ingredients/avoided ingredients, and personal query, recommend options.

Available standard menu items at FresCo HealthCraft are:
${JSON.stringify(MENU_ITEMS, null, 2)}

Provide two things:
1. A completely custom-engineered wellness juice recipe ('customRecipe') tailored exactly to their goals & ingredients, with an Indian wellness twist (like adding black salt, amla, mint, or ginger if relevant). Keep its estimatedPrice between 75 and 125 rupees.
2. A list of 1 to 3 standard items from our existing MENU_ITEMS that are highly relevant to their request with a customized matching 'reason'. Ensure the itemName matches one of the standard menu items exactly.`;

    const userPrompt = `User's wellness goals: ${goals && goals.length ? goals.join(", ") : "None specified"}
User's preferred/custom ingredients: ${ingredients && ingredients.length ? ingredients.join(", ") : "None specified"}
User's primary health concern or query: "${query || "I want a refreshing and organic detox experience."}"`;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            customRecipe: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING, description: "Catchy and elegant Indian/Fresco branded name for the custom juice" },
                ingredients: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Specific list of healthy core ingredients and herbs" },
                benefits: { type: Type.STRING, description: "Detailed summary of clinical health benefits and wellness support" },
                tasteProfile: { type: Type.STRING, description: "Flavor and texture note (e.g. zesty, earthy, creamy, mildly sweet)" },
                estimatedPrice: { type: Type.INTEGER, description: "Price in INR, from 75 to 125" }
              },
              required: ["name", "ingredients", "benefits", "tasteProfile", "estimatedPrice"]
            },
            menuRecommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  itemName: { type: Type.STRING, description: "Exact name of a standard menu item" },
                  reason: { type: Type.STRING, description: "Why this item specifically aids the user with their stated symptoms or goals" }
                },
                required: ["itemName", "reason"]
              }
            }
          },
          required: ["customRecipe", "menuRecommendations"]
        }
      }
    });

    const outputText = response.text || "{}";
    const parsedData = JSON.parse(outputText.trim());
    return res.json(parsedData);
  } catch (error: any) {
    console.error("Gemini suggestion error:", error);
    res.status(500).json({ error: error.message || "Failed to process AI recommendations" });
  }
});

// Configure Vite or Serve static assets
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Fresco HealthCraft Server running on http://0.0.0.0:${PORT}`);
  });
}

setupServer();
