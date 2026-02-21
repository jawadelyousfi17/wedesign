import SkillTag from '@/components/customs/skillTag'
import Tag from "@/components/customs/tag";
import { PiShareNetworkFill } from "react-icons/pi";
import { MdBookmark } from "react-icons/md";


const ChallengePreview = ({ title, skills, preview, reward, duration }: { title: string; skills: string[]; preview: string; reward: string; duration: string }) => {
  return (
   <div className="flex  flex-col gap-6 bg-card  py-8 px-6">
          <div className="flex justify-between items-center">
            <Tag>Current Problem</Tag>
            <div className="flex items-center gap-4">
              <PiShareNetworkFill className="text-foreground/50 hover:text-primary cursor-pointer  text-lg" />
              <MdBookmark className="text-foreground/50 hover:text-primary cursor-pointer text-xl" />
            </div>
          </div>

          <div className="text-2xl leading-8 font-bold">
            {title}
          </div>

          <div className="flex gap-4">
            <div className="p-5 rounded-2xl bg-muted/50 border border-border/50 w-full">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-muted-foreground/80 font-bold text-xs">
                  Duration
                </div>
                <div className="text-base text-foreground/70 font-bold">
                  {duration}
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-muted/50 border border-border/50 w-full">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-muted-foreground/80 font-bold text-xs">
                  Reward
                </div>
                <div className="text-base text-foreground/70 font-bold">
                  {reward} XP
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-base font-semibold">OBJECTIF</span>
            <span className="text-foreground/70 text-sm leading-6 -mt-1">
                {preview}
              
            </span>
            <span className="text-base font-semibold">SKILLS COVERED</span>

            <div className="flex flex-wrap gap-2 -mt-1">
              {skills.map((skill) => (
                <SkillTag key={skill} text={skill} />
              ))}
            </div>
          </div>
        </div>
  )
}

export default ChallengePreview