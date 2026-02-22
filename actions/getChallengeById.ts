'use server'

import { prisma } from "@/lib/prisma";

export const getChallengeById = async (challengeId: string, userId?: string) => {
    try {
        const challenge = await prisma.challenge.findUnique({
            where: {
                id: challengeId
            },
            include: {
                problem: true,
                skills: {
                    include: {
                        skill: true
                    }
                },
                module: true,
                challengeProgress: userId ? {
                    where: {
                        userId: userId
                    }
                } : false // If no userId provided, don't fetch progress or fetch empty
            }
        });
        
        return challenge;
    } catch (error) {
        console.error("Error fetching challenge:", error);
        return null;
    }
}
