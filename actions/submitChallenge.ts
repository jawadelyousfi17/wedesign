'use server'

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type SubmitChallengeParams = {
    userId: string;
    challengeId: string;
}

export const submitChallenge = async ({ userId, challengeId }: SubmitChallengeParams) => {
    try {
        // 1. Mark current challenge as COMPLETED
        // First check if progress exists, create if not (edge case)
        const progress = await prisma.challengeProgress.findUnique({
             where: {
                 userId_challengeId: {
                     userId,
                     challengeId
                 }
             }
        });

        let wasAlreadyCompleted = false;

        if (progress) {
             wasAlreadyCompleted = progress.status === 'COMPLETED';
             await prisma.challengeProgress.update({
                where: { id: progress.id },
                data: {
                    status: 'COMPLETED',
                    completedAt: new Date()
                }
            });
        } else {
             await prisma.challengeProgress.create({
                data: {
                    userId,
                    challengeId,
                    status: 'COMPLETED',
                    completedAt: new Date(),
                    startedAt: new Date()
                }
            });
        }

        // 2. Find the current challenge to get its order and moduleId
        const currentChallenge = await prisma.challenge.findUnique({
            where: { id: challengeId },
            include: { 
                module: true,
                problem: true // Fetch problem for XP
            }
        });

        if (!currentChallenge) {
            throw new Error("Challenge not found");
        }

        // 3. Grant XP and Update Module Progress if first time completion
        if (!wasAlreadyCompleted) {
             // Add XP
             if (currentChallenge.problem?.rewardXP) {
                 await prisma.user.update({
                     where: { id: userId },
                     data: {
                         totalXP: {
                             increment: currentChallenge.problem.rewardXP
                         }
                     }
                 });
             }

             // Update Module Progress
             await prisma.moduleProgress.updateMany({
                 where: {
                     userId,
                     moduleId: currentChallenge.moduleId
                 },
                 data: {
                     completedChallenges: {
                         increment: 1
                     }
                 }
             });
        }

        // 4. Find the next challenge in the same module
        const nextChallenge = await prisma.challenge.findFirst({
            where: {
                moduleId: currentChallenge.moduleId,
                order: {
                    gt: currentChallenge.order
                }
            },
            orderBy: {
                order: 'asc'
            }
        });

        if (nextChallenge) {
            // 4. Unlock the next challenge (set to CURRENT)
            // Check if progress already exists (e.g. user revisited)
            const nextChallengeProgress = await prisma.challengeProgress.findUnique({
                where: {
                    userId_challengeId: {
                        userId,
                        challengeId: nextChallenge.id
                    }
                }
            });

            if (!nextChallengeProgress) {
                await prisma.challengeProgress.create({
                    data: {
                        userId,
                        challengeId: nextChallenge.id,
                        status: 'CURRENT',
                        startedAt: new Date()
                    }
                });
            } else if (nextChallengeProgress.status === 'LOCKED' || nextChallengeProgress.status === 'NOT_STARTED') {
                 await prisma.challengeProgress.update({
                    where: { id: nextChallengeProgress.id },
                    data: { status: 'CURRENT' }
                 });
            }
            
            revalidatePath(`/interactive/${challengeId}`);
            return { success: true, nextChallengeId: nextChallenge.id };
        } else {
            // Module Completed!
            // Update Module Progress
            await prisma.moduleProgress.update({
                where: {
                    userId_moduleId: {
                        userId,
                        moduleId: currentChallenge.moduleId
                    }
                },
                data: {
                    status: 'COMPLETED'
                }
            });
            
             // TODO: Unlock next module logic if needed here

             revalidatePath(`/interactive/${challengeId}`);
             return { success: true, completedModule: true };
        }

    } catch (error) {
        console.error("Error submitting challenge:", error);
        return { success: false, error };
    }
}
