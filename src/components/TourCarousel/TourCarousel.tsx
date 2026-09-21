import type { JSX } from "react";
import { useTranslation } from "react-i18next";
import Carousel from "../Carousel/Carousel";
import TourHighlight from "../TourHighlight/TourHighlight.tsx";
import type { CarouselTour } from "../../types/tour";
import "./TourCarousel.scss";

type TourCarouselProps = {
    tours: readonly CarouselTour[];
};

function TourCarousel({
    tours,
}: TourCarouselProps): JSX.Element | null {
    const { t } = useTranslation();

    return (
        <Carousel
            id="accueil"
            className="tour-carousel"
            items={tours}
            ariaLabel={t("carousel.label")}
            translationNamespace="carousel"
            renderSlide={(tour) => {
                const translationKey = `carousel.tours.${tour.id}`;

                return (
                    <>
                        <img
                            className="tour-slide__image"
                            src={tour.image}
                            alt={t(`${translationKey}.imageAlt`)}
                        />

                        <div className="tour-slide__overlay" aria-hidden="true" />

                        <div className="tour-slide__content">
                            <TourHighlight tour={tour} />
                        </div>
                    </>
                );
            }}
        />
    );
}

export default TourCarousel;