import { getChallengeById } from "@/actions/getChallengeById";
import ClientPage from "./_components/ClientPage";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const resolvedParams = await params;
  const challenge = await getChallengeById(resolvedParams.id, user.id);

  if (!challenge) {
    notFound();
  }

  // Create a serializable object for the client component
  // Using spread operator like ...challenge.module might cause issues if properties are non-enumerable or specific types
  // But for Prisma models it's okay except for Date objects.
  
  const sanitizedChallenge = {
      ...challenge,
      createdAt: challenge.createdAt.toISOString(),
      updatedAt: challenge.updatedAt.toISOString(),
      module: {
          ...challenge.module,
          createdAt: challenge.module.createdAt.toISOString(),
          updatedAt: challenge.module.updatedAt.toISOString(),
      },
      problem: challenge.problem ? {
          ...challenge.problem,
          createdAt: challenge.problem.createdAt.toISOString(),
          updatedAt: challenge.problem.updatedAt.toISOString(),
      } : null,
      challengeProgress: (challenge.challengeProgress || []).map((cp) => ({
          ...cp,
          createdAt: cp.createdAt.toISOString(),
          updatedAt: cp.updatedAt.toISOString(),
      })),
      skills: challenge.skills.map(s => ({
          ...s,
          createdAt: s.createdAt.toISOString(),
          skill: {
              ...s.skill,
              createdAt: s.skill.createdAt.toISOString(),
              updatedAt: s.skill.updatedAt.toISOString()
          }
      }))
  };

  return <ClientPage challenge={sanitizedChallenge} userId={user.id} />;
};

export default Page;
