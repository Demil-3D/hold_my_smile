export type VALID_ORDER_STATUS = "ACTIVE" | "CANCELLED" | "COMPLETED";

export interface Order {
  order_id: string;
  product_name: string;
  order_type: string;
  quantity: number;
  status: VALID_ORDER_STATUS;
  order_date: string;
  tracking_number: string;
}
