import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Loader2, ChevronRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface SolutionCheckProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  status: "idle" | "checking" | "success" | "error";
  feedback?: string;
  onContinue?: () => void;
  onRetry?: () => void;
}

const SolutionCheck = ({ open, onOpenChange, status, feedback, onContinue, onRetry }: SolutionCheckProps) => {
  const renderMarkdown = (content: string) => (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              style={vscDarkPlus as any}
              language={match[1]}
              PreTag="div"
              className="rounded-md !my-4 !bg-[#1e1e1e]"
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className="bg-muted px-1.5 py-0.5 rounded-md text-primary font-mono text-sm" {...props}>
              {children}
            </code>
          );
        },
        p: ({ children }) => <p className="mb-4 leading-relaxed text-foreground/80">{children}</p>,
        ul: ({ children }) => <ul className="mb-4 space-y-3">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-3 marker:text-primary marker:font-bold text-foreground/80">{children}</ol>,
        li: ({ children, className }) => {
          // Check if it's inside an unordered list (ul) by checking if it doesn't have the list-decimal class
          // A simpler way is to just style all li elements with a custom icon if they are not in an ol
          // But since we can't easily know the parent here without context, we'll use a CSS trick or just apply it to all ul > li
          return (
            <li className="flex items-start gap-2 text-foreground/80">
              <span className="mt-1 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary">
                <ChevronRight className="w-3 h-3" strokeWidth={3} />
              </span>
              <span className="flex-1">{children}</span>
            </li>
          );
        },
        h3: ({ children }) => <h3 className="text-lg font-semibold mt-6 mb-3 text-foreground flex items-center gap-2"><span className="w-1.5 h-5 bg-primary rounded-full inline-block"></span>{children}</h3>,
        h4: ({ children }) => <h4 className="text-base font-semibold mt-4 mb-2 text-foreground">{children}</h4>,
      }}
    >
      {content}
    </ReactMarkdown>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl text-center flex flex-col items-center justify-center py-10">
        {status === "checking" && (
          <>
            <Loader2 className="h-16 w-16 text-primary animate-spin mb-4" />
            <DialogHeader>
              <DialogTitle className="text-2xl text-center">Checking Solution...</DialogTitle>
              <DialogDescription className="text-center text-base">
                Please wait while we verify your code.
              </DialogDescription>
            </DialogHeader>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle2 className="h-20 w-20 text-green-500 mb-4" />
            <DialogHeader>
              <DialogTitle className="text-2xl text-center text-green-500">Challenge Completed!</DialogTitle>
              <DialogDescription asChild className="text-center text-base text-foreground/80 mt-4">
                <div className="text-left max-h-[50vh] overflow-y-auto px-4 py-2 w-full">
                  {renderMarkdown(feedback || "Great job! Your solution passed all tests.")}
                </div>
              </DialogDescription>
            </DialogHeader>
            <div className="mt-6 w-full">
              <Button onClick={onContinue} className="w-full text-lg h-12" size="lg">
                Continue to Next Challenge
              </Button>
            </div>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="h-20 w-20 text-red-500 mb-4" />
            <DialogHeader>
              <DialogTitle className="text-2xl text-center text-red-500">Not Quite Right</DialogTitle>
              <DialogDescription asChild className="text-center text-base text-foreground/80 mt-4">
                <div className="text-left max-h-[50vh] overflow-y-auto px-4 py-2 w-full">
                  {renderMarkdown(feedback || "Your solution didn't pass all the requirements. Keep trying!")}
                </div>
              </DialogDescription>
            </DialogHeader>
            <div className="mt-6 w-full flex gap-4">
              <Button onClick={onRetry} variant="outline" className="w-full text-lg h-12" size="lg">
                Try Again
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SolutionCheck;
