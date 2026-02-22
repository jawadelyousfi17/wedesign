"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { MdDarkMode } from "react-icons/md";
import { IoMdSunny } from "react-icons/io";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div
      className="flex justify-center items-center cursor-pointer  hover:text-muted-foreground/80"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? (
        <IoMdSunny
          size={32}
          className="text-slate-400 hover:text-muted-foreground/80 cursor-pointer"
        />
      ) : (
        <MdDarkMode
          size={32}
          className="text-slate-400 hover:text-muted-foreground/80 cursor-pointer"
        />
      )}
    </div>
  );
}
