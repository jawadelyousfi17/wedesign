import { Button } from "@/components/ui/button";

import Main from "./_components/Main";
import ChallengePreview from "./_components/ChallengePreview";
import { getModulesChallenges } from "@/actions/getModulesChallenges";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const page = async () => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const userId = user.id;
  const modules = await getModulesChallenges(userId);

  return (
    <main className="flex h-[calc(100vh-4rem)] max-w-400 mx-auto">
      <div className="flex h-full flex-col justify-between gap-6 max-w-105 min-w-87.5 bg-card border-l border-r border-border overflow-y-auto">
        <ChallengePreview
          title="Build a Real-Time Chat Application with WebSockets"
          preview="You've mastered the box model. Now it's time to create a real-world hero section. You'll build a responsive navigation bar, a centered heading, and a call-to-action button using CSS Flexbox."
          reward="150"
          duration="45 Minutes"
          skills={["HTML", "CSS", "JavaScript", "WebSockets"]}
        />

        <div className="p-6 border-t border-border/50 bg-muted/50">
          <Button className="flex gap-2 w-full h-10 rounded-xl text-base font-semibold bg-secondary py-6 cursor-pointer justify-center items-center">
            Start Problem
            <div></div>
          </Button>
        </div>
      </div>

      <div className="flex justify-center w-full">
        <Main modules={modules} />
      </div>
    </main>
  );
};

export default page;
