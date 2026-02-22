"use client";

import React, { useState, useEffect } from "react";
import ChallengeSection from "./ChallengeSection";
import CodeEditor from "./CodeEditor";
import LivePreview from "./LivePreview";
import Navbar from "./Navbar";
import { FileCode } from "lucide-react";
import {
  Panel,
  Group as PanelGroup,
  Separator as PanelResizeHandle,
} from "react-resizable-panels";
import { useDebounce } from "@/hooks/useDebounce";
import { saveChallengeProgress } from "@/actions/saveChallengeProgress";
import { submitChallenge } from "@/actions/submitChallenge";
import { reviewCode } from "@/actions/ai-review/review";
import { toast } from "sonner"; // Assuming sonner is installed or handle notification differently
import { useRouter } from "next/navigation";
import SolutionCheck from "./review/SolutionCheck";


export type File = {
  name: string;
  language: string;
  value: string;
  icon?: React.ReactNode;
};

const initialFiles: Record<string, File> = {
  "index.html": {
    name: "index.html",
    language: "html",
    value: "",
    icon: <FileCode size={16} className="text-orange-500" />,
  },
  "styles.css": {
    name: "styles.css",
    language: "css",
    value: "",
    icon: <FileCode size={16} className="text-blue-500" />,
  },
  "script.js": {
    name: "script.js",
    language: "javascript",
    value: "",
    icon: <FileCode size={16} className="text-yellow-500" />,
  },
};

