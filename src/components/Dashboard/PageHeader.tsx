import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Bell,
  BellOffIcon,
  SidebarCloseIcon,
  SidebarOpenIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemFooter,
  ItemTitle,
} from "../ui/item";
import { Separator } from "../ui/separator";
import { useNavigate } from "react-router-dom";
import { formatDate } from "@/utils/config";
import { useEffect, useMemo, useState } from "react";
import type { NotificationProps } from "@/pages/Dashboard/utils/schema/notifications";
import { http } from "@/utils/http";

export default function PageHeader({ profile }: { profile: any }) {
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === "collapsed";
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const filteredNotifications = useMemo<NotificationProps[]>(() => {
    return notifications.filter((notification) => !notification.is_seen);
  }, [notifications]);

  useEffect(() => {
    async function loadNotifications() {
      try {
        const res = await http.get("patient/notifications");
        const data = await res.json();
        if (res.ok) {
          setNotifications(data);
        } else {
          console.log("Fetch Notification Error:", res.status);
        }
      } catch (error) {
        console.log("Fetch Notification Error:", error);
      }
    }

    loadNotifications();
  }, []);

  return (
    <>
      <header className="w-full flex items-start p-6 gap-6">
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
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"secondary"}
              size={"icon-lg"}
              onClick={() => {}}
              className="w-fit p-0 border border-slate-200 bg-slate-100 inset-shadow-xs rounded-none aspect-square -rotate-45"
            >
              <div className="rotate-45 relative">
                <Bell className="w-8 h-8" />
                {filteredNotifications.length > 0 && (
                  <div className="size-2 bg-red-500 rounded-full absolute -top-0.75 -right-px"></div>
                )}
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="w-full max-w-sm p-0 rounded-none border-none"
          >
            <MiniNotificationPopup notifications={filteredNotifications} />
          </PopoverContent>
        </Popover>
      </header>
    </>
  );
}

function MiniNotificationPopup({
  notifications,
}: {
  notifications: NotificationProps[];
}) {
  const navigate = useNavigate();

  return (
    <Card className="w-full min-w-75 rounded-none py-2 px-0 flex flex-col gap-0 shadow-none">
      <CardHeader className="py-2 px-4">
        <CardTitle>Notifications:</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="w-full py-2 px-0">
        {notifications.map((notification) => {
          return (
            <Item
              className={`${!notification.is_seen ? "bg-blue-50 px-4" : "px-6"} rounded-none`}
              key={notification.id}
            >
              <ItemContent>
                <ItemTitle>{notification.title}</ItemTitle>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {notification.message}
                </p>
              </ItemContent>
              {!notification.is_seen && (
                <ItemActions>
                  <div className="size-2 shadow-2xl border border-white rounded-full bg-blue-700"></div>
                </ItemActions>
              )}
              <ItemFooter className="text-muted-foreground text-xs">
                {formatDate(notification.created_at)}
              </ItemFooter>
            </Item>
          );
        })}

        {notifications.length === 0 && (
          <div className="w-full px-6 py-10">
            <div className="w-full flex flex-col gap-4 text-center items-center">
              <BellOffIcon className="size-6 text-muted-foreground" />
              <legend className="text-sm font-medium text-primary/60 italic">
                No Unread Notifications
              </legend>
            </div>
          </div>
        )}
      </CardContent>
      <Separator />
      <CardFooter className="pt-2 px-2">
        <Button
          variant={"link"}
          size={"lg"}
          className="w-full rounded-none items-center group"
          onClick={() => navigate("/portal/notifications")}
        >
          <span className="ml-2">See all</span>
          <ArrowRight className="size-3 mt-0.5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
