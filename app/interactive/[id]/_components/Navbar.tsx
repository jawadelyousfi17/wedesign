import { RiSettingsFill } from "react-icons/ri";
import { IoCloudDone, IoCloudUpload, IoWarning, IoSend } from "react-icons/io5";
import { FaCircleQuestion } from "react-icons/fa6";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { ModeToggle } from "@/components/mode-toggle";
import { useRouter } from "next/navigation";

type NavbarProps = {
  module: string;
  progress: number;
  saveStatus: "saving" | "saved" | "error";
  onSubmit: () => Promise<void>;
};

const Navbar = ({ module, progress, saveStatus, onSubmit }: NavbarProps) => {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const getStatusIcon = () => {
    switch (saveStatus) {
      case "saving":
        return <IoCloudUpload size={35} className="text-yellow-500 animate-pulse" />;
      case "error":
        return <IoWarning size={35} className="text-red-500" />;
      case "saved":
      default:
        return <IoCloudDone size={35} className="text-green-500" />;
    }
  };

  const getStatusText = () => {
    switch (saveStatus) {
      case "saving":
        return "Saving...";
      case "error":
        return "Failed to save";
      case "saved":
      default:
        return "Saved just now";
    }
  };

  return (
    <nav className="flex justify-between items-center h-16 px-8 bg-card border-b border-border">
      <div className="flex items-center gap-14">
        <div className="flex items-center gap-6" onClick={handleBack}>
          <MdOutlineArrowBackIos
            size={20}
            className="text-muted-foreground hover:text-muted-foreground/80 cursor-pointer"
          />
          <span className="font-bold text-lg cursor-pointer hover:underline">{module}</span>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <span className="font-black text-muted-foreground text-sm">
              Progress
            </span>
            <span className="font-black text-muted-foreground text-sm">
              {progress}%
            </span>
          </div>
          <div className="relative flex rounded-full bg-muted/70 w-40 h-1">
            <div className="absolute left-0 top-0 h-full rounded-full bg-primary w-[65%]"></div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3 font-bold text-md text-muted-foreground">
          {getStatusIcon()}
          {/* {getStatusText()} */}
        </div>
        <div className="flex items-center gap-4 pl-4 mr-4 rounded-full h-12">
         
          <ModeToggle />
          <RiSettingsFill
            size={30}
            className="text-slate-400 hover:text-muted-foreground/80 cursor-pointer"
          />
          <FaCircleQuestion
            size={30}
            className="text-slate-400 hover:text-muted-foreground/80 cursor-pointer"
          />
          <span 
            onClick={onSubmit}
            className="bg-primary font-black cursor-pointer hover:bg-primary/90 h-12 px-8 flex items-center rounded-xl text-card ml-8"
          >
            Submit solution
            <IoSend size={18} className="ml-2" />
          </span>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
