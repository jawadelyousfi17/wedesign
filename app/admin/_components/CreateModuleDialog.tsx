"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createModuleAction, updateModule } from "@/actions/admin/modules";
import { useState, useEffect } from "react";
import { toast } from "sonner";

type CreateModuleDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    moduleToEdit?: {
        id: number;
        title: string;
        description: string | null;
        moduleNumber: number;
        order: number;
    } | null;
};

const CreateModuleDialog = ({ open, onOpenChange, moduleToEdit }: CreateModuleDialogProps) => {
    const isEdit = !!moduleToEdit;
    
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        moduleNumber: 1,
        order: 1
    });

    useEffect(() => {
        if (!open) return;
        
        const timeoutId = setTimeout(() => {
            if (moduleToEdit) {
                setFormData({
                    title: moduleToEdit.title,
                    description: moduleToEdit.description || "",
                    moduleNumber: moduleToEdit.moduleNumber,
                    order: moduleToEdit.order
                });
            } else {
                 setFormData({
                    title: "",
                    description: "",
                    moduleNumber: 1, 
                    order: 1
                });
            }
        }, 0);
        return () => clearTimeout(timeoutId);
    }, [moduleToEdit, open]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const data = {
            ...formData,
            moduleNumber: Number(formData.moduleNumber),
            order: Number(formData.order)
        };

        if (isEdit && moduleToEdit) {
            const result = await updateModule(moduleToEdit.id, data);
             if (result.success) {
                toast.success("Module updated");
                onOpenChange(false);
            } else {
                toast.error("Failed to update module");
            }
        } else {
            const result = await createModuleAction(data);
             if (result.success) {
                toast.success("Module created");
                onOpenChange(false);
            } else {
                toast.error("Failed to create module");
            }
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Edit Module" : "Create Module"}</DialogTitle>
                    <DialogDescription>
                        {isEdit ? "Update module details." : "Add a new learning module to the curriculum."}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                Title
                            </Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="number" className="text-right">
                                Number
                            </Label>
                            <Input
                                id="number"
                                type="number"
                                value={formData.moduleNumber}
                                onChange={(e) => setFormData({...formData, moduleNumber: Number(e.target.value)})}
                                className="col-span-3"
                                required
                            />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="order" className="text-right">
                                Order
                            </Label>
                            <Input
                                id="order"
                                type="number"
                                value={formData.order}
                                onChange={(e) => setFormData({...formData, order: Number(e.target.value)})}
                                className="col-span-3"
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">{isEdit ? "Save changes" : "Create Module"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default CreateModuleDialog;
