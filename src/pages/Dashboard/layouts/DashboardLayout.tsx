import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSideNav from "@/components/Dashboard/Sidenav";
import { useEffect, useState } from "react";
import { http } from "@/utils/http";
import { toast } from "sonner";
import PageHeader from "@/components/Dashboard/PageHeader";

export default function PortalLayout() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function onLoad() {
      try {
        const res = await http.get(`profile`);
        const profileData = await res.json();
        setProfile(profileData);
      } catch {
        toast.error("Network error!\n\nFailed to load user profile.");
      }
    }

    onLoad();
  }, []);

  return (
    <div className="h-dvh bg-white relative">
      <SidebarProvider>
        {/* Sidebar */}
        <DashboardSideNav profile={profile} />

        {/* Main Area */}
        <div className="w-full flex-1 max-w-full flex flex-col pt-28">
          <PageHeader profile={profile} />

          <main className="flex-1 py-6 px-6 md:px-8">
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
