import { cn } from "@/lib/utils";
import { Check, Lock, Play } from "lucide-react";
import Link from "next/link";

type PathCardProps = {
  id: string;
  title: string;
  description: string;
  status: "Completed" | "Not started" | "Locked" | "Current";
};

const PathCard = ({ id, title, description, status }: PathCardProps) => {
  const getStatusBadge = () => {
    switch (status) {
      case "Completed":
        return (
          <div className="flex  rounded-full bg-blue-600 h-8 w-8 justify-center items-center text-white">
            <Check size={20} />
          </div>
        );
      case "Current":
        return (
          <div className="flex gap-2 items-center">
          
            <div className="flex rounded-full bg-primary h-8 w-8 justify-center items-center text-white">
              <Play size={16} fill="currentColor" />
            </div>
          </div>
        );
      case "Locked":
        return (
          <div className="flex  rounded-full bg-slate-300 h-8 w-8 justify-center items-center text-slate-600">
            <Lock size={18} />
          </div>
        );
      case "Not started":
        return (
          <div className="flex  rounded-full border-2 border-slate-400 h-8 w-8 justify-center items-center">
            <div className="w-5 h-5" />
          </div>
        );
    }
  };

  const content = (
    <>
      <div className="flex items-center gap-4">
        {getStatusBadge()}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "text-md font-semibold  text-blue-600",
                status === "Current" ? "text-primary" : "",
                status === "Locked" ? "text-slate-500" : ""
              )}
            >
              {title}
            </span>
            {status === "Current" && (
              <span className="px-2 py-0.5 bg-primary/15 text-primary text-xs font-bold rounded-sm">
                Current
              </span>
            )}
          </div>

          <span className="text-sm text-slate-500">{description}</span>
        </div>
      </div>
    </>
  );

  if (status === "Locked") {
    return (
      <div
        className={`flex justify-between p-2 rounded-2xl border border-border/0  bg-background items-center cursor-not-allowed transition-colors opacity-60`}
      >
        {content}
      </div>
    );
  }

  return (
    <Link
      href={`/interactive/${id}`}
      className={`flex justify-between p-2 rounded-2xl border border-border/0  bg-background items-center cursor-pointer transition-colors ${
        status === "Current"
          ? "hover:border-primary bg-muted/50 "
          : " hover:border-card/50 hover:bg-muted/50"
      }`}
    >
      {content}
    </Link>
  );
};

export default PathCard;
