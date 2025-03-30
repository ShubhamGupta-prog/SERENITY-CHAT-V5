import React from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Phone, ExternalLink, BookOpen, LifeBuoy } from "lucide-react";

interface CrisisResourcesCardProps {
  className?: string;
}

interface ResourceType {
  name: string;
  description: string;
  contact?: string;
  website?: string;
  icon: React.ReactNode;
  urgency: 'emergency' | 'urgent' | 'helpline';
}

export function CrisisResourcesCard({ className }: CrisisResourcesCardProps) {
  const emergencyResources: ResourceType[] = [
    {
      name: "National Suicide Prevention Lifeline",
      description: "24/7 support for people in distress",
      contact: "988 or 1-800-273-8255",
      website: "https://988lifeline.org/",
      icon: <Phone className="h-5 w-5" />,
      urgency: 'emergency'
    },
    {
      name: "Crisis Text Line",
      description: "Text HOME to 741741 for crisis support",
      contact: "Text HOME to 741741",
      website: "https://www.crisistextline.org/",
      icon: <Phone className="h-5 w-5" />,
      urgency: 'emergency'
    },
    {
      name: "Emergency Services",
      description: "Call for immediate emergency assistance",
      contact: "112",
      icon: <LifeBuoy className="h-5 w-5" />,
      urgency: 'emergency'
    }
  ];

  const supportResources: ResourceType[] = [
    {
      name: "SAMHSA's National Helpline",
      description: "Treatment referral and information service",
      contact: "1-800-662-HELP (4357)",
      website: "https://www.samhsa.gov/find-help/national-helpline",
      icon: <Phone className="h-5 w-5" />,
      urgency: 'helpline'
    },
    {
      name: "The Trevor Project",
      description: "Crisis intervention for LGBTQ young people",
      contact: "1-866-488-7386",
      website: "https://www.thetrevorproject.org/",
      icon: <BookOpen className="h-5 w-5" />,
      urgency: 'helpline'
    }
  ];

  return (
    <div className={cn("glass-panel rounded-xl p-5 relative border-2 border-purple-200 dark:border-purple-800/30", className)}>
      <h2 className="text-xl font-medium mb-4 text-purple-700 dark:text-purple-400">Crisis Resources</h2>
      
      <p className="text-muted-foreground mb-6">
        If you're experiencing a mental health emergency, please reach out to these resources for immediate support.
      </p>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2 text-red-600 dark:text-red-400 flex items-center">
            <LifeBuoy className="h-5 w-5 mr-2" /> Emergency Resources
          </h3>
          <div className="space-y-3">
            {emergencyResources.map((resource, index) => (
              <div key={index} className="glass-panel rounded-lg p-4 border-l-4 border-red-500 emergency-resource">
                <div className="flex items-center mb-2">
                  <div className="mr-3 p-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                    {resource.icon}
                  </div>
                  <div>
                    <h4 className="font-medium">{resource.name}</h4>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {resource.contact && (
                    <Button variant="secondary" size="sm" className="h-8 gap-1">
                      <Phone className="h-4 w-4" /> {resource.contact}
                    </Button>
                  )}
                  {resource.website && (
                    <Button variant="outline" size="sm" className="h-8 gap-1" onClick={() => window.open(resource.website, '_blank')}>
                      <ExternalLink className="h-4 w-4" /> Website
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2 text-purple-600 dark:text-purple-400 flex items-center">
            <Phone className="h-5 w-5 mr-2" /> Support Helplines
          </h3>
          <div className="space-y-3">
            {supportResources.map((resource, index) => (
              <div key={index} className="glass-panel rounded-lg p-4 border-l-4 border-purple-500">
                <div className="flex items-center mb-2">
                  <div className="mr-3 p-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                    {resource.icon}
                  </div>
                  <div>
                    <h4 className="font-medium">{resource.name}</h4>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {resource.contact && (
                    <Button variant="secondary" size="sm" className="h-8 gap-1 bg-purple-100 hover:bg-purple-200 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-900/50">
                      <Phone className="h-4 w-4" /> {resource.contact}
                    </Button>
                  )}
                  {resource.website && (
                    <Button variant="outline" size="sm" className="h-8 gap-1 border-purple-200 text-purple-700 hover:bg-purple-100 dark:border-purple-800/30 dark:text-purple-300 dark:hover:bg-purple-900/30" onClick={() => window.open(resource.website, '_blank')}>
                      <ExternalLink className="h-4 w-4" /> Website
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800/30">
          <p className="text-sm text-purple-700 dark:text-purple-300">
            Remember, if you're in immediate danger, please call emergency services right away. You are not alone, and help is available.
          </p>
        </div>
      </div>
    </div>
  );
} 