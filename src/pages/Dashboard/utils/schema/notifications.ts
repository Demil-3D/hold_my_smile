export type NotificationProps = {
  id: number | string;
  message: string;
  is_seen: boolean;
  seen_at: string | null;
  user_id: string;
  title: string;
  notification_type: string;
  created_at: string;
};
