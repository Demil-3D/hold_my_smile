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
  RefreshCcwIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
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
  {
    title: "Return Order",
    path: "https://our-returns.dpd.co.uk/3DENTAL",
    icon: RefreshCcwIcon,
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
  const navigate = useNavigate();
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
      <SidebarContent className="py-6 pt-28 lg:pt-32 inset-shadow-xs">
        <SidebarMenu>
          {Object.entries(grouped).map(([section, items]: any) => (
            <>
              <Separator />
              <SidebarGroup key={section.split(" ").join("")}>
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-1">
                    {items.map((item: any) => {
                      const Icon = item.icon;
                      const active = location.pathname === item.path;
                      return (
                        <SidebarMenuItem key={item.path}>
                          <SidebarMenuButton
                            size={"lg"}
                            className={cn(
                              "w-full relative px-4 text-sm font-medium transition-all gap-4 rounded-none cursor-pointer",
                              active
                                ? "bg-accent/20 text-accent"
                                : "text-slate-600 hover:bg-slate-100",
                            )}
                            onClick={() => {
                              if (item.path.startsWith("https://")) {
                                const a = document.createElement("a");
                                a.href = item.path;
                                a.target = "_blank";
                                a.click();
                              } else {
                                navigate(item.path);
                              }
                              if (window.innerWidth < 1024) toggleSidebar();
                            }}
                          >
                            <Icon className="size-6" />
                            {!collapsed && <span>{item.title}</span>}
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </>
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
