import {
  Item,
  ItemActions,
  ItemContent,
  ItemFooter,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item";
import { formatDate } from "@/utils/config";
import { BellOffIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import type { NotificationProps } from "./utils/schema/notifications";
import { http } from "@/utils/http";

// 1. Create a helper component for individual items to handle intersection logic
function NotificationItemView({
  notification,
  onVisible,
}: {
  notification: NotificationProps;
  onVisible: (id: number | string) => void;
}) {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If it's already seen, don't bother setting up the observer
    if (notification.is_seen) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          onVisible(notification.id);
          observer.disconnect(); // Stop observing once it's triggered
        }
      },
      { threshold: 1.0 }, // Fires when at least 100% of the item is visible
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect(); // Cleanup on unmount
  }, [notification.id, notification.is_seen, onVisible]);

  return (
    <div ref={itemRef}>
      <Item
        className={`px-3 py-1 ${!notification.is_seen ? "bg-blue-50" : ""} rounded-none`}
      >
        <ItemContent>
          <ItemTitle>{notification.title}</ItemTitle>
          <p className="text-sm text-muted-foreground">
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
    </div>
  );
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

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

  async function markAsRead(notification_id: number | string) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notification_id ? { ...n, is_seen: true } : n)),
    );

    try {
      await http.patch(`patient/notifications/${notification_id}/seen`, {});
    } catch (error) {
      console.log("Mark Notification As Read Error:", error);
    }
  }

  return (
    <>
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 gap-8">
        <legend className="text-xl font-semibold text-primary">
          Notifications
        </legend>
        {notifications.length === 0 && (
          <div className="w-full px-6 py-10">
            <div className="w-full flex flex-col gap-4 text-center items-center">
              <BellOffIcon className="size-6 text-muted-foreground" />
              <legend className="text-sm font-medium text-primary/60">
                You have no notifications
              </legend>
            </div>
          </div>
        )}
        <ItemGroup className="w-full gap-4">
          {notifications.map((notification) => (
            <NotificationItemView
              key={notification.id}
              notification={notification}
              onVisible={markAsRead}
            />
          ))}
        </ItemGroup>
      </div>
    </>
  );
}