type SanitizedChallenge = {
  id: string;
  title: string;
  description: string;
  images: string[];
  order: number;
  moduleId: number;
  createdAt: string;
  updatedAt: string;
  module: {
    id: number;
    title: string;
    moduleNumber: number;
    description: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  problem: {
    id: string;
    title: string;
    objective: string;
    starterCodeHtml: string | null;
    starterCodeCss: string | null;
    starterCodeJs: string | null;
  } | null;
  challengeProgress: Array<{
    html: string | null;
    css: string | null;
    js: string | null;
    status: string;
  }>;
};

type ClientPageProps = {
  challenge: SanitizedChallenge; 
  userId: string;
};

const ClientPage = ({ challenge, userId }: ClientPageProps) => {
  const router = useRouter();
  
  // Get saved progress or fall back to starter code
  const savedProgress = challenge.challengeProgress?.[0];

  const [files, setFiles] = useState<Record<string, File>>(() => {
    const initialFilesState: Record<string, File> = {};
    
    const htmlValue = savedProgress?.html ?? challenge.problem?.starterCodeHtml;
    if (htmlValue !== null && htmlValue !== undefined && htmlValue !== "") {
      initialFilesState["index.html"] = {
        ...initialFiles["index.html"],
        value: htmlValue,
      };
    }

    const cssValue = savedProgress?.css ?? challenge.problem?.starterCodeCss;
    if (cssValue !== null && cssValue !== undefined && cssValue !== "") {
      initialFilesState["styles.css"] = {
        ...initialFiles["styles.css"],
        value: cssValue,
      };
    }

    const jsValue = savedProgress?.js ?? challenge.problem?.starterCodeJs;
    if (jsValue !== null && jsValue !== undefined && jsValue !== "") {
      initialFilesState["script.js"] = {
        ...initialFiles["script.js"],
        value: jsValue,
      };
    }

    // Fallback if all are empty
    if (Object.keys(initialFilesState).length === 0) {
      initialFilesState["index.html"] = {
        ...initialFiles["index.html"],
        value: "",
      };
    }

    return initialFilesState;
  });

  const [activeFile, setActiveFile] = useState<string>(() => {
    if (files["index.html"]) return "index.html";
    if (files["styles.css"]) return "styles.css";
    if (files["script.js"]) return "script.js";
    return "index.html"; // Fallback
  });

  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "error">("saved");
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [reviewStatus, setReviewStatus] = useState<"idle" | "checking" | "success" | "error">("idle");
  const [reviewFeedback, setReviewFeedback] = useState<string>("");
  const [nextChallengeId, setNextChallengeId] = useState<string | null>(null);
  const [completedModule, setCompletedModule] = useState<boolean>(false);

  const debouncedFiles = useDebounce(files, 1000); // Save after 1 second of inactivity

  useEffect(() => {
    const saveProgress = async () => {
      // User ID is now passed as a prop
      
      const result = await saveChallengeProgress({
        userId,
        challengeId: challenge.id,
        html: debouncedFiles["index.html"]?.value,
        css: debouncedFiles["styles.css"]?.value,
        js: debouncedFiles["script.js"]?.value,
      });

      if (!result.success) {
         setSaveStatus("error");
         toast.error("Failed to save progress");
      } else {
         setSaveStatus("saved");
      }
    };

    // Only save if files have changed from initial state (or add dirty check)
    // For now, save on every debounce trigger if data exists
    if (debouncedFiles) {
        saveProgress();
    }
  }, [debouncedFiles, challenge.id, userId]);

  const handleFileChange = (fileName: string, value: string | undefined) => {
    if (value === undefined) return;
    setSaveStatus("saving");
    setFiles((prev) => ({
      ...prev,
      [fileName]: {
        ...prev[fileName],
        value,
      },
    }));
  };

  const handleSubmit = async () => {
      // 1. First ensure progress is saved
      setSaveStatus("saving");
      setIsReviewOpen(true);
      setReviewStatus("checking");
      setReviewFeedback("");
      
      try {
        await saveChallengeProgress({
            userId,
            challengeId: challenge.id,
            html: files["index.html"]?.value,
            css: files["styles.css"]?.value,
            js: files["script.js"]?.value,
        });
        
        // 2. AI Review
        const reviewResult = await reviewCode({
            moduleName: challenge.module?.title || "Unknown Module",
            challengeName: challenge.title,
            description: challenge.problem?.objective || challenge.description,
            html: files["index.html"]?.value,
            css: files["styles.css"]?.value,
            js: files["script.js"]?.value,
        });

        setReviewFeedback(reviewResult.feedback);

        if (!reviewResult.pass) {
            setReviewStatus("error");
            setSaveStatus("saved");
            return;
        }

        // 3. Submit challenge if AI review passes
        const result = await submitChallenge({
            userId,
            challengeId: challenge.id
        });

        if (result.success) {
            setReviewStatus("success");
            setNextChallengeId(result.nextChallengeId || null);
            setCompletedModule(result.completedModule || false);
        } else {
             setReviewStatus("error");
             setSaveStatus("error");
             setReviewFeedback("Failed to submit challenge progress to the server.");
        }
      } catch (error) {
          console.error(error);
          setReviewStatus("error");
          setSaveStatus("error");
          setReviewFeedback("An unexpected error occurred.");
      }
  };

  const handleContinue = () => {
    setIsReviewOpen(false);
    if (nextChallengeId) {
      router.push(`/interactive/${nextChallengeId}`);
    } else if (completedModule) {
      router.push('/home');
    }
  };

  const handleRetry = () => {
    setIsReviewOpen(false);
    setReviewStatus("idle");
  };

  return (
    <div className="flex flex-col h-screen w-full bg-background text-foreground overflow-hidden">
      <Navbar 
        module={challenge?.module?.title || "Module"} 
        progress={65} 
        saveStatus={saveStatus}
        onSubmit={handleSubmit}
      />
      
      <div className="flex-1 overflow-hidden h-full">
        <PanelGroup orientation="horizontal" className="h-full">
          <Panel defaultSize={25} minSize={20}  id="challenge-panel">
            <ChallengeSection 
                title={challenge?.title || "Challenge Title"}
                description={challenge?.description || "Description"}
                objective={challenge?.problem?.objective || "Objective"}
                images={challenge?.images || []}
            />
          </Panel>
          
          <PanelResizeHandle className="w-1 bg-border hover:bg-primary/50 transition-colors cursor-col-resize" />
          
          <Panel defaultSize={40} minSize={20} id="editor-panel">
            <CodeEditor 
                files={files} 
                activeFile={activeFile}
                onFileChange={handleFileChange}
                onFileSelect={setActiveFile}
             />
          </Panel>
          
          <PanelResizeHandle className="w-1 bg-border hover:bg-primary/50 transition-colors cursor-col-resize" />

          <Panel defaultSize={35} minSize={20} id="preview-panel">
             <LivePreview files={files} />
          </Panel>
        </PanelGroup>
      </div>

      <SolutionCheck 
        open={isReviewOpen} 
        onOpenChange={setIsReviewOpen} 
        status={reviewStatus} 
        feedback={reviewFeedback}
        onContinue={handleContinue}
        onRetry={handleRetry}
      />
    </div>
  );
};

export default ClientPage;
