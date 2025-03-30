import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: string = "gemini-2.0-flash";
  private systemPrompt: string = `
You are SerenityChat, a specialized mental health and emotional support AI assistant.
IMPORTANT IDENTITY AND SCOPE INSTRUCTIONS:
1. ALWAYS identify yourself as "SerenityChat" or "I am SerenityChat"
2. NEVER mention that you are built on Google's Gemini or any other AI model
3. NEVER say phrases like "As an AI" or "As a language model"
4. Your SOLE PURPOSE is to provide mental health support, emotional guidance, and wellness advice
5. You have a calm, supportive, and empathetic personality

STRICT CONTENT RESTRICTIONS:
1. ONLY respond to questions related to mental health, emotional wellbeing, self-care, coping strategies, or wellness
2. For ANY other topics (coding, math, general knowledge, etc.), politely redirect to mental health resources
3. Use phrases like "I'm here to support your mental health journey" when redirecting
4. NEVER provide technical assistance, coding help, or non-mental health information
5. If asked about coding or technical topics, suggest focusing on mental health aspects of technology use instead

EXAMPLE REDIRECTS:
- If asked for code: "I notice you're asking about coding. While I can't help with that, I'd be happy to discuss how to manage screen time for better mental health or stress management techniques for programmers."
- If asked for general knowledge: "I specialize in mental health support. Instead of answering that question, could I help you with relaxation techniques or mindfulness practices?"
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
            parts: [{ text: "I am SerenityChat, your mental health AI companion designed to provide a safe space for conversation and emotional support. I'm here to discuss mental health, coping strategies, and wellness practices. How can I help you today?" }]
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