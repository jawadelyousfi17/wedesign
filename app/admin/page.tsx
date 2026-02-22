import { getChallenges } from "@/actions/admin/challenges";
import { getModules } from "@/actions/admin/modules";
import AdminClient from "./_components/AdminClient";

const AdminPage = async () => {
    const challenges = await getChallenges();
    const modules = await getModules();

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
            <AdminClient 
                initialChallenges={challenges} 
                initialModules={modules} 
            />
        </div>
    );
};

export default AdminPage;
