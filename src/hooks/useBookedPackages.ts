import { useEffect, useState } from "react";
import type { OrderDB } from "../types/types";


export function useBookedPackages(time: string, spaPackage: string) {
    
    const [unavailableTimes, setUnavailableTimes] = useState<string[]>([]);
    
    useEffect(() => {
        fetch(`http://localhost:8080/orders`)
          .then((response: Response) => response.json())
          .then((data: OrderDB[]) => {
              const unavailable: OrderDB[] = data.filter((order) => 
                order.packageTitle === spaPackage && order.time === time
             );
              const unavailableDates = unavailable.map((unavailable) => unavailable.date)
              setUnavailableTimes(unavailableDates);
          });
    }, [time, spaPackage]);
    return unavailableTimes
}