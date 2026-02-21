"use client";

import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { cn } from "@/lib/utils";
import { File } from "../page";

type CodeEditorProps = {
  files: Record<string, File>;
  onCodeChange: (fileName: string, value: string) => void;
};

const CodeEditor = ({ files, onCodeChange }: CodeEditorProps) => {
  const [activeFile, setActiveFile] = useState("index.html");

  const handleEditorChange = (value: string | undefined) => {
    onCodeChange(activeFile, value || "");
  };

  const fileList = Object.keys(files);

  return (
    <div className="flex flex-col w-full h-full bg-[#1e1e1e] border-r border-[#333]">
      {/* Tabs */}
      <div className="flex bg-[#252526] overflow-x-auto no-scrollbar">
        {fileList.map((fileName) => (
          <div
            key={fileName}
            onClick={() => setActiveFile(fileName)}
            className={cn(
              "flex items-center gap-2 px-3 py-2.5 text-sm cursor-pointer border-r border-[#1e1e1e] min-w-[120px] select-none transition-colors",
              activeFile === fileName
                ? "bg-[#1e1e1e] text-white"
                : "bg-[#2d2d2d] text-gray-400 hover:bg-[#2a2d2e]"
            )}
          >
            {files[fileName]?.icon}
            <span>{fileName}</span>
          </div>
        ))}
      </div>

      {/* Editor */}
      <div className="flex-1 relative">
        <Editor
          height="100%"
          path={activeFile}
          language={files[activeFile]?.language}
          value={files[activeFile]?.value}
          theme="vs-dark"
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: false,
            automaticLayout: true,
            padding: { top: 16 },
            wordWrap: "on",
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
