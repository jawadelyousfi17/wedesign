import BackgroundPattern from "@/components/background/backgroundPattern";
import MainNavbar from "@/components/main/mainNavbar";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "wedesign | Learn Fullstack by Doing",
  description: "Master Frontend and Backend through hands-on projects.",
};

// Define the Props type for the Layout
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        
    <BackgroundPattern />

       <MainNavbar />
  
        <main className="flex-grow">
          {children}
        </main>

      
      </body>
    </html>
  );
}


