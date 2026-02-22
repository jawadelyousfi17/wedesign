'use server'

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type SaveProgressParams = {
    userId: string;
    challengeId: string;
    html?: string;
    css?: string;
    js?: string;
}

export const saveChallengeProgress = async ({ userId, challengeId, html, css, js }: SaveProgressParams) => {
    try {
        const existingProgress = await prisma.challengeProgress.findUnique({
            where: {
                userId_challengeId: {
                    userId,
                    challengeId
                }
            }
        });

        if (existingProgress) {
            await prisma.challengeProgress.update({
                where: {
                    id: existingProgress.id
                },
                data: {
                    html,
                    css,
                    js,
                    updatedAt: new Date()
                }
            });
        } else {
            // Should usually be created when unlocking, but safe fallback
            await prisma.challengeProgress.create({
                data: {
                    userId,
                    challengeId,
                    html,
                    css,
                    js,
                    status: 'CURRENT',
                    startedAt: new Date(),
                }
            });
        }
        
        revalidatePath(`/interactive/${challengeId}`);
        return { success: true };
    } catch (error) {
        console.error("Error saving progress:", error);
        return { success: false, error };
    }
}
