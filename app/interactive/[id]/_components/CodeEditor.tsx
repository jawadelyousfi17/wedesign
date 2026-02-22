"use client";

import React, { useRef } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { File } from "./ClientPage";

type CodeEditorProps = {
  files: Record<string, File>;
  activeFile: string;
  onFileChange: (fileName: string, value: string | undefined) => void;
  onFileSelect: (fileName: string) => void;
};

const CodeEditor = ({ files, activeFile, onFileChange, onFileSelect }: CodeEditorProps) => {
  const { resolvedTheme } = useTheme();
  // Using explicit ref type from React or just any
  const editorRef = useRef<unknown>(null);
  const [monacoInstance, setMonacoInstance] = React.useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any

  const handleEditorChange = (value: string | undefined) => {
    onFileChange(activeFile, value);
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    setMonacoInstance(monaco);
    
    monaco.editor.defineTheme("custom-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#0a0a0a",
        "editor.foreground": "#f5f5f5",
        "editor.lineHighlightBackground": "#141414",
        "editor.selectionBackground": "#262626",
        "editor.inactiveSelectionBackground": "#1a1a1a",
      },
    });

    monaco.editor.defineTheme("custom-light", {
      base: "vs",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#ffffff",
        "editor.foreground": "#1a1a1a",
        "editor.lineHighlightBackground": "#f5f5f5",
        "editor.selectionBackground": "#e2e8f0",
        "editor.inactiveSelectionBackground": "#f4f4f4",
      },
    });

    monaco.editor.setTheme(resolvedTheme === "dark" ? "custom-dark" : "custom-light");
  };

  React.useEffect(() => {
    if (editorRef.current && monacoInstance) {
        monacoInstance.editor.setTheme(resolvedTheme === "dark" ? "custom-dark" : "custom-light");   
    }
  }, [resolvedTheme, monacoInstance]);

  React.useEffect(() => {
    if (monacoInstance) {
      document.fonts.ready.then(() => {
        monacoInstance.editor.remeasureFonts();
      });
    }
  }, [monacoInstance]);

  const fileList = Object.keys(files);
  const currentFile = files[activeFile];

  return (
    <div className="flex flex-col w-full h-full bg-background border-r border-border">
      {/* Tabs */}
      <div className="flex bg-muted overflow-x-auto no-scrollbar">
        {fileList.map((fileName) => (
          <div
            key={fileName}
            onClick={() => onFileSelect(fileName)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-sm cursor-pointer border-r border-border min-w-fit transition-colors select-none",
              activeFile === fileName
                ? "bg-background text-primary font-medium border-t-2 border-t-primary"
                : "bg-muted text-muted-foreground hover:bg-background/50 hover:text-foreground"
            )}
          >
            {files[fileName].icon}
            {fileName}
          </div>
        ))}
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden relative">
        <Editor
          height="100%"
          language={currentFile?.language || "javascript"}
          value={currentFile?.value || ""}
          theme={resolvedTheme === "dark" ? "custom-dark" : "custom-light"}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: "on",
            scrollBeyondLastLine: false,
            padding: { top: 16, bottom: 16 },
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontLigatures: true,
            automaticLayout: true, 
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
