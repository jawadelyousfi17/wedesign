'use server'

import { prisma } from "@/lib/prisma";

export type ModuleWithChallenges = Awaited<ReturnType<typeof getModulesChallenges>>[number];

export const getModulesChallenges = async (userId: string) => {
    try {
        const modules = await prisma.module.findMany({
            orderBy: {
                order: 'asc',
            },
            include: {
                moduleProgress: {
                    where: { userId },
                },
                challenges: {
                    orderBy: {
                        order: 'asc',
                    },
                    include: {
                        challengeProgress: {
                            where: { userId },
                        },
                        skills: {
                            include: {
                                skill: true,
                            },
                        },
                    },
                },
            },
        });

        return modules;
    } catch (error) {
        console.error("Error fetching modules:", error);
        return [];
    }
};

