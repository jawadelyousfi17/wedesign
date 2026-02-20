import { Check, ChevronDown, Lock, Loader } from "lucide-react";

type ModulCardProps = {
  moduleNumber: number;
  title: string;
  status: "Completed" | "progress" | "Locked";
  completedChallenges: number;
  totalChallenges: number;
};

const ModulCard = ({
  moduleNumber,
  title,
  status,
  completedChallenges,
  totalChallenges,
}: ModulCardProps) => {
  const getStatusIcon = () => {
    switch (status) {
      case "Completed":
        return (
          <div className="flex justify-center items-center p-2 border-2 border-green-600 rounded-2xl bg-green-50 text-green-600">
            <Check size={20} />
          </div>
        );
      case "progress":
        return (
          <div className="flex justify-center items-center p-2 border-2 border-blue-600 rounded-2xl bg-blue-50 text-blue-600">
            <Loader size={20} />
          </div>
        );
      case "Locked":
        return (
          <div className="flex justify-center items-center p-2 border-2 border-slate-400 rounded-2xl bg-slate-100 text-slate-600">
            <Lock size={20} />
          </div>
        );
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "Completed":
        return `COMPLETED - ${completedChallenges}/${totalChallenges} Challenges`;
      case "progress":
        return `IN PROGRESS - ${completedChallenges}/${totalChallenges} Challenges`;
      case "Locked":
        return `LOCKED - ${totalChallenges} Challenges`;
    }
  };

  return (
    <div className="flex justify-between items-center bg-slate-100/80 p-3 rounded-3xl w-full border border-slate-200">
      <div className="flex items-center gap-4">
        {getStatusIcon()}
        <div className="flex flex-col gap-0">
          <span className="text-md font-bold text-slate-900">
            Module {moduleNumber} : {title}
          </span>
          <span className="text-xs font-semibold text-slate-600">
            {getStatusText()}
          </span>
        </div>
      </div>

      <span className="flex justify-center items-center">
        <ChevronDown />
      </span>
    </div>
  );
};

export default ModulCard;
