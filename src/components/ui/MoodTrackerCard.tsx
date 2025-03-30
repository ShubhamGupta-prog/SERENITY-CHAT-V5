import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  SmilePlus, 
  Smile, 
  Meh, 
  Frown, 
  BarChart3, 
  CalendarDays,
  X,
  Check,
  PlusCircle
} from "lucide-react";

interface MoodTrackerCardProps {
  className?: string;
}

type Mood = {
  type: 'happy' | 'good' | 'neutral' | 'sad' | 'anxious';
  timestamp: number;
  note?: string;
};

export function MoodTrackerCard({ className }: MoodTrackerCardProps) {
  const [moodHistory, setMoodHistory] = useState<Mood[]>([]);
  const [selectedMood, setSelectedMood] = useState<Mood['type'] | null>(null);
  const [showAddNote, setShowAddNote] = useState(false);
  const [moodNote, setMoodNote] = useState('');
  const [view, setView] = useState<'add' | 'history'>('add');
  
  // Load mood history from localStorage on component mount
  useEffect(() => {
    const savedMoods = localStorage.getItem('moodHistory');
    if (savedMoods) {
      try {
        setMoodHistory(JSON.parse(savedMoods));
      } catch (e) {
        console.error('Error loading mood history:', e);
      }
    }
  }, []);
  
  // Save mood history to localStorage whenever it changes
  useEffect(() => {
    if (moodHistory.length > 0) {
      localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
    }
  }, [moodHistory]);
  
  const saveMood = () => {
    if (!selectedMood) return;
    
    const newMood: Mood = {
      type: selectedMood,
      timestamp: Date.now(),
      note: moodNote || undefined
    };
    
    setMoodHistory(prev => [newMood, ...prev]);
    setSelectedMood(null);
    setMoodNote('');
    setShowAddNote(false);
  };
  
  const getMoodIcon = (mood: Mood['type'], size = 'md') => {
    const className = size === 'sm' ? 'h-5 w-5' : 'h-6 w-6';
    
    switch (mood) {
      case 'happy':
        return <SmilePlus className={cn(className, "text-yellow-500")} />;
      case 'good':
        return <Smile className={cn(className, "text-green-500")} />;
      case 'neutral':
        return <Meh className={cn(className, "text-blue-500")} />;
      case 'sad':
        return <Frown className={cn(className, "text-purple-500")} />;
      case 'anxious':
        return (
          <div className={cn("relative", size === 'sm' ? "h-5 w-5" : "h-6 w-6")}>
            <Frown className={cn(className, "text-red-500 absolute")} />
            <svg viewBox="0 0 24 24" className={cn(className, "text-red-500 absolute animate-pulse opacity-40")}>
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
        );
    }
  };
  
  const getMoodLabel = (mood: Mood['type']) => {
    switch (mood) {
      case 'happy': return 'Happy';
      case 'good': return 'Good';
      case 'neutral': return 'Neutral';
      case 'sad': return 'Sad';
      case 'anxious': return 'Anxious';
    }
  };
  
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const getDayCount = () => {
    if (moodHistory.length === 0) return 0;
    
    const days = new Set();
    moodHistory.forEach(mood => {
      const date = new Date(mood.timestamp);
      days.add(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`);
    });
    
    return days.size;
  };
  
  const getMoodCounts = () => {
    const counts = {
      happy: 0,
      good: 0,
      neutral: 0,
      sad: 0,
      anxious: 0
    };
    
    moodHistory.forEach(mood => {
      counts[mood.type]++;
    });
    
    return counts;
  };
  
  const getHighestMood = () => {
    const counts = getMoodCounts();
    let highest = 'neutral';
    let max = 0;
    
    Object.entries(counts).forEach(([mood, count]) => {
      if (count > max) {
        max = count;
        highest = mood as Mood['type'];
      }
    });
    
    return highest;
  };

  const handleSelectMood = (mood: Mood['type']) => {
    setSelectedMood(mood);
  };
  
  return (
    <div className={cn("glass-panel rounded-xl p-5 relative", className)}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium text-amber-700 dark:text-amber-400">Mood Tracker</h2>
        <div className="flex space-x-2">
          <Button 
            variant={view === 'add' ? "secondary" : "ghost"} 
            size="sm" 
            onClick={() => setView('add')}
            className="h-8"
          >
            <PlusCircle className="h-4 w-4 mr-1" /> Log Mood
          </Button>
          <Button 
            variant={view === 'history' ? "secondary" : "ghost"} 
            size="sm" 
            onClick={() => setView('history')}
            className="h-8"
          >
            <BarChart3 className="h-4 w-4 mr-1" /> History
          </Button>
        </div>
      </div>
      
      {view === 'add' ? (
        <div className="space-y-4">
          {selectedMood ? (
            <>
              <div className="flex items-center justify-center space-x-3 mb-6 mood-btn-selected">
                <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/30">
                  {getMoodIcon(selectedMood)}
                </div>
                <div className="text-lg font-medium">I'm feeling {getMoodLabel(selectedMood)}</div>
              </div>
              
              {showAddNote ? (
                <div className="space-y-2">
                  <textarea 
                    className="w-full p-3 rounded-lg border border-amber-200 dark:border-amber-800/30 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    placeholder="Add a note about how you're feeling... (optional)"
                    rows={3}
                    value={moodNote}
                    onChange={(e) => setMoodNote(e.target.value)}
                  />
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setShowAddNote(false)}
                      className="h-8"
                    >
                      <X className="h-4 w-4 mr-1" /> Cancel
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm" 
                      onClick={saveMood}
                      className="h-8 bg-amber-500 hover:bg-amber-600 text-white"
                    >
                      <Check className="h-4 w-4 mr-1" /> Save
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedMood(null)}
                    className="border-amber-200 dark:border-amber-800/30"
                  >
                    Change
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowAddNote(true)}
                    className="border-amber-200 dark:border-amber-800/30"
                  >
                    Add Note
                  </Button>
                  <Button 
                    variant="default" 
                    onClick={saveMood}
                    className="bg-amber-500 hover:bg-amber-600 text-white"
                  >
                    Save
                  </Button>
                </div>
              )}
            </>
          ) : (
            <>
              <p className="text-muted-foreground mb-4 text-center">
                How are you feeling today?
              </p>
              
              <div className="grid grid-cols-5 gap-2">
                {(['happy', 'good', 'neutral', 'sad', 'anxious'] as Mood['type'][]).map((mood) => (
                  <button
                    key={mood}
                    className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-amber-50 dark:hover:bg-amber-900/10 transition-colors mood-btn"
                    onClick={() => handleSelectMood(mood)}
                  >
                    <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/30 mb-2">
                      {getMoodIcon(mood)}
                    </div>
                    <span className="text-sm font-medium">{getMoodLabel(mood)}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <div>
          {moodHistory.length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-6 p-4 bg-amber-50 dark:bg-amber-900/10 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-700 dark:text-amber-400">
                    {moodHistory.length}
                  </div>
                  <div className="text-xs text-muted-foreground">Moods logged</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-700 dark:text-amber-400">
                    {getDayCount()}
                  </div>
                  <div className="text-xs text-muted-foreground">Days tracked</div>
                </div>
                <div className="text-center">
                  <div className="flex justify-center">
                    {getMoodIcon(getHighestMood())}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Most frequent</div>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-md font-medium mb-2 flex items-center">
                  <BarChart3 className="mr-1 h-4 w-4 text-amber-500" /> Mood Distribution
                </h3>
                <div className="h-10 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex">
                  {Object.entries(getMoodCounts()).map(([mood, count]) => {
                    const percent = (count / moodHistory.length) * 100;
                    if (percent === 0) return null;
                    
                    let bgColor;
                    switch (mood) {
                      case 'happy': bgColor = 'bg-yellow-500'; break;
                      case 'good': bgColor = 'bg-green-500'; break;
                      case 'neutral': bgColor = 'bg-blue-500'; break;
                      case 'sad': bgColor = 'bg-purple-500'; break;
                      case 'anxious': bgColor = 'bg-red-500'; break;
                      default: bgColor = 'bg-gray-500';
                    }
                    
                    return (
                      <div
                        key={mood}
                        className={cn("h-full transition-all relative group", bgColor)}
                        style={{ width: `${percent}%` }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-medium">
                          {Math.round(percent)}%
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between mt-1">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <SmilePlus className="h-3 w-3 mr-1 text-yellow-500" /> 
                    <span>Happy</span>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Frown className="h-3 w-3 mr-1 text-red-500" /> 
                    <span>Anxious</span>
                  </div>
                </div>
              </div>
              
              <h3 className="text-md font-medium mb-2 flex items-center">
                <CalendarDays className="mr-1 h-4 w-4 text-amber-500" /> Recent Entries
              </h3>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {moodHistory.slice(0, 10).map((mood, index) => (
                  <div key={index} className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 flex items-start">
                    <div className="mr-3">
                      {getMoodIcon(mood.type, 'sm')}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium">{getMoodLabel(mood.type)}</span>
                        <span className="text-xs text-muted-foreground">{formatDate(mood.timestamp)}</span>
                      </div>
                      {mood.note && (
                        <p className="text-sm text-muted-foreground mt-1">
                          "{mood.note}"
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                You haven't logged any moods yet.
              </p>
              <Button onClick={() => setView('add')} className="bg-amber-500 hover:bg-amber-600 text-white">
                Log Your First Mood
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 