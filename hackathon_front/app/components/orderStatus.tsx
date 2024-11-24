import { Badge } from "~/components/badge";
import type { OrderStatus } from "~/types";

type OrderStatusProps = {
  status: OrderStatus;
};

function OrderStatus({ status }: OrderStatusProps) {
  const statusClasses = {
    OVERDUE: "bg-yellow-300 text-foreground hover:bg-yellow-400",
    COMPLETED: "bg-blue-500 hopver:bg-blue-600",
    RECIEVED: "",
    ACCEPTED: "bg-emerald-500 hover:bg-emerald-600",
    REJECTED: "bg-red-600 hover:bg-red-700",
  };
  return <Badge className={statusClasses[status]}>{status}</Badge>;
}

export { OrderStatus };
