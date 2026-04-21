import { useState } from "react";
import "./BookingPage.css";
import type { OrderDB } from "../types/types";
import { useLocation, useNavigate } from "react-router-dom";
import type { BookingPageState } from "../types/spaPackage";
import Calendar from "../components/Calendar/Calendar";

interface Order {
    firstName: string;
    lastName: string;
    email: string;
    phoneNr: string;
    nrOfAtendees: number;
}

function BookingPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const bookingState = location.state as BookingPageState | null;
    const selectedPackage = bookingState?.selectedPackage;
    const selectedTime = bookingState?.selectedTime;

    //sparar valt datum
    const [selectedDate, setSelectedDate] = useState<string>("")

    const [newOrder, setNewOrder] = useState<Order>({
        firstName: "",
        lastName: "",
        email: "",
        phoneNr: "",
        nrOfAtendees: 1,
    });
    


    const saveOrder = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        fetch("http://localhost:8080/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...newOrder,
                time: selectedTime,
                date: selectedDate,
                packageTitle: selectedPackage?.title,
            }),
        })
            .then((response: Response) => response.json())
            .then((createdOrder: OrderDB) => {
                setNewOrder({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phoneNr: "",
                    nrOfAtendees: 1,
                });
                setSelectedDate("");
                navigate(`/confirmation/${createdOrder.id}`);
                console.log("Order saved, navigating...");
            })
            .catch((err) => {
                console.error(err)
                alert("Något gick fel, din bokning är inte sparad")
            });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setNewOrder((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const increase = () => {
        setNewOrder((prev) => ({
            ...prev,
            nrOfAtendees:
                prev.nrOfAtendees < (selectedPackage?.maxAtendees ?? 4) ? prev.nrOfAtendees + 1 : selectedPackage?.maxAtendees ?? 4,
        }));
    };

    const decrease = () => {
        setNewOrder((prev) => ({
            ...prev,
            nrOfAtendees:
                prev.nrOfAtendees > 1 ? prev.nrOfAtendees - 1 : 1,
        }));
    };
    const basePrice = selectedPackage?.basePrice ?? 0;

    const calculateTotalPrice = () => {
        const basePrice = selectedPackage?.basePrice ?? 0;
        const packagePrice = selectedPackage?.price ?? 0;

        return basePrice + packagePrice * newOrder.nrOfAtendees;
    };


    return (
        <div className="booking-page">
            <button className="home-btn" onClick={() => navigate("/")}>
                Tillbaka till hem
            </button>

            <div className="booking-container">
                <h1>Bokningsdetaljer</h1>

                {selectedPackage ? (
                    <section>
                        <h2>{selectedPackage.title}</h2>
                        <p>Tid: {selectedTime}</p>
                        <p>{selectedPackage.price} kr per person</p>
                    </section>
                ) : (
                    <section>
                        <p>Inget paket valt ännu.</p>
                        <button type="button" onClick={() => navigate("/packages")}>
                            Välj paket
                        </button>
                    </section>
                )}

                {/* Kalender — användaren väljer datum */}
                <Calendar onDateSelect={(date) => setSelectedDate(date)} 
                spaPackage={selectedPackage?.title ?? ""}
                time={selectedTime ?? ""}
/>

                <form onSubmit={saveOrder}>
                    <input
                        name="firstName"
                        placeholder="Förnamn"
                        value={newOrder.firstName}
                        onChange={handleChange}
                    />

                    <input
                        name="lastName"
                        placeholder="Efternamn"
                        value={newOrder.lastName}
                        onChange={handleChange}
                    />

                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={newOrder.email}
                        onChange={handleChange}
                    />

                    <input
                        name="phoneNr"
                        placeholder="Telefonnummer"
                        value={newOrder.phoneNr}
                        onChange={handleChange}
                    />

                    <div className="attendees-section">
                        <p>Hur många personer gäller bokningen?</p>

                        <div className="attendees-controls">
                            <button type="button" onClick={decrease}>−</button>

                            <span>{newOrder.nrOfAtendees}</span>

                            <button type="button" onClick={increase}>+</button>
                        </div>

                        <p className="total-price">
                            Baspris: {basePrice}  kr <br/>
                            Totalpris: <span>{calculateTotalPrice()}</span> kr
                        </p>

                    </div>

                    <button type="submit">Boka</button>
                </form>

            </div>
        </div>
    );
}

export default BookingPage;