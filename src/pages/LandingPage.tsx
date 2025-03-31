import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Brain, Shield } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { QuoteCollage } from "@/components/ui/QuoteCollage";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStartChatting = () => {
    navigate("/chat");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 dark:text-gray-100 transition-colors duration-200">
      {/* Header with theme toggle */}
      <header className="container max-w-6xl mx-auto py-4 px-4 flex justify-end">
        <ThemeToggle />
      </header>
      
      {/* Hero Section */}
      <section className="pt-16 pb-16 px-4">
        <div className="container max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary dark:text-gray-100 mb-6 tracking-tight animate-fade-in" style={{ fontFamily: "Times New Roman, serif" }}>
            You're Not Alone – We're Here to Listen
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground dark:text-gray-300 max-w-2xl mx-auto mb-10 animate-slide-in">
            SerenityChat offers a safe space where you can share your thoughts, find comfort, 
            and receive gentle guidance whenever you need it.
          </p>
          <Button 
            size="lg" 
            onClick={handleStartChatting}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-6 h-auto text-lg animate-fade-in dark:bg-teal-700 dark:hover:bg-teal-600"
          >
            Start Chatting
          </Button>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 px-4 bg-white/60 backdrop-blur-sm dark:bg-gray-800/30 dark:backdrop-blur-sm">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-display font-semibold text-center mb-12 text-primary dark:text-gray-100" style={{ fontFamily: "Times New Roman, serif" }}>
            How SerenityChat Supports You
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-6 rounded-xl flex flex-col items-center text-center transition-all duration-300 hover:shadow-md animate-fade-in dark:bg-gray-800/40 dark:border-gray-700/30">
              <div className="p-4 rounded-full bg-blue-100 mb-4 dark:bg-blue-900/30">
                <MessageCircle className="text-blue-600 dark:text-blue-400" size={28} />
              </div>
              <h3 className="text-xl font-medium mb-3">Compassionate Conversations</h3>
              <p className="text-muted-foreground dark:text-gray-300">
                SerenityChat provides a judgment-free space for you to express your feelings and thoughts.
              </p>
            </div>
            
            <div className="glass-panel p-6 rounded-xl flex flex-col items-center text-center transition-all duration-300 hover:shadow-md animate-fade-in dark:bg-gray-800/40 dark:border-gray-700/30" style={{ animationDelay: "0.1s" }}>
              <div className="p-4 rounded-full bg-green-100 mb-4 dark:bg-green-900/30">
                <Brain className="text-green-600 dark:text-green-400" size={28} />
              </div>
              <h3 className="text-xl font-medium mb-3">Mental Health Tips</h3>
              <p className="text-muted-foreground dark:text-gray-300">
                Access practical guidance and evidence-based techniques to help manage stress and anxiety.
              </p>
            </div>
            
            <div className="glass-panel p-6 rounded-xl flex flex-col items-center text-center transition-all duration-300 hover:shadow-md animate-fade-in dark:bg-gray-800/40 dark:border-gray-700/30" style={{ animationDelay: "0.2s" }}>
              <div className="p-4 rounded-full bg-purple-100 mb-4 dark:bg-purple-900/30">
                <Shield className="text-purple-600 dark:text-purple-400" size={28} />
              </div>
              <h3 className="text-xl font-medium mb-3">Helpful Resources</h3>
              <p className="text-muted-foreground dark:text-gray-300">
                We connect you with trusted resources and support services when you need additional help.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Inspiring Quotes Collage Section */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-display font-semibold text-center mb-8 text-primary dark:text-gray-100" style={{ fontFamily: "Times New Roman, serif" }}>
            Inspiring Voices, Healing Words
          </h2>
          
          <p className="text-center text-muted-foreground dark:text-gray-300 max-w-2xl mx-auto mb-10">
            Words have power. They can heal, inspire, and remind us that we're not alone in our journey. 
            Insightful wisdom from those who truly understand the depths of mental health.
          </p>
          
          <QuoteCollage />
          
          <div className="mt-12 text-center">
            <Button 
              variant="outline" 
              onClick={handleStartChatting}
              className="border-teal-600 text-teal-700 hover:bg-teal-50 dark:border-teal-500 dark:text-teal-400 dark:hover:bg-teal-900/20"
            >
              <Heart className="mr-2 h-4 w-4" /> Begin Your Journey
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/20 bg-white/40 backdrop-blur-sm dark:bg-gray-800/30 dark:border-gray-700/20">
        <div className="container max-w-6xl mx-auto text-center text-sm text-muted-foreground dark:text-gray-400">
          <p className="mb-2">
            SerenityChat provides supportive conversation but is not a replacement for professional mental health care.
          </p>
          <p>
            If you're experiencing a crisis or emergency, please contact a healthcare provider or emergency services.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
