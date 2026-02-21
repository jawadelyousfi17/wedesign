import { FiEye } from "react-icons/fi";
import { FaDesktop } from "react-icons/fa6";
import { FaMobileAlt } from "react-icons/fa";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { File } from "../page";

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
        <style>
          ${cssContent}
        </style>
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
    <div className="flex flex-col h-full w-full border-r relative bg-slate-50">
      {/* Header */}
      <div className="p-4 flex items-center justify-between bg-white border-b border-border/40">
        <div className="flex items-center gap-2">
          <FiEye size={18} className="text-slate-600" strokeWidth={3} />
          <h2 className="text-sm font-black text-slate-700  ">Live Preview</h2>
        </div>
        <div className="text-xs text-slate-400 font-medium">Auto-updating</div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 w-full h-full relative flex flex-col items-center justify-center overflow-hidden">
        {/* Iframe Container */}
        <div
          className={cn(
            "bg-white transition-all duration-500 ease-in-out  relative overflow-hidden",
            viewMode === "mobile" 
              ? "w-[375px] h-[667px] rounded-[3rem] border-[8px] border-slate-800 shadow-xl" 
              : "w-full h-full rounded-lg",
              isResizing && "pointer-events-none select-none transition-none"
          )}
        >
          {viewMode === "mobile" && (
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-xl z-20"></div>
          )}
          
          <iframe
            title="preview"
            srcDoc={srcDoc}
            className="w-full h-full border-none bg-white"
            sandbox="allow-scripts"
          />
        </div>
      </div>

      {/* View Toggle Controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center bg-white border border-slate-200 shadow-lg rounded-full p-1 gap-1 z-50">
        <button
          onClick={() => setViewMode("desktop")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all",
            viewMode === "desktop"
              ? "bg-slate-800 text-white shadow-md transform scale-105"
              : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
          )}
        >
          <FaDesktop size={14} />
          <span>Desktop</span>
        </button>

        <div className="w-px h-4 bg-slate-200 mx-1"></div>

        <button
          onClick={() => setViewMode("mobile")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all",
            viewMode === "mobile"
              ? "bg-slate-800 text-white shadow-md transform scale-105"
              : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
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
