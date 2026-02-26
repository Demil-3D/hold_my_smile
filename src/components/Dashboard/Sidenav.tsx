import {
  ShoppingCart,
  Repeat,
  Package,
  ChartAreaIcon,
  LogOutIcon,
  ReceiptTextIcon,
  UserIcon,
  UsersRoundIcon,
  HeadsetIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Separator } from "../ui/separator";
import { useAuth } from "@/context/AuthContext";

const patientNavItems = [
  {
    title: "Dashboard",
    path: "/portal/dashboard",
    icon: ChartAreaIcon,
    section: "",
  },
  {
    title: "Profile",
    path: "/portal/profile",
    icon: UserIcon,
    section: "Account",
  },
  // {
  //   title: "Addresses",
  //   path: "/portal/addresses",
  //   icon: MapIcon,
  //   section: "Account",
  // },
  {
    title: "Subscriptions",
    path: "/portal/subscriptions",
    icon: Repeat,
    section: "Account",
  },
  {
    title: "Shop",
    path: "/portal/shop",
    icon: ShoppingCart,
    section: "Shopping",
  },
  {
    title: "Orders",
    path: "/portal/orders",
    icon: Package,
    section: "Shopping",
  },
  {
    title: "Contact Support",
    path: "/portal/support",
    icon: HeadsetIcon,
    section: "More Links",
  },
];

const clinicianNavItems = [
  {
    title: "Dashboard",
    path: "/portal/dashboard",
    icon: ChartAreaIcon,
    section: "",
  },
  {
    title: "Profile",
    path: "/portal/profile",
    icon: UserIcon,
    section: "Account",
  },
  {
    title: "Settlement Logs",
    path: "/portal/settlement-logs",
    icon: ReceiptTextIcon,
    section: "Account",
  },
  {
    title: "Patients",
    path: "/portal/patients",
    icon: UsersRoundIcon,
    section: "Records",
  },
  {
    title: "Contact Support",
    path: "/portal/support",
    icon: HeadsetIcon,
    section: "More Links",
  },
];

export default function DashboardSideNav() {
  const location = useLocation();
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === "collapsed";
  const { logout, isPatientAccount } = useAuth();

  const grouped = (
    isPatientAccount ? patientNavItems : clinicianNavItems
  ).reduce((acc: any, item) => {
    acc[item.section] = acc[item.section] || [];
    acc[item.section].push(item);
    return acc;
  }, {});

  return (
    <Sidebar
      side="left"
      variant="sidebar"
      collapsible="icon"
      className={cn(
        "border-r border-r-slate-200 bg-slate-100 transition-all sticky h-dvh",
      )}
    >
      <SidebarContent className="py-6 pt-28 inset-shadow-xs">
        <SidebarMenu>
          {Object.entries(grouped).map(([section, items]: any) => (
            <SidebarGroup key={section.split(" ").join("")}>
              {section !== "" && (
                <>
                  <SidebarGroupLabel className="text-xs font-medium text-muted-foreground capitalize tracking-wider px-2">
                    {section}
                  </SidebarGroupLabel>
                  <Separator />
                </>
              )}

              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {items.map((item: any) => {
                    const Icon = item.icon;
                    const active = location.pathname === item.path;
                    return (
                      <SidebarMenuItem key={item.path}>
                        <Link
                          to={item.path}
                          onClick={() => {
                            if (window.innerWidth < 1024) toggleSidebar();
                          }}
                        >
                          <div
                            className={cn(
                              "relative px-3 py-3 text-sm font-medium transition-all",
                              active
                                ? "bg-slate-100"
                                : "text-slate-600 hover:bg-slate-100",
                            )}
                          >
                            <div className="flex-1 flex items-center gap-3">
                              <Icon className="w-5 h-5" />
                              {!collapsed && <span>{item.title}</span>}
                            </div>
                          </div>
                        </Link>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <Separator />
      <SidebarFooter className="my-3">
        <SidebarMenuItem
          onClick={() => {
            logout();
          }}
        >
          <div
            className={cn(
              "relative px-3 py-3 text-sm font-medium transition-all cursor-pointer",
              "text-slate-600 hover:bg-slate-100",
            )}
          >
            <div className="flex-1 flex items-center gap-3 text-red-600">
              <LogOutIcon className="w-5 h-5" />
              {!collapsed && <span>Logout</span>}
            </div>
          </div>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  );
}
