import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  SunMedium, 
  BookOpen, 
  Heart, 
  Plus,
  Calendar,
  X,
  Check,
  SunIcon
} from "lucide-react";

interface DailyReflectionCardProps {
  className?: string;
}

type ReflectionEntry = {
  gratitude: string;
  date: number;
  mood?: string;
};

export function DailyReflectionCard({ className }: DailyReflectionCardProps) {
  const [reflections, setReflections] = useState<ReflectionEntry[]>([]);
  const [newGratitude, setNewGratitude] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [view, setView] = useState<'add' | 'history'>('add');
  
  // Load reflections from localStorage on component mount
  useEffect(() => {
    const savedReflections = localStorage.getItem('dailyReflections');
    if (savedReflections) {
      try {
        setReflections(JSON.parse(savedReflections));
      } catch (e) {
        console.error('Error loading reflections:', e);
      }
    }
  }, []);
  
  // Save reflections to localStorage whenever it changes
  useEffect(() => {
    if (reflections.length > 0) {
      localStorage.setItem('dailyReflections', JSON.stringify(reflections));
    }
  }, [reflections]);
  
  const addReflection = () => {
    if (!newGratitude.trim()) return;
    
    const newEntry: ReflectionEntry = {
      gratitude: newGratitude.trim(),
      date: Date.now()
    };
    
    setReflections(prev => [newEntry, ...prev]);
    setNewGratitude('');
    setIsAddingNew(false);
  };
  
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const getStreakCount = () => {
    if (reflections.length === 0) return 0;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = today.getTime();
    
    // Check if there's an entry for today
    const hasTodayEntry = reflections.some(reflection => {
      const reflectionDate = new Date(reflection.date);
      reflectionDate.setHours(0, 0, 0, 0);
      return reflectionDate.getTime() === todayTimestamp;
    });
    
    if (!hasTodayEntry) return 0;
    
    let streak = 1; // Start with today
    let currentDate = new Date(todayTimestamp);
    
    // Check previous days
    while (true) {
      currentDate.setDate(currentDate.getDate() - 1);
      const prevDayTimestamp = currentDate.getTime();
      
      const hasPrevDayEntry = reflections.some(reflection => {
        const reflectionDate = new Date(reflection.date);
        reflectionDate.setHours(0, 0, 0, 0);
        return reflectionDate.getTime() === prevDayTimestamp;
      });
      
      if (hasPrevDayEntry) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const getRandomPrompt = () => {
    const prompts = [
      "What made you smile today?",
      "What are three things you're grateful for today?",
      "Name someone who positively impacted your day.",
      "What small win are you celebrating today?",
      "What beauty did you notice in your day?",
      "What act of kindness did you witness or perform?",
      "What are you looking forward to tomorrow?",
      "What's something that brought you peace today?"
    ];
    
    return prompts[Math.floor(Math.random() * prompts.length)];
  };
  
  const getTodayReflection = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return reflections.find(reflection => {
      const reflectionDate = new Date(reflection.date);
      reflectionDate.setHours(0, 0, 0, 0);
      return reflectionDate.getTime() === today.getTime();
    });
  };
  
  const todayReflection = getTodayReflection();
  const hasEnteredToday = !!todayReflection;
  const streak = getStreakCount();
  
  return (
    <div className={cn("glass-panel rounded-xl p-5 relative", className)}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium text-blue-700 dark:text-blue-400">Daily Reflection</h2>
        <div className="flex space-x-2">
          <Button 
            variant={view === 'add' ? "secondary" : "ghost"} 
            size="sm" 
            onClick={() => setView('add')}
            className="h-8"
          >
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
          <Button 
            variant={view === 'history' ? "secondary" : "ghost"} 
            size="sm" 
            onClick={() => setView('history')}
            className="h-8"
          >
            <BookOpen className="h-4 w-4 mr-1" /> Past Entries
          </Button>
        </div>
      </div>
      
      {view === 'add' ? (
        <div className="space-y-4">
          {hasEnteredToday && !isAddingNew ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-md font-medium text-blue-600 dark:text-blue-400 flex items-center">
                  <SunMedium className="mr-2 h-5 w-5" /> Today's Reflection
                </h3>
                <span className="text-xs text-muted-foreground">{formatDate(todayReflection.date)}</span>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
                <p className="italic text-blue-800 dark:text-blue-300">"{todayReflection.gratitude}"</p>
              </div>
              
              <div className="flex justify-center">
                <Button variant="outline" size="sm" onClick={() => setIsAddingNew(true)} className="border-blue-200 dark:border-blue-800/30">
                  Add Another
                </Button>
              </div>
            </div>
          ) : (
            <>
              {isAddingNew || !hasEnteredToday ? (
                <div className="space-y-3">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">{getRandomPrompt()}</p>
                  </div>
                  
                  <textarea 
                    className="w-full p-3 rounded-lg border border-blue-200 dark:border-blue-800/30 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    placeholder="What are you grateful for today?"
                    rows={4}
                    value={newGratitude}
                    onChange={(e) => setNewGratitude(e.target.value)}
                  />
                  
                  <div className="flex justify-end space-x-2">
                    {isAddingNew && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setIsAddingNew(false)}
                        className="h-8 border-blue-200 dark:border-blue-800/30"
                      >
                        <X className="h-4 w-4 mr-1" /> Cancel
                      </Button>
                    )}
                    <Button 
                      variant="default" 
                      size="sm" 
                      onClick={addReflection}
                      className="h-8 bg-blue-500 hover:bg-blue-600 text-white"
                      disabled={!newGratitude.trim()}
                    >
                      <Check className="h-4 w-4 mr-1" /> Save
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <SunMedium className="h-12 w-12 text-blue-500 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Ready for today's reflection?</h3>
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    Taking a moment to reflect on what you're grateful for can improve your mood and well-being.
                  </p>
                  <Button onClick={() => setIsAddingNew(true)} className="bg-blue-500 hover:bg-blue-600 text-white">
                    Start Reflection
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <div>
          {reflections.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-6 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Daily streak</div>
                    <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">{streak} {streak === 1 ? 'day' : 'days'}</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                    {reflections.length}
                  </div>
                  <div className="text-xs text-muted-foreground">Total entries</div>
                </div>
              </div>
              
              <h3 className="text-md font-medium mb-3 flex items-center text-blue-600 dark:text-blue-400">
                <BookOpen className="mr-1 h-4 w-4" /> Past Reflections
              </h3>
              
              <div className="space-y-3 max-h-72 overflow-y-auto pr-2 custom-scrollbar">
                {reflections.map((entry, index) => (
                  <div key={index} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 text-blue-500 mr-2" />
                        <span className="text-sm font-medium">Gratitude</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{formatDate(entry.date)}</span>
                    </div>
                    <p className="text-sm italic">"{entry.gratitude}"</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                You haven't added any reflections yet.
              </p>
              <Button onClick={() => setView('add')} className="bg-blue-500 hover:bg-blue-600 text-white">
                Start Your First Reflection
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 