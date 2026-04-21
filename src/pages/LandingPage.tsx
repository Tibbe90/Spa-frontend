import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
    const navigate = useNavigate();
    return(
        <main className ="landing-page">
            <section className= "hero">
                <div  className="overlay">
                    <div className= "hero-content">
                        <h1>SONG OF ICE AND FIRE</h1>
                        <p>Upptäck balansen mellan värme och kyla</p>
                        <div className="hero-actions">
                            <button className= "book-btn" onClick={() => navigate("/packages")}>Hitta tid</button>
                            <button className= "book-btn" onClick={() => navigate("/adminPage")}>Bokningar</button>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    )

}

export default LandingPage;