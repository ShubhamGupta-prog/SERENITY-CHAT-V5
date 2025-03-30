import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Play, Pause, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BreathingCardProps {
  className?: string;
}

export function BreathingCard({ className }: BreathingCardProps) {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('inhale');
  const [timer, setTimer] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  
  const phaseDuration = {
    inhale: 4,
    hold: 4,
    exhale: 6,
    rest: 2
  };
  
  const totalDuration = phaseDuration.inhale + phaseDuration.hold + phaseDuration.exhale + phaseDuration.rest;
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        setTimer(prevTimer => {
          const newTimer = prevTimer + 1;
          
          // Determine the current phase based on the timer
          const cycle = newTimer % totalDuration;
          
          if (cycle < phaseDuration.inhale) {
            setPhase('inhale');
          } else if (cycle < phaseDuration.inhale + phaseDuration.hold) {
            setPhase('hold');
          } else if (cycle < phaseDuration.inhale + phaseDuration.hold + phaseDuration.exhale) {
            setPhase('exhale');
          } else {
            setPhase('rest');
          }
          
          return newTimer;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isActive]);
  
  const phaseProgress = () => {
    const cycle = timer % totalDuration;
    
    if (phase === 'inhale') {
      return (cycle / phaseDuration.inhale) * 100;
    } else if (phase === 'hold') {
      return ((cycle - phaseDuration.inhale) / phaseDuration.hold) * 100;
    } else if (phase === 'exhale') {
      return ((cycle - phaseDuration.inhale - phaseDuration.hold) / phaseDuration.exhale) * 100;
    } else {
      return ((cycle - phaseDuration.inhale - phaseDuration.hold - phaseDuration.exhale) / phaseDuration.rest) * 100;
    }
  };
  
  const getRemainingTime = () => {
    const cycle = timer % totalDuration;
    
    if (phase === 'inhale') {
      return Math.max(0, phaseDuration.inhale - cycle);
    } else if (phase === 'hold') {
      return Math.max(0, phaseDuration.hold - (cycle - phaseDuration.inhale));
    } else if (phase === 'exhale') {
      return Math.max(0, phaseDuration.exhale - (cycle - phaseDuration.inhale - phaseDuration.hold));
    } else {
      return Math.max(0, phaseDuration.rest - (cycle - phaseDuration.inhale - phaseDuration.hold - phaseDuration.exhale));
    }
  };
  
  const toggleActive = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setTimer(0);
      setPhase('inhale');
    }
  };
  
  return (
    <div className={cn("glass-panel rounded-xl p-5 relative", className)}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium text-lg">Breathing Exercise</h3>
        <button 
          onClick={() => setShowInfo(!showInfo)}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <Info size={18} />
        </button>
      </div>
      
      {showInfo && (
        <div className="bg-secondary/50 dark:bg-gray-800/50 p-3 rounded-md mb-4 text-sm">
          <p>The 4-4-6 breathing technique can help reduce anxiety and stress:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Inhale slowly through nose for 4 seconds</li>
            <li>Hold your breath for 4 seconds</li>
            <li>Exhale slowly through mouth for 6 seconds</li>
            <li>Rest for 2 seconds before repeating</li>
          </ul>
        </div>
      )}
      
      <div className="flex justify-center my-8">
        <div 
          className={cn(
            "relative w-44 h-44 rounded-full flex items-center justify-center transition-all duration-1000",
            phase === 'inhale' ? 'bg-blue-100 dark:bg-blue-900/30 scale-110' : '',
            phase === 'hold' ? 'bg-green-100 dark:bg-green-900/30 scale-110' : '',
            phase === 'exhale' ? 'bg-purple-100 dark:bg-purple-900/30 scale-100' : '',
            phase === 'rest' ? 'bg-gray-100 dark:bg-gray-800/50 scale-100' : '',
            !isActive ? 'bg-gray-100 dark:bg-gray-800/30' : ''
          )}
        >
          <div className="text-center">
            <div className="text-xl font-medium capitalize mb-1">
              {isActive ? phase : 'Ready'}
            </div>
            <div className="text-2xl font-bold">
              {isActive ? getRemainingTime() : ''}
            </div>
          </div>
          
          {isActive && (
            <svg className="absolute inset-0" width="176" height="176" viewBox="0 0 176 176">
              <circle 
                cx="88" 
                cy="88" 
                r="80" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="4" 
                strokeDasharray="502" 
                strokeDashoffset={502 - (502 * phaseProgress() / 100)}
                className={cn(
                  "transition-all duration-1000",
                  phase === 'inhale' ? 'text-blue-500 dark:text-blue-400' : '',
                  phase === 'hold' ? 'text-green-500 dark:text-green-400' : '',
                  phase === 'exhale' ? 'text-purple-500 dark:text-purple-400' : '',
                  phase === 'rest' ? 'text-gray-500 dark:text-gray-400' : ''
                )}
                transform="rotate(-90 88 88)"
              />
            </svg>
          )}
        </div>
      </div>
      
      <Button onClick={toggleActive} className="w-full">
        {isActive ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
        {isActive ? 'Pause' : 'Start'} Breathing Exercise
      </Button>
      
      {isActive && (
        <p className="text-center text-sm text-muted-foreground mt-4">
          {phase === 'inhale' && 'Breathe in slowly through your nose...'}
          {phase === 'hold' && 'Hold your breath...'}
          {phase === 'exhale' && 'Exhale slowly through your mouth...'}
          {phase === 'rest' && 'Rest before the next breath...'}
        </p>
      )}
    </div>
  );
} 