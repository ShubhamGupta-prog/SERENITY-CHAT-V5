import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';

// Define SpeechRecognition interfaces for TypeScript
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
  error: any;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: (event: Event) => void;
  onend: (event: Event) => void;
  onerror: (event: SpeechRecognitionEvent) => void;
  onresult: (event: SpeechRecognitionEvent) => void;
}

// Define the SpeechRecognition constructor
interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
  prototype: SpeechRecognition;
}

interface SpeechRecognitionProps {
  onTranscript: (text: string) => void;
  disabled?: boolean;
}

const VoiceWaveformSvg = ({ isActive = false }: { isActive?: boolean }) => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`${isActive ? "text-red-500" : "text-primary dark:text-gray-300"} transition-colors duration-200`}
  >
    <path 
      d="M12,2.5 C12.7796706,2.5 13.4204457,3.09488554 13.4931332,3.85553954 L13.5,4 L13.5,20 C13.5,20.8284 12.8284,21.5 12,21.5 C11.2203294,21.5 10.5795543,20.9050879 10.5068668,20.1444558 L10.5,20 L10.5,4 C10.5,3.17157 11.1716,2.5 12,2.5 Z M8,5.5 C8.82843,5.5 9.5,6.17157 9.5,7 L9.5,17 C9.5,17.8284 8.82843,18.5 8,18.5 C7.17157,18.5 6.5,17.8284 6.5,17 L6.5,7 C6.5,6.17157 7.17157,5.5 8,5.5 Z M16,5.5 C16.8284,5.5 17.5,6.17157 17.5,7 L17.5,17 C17.5,17.8284 16.8284,18.5 16,18.5 C15.1716,18.5 14.5,17.8284 14.5,17 L14.5,7 C14.5,6.17157 15.1716,5.5 16,5.5 Z M4,8.5 C4.82843,8.5 5.5,9.17157 5.5,10 L5.5,14 C5.5,14.8284 4.82843,15.5 4,15.5 C3.17157,15.5 2.5,14.8284 2.5,14 L2.5,10 C2.5,9.17157 3.17157,8.5 4,8.5 Z M20,8.5 C20.7796706,8.5 21.4204457,9.09488554 21.4931332,9.85553954 L21.5,10 L21.5,14 C21.5,14.8284 20.8284,15.5 20,15.5 C19.2203294,15.5 18.5795543,14.9050879 18.5068668,14.1444558 L18.5,14 L18.5,10 C18.5,9.17157 19.1716,8.5 20,8.5 Z" 
      fill="currentColor"
    />
  </svg>
);

export function SpeechRecognitionButton({ onTranscript, disabled = false }: SpeechRecognitionProps) {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [isSupported, setIsSupported] = useState(true);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);

  // Initialize speech recognition
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.warn('Speech recognition not supported in this browser');
      setIsSupported(false);
      return;
    }

    // Create recognition instance
    const SpeechRecognition = (window.SpeechRecognition || window.webkitSpeechRecognition) as SpeechRecognitionConstructor;
    const recognitionInstance = new SpeechRecognition();
    
    // Configure recognition
    recognitionInstance.continuous = false;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = 'en-US';
    
    // Set up event handlers
    recognitionInstance.onstart = () => {
      console.log('Speech recognition started');
      setIsListening(true);
      setInterimTranscript('');
    };
    
    recognitionInstance.onend = () => {
      console.log('Speech recognition ended');
      setIsListening(false);
      setInterimTranscript('');
    };
    
    recognitionInstance.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
      setInterimTranscript('');
    };
    
    recognitionInstance.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
      
      // Update interim transcript for visual feedback
      setInterimTranscript(transcript);
      
      if (event.results[0].isFinal) {
        console.log('Final transcript:', transcript);
        onTranscript(transcript);
        setInterimTranscript('');
        recognitionInstance.stop();
      }
    };
    
    setRecognition(recognitionInstance);
    
    return () => {
      // Clean up
      if (recognitionInstance) {
        recognitionInstance.abort();
      }
    };
  }, [onTranscript]);

  const toggleListening = useCallback(() => {
    if (!recognition) return;
    
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  }, [isListening, recognition]);

  if (!isSupported) {
    return null;
  }

  return (
    <div className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Voice mode tooltip */}
      {showTooltip && !isListening && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-xs text-center bg-background/90 dark:bg-gray-800/90 rounded-md px-3 py-1.5 shadow-sm border animate-fade-in whitespace-nowrap z-10">
          Use voice mode
        </div>
      )}
      
      {/* Listening status */}
      {isListening && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-xs text-center bg-background/90 dark:bg-gray-800/90 rounded-md px-3 py-1.5 shadow-sm border animate-fade-in z-10">
          <span className="flex items-center justify-center gap-1.5">
            <span className="inline-block h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
            Listening...
          </span>
          {interimTranscript && (
            <div className="max-w-[150px] truncate text-muted-foreground">
              {interimTranscript}
            </div>
          )}
        </div>
      )}
      
      <Button
        type="button"
        size="icon"
        variant="ghost"
        className={`rounded-full p-0 h-10 w-10 transition-all duration-200 ${
          isListening 
            ? 'bg-red-500/10 ring-2 ring-red-500/20' 
            : 'hover:bg-primary/10'
        }`}
        onClick={toggleListening}
        disabled={disabled}
      >
        <VoiceWaveformSvg isActive={isListening} />
      </Button>
    </div>
  );
}

// Add TypeScript declarations for the Web Speech API
declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionConstructor;
    webkitSpeechRecognition: SpeechRecognitionConstructor;
  }
} 