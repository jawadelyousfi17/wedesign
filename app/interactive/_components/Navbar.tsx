import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { FaTerminal } from "react-icons/fa6";
import { RiSettingsFill } from "react-icons/ri";
import { IoCloudDone, IoSend } from "react-icons/io5";
import { FaCircleQuestion } from "react-icons/fa6";
import { MdOutlineArrowBackIos } from "react-icons/md";

const Navbar = ({ module, progress }: { module: string; progress: number }) => {
  return (
    <nav className="flex justify-between items-center h-16 px-8 bg-card border-b border-border">
      <div className="flex items-center gap-14">
        <div className="flex items-center gap-6">
            <MdOutlineArrowBackIos size={20} className="text-slate-600 hover:text-secondary/80 cursor-pointer" />
          <span className="font-bold text-lg">{module}</span>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <span className="font-black text-slate-600 text-sm">Progress</span>
            <span className="font-black text-slate-600 text-sm">
              {progress}%
            </span>
          </div>
          <div className="relative flex rounded-full bg-muted/70 w-40 h-1">
            <div className="absolute left-0 top-0 h-full rounded-full bg-primary w-[65%]"></div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3 font-bold text-md text-slate-600">
          <IoCloudDone  size={35}             className="text-slate-400 hover:text-secondary/80 cursor-pointer"
/>
          Saved just now
        </div>
        <div className="flex items-center gap-8 pl-4 mr-4 rounded-full   h-12">
          <RiSettingsFill
            size={30}
            className="text-slate-400 hover:text-secondary/80 cursor-pointer"
          />
          <FaCircleQuestion
            size={30}
            className="text-slate-400 hover:text-secondary/80 cursor-pointer"
          />
          <span className="bg-primary font-black cursor-pointer hover:bg-secondary/80 h-12 px-8 flex items-center rounded-xl text-card">
            Submit solution
            <IoSend size={18} className="ml-2" />
          </span>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
