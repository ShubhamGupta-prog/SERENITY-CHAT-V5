import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Quote, Pause } from 'lucide-react';

interface QuoteCollageProps {
  className?: string;
}

type QuoteType = {
  text: string;
  author: string;
  color: string;
};

export function QuoteCollage({ className }: QuoteCollageProps) {
  // All quotes for the carousel
  const allQuotes: QuoteType[] = [
    {
      text: "Mental health problems don't define who you are. They are something you experience, but they are not you.",
      author: "Matt Haig",
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800/30",
    },
    {
      text: "There is hope, even when your brain tells you there isn't.",
      author: "John Green",
      color: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800/30",
    },
    {
      text: "Our wounds are often the openings into the best and most beautiful part of us",
      author: "David Richo",
      color: "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800/30",
    },
    {
      text: "One small crack does not mean that you are broken, it means that you were put to the test and you didn’t fall apart..",
      author: "Linda Poindexter",
      color: "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/30",
    },
    {
      text: "You are not your illness. You have an individual story to tell. You have a name, a history, a personality.",
      author: "Julian Seifter",
      color: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800/30",
    },
    {
      text: "My dark days made me strong. Or maybe I already was strong, and they made me prove it.",
      author: "Emery Lord",
      color: "bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 border-teal-200 dark:border-teal-800/30",
    },
    {
      text: "Being able to be your true self is one of the strongest components of good mental health.",
      author: "Dr. Lauren Fogel",
      color: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/30",
    },
    {
      text: "Mental health is not a destination, but a process. It's about how you drive, not where you're going.",
      author: "Noam Shpancer",
      color: "bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800/30",
    },
    {
      text: "Emotional pain is not something that should be hidden away and never spoken about.",
      author: "Steven Aitchison",
      color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/30",
    },
    {
      text: "You don't have to control your thoughts. You just have to stop letting them control you.",
      author: "Dan Millman",
      color: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800/30",
    },
    {
      text: "'Positive Vibes Only' isn't a thing. Humans have a wide range of emotions, and that's okay.",
      author: "Joubert Botha",
      color: "bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-300 border-violet-200 dark:border-violet-800/30",
    },
    {
      text: "The strongest people are not those who show strength in front of the world but those who fight and win battles that others do not know anything about.",
      author: "Jonathan Harnisch",
      color: "bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-800 dark:text-fuchsia-300 border-fuchsia-200 dark:border-fuchsia-800/30",
    }
  ];

  // Split quotes into two rows
  const topRowQuotes = allQuotes.slice(0, 6);
  const bottomRowQuotes = allQuotes.slice(6);

  // State for hover pause
  const [isPaused, setIsPaused] = useState(false);

  // Handle hover to pause animations
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);
  
  return (
    <div className={cn("space-y-6", className)}>
      <p className="text-center text-xs text-muted-foreground mb-2 flex items-center justify-center">
      </p>
      
      <div 
        className="overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Top row - scrolling left to right */}
        <div className="relative mb-6 overflow-hidden">
          <div 
            className={cn(
              "flex gap-4 animate-scroll-right", 
              isPaused && "animation-paused"
            )}
          >
            {/* First set of quotes */}
            {topRowQuotes.map((quote, index) => (
              <QuoteCard key={`top-1-${index}`} quote={quote} />
            ))}
            {/* Duplicate set for seamless scrolling */}
            {topRowQuotes.map((quote, index) => (
              <QuoteCard key={`top-2-${index}`} quote={quote} />
            ))}
          </div>
        </div>

        {/* Bottom row - scrolling right to left */}
        <div className="relative overflow-hidden">
          <div 
            className={cn(
              "flex gap-4 animate-scroll-left", 
              isPaused && "animation-paused"
            )}
          >
            {/* First set of quotes */}
            {bottomRowQuotes.map((quote, index) => (
              <QuoteCard key={`bottom-1-${index}`} quote={quote} />
            ))}
            {/* Duplicate set for seamless scrolling */}
            {bottomRowQuotes.map((quote, index) => (
              <QuoteCard key={`bottom-2-${index}`} quote={quote} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Separate component for individual quote cards
function QuoteCard({ quote }: { quote: QuoteType }) {
  return (
    <div 
      className={cn(
        "glass-panel rounded-xl p-5 border flex flex-col justify-between transition-all",
        "hover:shadow-md hover:-translate-y-1 quote-card-glow flex-shrink-0",
        quote.color
      )}
      style={{ 
        width: "350px",
        minHeight: "180px",
        transitionDuration: "0.3s"
      }}
    >
      <div>
        <Quote className="h-6 w-6 mb-3 opacity-60 quote-icon-rotate" style={{ transformOrigin: 'center' }} />
        <p className="italic mb-4 line-clamp-4">
          "{quote.text}"
        </p>
      </div>
      <p className="font-medium text-right">– {quote.author}</p>
    </div>
  );
} 