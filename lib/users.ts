import { prisma } from "@/lib/prisma";

export async function ensureUserExists(user: { id: string; email?: string; user_metadata?: { name?: string; full_name?: string } }) {
  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (existingUser) {
    return existingUser;
  }

  // If not, create user
  const newUser = await prisma.user.create({
    data: {
      id: user.id, // Use Supabase ID
      email: user.email || "",
      name: user.user_metadata?.name || user.user_metadata?.full_name || user.email?.split('@')[0] || "User",
      password: "", // Managed by Supabase
    },
  });

  // Initialize progress: Unlock the first module
  const firstModule = await prisma.module.findFirst({
    orderBy: { order: 'asc' },
    include: {
      challenges: {
        orderBy: { order: 'asc' }
      }
    }
  });

  if (firstModule) {
    await prisma.moduleProgress.create({
      data: {
        userId: newUser.id,
        moduleId: firstModule.id,
        status: 'IN_PROGRESS',
        totalChallenges: firstModule.challenges.length
      },
    });

    const firstChallenge = firstModule.challenges[0];
    if (firstChallenge) {
      await prisma.challengeProgress.create({
        data: {
          userId: newUser.id,
          challengeId: firstChallenge.id,
          status: 'CURRENT', // Mark as the current active challenge
        }
      });
    }
  }
  
  return newUser;
}

