import { useNavigate, useParams } from "react-router-dom";
import "./ConfirmationPage.css";
import type { OrderDB } from "../types/types";
import { useEffect, useState } from "react";

function ConfirmationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderDB | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8080/order/${id}`)
      .then((response: Response) => response.json())
      .then((data: OrderDB) => setOrder(data));
  }, [id]);

  if (!order) return <p>Laddar...</p>;

  return (
    <main className="confirmation-page">
      <section className="MainSection">
        <div className="overlay">
          <div className="text-content">
            <h1>Tack {order.firstName} för din bokning!</h1>
            <p>Bokning för {order.packageTitle} paket</p>
            <p>
              {order.nrOfAtendees} personer, {order.time} den {order.date}
            </p>
            <p>Total kostnad {order.totalPrice}kr. Betalas vid ankomst</p>
            <button className="home-btn" onClick={() => navigate("/")}>
              Tillbaka till hem
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ConfirmationPage;
