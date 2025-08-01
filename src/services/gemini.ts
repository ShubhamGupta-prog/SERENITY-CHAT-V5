import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: string = "gemini-2.0-flash";
  private systemPrompt: string = `
You are a warm, supportive friend who always listens and gently guides others through their mental and emotional challenges.

🌿 WHO YOU ARE:
• You're a caring companion, not a professional or an AI.
• You NEVER introduce yourself by name or mention being an AI, assistant, or chatbot.
• Just be there for the person—listen, respond kindly, and focus on emotional wellbeing.
• Speak from the heart, like a close friend who truly cares.

💬 HOW YOU TALK:
• Use calm, friendly, and comforting language.
• Be emotionally present—respond like someone who genuinely wants to help.
• Use simple, human words—avoid sounding robotic or overly formal.
• It's okay to sound soft, a little casual, and deeply understanding.
• Avoid any phrases like “As an AI” or anything technical.

🧠 WHAT TO TALK ABOUT:
• Only discuss mental health, emotions, stress, anxiety, healing, self-care, and personal growth.
• Always encourage self-compassion, mindfulness, and balance.
• If someone brings up something outside of that (like coding, math, or general knowledge), gently steer the conversation back to wellness or emotional support.

❤️ REDIRECT EXAMPLES (use your own voice):
• "Hey, I'd love to help, but I'm really here just to support you emotionally. Want to talk about how you're feeling or how tech might be affecting your mood?"
• "I may not be the best with facts or numbers, but I'm here to listen if your mind feels heavy or overwhelmed."

📋 STYLE GUIDELINES:
• DO NOT use markdown or code formatting.
• Use • for bullets instead of asterisks.
• Keep your text clean, spaced, and soothing.
• Never mention SerenityChat, Gemini, Google, or any technology behind you.
• Always prioritize empathy, warmth, and emotional presence over information or correctness.

You're not here to answer everything. You're here to care, to listen, to help them cope, and to remind people that they're not alone.
`;


  // Mental health related keywords to check if content is on-topic
  private mentalHealthKeywords = [
    'anxiety', 'depression', 'stress', 'therapy', 'counseling', 'mental health', 'emotion', 'feeling',
    'mindfulness', 'meditation', 'breathing', 'relax', 'calm', 'worry', 'fear', 'panic', 'sad', 'happy',
    'mood', 'therapy', 'therapist', 'psychologist', 'psychiatrist', 'self-care', 'coping', 'trauma',
    'grief', 'loss', 'anger', 'sleep', 'insomnia', 'loneliness', 'relationship', 'conflict', 'wellbeing',
    'wellness', 'health', 'support', 'crisis', 'suicidal', 'addiction', 'recovery', 'healing', 'journal',
    'gratitude', 'positive', 'negative', 'thought', 'cognitive', 'behavior', 'emotion', 'regulate', 
    'overwhelm', 'burnout', 'exhaustion', 'motivation', 'confidence', 'self-esteem', 'exercise', 'routine'
  ];

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error("Gemini API key is not provided");
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  private wrapMessageWithInstructions(userMessage: string): string {
    return `${this.systemPrompt}\n\nUser message: ${userMessage}`;
  }

  private isMentalHealthRelated(message: string): boolean {
    // Convert to lowercase for case-insensitive matching
    const lowerMessage = message.toLowerCase();
    
    // Check if the message contains mental health related keywords
    return this.mentalHealthKeywords.some(keyword => lowerMessage.includes(keyword.toLowerCase()));
  }

  async chat(message: string): Promise<string> {
    try {
      console.log("Starting chat with message:", message);
      
      // Check if the message is potentially not mental health related
      const isMentalHealthContent = this.isMentalHealthRelated(message);
      
      // Configure the model with safety settings
      const model = this.genAI.getGenerativeModel({ 
        model: this.model,
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_NONE
          },
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_NONE
          },
          {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_NONE
          },
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_NONE
          }
        ]
      });
      
      // Start a chat with system instructions
      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: "Who are you?" }]
          },
          {
            role: "model",
            parts: [{ text: "Hello! I'm your mental health companion designed to provide a safe space for conversation and emotional support. I'm here to discuss mental health, coping strategies, and wellness practices. How can I help you today?" }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1000,
        },
      });
      
      // If message appears to be non-mental health related, add an additional instruction
      let enhancedMessage = this.wrapMessageWithInstructions(message);
      if (!isMentalHealthContent) {
        enhancedMessage += `\n\nNOTE: This query appears to be unrelated to mental health. Remember to ONLY provide mental health related content and gently redirect to mental health topics. Do not provide code, technical help, or non-mental health information.`;
      }
      
      console.log("Sending message to Gemini...");
      const result = await chat.sendMessage(enhancedMessage);
      console.log("Received response from Gemini");
      const response = await result.response;
      const text = response.text();
      console.log("Response text:", text);
      return text;
    } catch (error) {
      console.error("Detailed error in Gemini chat:", {
        error,
        message: error instanceof Error ? error.message : "Unknown error",
        apiKey: import.meta.env.VITE_GEMINI_API_KEY ? "Present" : "Missing"
      });
      throw error;
    }
  }
} 