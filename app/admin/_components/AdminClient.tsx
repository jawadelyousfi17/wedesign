"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ModulesTable from "./ModulesTable";
import ChallengesTable from "./ChallengesTable";
import CreateModuleDialog from "./CreateModuleDialog";
import CreateChallengeDialog from "./CreateChallengeDialog";

type AdminClientProps = {
    initialChallenges: any[];
    initialModules: any[];
};

const AdminClient = ({ initialChallenges, initialModules }: AdminClientProps) => {
    const [isModuleDialogOpen, setIsModuleDialogOpen] = useState(false);
    const [isChallengeDialogOpen, setIsChallengeDialogOpen] = useState(false);

    return (
        <div className="max-w-6xl mx-auto py-10 px-4">
            <Tabs defaultValue="modules" className="w-full">
                <div className="flex justify-between items-center mb-6">
                    <TabsList>
                        <TabsTrigger value="modules">Modules</TabsTrigger>
                        <TabsTrigger value="challenges">Challenges</TabsTrigger>
                    </TabsList>
                    
                    <div className="flex gap-2">
                        <Button onClick={() => setIsModuleDialogOpen(true)}>
                            <Plus className="mr-2 h-4 w-4" /> New Module
                        </Button>
                        <Button onClick={() => setIsChallengeDialogOpen(true)} variant="outline">
                            <Plus className="mr-2 h-4 w-4" /> New Challenge
                        </Button>
                    </div>
                </div>

                <TabsContent value="modules">
                    <ModulesTable modules={initialModules} />
                </TabsContent>
                
                <TabsContent value="challenges">
                    <ChallengesTable challenges={initialChallenges} modules={initialModules} />
                </TabsContent>
            </Tabs>

            <CreateModuleDialog 
                open={isModuleDialogOpen} 
                onOpenChange={setIsModuleDialogOpen} 
            />
            
            <CreateChallengeDialog 
                open={isChallengeDialogOpen} 
                onOpenChange={setIsChallengeDialogOpen}
                modules={initialModules}
            />
        </div>
    );
};

export default AdminClient;
