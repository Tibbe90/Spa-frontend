import type { SpaPackageOption, TimeSlot } from "../../types/spaPackage";

type SpaPackageCardProps = SpaPackageOption & {
    onTimeSelect: (time: TimeSlot) => void;
    onHoverStart?: () => void;
    onHoverEnd?: () => void;
};

function SpaPackageCard({
    title,
    imageSrc,
    imageAlt,
    description,
    price,
    maxAtendees,
    basePrice,
    cardClassName,
    onTimeSelect,
    onHoverStart,
    onHoverEnd,
}: SpaPackageCardProps) {
    return (
        <article
            className={`spa-card ${cardClassName ?? ''}`.trim()}
            onMouseEnter={onHoverStart}
            onMouseLeave={onHoverEnd}
        >
            <h2>{title}</h2>
            <img src={imageSrc} alt={imageAlt} className="spa-image" />
            <p>{description}</p>

            <div className="time-buttons">
                <button type="button" onClick={() => onTimeSelect("Förmiddag")}>
                    Förmiddag
                </button>
                <button type="button" onClick={() => onTimeSelect("Eftermiddag")}>
                    Eftermiddag
                </button>
                <button type="button" onClick={() => onTimeSelect("Kväll")}>
                    Kväll
                </button>
            </div>

            <p className="price">

                <span className="price-meta">
                    <span className="upTo">Upp till</span>
                </span>
                <span className="maxAtendees">{maxAtendees}</span>
                <span className="price-meta">
                    <span className="currency">Personer</span>
                    <span className="per-person">/ sällskap</span>
                </span>
                <span className="amount">{price}</span>
                <span className="price-meta">
                    <span className="currency">Kr</span>
                    <span className="per-person">/ person</span>
                </span>
                <span className="base-price"> Baspris {basePrice}kr</span>

            </p>
        </article>
    );
}

export default SpaPackageCard;
