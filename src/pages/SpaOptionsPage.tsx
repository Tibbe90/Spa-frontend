import './LandingPage.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpaPackageCard from '../components/SpaPackageCard/SpaPackageCard';
import type { BookingSpaPackage, SpaPackageOption } from '../types/spaPackage';



 const spaPackages: SpaPackageOption[] = [
    {
        title: 'Kallt spa',
        imageSrc: '/images/kallt.png',
        imageAlt: 'Kallt spa',
        description: 'Frisk kyla som väcker kroppen och ger ny energi.',
        price: 500,
        cardClassName: 'spa-card-cold',
        maxAtendees: 5,
        basePrice: 390
    },
    {
        title: 'Varmt spa',
        imageSrc: '/images/varmt.png',
        imageAlt: 'Varmt spa',
        description: 'Djup värme som slappnar av och ger total återhämtning.',
        price: 700,
        cardClassName: 'spa-card-warm',
        maxAtendees: 4,
        basePrice: 390
    },
    {
        title: 'Lugn och ro',
        imageSrc:'/images/lugn_och_ro.png',
        imageAlt: 'Lugn och ro',
        description:'Stillsam behandling för kropp och själ.',
        price: 400,
        cardClassName: 'spa-card-calm',
        maxAtendees: 4,
        basePrice: 200
    },
];

function SpaOptionsPage() {
    const navigate = useNavigate();
    const [hoveredPackage, setHoveredPackage] = useState<'cold' | 'warm' | 'calm' | null>(null);

    const stageClassName = [
        'landing-page',
        'spa-stage',
        hoveredPackage === 'cold' ? 'spa-stage--cold' : '',
        hoveredPackage === 'warm' ? 'spa-stage--warm' : '',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <main className={stageClassName}>
            <button type="button" className="back-btn" onClick={() => navigate("/")}>
                Tillbaka
            </button>

            <section className="spa-menu">
                {spaPackages.map((spaPackage) => (
                    <SpaPackageCard
                        key={spaPackage.title}
                        title={spaPackage.title}
                        imageSrc={spaPackage.imageSrc}
                        imageAlt={spaPackage.imageAlt}
                        description={spaPackage.description}
                        price={spaPackage.price}
                        basePrice={spaPackage.basePrice}
                        cardClassName={spaPackage.cardClassName}
                        maxAtendees={spaPackage.maxAtendees}
                        onHoverStart={() =>
                            setHoveredPackage(
                                spaPackage.cardClassName === 'spa-card-cold' ? 'cold' :
                                spaPackage.cardClassName === 'spa-card-warm' ? 'warm' : 'calm',
                            )
                        }
                        onHoverEnd={() => setHoveredPackage(null)}
                        onTimeSelect={(selectedTime) =>
                            navigate('/bookingPage', {
                                state: {
                                    selectedPackage: {
                                        title: spaPackage.title,
                                        price: spaPackage.price,
                                        maxAtendees: spaPackage.maxAtendees,
                                        basePrice: spaPackage.basePrice,
                                    } satisfies BookingSpaPackage,
                                    selectedTime,
                                },
                            })
                        }
                    />
                ))}
            </section>
        </main>
    );
}

export default SpaOptionsPage;
