import { Check, Lock, Play } from "lucide-react";

type PathCardProps = {
  title: string;
  description: string;
  status: "Completed" | "Not started" | "Locked" | "Current";
};

const PathCard = ({ title, description, status }: PathCardProps) => {
  const getStatusBadge = () => {
    switch (status) {
      case "Completed":
        return (
          <div className="flex  rounded-full bg-green-600 h-8 w-8 justify-center items-center text-white">
            <Check size={20} />
          </div>
        );
      case "Current":
        return (
          <div className="flex gap-2 items-center">
            <span className="px-3 py-1 bg-primary/15 text-primary text-xs font-bold rounded-md">
              Current
            </span>
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

  return (
    <div
      className={`flex justify-between p-4 rounded-2xl border items-center cursor-pointer transition-colors ${
        status === "Locked"
          ? "bg-slate-50 border-slate-200 opacity-60"
          : status === "Current"
            ? "bg-white border-primary/40 hover:border-primary "
            : "bg-white border-slate-200 hover:border-slate-300 "
      }`}
    >
      <div className="flex">
        <div className="flex flex-col">
          <span className="text-md font-semibold text-slate-900">{title}</span>
          <span className="text-sm text-slate-600">{description}</span>
        </div>
      </div>
      {getStatusBadge()}
    </div>
  );
};

export default PathCard;
