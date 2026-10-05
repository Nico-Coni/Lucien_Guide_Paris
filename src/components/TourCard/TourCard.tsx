import type { JSX } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { Clock3, Euro } from "lucide-react";
import type { SupportedLanguage } from "../../i18n";
import { urlFor } from "../../sanity/image";
import type { SanityTourListItem } from "../../sanity/types";
import "./TourCard.scss";

type TourCardProps = {
    tour: SanityTourListItem;
};

function formatDuration(
    durationMinutes: number | null,
    language: SupportedLanguage,
): string {
    if (!durationMinutes) return "—";

    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;

    return [
        hours > 0 ? `${hours} ${language === "en" ? "hr" : "h"}` : "",
        minutes > 0 ? `${minutes} min` : "",
    ].filter(Boolean).join(" ");
}

function TourCard({ tour }: TourCardProps): JSX.Element {
    const { t, i18n } = useTranslation();
    const language: SupportedLanguage = i18n.resolvedLanguage?.startsWith("en")
        ? "en"
        : "fr";

    const imageUrl = tour.image?.asset?._id
        ? urlFor(tour.image)
            .width(900)
            .height(600)
            .fit("crop")
            .auto("format")
            .quality(82)
            .url()
        : null;

    const duration = formatDuration(tour.durationMinutes, language);
    const price = tour.price === null
        ? t("toursPage.card.onRequest")
        : new Intl.NumberFormat(language === "fr" ? "fr-FR" : "en-GB", {
            style: "currency",
            currency: "EUR",
            maximumFractionDigits: 0,
        }).format(tour.price);

    return (
        <article className="tour-list-card">
            <Link
                className="tour-list-card__link"
                to={`/visites/${tour.slug}`}
                aria-label={t("toursPage.card.open", { title: tour.title })}
            >
                <div className="tour-list-card__media">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={tour.image?.alt || t("toursPage.card.imageAlt", {
                                title: tour.title,
                            })}
                            loading="lazy"
                        />
                    ) : (
                        <div className="tour-list-card__image-placeholder" aria-hidden="true" />
                    )}

                    {tour.category?.name && (
                        <span className="tour-list-card__category">
                            {tour.category.name}
                        </span>
                    )}
                </div>

                <div className="tour-list-card__content">
                    <h2>{tour.title}</h2>
                    <p className="tour-list-card__description">{tour.summary}</p>

                    <div className="tour-list-card__footer">
                        <div className="tour-list-card__details">
                            <span>
                                <Clock3 size={17} aria-hidden="true" />
                                {duration}
                            </span>
                            <span>
                                <Euro size={17} aria-hidden="true" />
                                {price}
                            </span>
                        </div>

                        <span className="tour-list-card__arrow" aria-hidden="true">
                            →
                        </span>
                    </div>
                </div>
            </Link>
        </article>
    );
}

export default TourCard;
