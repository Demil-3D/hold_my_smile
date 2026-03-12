import {
  ShoppingCart,
  Repeat,
  Package,
  ChartAreaIcon,
  LogOutIcon,
  UserIcon,
  UsersRoundIcon,
  HeadsetIcon,
  ChevronsUpDownIcon,
  User2Icon,
  MapPinnedIcon,
  ReceiptTextIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
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
import { useEffect, useState } from "react";
import { ConfirmDialog } from "./ConfirmationDialog";
import { Logo } from "../Logo";
import { http } from "@/utils/http";
import type { SubscriptionProps } from "@/pages/Dashboard/utils/schema/patient/subscription";
import { toast } from "sonner";
import { Button } from "../ui/button";

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
    title: "Patients",
    path: "/portal/patients",
    icon: UsersRoundIcon,
    section: "",
  },
  {
    title: "Income Logs",
    path: "/portal/settlement-logs",
    icon: ReceiptTextIcon,
    section: "",
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
  {
    title: "Subscriptions",
    path: "/portal/subscriptions",
    icon: Repeat,
    section: "Account",
  },
];
const clinicianProfileLinks = [
  {
    title: "Profile",
    path: "/portal/profile",
    icon: UserIcon,
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
  const [showSubscriptionAd, setShowSubscriptionAd] = useState(false);

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

  useEffect(() => {
    async function loadSubscription() {
      if (!isPatientAccount) return;

      try {
        const res = await http.get("patient/subscriptions");
        const data = await res.json();
        setShowSubscriptionAd(
          (data.active_subscriptions as Array<SubscriptionProps>).length === 0,
        );
      } catch (err) {
        toast.error("Network error!\n\nFailed to load subscription data.");
      }
    }

    loadSubscription();
  }, []);

  return (
    <>
      <Sidebar
        side="left"
        variant="sidebar"
        collapsible="icon"
        className={cn("transition-all sticky h-dvh")}
      >
        <div className="w-full h-dvh bg-linear-to-br from-[#eef2fd] to-[#faf4fd] via-white via-60% flex flex-col shadow-lg">
          <SidebarHeader className="py-4 bg-transparent">
            <div className="w-fit scale-75">
              {!collapsed && (
                <Link to={"/"}>
                  <Logo />
                </Link>
              )}
            </div>
          </SidebarHeader>
          <SidebarContent className="py-6 inset-shadow-xs bg-transparent">
            <SidebarMenu>
              {Object.entries(grouped).map(([section, items]: any) => (
                <div key={section.split(" ").join("")}>
                  <SidebarGroup>
                    {section && (
                      <SidebarGroupLabel>{section}</SidebarGroupLabel>
                    )}
                    <SidebarGroupContent>
                      <SidebarMenu
                        className={`${collapsed ? "space-y-4" : "space-y-1"}`}
                      >
                        {items.map((item: any) => {
                          const Icon = item.icon;
                          const active = location.pathname === item.path;
                          return (
                            <SidebarMenuItem key={item.path}>
                              <SidebarMenuButton
                                size={"lg"}
                                className={cn(
                                  "w-full relative px-6 py-7 text-base transition-all duration-300 gap-4 rounded-none cursor-pointer",
                                  active
                                    ? "bg-linear-to-r from-accent/20 to-accent/10 text-accent font-medium shadow-md hover:bg-accent/20 hover:text-accent"
                                    : "text-slate-600 hover:bg-slate-100",
                                  collapsed && "justify-center mx-auto",
                                )}
                                onClick={() => onNavLinkClick(item.path)}
                              >
                                <Icon className="w-6 h-6" />
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
          <Separator />
          <SidebarFooter className="pb-4 bg-transparent">
            <SidebarMenu>
              {/* SUBSCRIPTION AD */}
              {showSubscriptionAd && (
                <>
                  <div className="px-2">
                    <div className="w-full flex gap-2 p-3 bg-primary shadow-lg">
                      <div className="flex-1">
                        <legend className="text-white tracking-tight font-semibold text-sm">
                          Get new retainers <br />
                          every year.
                        </legend>
                        <span className="text-xs text-accent">
                          Choose a plan now!
                        </span>
                      </div>
                      <Button
                        variant={"secondary"}
                        size={"xs"}
                        className="rounded-none bg-accent"
                        onClick={() => navigate("/portal/subscriptions")}
                      >
                        Join
                      </Button>
                    </div>
                  </div>
                  <Separator className="my-1" />
                </>
              )}

              {/* USER PROFILE */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div
                    className={`w-full flex gap-4 items-center cursor-pointer ${collapsed ? "justify-center" : "px-3"} py-2`}
                  >
                    <div className="w-8 h-8 rounded-full grid place-items-center bg-primary text-primary-foreground">
                      <User2Icon className="size-5.5" />
                    </div>
                    {!collapsed && (
                      <>
                        <div className="flex-1 w-full text-wrap text-sm">
                          <p className="line-clamp-1 font-semibold">
                            <span>
                              {profile !== null ? profile.first_name : "---"}
                            </span>{" "}
                            <span>
                              {profile !== null ? profile.last_name : ""}
                            </span>
                          </p>
                          <small className="line-clamp-1 break-all">
                            {profile !== null ? profile.email : "---"}
                          </small>
                        </div>

                        <div className="w-fit">
                          <ChevronsUpDownIcon className="size-4" />
                        </div>
                      </>
                    )}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-68 p-2 rounded-none mx-2 shadow-lg">
                  <DropdownMenuLabel className="p-2 flex gap-4">
                    <div className="flex-1 w-full text-wrap text-sm">
                      <p className="line-clamp-1 font-semibold">
                        <span>
                          {profile !== null ? profile.first_name : "---"}
                        </span>{" "}
                        <span>{profile !== null ? profile.last_name : ""}</span>
                      </p>
                      <small className="line-clamp-1 break-all font-normal">
                        {profile !== null ? profile.email : "---"}
                      </small>
                    </div>
                  </DropdownMenuLabel>
                  <Separator className=" my-2" />
                  {(isPatientAccount
                    ? patientProfileLinks
                    : clinicianProfileLinks
                  ).map((item, index) => {
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
        </div>
      </Sidebar>
      <ConfirmDialog
        open={isConfirmLogoutDialogOpen}
        onConfirm={logout}
        title="Confirm Sign Out!"
        confirmText="Logout"
        description="Are you sure you want to sign out of your account?"
        onOpenChange={setIsConfirmLogoutDialogOpen}
      />
    </>
  );
}
