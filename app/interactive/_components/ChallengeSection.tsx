"use client";

import { IoCloudDone } from "react-icons/io5";
import { FaRegFileAlt } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";
import { ChevronDown } from "lucide-react";

const ChallengeSection = () => {
  return (
    <div className="h-full relative border-r transition-all duration-300 ease-in-out bg-background flex flex-col w-full">
        <div className="flex flex-col gap-2 p-8 bg-muted/20 border-b border-border/50">
          <div className="flex items-center font-bold text-primary gap-2">
            <FaRegFileAlt strokeWidth={4} size={18} className="text-primary" />
            Challenge
          </div>
          <h2 className="text-2xl font-black text-slate-900">
            Build a responsive website
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="p-8 flex flex-col gap-6">
            <div className="">
              <span className="font-bold">Instructions</span>
              <span className="block mt-2 text-sm text-slate-600">
                Create a responsive website with a navigation bar, hero section, and
                footer. The website should adapt to different screen sizes and
                include interactive elements such as a dropdown menu and a contact
                form.
              </span>
            </div>
            <div>
              <span className="font-bold">Requirements</span>
              <span className="block mt-2 text-sm text-slate-600">
                Create a responsive website with a navigation bar, hero section, and
                footer. The website should adapt to different screen sizes and
                include interactive elements such as a dropdown menu and a contact
                form.
              </span>
            </div>
          </div>

          <div className="px-8 mt-4">
           
            <div className=" overflow-hidden relative group">
              <img src="/images/site.png" alt="Site preview" className="w-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500" />
            </div>
          </div>

          <div className="px-8 mt-8 pb-24">
            <div className="flex justify-between gap-4 items-center p-4 bg-yellow-50/50 border border-yellow-100 rounded-xl cursor-pointer hover:bg-yellow-50 hover:border-yellow-200 transition-all group">
              <div className="flex gap-4 items-center font-bold">
                <div className="bg-yellow-100 p-2 rounded-lg text-yellow-600 group-hover:scale-110 transition-transform">
                   <FaLightbulb size={18} />
                </div>
                <div className="flex flex-col">
                    <span className="text-slate-800 text-sm">Stuck?</span>
                    <span className="text-slate-500 text-xs font-normal">Get a hint</span>
                </div>
              </div>
              <span>
                <ChevronDown size={18} strokeWidth={3} className="text-slate-400 group-hover:translate-y-0.5 transition-transform" />
              </span>
            </div>
          </div>
        </div>

    </div>
  );
};

export default ChallengeSection;
