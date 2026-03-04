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
  ChevronsUpDownIcon,
  User2Icon,
  MapPinnedIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Separator } from "../ui/separator";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";
import { ConfirmDialog } from "./ConfirmationDialog";

const patientNavItems = [
  {
    title: "Dashboard",
    path: "/portal/dashboard",
    icon: ChartAreaIcon,
    section: "",
  },
  {
    title: "Shop",
    path: "/portal/shop",
    icon: ShoppingCart,
    section: "",
  },
  {
    title: "Orders",
    path: "/portal/orders",
    icon: Package,
    section: "",
  },
  {
    title: "Address",
    path: "/portal/address",
    icon: MapPinnedIcon,
    section: "",
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

const patientProfileLinks = [
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
];

export default function DashboardSideNav({ profile }: { profile: any }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === "collapsed";
  const { logout, isPatientAccount } = useAuth();
  const [isConfirmLogoutDialogOpen, setIsConfirmLogoutDialogOpen] =
    useState(false);

  const grouped = (
    isPatientAccount ? patientNavItems : clinicianNavItems
  ).reduce((acc: any, item) => {
    acc[item.section] = acc[item.section] || [];
    acc[item.section].push(item);
    return acc;
  }, {});

  const onNavLinkClick = (path: string) => {
    if (path.startsWith("https://")) {
      const a = document.createElement("a");
      a.href = path;
      a.target = "_blank";
      a.click();
    } else {
      navigate(path);
    }
    if (window.innerWidth < 1024) toggleSidebar();
  };

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
            <div key={section.split(" ").join("")}>
              <SidebarGroup>
                {section && <SidebarGroupLabel>{section}</SidebarGroupLabel>}
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
                            onClick={() => onNavLinkClick(item.path)}
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
              <Separator />
            </div>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <Separator />
      <SidebarFooter className="my-3">
        <SidebarMenu>
          {/* USER PROFILE */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div
                className={`"w-full" flex gap-4 items-center cursor-pointer px-3 py-2`}
              >
                <div className="size-8 rounded-full grid place-items-center bg-primary text-primary-foreground">
                  <User2Icon className="size-5.5" />
                </div>
                <div className="flex-1">
                  <div className="text-sm">
                    <span className="line-clamp-1 font-semibold">
                      <span>
                        {profile !== null ? profile.first_name : "---"}
                      </span>{" "}
                      <span>{profile !== null ? profile.last_name : ""}</span>
                    </span>
                    <small className="line-clamp-1">
                      {profile !== null ? profile.email : "---"}
                    </small>
                  </div>
                </div>

                <ChevronsUpDownIcon className="ml-auto" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-68 p-2 rounded-none mx-2 shadow-lg">
              <DropdownMenuLabel className="p-2 flex gap-4">
                <div className="flex-1">
                  <div className="flex flex-col">
                    <span className="line-clamp-1 font-semibold">
                      <span>
                        {profile !== null ? profile.first_name : "---"}
                      </span>{" "}
                      <span>{profile !== null ? profile.last_name : ""}</span>
                    </span>
                    <small className="line-clamp-1">
                      {profile !== null ? profile.email : "---"}
                    </small>
                  </div>
                </div>
              </DropdownMenuLabel>
              <Separator className=" my-2" />
              {patientProfileLinks.map((item, index) => {
                const Icon = item.icon;
                return (
                  <DropdownMenuItem
                    key={index}
                    variant="default"
                    onClick={() => onNavLinkClick(item.path)}
                    className="flex gap-4 py-3 px-3 rounded-none focus:bg-slate-100"
                  >
                    <Icon className="size-4.5" />
                    <span>{item.title}</span>
                  </DropdownMenuItem>
                );
              })}
              <DropdownMenuItem
                variant="destructive"
                onClick={() => setIsConfirmLogoutDialogOpen(true)}
                className="flex gap-4 py-3 px-3 rounded-none"
              >
                <LogOutIcon className="w-5 h-5" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenu>
      </SidebarFooter>

      <ConfirmDialog
        open={isConfirmLogoutDialogOpen}
        onConfirm={logout}
        title="Confirm Sign Out!"
        confirmText="Logout"
        description="Are you sure you want to sign out of your account?"
        onOpenChange={setIsConfirmLogoutDialogOpen}
      />
    </Sidebar>
  );
}
