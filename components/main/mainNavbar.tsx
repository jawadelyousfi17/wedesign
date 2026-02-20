import { HugeiconsIcon } from "@hugeicons/react";
import { UserIcon } from "@hugeicons/core-free-icons";

import Image from "next/image";

const MainNavbar = () => {
  return (
    <nav className="flex justify-between items-center bg-card  px-8 border-b border-border h-16">
      <div className="flex h-16 items-center gap-12">
        <div className="">
          <Image
            src="/logos/wide-logo-light.png"
            alt="light-Logo"
            width={150}
            height={150 / 3}
          ></Image>
        </div>

        <div className="h-full">
          <ul className="flex gap-8 font-semibold text-md text-muted-foreground h-full">
            <li className="flex items-center  text-foreground  h-full border-b-3 border-primary">
              Home
            </li>
            <li className="flex items-center h-full border-b-3 border-card">
              Projects
            </li>
            <li className="flex items-center h-full border-b-3 border-card">
              Community
            </li>
          </ul>
        </div>
      </div>

      <div className="flex gap-12 items-center">
        <div className="flex items-center py-1.5 px-4 h-fit text-md text-slate-700 bg-muted font-semibold rounded-full gap-1">
          <Image
            src="/icons/fire-4.png"
            alt="Fire Icon"
            width={20}
            height={20}
          ></Image>
          12 Days Streak
        </div>

        <div className="flex justify-center items-center w-12 h-12 rounded-full bg-secondary ring-1 ring-border border-2 border-card text-card">
          <HugeiconsIcon icon={UserIcon} />
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;
