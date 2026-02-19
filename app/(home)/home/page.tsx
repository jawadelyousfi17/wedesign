import Tag from "@/components/customs/tag";
import { Button } from "@/components/ui/button";

import {
  Bookmark02Icon,
  Share08Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import  Main  from "./_components/Main";

const page = () => {
  return (
    <main className="flex h-[calc(100vh-4rem)]">
      <div className="flex h-full flex-col justify-between gap-8 w-1/5 min-w-120 bg-card border-r border-border overflow-y-auto">
        <div className="flex  flex-col gap-8 bg-card  py-12 px-8">
          <div className="flex justify-between items-center">
            <Tag>Current Problem</Tag>
            <div className="flex items-center gap-4">
              <HugeiconsIcon icon={Share08Icon} />
              <HugeiconsIcon icon={Bookmark02Icon} />
            </div>
          </div>

          <div className="text-4xl leading-12 font-bold">
            Build a Real-Time Chat Application with WebSockets
          </div>

          <div className="flex gap-4">
            <div className="p-6 rounded-2xl bg-muted/50 border border-border/50 w-full">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-muted-foreground/80 font-bold text-sm">
                  Duration
                </div>
                <div className="text-lg text-foreground/70 font-bold">
                  45 Minutes
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-muted/50 border border-border/50 w-full">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-muted-foreground/80 font-bold text-sm">
                  Reward
                </div>
                <div className="text-lg text-foreground/70 font-bold">
                  150 XP
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-lg font-semibold">OBJECTIF</span>
            <span className="text-foreground/70 text-md leading-7 -mt-2">
              You&apos;ve mastered the box model. Now it&apos;s time to create a
              real-world hero section. You&apos;ll build a responsive navigation
              bar, a centered heading, and a call-to-action button using{" "}
              <strong className="border-b border-primary   text-foreground">
                CSS Flexbox
              </strong>
              .
            </span>
            <span className="text-lg font-semibold">SKILLS COVERED</span>

            <div className="flex flex-wrap gap-2 -mt-2">
              <span className="p-1 px-4 font-bold text-sm text-foreground/70 bg-muted/70  w-fit rounded-full">
                Responsive design
              </span>
              <span className="p-1 px-4 font-bold text-sm text-foreground/70 bg-muted/70  w-fit rounded-full">
                CSS Flexbox
              </span>
              <span className="p-1 px-4 font-bold text-sm text-foreground/70 bg-muted/70  w-fit rounded-full">
                CSS Media Query
              </span>
              <span className="p-1 px-4 font-bold text-sm text-foreground/70 bg-muted/70  w-fit rounded-full">
                Align Items
              </span>
            </div>
          </div>
        </div>

        <div className="p-8 border-t border-border/50 bg-muted/50">
          <Button className="flex gap-2 w-full h-12 rounded-2xl text-lg font-semibold bg-secondary py-8 cursor-pointer justify-center items-center">
            Start Problem
            <div></div>
          </Button>
        </div>
      </div>

<div className="flex justify-center">
      <Main />
</div>

    </main>
  );
};

export default page;
