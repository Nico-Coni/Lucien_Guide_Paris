import { useState, type JSX } from "react";
import { useTranslation } from "react-i18next";
import "./Carousel.scss";

export type TourId = "latin" | "montmartre" | "marais";

export type CarouselTour = {
    id: TourId;
    image: string;
    href: string;
};

type CarouselProps = {
    tours: readonly CarouselTour[];
};

function Carousel({ tours }: CarouselProps): JSX.Element | null {
    const [activeIndex, setActiveIndex] = useState(0);
    const { t } = useTranslation();

    if (tours.length === 0) {
        return null;
    }

    const safeIndex = activeIndex % tours.length;
    const activeTour = tours[safeIndex];
    const translationKey = `carousel.tours.${activeTour.id}`;

    const showPreviousTour = (): void => {
        setActiveIndex((currentIndex) =>
            currentIndex === 0 ? tours.length - 1 : currentIndex - 1,
        );
    };

    const showNextTour = (): void => {
        setActiveIndex((currentIndex) => (currentIndex + 1) % tours.length);
    };

    return (
        <section
            className="carousel"
            id="accueil"
            role="region"
            aria-roledescription={t("carousel.roledescription")}
            aria-label={t("carousel.label")}
        >
            <div
                className="carousel__slide"
                role="group"
                aria-roledescription={t("carousel.slide")}
                aria-label={t("carousel.position", {
                    current: safeIndex + 1,
                    total: tours.length,
                })}
                key={activeTour.id}
            >
                <img
                    className="carousel__image"
                    src={activeTour.image}
                    alt={t(`${translationKey}.imageAlt`)}
                />
                <div className="carousel__overlay" />

                <div className="carousel__content">
                    <article className="tour-highlight">
                        <p className="tour-highlight__category">
                            {t(`${translationKey}.category`)}
                        </p>

                        <h1 className="tour-highlight__title">
                            {t(`${translationKey}.title`)}
                        </h1>

                        <p className="tour-highlight__description">
                            {t(`${translationKey}.description`)}
                        </p>

                        <div className="tour-highlight__details">
                            <span>
                                <span aria-hidden="true">◷</span>
                                {t(`${translationKey}.duration`)}
                            </span>
                            <span>
                                <span aria-hidden="true">◇</span>
                                {t(`${translationKey}.price`)}
                            </span>
                        </div>

                        <a className="tour-highlight__link" href={activeTour.href}>
                            {t("carousel.discover")}
                            <span aria-hidden="true">→</span>
                        </a>
                    </article>
                </div>
            </div>

            {tours.length > 1 && (
                <>
                    <button
                        className="carousel__arrow carousel__arrow--previous"
                        type="button"
                        aria-label={t("carousel.previous")}
                        onClick={showPreviousTour}
                    >
                        <span aria-hidden="true">←</span>
                    </button>

                    <button
                        className="carousel__arrow carousel__arrow--next"
                        type="button"
                        aria-label={t("carousel.next")}
                        onClick={showNextTour}
                    >
                        <span aria-hidden="true">→</span>
                    </button>

                    <div className="carousel__pagination">
                        {tours.map((tour, index) => (
                            <button
                                className={`carousel__dot${index === safeIndex ? " is-active" : ""
                                    }`}
                                type="button"
                                aria-label={t("carousel.goToSlide", { number: index + 1 })}
                                aria-current={index === safeIndex ? "true" : undefined}
                                onClick={() => setActiveIndex(index)}
                                key={tour.id}
                            />
                        ))}
                    </div>
                </>
            )}

            <p className="sr-only" aria-live="polite" aria-atomic="true">
                {t("carousel.position", {
                    current: safeIndex + 1,
                    total: tours.length,
                })}
            </p>
        </section>
    );
}

export default Carousel;
