"use client";

import { ChevronDown } from "lucide-react";
import { FaRegFileAlt } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChallengeSectionProps {
  title?: string;
  description?: string;
  objective?: string;
  images?: string[];
}

const ChallengeSection = ({ title, description, objective, images }: ChallengeSectionProps) => {
  return (
    <div className="h-full relative border-r transition-all duration-300 ease-in-out bg-background flex flex-col w-full">
        <div className="flex flex-col gap-2 p-8 bg-muted/20 border-b border-border/50">
          <div className="flex items-center font-bold text-primary gap-2">
            <FaRegFileAlt strokeWidth={4} size={18} className="text-primary" />
            Challenge
          </div>
          <h2 className="text-2xl font-black text-foreground/80">
            {title || "Loading..."}
          </h2>
          <p className="text-muted-foreground text-sm flex gap-2 items-center">
            {description}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
            >
              {objective || ""}
            </ReactMarkdown>

            {images && images.length > 0 && (
              <div className="space-y-4 mt-6">
                <h3 className="text-lg font-bold text-foreground/80">Reference Images</h3>
                <div className="grid grid-cols-1 gap-4">
                  {images.map((url, index) => (
                    <div key={index} className="rounded-xl overflow-hidden border border-border/50 bg-muted/20">
                      <img 
                        src={url} 
                        alt={`Challenge reference ${index + 1}`} 
                        className="w-full h-auto object-contain max-h-[400px]" 
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
        
           <div className="mt-8 pb-24">
            <div className="flex justify-between gap-4 items-center p-6 bg-muted rounded-xl cursor-pointer">
              <div className="flex gap-4 items-center font-bold">
                <div className="text-foreground/80">
                   <FaLightbulb size={18} />
                </div>
                <div className="flex flex-col text-lg font-bold text-foreground/80">
                   Get a hint
                </div>
              </div>
              <span>
                <ChevronDown size={18} strokeWidth={3} className="text-foreground/80 group-hover:translate-y-0.5 transition-transform" />
              </span>
            </div>
          </div>
      </div>
    </div>
  );
};

export default ChallengeSection;
