import { useEffect, useState } from "react";
import type { OrderDB } from "../types/types";
import { config } from "../data/config"

export function useOrders() {
  const [orders, setOrders] = useState<OrderDB[]>([]);

  useEffect(() => {
fetch(`${config.apiUrl}/orders`)
      .then((res) => res.json())
      .then((data: OrderDB[]) => setOrders(data));
  }, []);

  return orders;
}