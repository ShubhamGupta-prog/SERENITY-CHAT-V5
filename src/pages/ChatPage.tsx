import React, { useState } from "react";
import { ChatContainer } from "@/components/chat/ChatContainer";
import { ArrowLeft, Sun, Brain, Shield, MessageCircle, X, ArrowRight, AlertTriangle, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { BreathingCard } from "@/components/ui/BreathingCard";
import { CrisisResourcesCard } from "@/components/ui/CrisisResourcesCard";
import { MoodTrackerCard } from "@/components/ui/MoodTrackerCard";
import { DailyReflectionCard } from "@/components/ui/DailyReflectionCard";
import { cn } from "@/lib/utils";

const ChatPage = () => {
  const navigate = useNavigate();
  const [showExercises, setShowExercises] = useState(false);
  const [showCrisisResources, setShowCrisisResources] = useState(false);
  const [showMoodTracker, setShowMoodTracker] = useState(false);
  const [showReflection, setShowReflection] = useState(false);

  const handleToggleExercises = () => {
    setShowExercises(!showExercises);
    if (showCrisisResources) setShowCrisisResources(false);
    if (showMoodTracker) setShowMoodTracker(false);
    if (showReflection) setShowReflection(false);
  };

  const handleToggleCrisisResources = () => {
    setShowCrisisResources(!showCrisisResources);
    if (showExercises) setShowExercises(false);
    if (showMoodTracker) setShowMoodTracker(false);
    if (showReflection) setShowReflection(false);
  };

  const handleToggleMoodTracker = () => {
    setShowMoodTracker(!showMoodTracker);
    if (showExercises) setShowExercises(false);
    if (showCrisisResources) setShowCrisisResources(false);
    if (showReflection) setShowReflection(false);
  };

  const handleToggleReflection = () => {
    setShowReflection(!showReflection);
    if (showExercises) setShowExercises(false);
    if (showCrisisResources) setShowCrisisResources(false);
    if (showMoodTracker) setShowMoodTracker(false);
  };

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900 dark:text-gray-100 transition-colors duration-200">
      <header className="border-b dark:border-gray-800 bg-background/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-6xl mx-auto h-16 flex items-center justify-between px-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-xl font-display font-medium tracking-tight">
              Serenity<span className="font-semibold">Chat</span>
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground mr-2">
              A safe space for supportive conversations
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>
      
      {/* Mental Health Support Cards */}
      <div className="container max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div 
            className={cn(
              "glass-panel rounded-xl p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1 dark:bg-gray-800/30 dark:border-gray-700/30 cursor-pointer interactive-card blue pulse-attention-blue",
              showReflection ? "ring-2 ring-blue-500/20" : ""
            )}
            onClick={handleToggleReflection}
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
                <Sun className="text-blue-600 dark:text-blue-400 h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium mb-1">Daily Reflection</h3>
                  <ArrowRight className="h-4 w-4 text-blue-500" />
                </div>
                <p className="text-sm text-muted-foreground">Practice gratitude daily</p>
              </div>
            </div>
          </div>
          
          <div 
            className={cn(
              "glass-panel rounded-xl p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1 dark:bg-gray-800/30 dark:border-gray-700/30 cursor-pointer interactive-card green pulse-attention-green",
              showExercises ? "ring-2 ring-green-500/20" : ""
            )}
            onClick={handleToggleExercises}
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30">
                <Brain className="text-green-600 dark:text-green-400 h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium mb-1">Mindfulness Exercises</h3>
                  <ArrowRight className="h-4 w-4 text-green-500" />
                </div>
                <p className="text-sm text-muted-foreground">Explore calming practices</p>
              </div>
            </div>
          </div>
          
          <div 
            className={cn(
              "glass-panel rounded-xl p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1 dark:bg-gray-800/30 dark:border-gray-700/30 cursor-pointer interactive-card purple pulse-attention-purple",
              showCrisisResources ? "ring-2 ring-purple-500/20" : ""
            )}
            onClick={handleToggleCrisisResources}
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30">
                <Shield className="text-purple-600 dark:text-purple-400 h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium mb-1">Crisis Resources</h3>
                  <ArrowRight className="h-4 w-4 text-purple-500" />
                </div>
                <p className="text-sm text-muted-foreground">Support when you need it most</p>
              </div>
            </div>
          </div>
          
          <div 
            className={cn(
              "glass-panel rounded-xl p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1 dark:bg-gray-800/30 dark:border-gray-700/30 cursor-pointer interactive-card amber pulse-attention-amber",
              showMoodTracker ? "ring-2 ring-amber-500/20" : ""
            )}
            onClick={handleToggleMoodTracker}
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/30">
                <BarChart className="text-amber-600 dark:text-amber-400 h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium mb-1">Mood Tracker</h3>
                  <ArrowRight className="h-4 w-4 text-amber-500" />
                </div>
                <p className="text-sm text-muted-foreground">Track your emotional journey</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Daily Reflection Section */}
        {showReflection && (
          <div className="mt-6 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-blue-700 dark:text-blue-400">Daily Reflection & Check-In</h2>
              <Button variant="ghost" size="icon" onClick={handleToggleReflection} className="text-blue-500">
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <DailyReflectionCard />
          </div>
        )}
        
        {/* Mindfulness Exercises Section */}
        {showExercises && (
          <div className="mt-6 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-green-700 dark:text-green-400">Mindfulness Exercises</h2>
              <Button variant="ghost" size="icon" onClick={handleToggleExercises} className="text-green-500">
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Choose from these mindfulness exercises to help reduce stress and bring a sense of calm.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <BreathingCard className="h-full" />
              
              {/* Placeholder for future exercises */}
              <div className="glass-panel rounded-xl p-5 flex items-center justify-center border-dashed border-2 border-green-200 dark:border-green-800/30 h-full min-h-[300px]">
                <div className="text-center text-muted-foreground">
                  <p className="font-medium mb-2 text-green-700 dark:text-green-400">Guided Meditation</p>
                  <p className="text-sm">Coming soon...</p>
                </div>
              </div>
              
              <div className="glass-panel rounded-xl p-5 flex items-center justify-center border-dashed border-2 border-green-200 dark:border-green-800/30 h-full min-h-[300px]">
                <div className="text-center text-muted-foreground">
                  <p className="font-medium mb-2 text-green-700 dark:text-green-400">Body Scan Relaxation</p>
                  <p className="text-sm">Coming soon...</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Crisis Resources Section */}
        {showCrisisResources && (
          <div className="mt-6 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-purple-700 dark:text-purple-400">Crisis Resources</h2>
              <Button variant="ghost" size="icon" onClick={handleToggleCrisisResources} className="text-purple-500">
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="p-4 mb-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3 dark:bg-red-900/20 dark:border-red-800/30">
              <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/50">
                <AlertTriangle className="text-red-600 dark:text-red-400 h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-red-800 dark:text-red-300">Need immediate help?</h3>
                <p className="text-sm text-red-700 dark:text-red-300">
                  If you're in a life-threatening situation, please call emergency services (112) immediately.
                </p>
              </div>
            </div>
            
            <CrisisResourcesCard />
          </div>
        )}
        
        {/* Mood Tracker Section */}
        {showMoodTracker && (
          <div className="mt-6 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-amber-700 dark:text-amber-400">Mood Tracker</h2>
              <Button variant="ghost" size="icon" onClick={handleToggleMoodTracker} className="text-amber-500">
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <MoodTrackerCard />
          </div>
        )}
      </div>
      
      <main className="flex-1 overflow-hidden">
        <ChatContainer />
      </main>
    </div>
  );
};

export default ChatPage;
