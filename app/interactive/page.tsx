"use client";

import React, { useState } from "react";
import ChallengeSection from "./_components/ChallengeSection";
import CodeEditor from "./_components/CodeEditor";
import LivePreview from "./_components/LivePreview";
import Navbar from "./_components/Navbar";
import { FileCode, FileJson, FileType } from "lucide-react";
import {
  Panel,
  Group as PanelGroup,
  Separator as PanelResizeHandle,
} from "react-resizable-panels";

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
    value: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Hello, World!</h1>
    <p>Edit index.html to see changes, or styles.css to style it!</p>
    
    <script src="script.js"></script>
</body>
</html>`,
    icon: <FileCode size={16} className="text-orange-500" />,
  },
  "styles.css": {
    name: "styles.css",
    language: "css",
    value: `body {
    font-family: sans-serif;
    background-color: #fce7f3;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    margin: 0;
}

h1 {
    color: #db2777;
    margin-bottom: 20px;
}
    
p {
    color: #555;
}`,
    icon: <FileType size={16} className="text-blue-500" />,
  },
  "script.js": {
    name: "script.js",
    language: "javascript",
    value: `console.log("Hello from script.js");
    
// We can modify the DOM!
const h1 = document.querySelector('h1');
h1.addEventListener('click', () => {
    h1.style.color = 'blue';
    h1.textContent = 'Clicked!'
});
`,
    icon: <FileJson size={16} className="text-yellow-500" />,
  },
};

const Page = () => {
  const [files, setFiles] = useState(initialFiles);
  const [isResizing, setIsResizing] = useState(false);

  const onCodeChange = (fileName: string, value: string) => {
    setFiles((prev) => ({
      ...prev,
      [fileName]: {
        ...prev[fileName],
        value: value,
      },
    }));
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar module="Module 2 : CSS Fundamentals" progress={65} />
      <div className="flex-1 overflow-hidden h-full"> 
        <PanelGroup direction="horizontal">
          <Panel defaultSize={30} minSize={20} className="min-w-[250px]">
            <ChallengeSection />
          </Panel>
          <PanelResizeHandle 
            onDragging={setIsResizing}
            className="w-2 relative z-50 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center border-l border-r border-slate-200 focus:outline-none"
          >
            <div className="h-8 w-1 bg-slate-300 rounded-full" />
          </PanelResizeHandle>
          <Panel defaultSize={40} minSize={30}>
            <CodeEditor files={files} onCodeChange={onCodeChange} />
          </Panel>
          <PanelResizeHandle 
            onDragging={setIsResizing}
            className="w-2 relative z-50 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center border-l border-r border-slate-200 focus:outline-none"
          >
            <div className="h-8 w-1 bg-slate-300 rounded-full" />
          </PanelResizeHandle>
          <Panel defaultSize={30} minSize={20} className="min-w-[300px]">
             <LivePreview files={files} isResizing={isResizing} />
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
};
export default Page;
