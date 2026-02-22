'use server'

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Module Actions
export const createModuleAction = async (data: { title: string; description?: string; moduleNumber: number; order: number }) => {
    try {
        const newModule = await prisma.module.create({ data });
        revalidatePath('/admin');
        return { success: true, data: newModule };
    } catch (error) {
        console.error("Error creating module:", error);
        return { success: false, error };
    }
}

export const updateModule = async (id: number, data: { title?: string; description?: string; moduleNumber?: number; order?: number }) => {
    try {
        const updatedModule = await prisma.module.update({
            where: { id },
            data
        });
        revalidatePath('/admin');
        return { success: true, data: updatedModule };
    } catch (error) {
        console.error("Error updating module:", error);
        return { success: false, error };
    }
}

export const deleteModule = async (id: number) => {
    try {
        await prisma.module.delete({ where: { id } });
        revalidatePath('/admin');
        return { success: true };
    } catch (error) {
        console.error("Error deleting module:", error);
        return { success: false, error };
    }
}

export const getModules = async () => {
    try {
        return await prisma.module.findMany({
            orderBy: { order: 'asc' },
            include: { challenges: true }
        });
    } catch (error) {
        console.error("Error fetching modules:", error);
        return [];
    }
}
