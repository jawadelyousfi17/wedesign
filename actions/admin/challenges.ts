'use server'

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Challenge Actions
export const createChallenge = async (data: { 
    title: string; 
    description: string; 
    images?: string[];
    order: number;
    moduleId: number;
    starterCodeHtml?: string | null;
    starterCodeCss?: string | null;
    starterCodeJs?: string | null;
}) => {
    try {
        const { title, description, images, order, moduleId, starterCodeHtml, starterCodeCss, starterCodeJs } = data;
        
        const challenge = await prisma.challenge.create({ 
            data: {
                title, 
                description, 
                images: images || [],
                order, 
                moduleId
            } 
        });
        
        // Also create a default empty problem for it
        await prisma.problem.create({
            data: {
                challengeId: challenge.id,
                title: challenge.title,
                objective: "Objective goes here",
                duration: 15,
                rewardXP: 50,
                starterCodeHtml: starterCodeHtml === undefined ? null : starterCodeHtml,
                starterCodeCss: starterCodeCss === undefined ? null : starterCodeCss,
                starterCodeJs: starterCodeJs === undefined ? null : starterCodeJs
            }
        });

        revalidatePath('/admin');
        return { success: true, data: challenge };
    } catch (error) {
        console.error("Error creating challenge:", error);
        return { success: false, error };
    }
}

export const updateChallenge = async (id: string, data: { 
    title?: string; 
    description?: string; 
    images?: string[];
    order?: number; 
    moduleId?: number;
    starterCodeHtml?: string | null;
    starterCodeCss?: string | null;
    starterCodeJs?: string | null;
}) => {
    try {
        const { title, description, images, order, moduleId, starterCodeHtml, starterCodeCss, starterCodeJs } = data;
        
        const challenge = await prisma.challenge.update({
            where: { id },
            data: {
                title, 
                description, 
                images,
                order, 
                moduleId,
                problem: {
                    update: {
                        starterCodeHtml: starterCodeHtml === undefined ? null : starterCodeHtml,
                        starterCodeCss: starterCodeCss === undefined ? null : starterCodeCss,
                        starterCodeJs: starterCodeJs === undefined ? null : starterCodeJs
                    }
                }
            }
        });
        revalidatePath('/admin');
        return { success: true, data: challenge };
    } catch (error) {
        console.error("Error updating challenge:", error);
        return { success: false, error };
    }
}

export const deleteChallenge = async (id: string) => {
    try {
        await prisma.challenge.delete({ where: { id } });
        revalidatePath('/admin');
        return { success: true };
    } catch (error) {
        console.error("Error deleting challenge:", error);
        return { success: false, error };
    }
}

export const getChallenges = async () => {
    try {
        return await prisma.challenge.findMany({
            orderBy: { order: 'asc' },
            include: { module: true, problem: true }
        });
    } catch (error) {
         console.error("Error getting challenges:", error);
        return [];
    }
}
