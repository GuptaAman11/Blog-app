const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai"); // Import Gemini AI
const dotenv = require('dotenv')
dotenv.config()
// Initialize Gemini AI
const GEMINI_API_KEY = process.env.GEMINI_API_KEYS;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY); // Use environment variable for API key
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

router.post("/gemini", async (req, res) => {
  try {
    // const { suggestion , correction } = req.body;
    const suggestion =  req.body;
   
    const prompt = `Write a single, well-structured paragraph on the topic: "${suggestion.suggestion}". 
    Make sure the paragraph is at least 100 words long, uses proper grammar and punctuation, 
    and provides clear, meaningful information. Avoid using lists or bullet points.`;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Prompt must be a valid string" });
    }
    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
    });
    const textResponse = result.response?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textResponse) {
      return res.status(500).json({ error: "Empty response from Gemini API" });
    }

    
    return res.json({ textResponse : textResponse });

  } catch (error) {
    console.error("❌ Error generating content:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;