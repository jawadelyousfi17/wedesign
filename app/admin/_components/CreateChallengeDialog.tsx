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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import { createChallenge, updateChallenge } from "@/actions/admin/challenges";
import { uploadAvatar } from "@/actions/file/upload";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { X, Upload } from "lucide-react";

import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  images: z.array(z.string()).optional(),
  order: z.coerce.number(),
  moduleId: z.coerce.number(),
  includeHtml: z.boolean().default(true),
  includeCss: z.boolean().default(true),
  includeJs: z.boolean().default(true),
  starterCodeHtml: z.string().optional(),
  starterCodeCss: z.string().optional(),
  starterCodeJs: z.string().optional(),
});

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

interface CreateChallengeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  challengeToEdit?: Challenge | null;
  modules: Module[];
}

const CreateChallengeDialog = ({
  open,
  onOpenChange,
  challengeToEdit,
  modules,
}: CreateChallengeDialogProps) => {
  const router = useRouter();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      images: [],
      order: 0,
      moduleId: modules[0]?.id || 0,
      includeHtml: true,
      includeCss: true,
      includeJs: true,
      starterCodeHtml: "",
      starterCodeCss: "",
      starterCodeJs: "",
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      const currentImages = form.getValues("images") || [];
      const newImages = [...currentImages];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const result = await uploadAvatar(file);
        if (result.url) {
          newImages.push(result.url);
        } else if (result.error) {
          toast.error(result.error);
        }
      }

      form.setValue("images", newImages);
    } catch (error) {
      toast.error("Failed to upload images");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const currentImages = form.getValues("images") || [];
    const newImages = [...currentImages];
    newImages.splice(index, 1);
    form.setValue("images", newImages);
  };

  useEffect(() => {
    if (challengeToEdit) {
        // Use a 0ms timeout to avoid "cannot update component while rendering" warning
        setTimeout(() => {
            form.reset({
                title: challengeToEdit.title,
                description: challengeToEdit.description,
                images: challengeToEdit.images || [],
                order: challengeToEdit.order,
                moduleId: challengeToEdit.moduleId,
                includeHtml: challengeToEdit.problem?.starterCodeHtml !== null,
                includeCss: challengeToEdit.problem?.starterCodeCss !== null,
                includeJs: challengeToEdit.problem?.starterCodeJs !== null,
                starterCodeHtml: challengeToEdit.problem?.starterCodeHtml || "",
                starterCodeCss: challengeToEdit.problem?.starterCodeCss || "",
                starterCodeJs: challengeToEdit.problem?.starterCodeJs || "",
            });
        }, 0);
    } else {
        setTimeout(() => {
            form.reset({
                title: "",
                description: "",
                images: [],
                order: 0,
                moduleId: modules[0]?.id || 0,
                includeHtml: true,
                includeCss: true,
                includeJs: true,
                starterCodeHtml: "",
                starterCodeCss: "",
                starterCodeJs: "",
            });
        }, 0);
    }
  }, [challengeToEdit, form, modules, open]);


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmiting(true);
    try {
        const payload = {
            ...values,
            starterCodeHtml: values.includeHtml ? (values.starterCodeHtml || "") : null,
            starterCodeCss: values.includeCss ? (values.starterCodeCss || "") : null,
            starterCodeJs: values.includeJs ? (values.starterCodeJs || "") : null,
        };

        let result;
        if (challengeToEdit) {
            result = await updateChallenge(challengeToEdit.id, payload);
        } else {
            result = await createChallenge(payload);
        }

        if (result.success) {
            toast.success(challengeToEdit ? "Challenge updated" : "Challenge created");
            onOpenChange(false);
            router.refresh();
        } else {
            toast.error("Something went wrong");
        }
    } catch {
        toast.error("Something went wrong");
    } finally {
        setIsSubmiting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{challengeToEdit ? "Edit Challenge" : "Create Challenge"}</DialogTitle>
          <DialogDescription>
            {challengeToEdit
              ? "Make changes to the challenge here. Click save when you're done."
              : "Add a new challenge to the database."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="code">Starter Code</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="space-y-4 pt-4">
                    <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                            <Input placeholder="Challenge title" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Challenge description" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                    <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Images</FormLabel>
                        <FormControl>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <Input 
                                        type="file" 
                                        accept="image/*" 
                                        multiple 
                                        onChange={handleImageUpload} 
                                        disabled={isUploading}
                                    />
                                    {isUploading && <span className="text-sm text-muted-foreground">Uploading...</span>}
                                </div>
                                {field.value && field.value.length > 0 && (
                                    <div className="grid grid-cols-3 gap-4">
                                        {field.value.map((url, index) => (
                                            <div key={index} className="relative group aspect-video bg-muted rounded-md overflow-hidden">
                                                <img src={url} alt={`Challenge image ${index + 1}`} className="object-cover w-full h-full" />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="moduleId"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Module</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value?.toString()}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a module" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {modules.map((module) => (
                                            <SelectItem key={module.id} value={module.id.toString()}>
                                            Module {module.moduleNumber}: {module.title}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                        control={form.control}
                        name="order"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Order</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                </TabsContent>
                <TabsContent value="code" className="space-y-4 pt-4">
                    <div className="space-y-4 border p-4 rounded-md">
                        <FormField
                        control={form.control}
                        name="includeHtml"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                                <FormLabel>Include HTML File</FormLabel>
                                <DialogDescription>
                                Provide an index.html file for this challenge.
                                </DialogDescription>
                            </div>
                            <FormControl>
                                <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            </FormItem>
                        )}
                        />
                        {form.watch("includeHtml") && (
                            <FormField
                            control={form.control}
                            name="starterCodeHtml"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>HTML Starter Code</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="<div>Hello World</div>" className="font-mono min-h-[100px]" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        )}
                    </div>

                    <div className="space-y-4 border p-4 rounded-md">
                        <FormField
                        control={form.control}
                        name="includeCss"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                                <FormLabel>Include CSS File</FormLabel>
                                <DialogDescription>
                                Provide a styles.css file for this challenge.
                                </DialogDescription>
                            </div>
                            <FormControl>
                                <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            </FormItem>
                        )}
                        />
                        {form.watch("includeCss") && (
                            <FormField
                            control={form.control}
                            name="starterCodeCss"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>CSS Starter Code</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="body { background: white; }" className="font-mono min-h-[100px]" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        )}
                    </div>

                    <div className="space-y-4 border p-4 rounded-md">
                        <FormField
                        control={form.control}
                        name="includeJs"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                                <FormLabel>Include JS File</FormLabel>
                                <DialogDescription>
                                Provide a script.js file for this challenge.
                                </DialogDescription>
                            </div>
                            <FormControl>
                                <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            </FormItem>
                        )}
                        />
                        {form.watch("includeJs") && (
                            <FormField
                            control={form.control}
                            name="starterCodeJs"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>JS Starter Code</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="console.log('Hello');" className="font-mono min-h-[100px]" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        )}
                    </div>
                </TabsContent>
            </Tabs>
            
            <DialogFooter>
              <Button type="submit" disabled={isSubmiting}>
                {isSubmiting ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChallengeDialog;
