export type SettlementLogProps = {
  payment_id: string;
  amount_paid: number;
  currency: string;
  payment_method: string;
  status: "Completed" | "Pending" | "Failed" | "Refunded";
  payment_date: string;
};
