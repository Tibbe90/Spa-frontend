import { useOrders } from '../hooks/useOrders';
import './LandingPage.css';

           



function AdminPage() {


const orders = useOrders();

    return(
        <main className ="landing-page">
            <section className= "hero">
                <div  className="overlay">
                    <div className="admin-content"> <h1>Bokningar</h1> </div>
                    <div className="admin-container">
                        <table className="admin-table">
                            <thead>
                                <tr className="admin-table-header">
                                    <th>Namn</th>
                                    <th>Datum</th>
                                    <th>Tid</th>
                                    <th>Paket</th>
                                    <th>Antal personer</th>
                                    <th>Total pris</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id}>
                                    <td>{order.firstName} {order.lastName}</td>
                                    <td>{order.date}</td>
                                    <td>{order.time}</td>
                                    <td>{order.packageTitle}</td>
                                    <td>{order.nrOfAtendees}</td>
                                    <td>{order.totalPrice} kr</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

        </main>
    )

}

export default AdminPage;