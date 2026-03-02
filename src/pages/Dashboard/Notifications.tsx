import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item";

export default function NotificationsPage() {
  return (
    <>
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 gap-8">
        <legend className="text-xl font-semibold text-primary">
          Notifications
        </legend>
        <ItemGroup className="w-full gap-4">
          <Item variant={"outline"} className="rounded-none mx-4">
            <ItemContent>
              <ItemTitle>#R-10231 has been shipped</ItemTitle>
              <p className="text-sm text-muted-foreground">
                Your order #R-10231 has been shipped to your delivery address,
                and will be arriving within the next 12 hours.
              </p>
            </ItemContent>
            <ItemActions>
              <div className="size-2 rounded-full bg-blue-700"></div>
            </ItemActions>
          </Item>
          <Item variant={"outline"} className="rounded-none mx-4">
            <ItemContent>
              <ItemTitle>Upcoming Subscription Renewal</ItemTitle>
              <p className="text-sm text-muted-foreground">
                Your subscription will automatically renew on 14 March. The
                payment method on file will be charged on this date. No action
                is required if you'd like to continue your access.
              </p>
            </ItemContent>
            <ItemActions>
              <div className="size-2 rounded-full bg-blue-700"></div>
            </ItemActions>
          </Item>
        </ItemGroup>
      </div>
    </>
  );
}
