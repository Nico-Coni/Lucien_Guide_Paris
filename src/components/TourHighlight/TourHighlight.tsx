import type { JSX } from "react";
import { useTranslation } from "react-i18next";
import type { CarouselTour } from "../../types/tour";
import "./TourHighlight.scss";

type TourHighlightProps = {
    tour: CarouselTour;
};

function TourHighlight({
    tour,
}: TourHighlightProps): JSX.Element {
    const { t } = useTranslation();
    const translationKey = `carousel.tours.${tour.id}`;

    return (
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

            <a className="tour-highlight__link" href={tour.href}>
                {t("carousel.discover")}
                <span aria-hidden="true">→</span>
            </a>
        </article>
    );
}

export default TourHighlight;