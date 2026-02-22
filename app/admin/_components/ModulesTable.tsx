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
import { deleteModule } from "@/actions/admin/modules";
import { toast } from "sonner";
import { useState } from "react";
import CreateModuleDialog from "./CreateModuleDialog";

type Module = {
    id: number;
    title: string;
    description: string | null;
    moduleNumber: number;
    order: number;
    challenges: any[]; // Using any for simplicity for now
};

type ModulesTableProps = {
    modules: Module[];
};

const ModulesTable = ({ modules }: ModulesTableProps) => {
    const [editingModule, setEditingModule] = useState<Module | null>(null);

    const handleDelete = async (id: number) => {
        if (confirm("Are you sure you want to delete this module?")) {
            const result = await deleteModule(id);
            if (result.success) {
                toast.success("Module deleted");
            } else {
                toast.error("Failed to delete module");
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
                            <TableHead>Number</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Challenges</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {modules.map((module) => (
                            <TableRow key={module.id}>
                                <TableCell>{module.order}</TableCell>
                                <TableCell>{module.moduleNumber}</TableCell>
                                <TableCell className="font-medium">{module.title}</TableCell>
                                <TableCell>{module.challenges.length}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button 
                                            variant="ghost" 
                                            size="icon"
                                            onClick={() => setEditingModule(module)}
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="text-red-500 hover:text-red-700 hover:bg-red-100"
                                            onClick={() => handleDelete(module.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <CreateModuleDialog 
                open={!!editingModule} 
                onOpenChange={(open) => !open && setEditingModule(null)}
                moduleToEdit={editingModule}
            />
        </>
    );
};

export default ModulesTable;
