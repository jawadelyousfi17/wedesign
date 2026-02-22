import PathCard from "./pathCard";
import ModulCard from "./ModulCard";
import BackgroundPattern from "@/components/background/backgroundPattern";
import { ModuleWithChallenges } from "@/actions/getModulesChallenges";

interface MainProps {
  modules: ModuleWithChallenges[];
}

const Main = ({ modules }: MainProps) => {

  const getModuleStatus = (status: string | undefined): "Completed" | "progress" | "Locked" => {
    switch (status) {
      case "COMPLETED":
        return "Completed";
      case "IN_PROGRESS":
        return "progress";
      default:
        return "Locked";
    }
  };

  const getChallengeStatus = (status: string | undefined): "Completed" | "Current" | "Not started" | "Locked" => {
    switch (status) {
      case "COMPLETED":
        return "Completed";
      case "CURRENT":
        return "Current";
      case "NOT_STARTED":
        return "Not started";
      case "LOCKED":
        return "Locked";
      default:
        return "Locked";
    }
  };

  return (
    <div className="p-8 w-full flex flex-col gap-8">
      {modules.map((module) => {
        const moduleProgress = module.moduleProgress?.[0];
        const status = getModuleStatus(moduleProgress?.status);
        const completedCount = moduleProgress?.completedChallenges || 0;
        
        return (
        <div key={module.id} className="flex flex-col">
          <ModulCard
            moduleNumber={module.moduleNumber}
            title={module.title}
            status={status}
            completedChallenges={completedCount}
            totalChallenges={module.challenges.length} // Should check real count or just length
          />
          <div className="flex flex-col gap-0 p-4 relative border border-t-0">
             {status === "progress" && <BackgroundPattern />}
            {module.challenges.map((challenge) => {
                const challengeProgress = challenge.challengeProgress?.[0];
                let challengeStatus = getChallengeStatus(challengeProgress?.status);
                
                // If module is locked, override challenge status
                if (status === "Locked") {
                    challengeStatus = "Locked";
                }

                // If no progress record found but module is active, default to Locked unless it's the first one?
                // Actually, seed script creates progress records. If none found, assume locked.
                if (!challengeProgress && status !== "Locked") {
                    challengeStatus = "Locked"
                }

                return (
                  <PathCard
                    key={challenge.id}
                    id={challenge.id}
                    title={challenge.title}
                    description={challenge.description}
                    status={challengeStatus}
                  />
                )
            })}
          </div>
        </div>
      )})}
    </div>
  );
};

export default Main;
