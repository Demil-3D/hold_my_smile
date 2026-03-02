import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Bell, SidebarCloseIcon, SidebarOpenIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Item, ItemActions, ItemContent, ItemTitle } from "../ui/item";
import { Separator } from "../ui/separator";

export default function PageHeader({ profile }: { profile: any }) {
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
        {/* TODO: TOGGLE NOTIFICATION POPUP DISPLAY AND CREATE NOTIFICATIONS PAGE */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"secondary"}
              size={"icon-lg"}
              onClick={() => {}}
              className="w-fit p-0 border border-slate-200 bg-slate-100 inset-shadow-xs rounded-none aspect-square -rotate-45"
            >
              <Bell className="w-8 h-8 rotate-45" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="w-full max-w-sm p-0 rounded-none border-none"
          >
            <MiniNotificationPopup />
          </PopoverContent>
        </Popover>
      </header>
    </>
  );
}

function MiniNotificationPopup() {
  return (
    <Card className="w-full rounded-none py-2 px-0 flex flex-col gap-0 shadow-none">
      <CardHeader className="py-0 px-4">
        <CardTitle>Notifications:</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="py-0 px-4">
        <Item className="px-2">
          <ItemContent>
            <ItemTitle>#R-10231 has been shipped</ItemTitle>
            <p className="text-sm text-muted-foreground line-clamp-2">
              Your order #R-10231 has been shipped to your delivery address, and
              will be arriving within the next 12 hours.
            </p>
          </ItemContent>
          <ItemActions>
            <div className="size-2 rounded-full bg-blue-700"></div>
          </ItemActions>
        </Item>
        <Item className="px-2">
          <ItemContent>
            <ItemTitle>Upcoming Subscription Renewal</ItemTitle>
            <p className="text-sm text-muted-foreground line-clamp-2">
              Your subscription will automatically renew on 14 March. The
              payment method on file will be charged on this date. No action is
              required if you'd like to continue your access.
            </p>
          </ItemContent>
          <ItemActions>
            <div className="size-2 rounded-full bg-blue-700"></div>
          </ItemActions>
        </Item>
      </CardContent>
      <Separator />
      <CardFooter className="py-0 px-2">
        <Button variant={"ghost"} size={"lg"} className="w-full rounded-none">
          See all
        </Button>
      </CardFooter>
    </Card>
  );
}
