import { Outlet } from "react-router-dom";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import DashboardSideNav from "@/components/Dashboard/Sidenav";
import { Button } from "@/components/ui/button";
import { Bell, SidebarCloseIcon, SidebarOpenIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { http } from "@/utils/http";
import { toast } from "sonner";

function PageHeader({ profile }: { profile: any }) {
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <>
      <header className="w-full bg-white flex items-start p-6 gap-6">
        <Button
          variant={"secondary"}
          size={"icon-lg"}
          onClick={toggleSidebar}
          className="w-fit border border-slate-200 bg-slate-100 inset-shadow-xs rounded-none aspect-square -rotate-45"
        >
          {collapsed ? (
            <SidebarOpenIcon className="w-5 h-5 rotate-45" />
          ) : (
            <SidebarCloseIcon className="w-5 h-5 rotate-45" />
          )}
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-primary">
            Welcome back, {profile !== null ? profile.first_name : ""}!
          </h1>
          <Badge
            variant={"secondary"}
            className="rounded-none inset-shadow-2xs"
          >
            @{profile !== null ? profile.email.toString().split("@")[0] : ""}
          </Badge>
        </div>

        {/* NOTIFICATION BELL */}
        <Button
          variant={"secondary"}
          size={"icon-lg"}
          onClick={() => {}}
          className="w-fit p-0 border border-slate-200 bg-slate-100 inset-shadow-xs rounded-none aspect-square -rotate-45"
        >
          <Bell className="w-8 h-8 rotate-45" />
        </Button>
      </header>
    </>
  );
}

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
        <DashboardSideNav />

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
