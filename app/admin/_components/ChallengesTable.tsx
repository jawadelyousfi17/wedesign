"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { deleteChallenge } from "@/actions/admin/challenges";
import { toast } from "sonner";
import { useState } from "react";
import CreateChallengeDialog from "./CreateChallengeDialog";

type Challenge = {
    id: string;
    title: string;
    description: string;
    images: string[];
    order: number;
    moduleId: number;
    module: {
        title: string;
        moduleNumber: number;
    };
    problem: {
        id: string;
        starterCodeHtml: string | null;
        starterCodeCss: string | null;
        starterCodeJs: string | null;
    } | null;
};

type Module = {
    id: number;
    moduleNumber: number;
    title: string;
};

type ChallengesTableProps = {
    challenges: Challenge[];
    modules: Module[];
};

const ChallengesTable = ({ challenges, modules }: ChallengesTableProps) => {
    const [editingChallenge, setEditingChallenge] = useState<Challenge | null>(null);

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this challenge?")) {
            const result = await deleteChallenge(id);
            if (result.success) {
                toast.success("Challenge deleted");
            } else {
                toast.error("Failed to delete challenge");
            }
        }
    };

    return (
        <>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Module</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                         {challenges.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                                    No challenges found. Create one.
                                </TableCell>
                            </TableRow>
                        ) : (
                            challenges.map((challenge) => (
                                <TableRow key={challenge.id}>
                                    <TableCell>{challenge.order}</TableCell>
                                    <TableCell className="font-medium">{challenge.title}</TableCell>
                                    <TableCell>
                                        Module {challenge.module.moduleNumber}: {challenge.module.title}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button 
                                                variant="ghost" 
                                                size="icon"
                                                onClick={() => setEditingChallenge(challenge)}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                className="text-red-500 hover:text-red-700 hover:bg-red-100"
                                                onClick={() => handleDelete(challenge.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <CreateChallengeDialog 
                open={!!editingChallenge} 
                onOpenChange={(open) => !open && setEditingChallenge(null)}
                challengeToEdit={editingChallenge}
                modules={modules}
            />
        </>
    );
};

export default ChallengesTable;
