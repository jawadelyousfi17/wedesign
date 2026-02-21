import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "wedesign | Learn Fullstack by Doing",
  description: "Master Frontend and Backend through hands-on projects.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function InteractiveLayout({ children }: RootLayoutProps) {
  return (
    <div className="h-screen flex flex-col">
       <main className="flex-1">{children}</main>
    </div>
  );
}
