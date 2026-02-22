import { FiEye } from "react-icons/fi";
import { FaDesktop } from "react-icons/fa6";
import { FaMobileAlt } from "react-icons/fa";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { type File } from "./ClientPage";

type LivePreviewProps = {
  files: Record<string, File>;
  isResizing?: boolean;
};

const LivePreview = ({ files, isResizing }: LivePreviewProps) => {
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");

  const srcDoc = useMemo(() => {
    if (!files) return "";
    
    // Fallback to empty string if file doesn't exist
    const htmlContent = files["index.html"]?.value || "";
    const cssContent = files["styles.css"]?.value || "";
    const jsContent = files["script.js"]?.value || "";

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
        <style>${cssContent}</style>
        <script>
            // Intercept clicks and form submissions to prevent navigation
            document.addEventListener('click', (e) => {
              const link = e.target.closest('a');
              if (link) {
                e.preventDefault();
                console.log('Link navigation prevented');
              }
            }, true); // Capture phase
            
            // Prevent form submission
            document.addEventListener('submit', (e) => {
              e.preventDefault();
              console.log('Form submission prevented');
            }, true); // Capture phase
        </script>
      </head>
      <body>
        ${htmlContent}
        <script>
          try {
            ${jsContent}
          } catch (err) {
            console.error(err);
          }
        </script>
      </body>
      </html>
    `;
  }, [files]);

  return (
    <div className="flex flex-col h-full w-full border-r relative bg-muted">
      {/* Header */}
      <div className="p-4 flex items-center justify-between bg-background border-b border-border/40">
        <div className="flex items-center gap-2">
          <FiEye size={18} className="text-muted-foreground" strokeWidth={3} />
          <h2 className="text-sm font-black text-foreground  ">Live Preview</h2>
        </div>
        <div className="text-xs text-muted-foreground font-medium">Auto-updating</div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 w-full h-full relative flex flex-col items-center justify-center overflow-hidden">
        {/* Iframe Container */}
        <div
          className={cn(
            "bg-white transition-all duration-500 ease-in-out  relative overflow-hidden",
            viewMode === "mobile" 
              ? "w-93.75 h-166.75 rounded-[3rem] border-8 border-foreground shadow-xl" 
              : "w-full h-full ",
              isResizing && "pointer-events-none select-none transition-none"
          )}
        >
          {viewMode === "mobile" && (
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-foreground rounded-b-xl z-20"></div>
          )}
          
          <iframe
            title="preview"
            srcDoc={srcDoc}
            className="w-full h-full border-none bg-white"
            sandbox="allow-scripts allow-modals allow-same-origin"
          />
        </div>
      </div>

      {/* View Toggle Controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center bg-card border border-border shadow-lg rounded-full p-1 gap-1 z-50">
        <button
          onClick={() => setViewMode("desktop")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all",
            viewMode === "desktop"
              ? "bg-foreground text-background shadow-md transform scale-105"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
        >
          <FaDesktop size={14} />
          <span>Desktop</span>
        </button>

        <div className="w-px h-4 bg-border mx-1"></div>

        <button
          onClick={() => setViewMode("mobile")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all",
            viewMode === "mobile"
              ? "bg-foreground text-background shadow-md transform scale-105"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
        >
          <FaMobileAlt size={14} />
          <span>Mobile</span>
        </button>
      </div>
    </div>
  );
};

export default LivePreview;
