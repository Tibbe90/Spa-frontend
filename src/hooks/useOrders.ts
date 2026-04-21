import { useEffect, useState } from "react";
import type { OrderDB } from "../types/types";

export function useOrders() {
  const [orders, setOrders] = useState<OrderDB[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/orders")
      .then((res) => res.json())
      .then((data: OrderDB[]) => setOrders(data));
  }, []);

  return orders;
}