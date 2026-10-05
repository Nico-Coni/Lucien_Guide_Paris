import { useEffect, useState, type JSX } from "react";
import { Link, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { Clock3, Euro, Tag } from "lucide-react";
import type { SupportedLanguage } from "../i18n";
import Carousel from "../components/Carousel/Carousel";
import MeetingPoint from "../components/MeetingPoint/MeetingPoint";
import { urlFor } from "../sanity/image";
import { getTourBySlug } from "../sanity/tours";
import type { SanityTour, SanityTourImage } from "../sanity/types";
import "./TourPage.scss";

type LoadingStatus = "loading" | "success" | "error";

type TourRequestResult = {
    requestKey: string;
    status: Exclude<LoadingStatus, "loading">;
    tour: SanityTour | null;
};

type TourImageWithAsset = SanityTourImage & {
    asset: NonNullable<SanityTourImage["asset"]>;
};

function hasImageAsset(
    image: SanityTourImage | null | undefined,
): image is TourImageWithAsset {
    return Boolean(image?.asset?._id);
}

function formatDuration(
    durationMinutes: number | null,
    language: SupportedLanguage,
): string {
    if (!durationMinutes) return "—";

    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;

    if (language === "en") {
        return [
            hours > 0 ? `${hours} hr` : "",
            minutes > 0 ? `${minutes} min` : "",
        ].filter(Boolean).join(" ");
    }

    return [
        hours > 0 ? `${hours} h` : "",
        minutes > 0 ? `${minutes} min` : "",
    ].filter(Boolean).join(" ");
}

function TourPage(): JSX.Element {
    const { slug } = useParams<{ slug: string }>();
    const { t, i18n } = useTranslation();
    const [requestResult, setRequestResult] = useState<TourRequestResult | null>(null);

    const language: SupportedLanguage = i18n.resolvedLanguage?.startsWith("en")
        ? "en"
        : "fr";
    const requestKey = `${language}:${slug ?? ""}`;

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, [slug]);

    useEffect(() => {
        if (!slug) return;

        let isCurrentRequest = true;

        void getTourBySlug(slug, language)
            .then((result) => {
                if (!isCurrentRequest) return;

                setRequestResult({
                    requestKey,
                    status: "success",
                    tour: result,
                });
            })
            .catch((error: unknown) => {
                console.error("Impossible de charger la visite depuis Sanity", error);

                if (!isCurrentRequest) return;

                setRequestResult({
                    requestKey,
                    status: "error",
                    tour: null,
                });
            });

        return () => {
            isCurrentRequest = false;
        };
    }, [language, requestKey, slug]);

    const isCurrentResult = requestResult?.requestKey === requestKey;
    const status: LoadingStatus = !slug
        ? "success"
        : isCurrentResult
            ? requestResult.status
            : "loading";
    const tour = isCurrentResult ? requestResult.tour : null;

    if (status === "loading") {
        return (
            <section className="tour-page-status" aria-live="polite">
                <span className="tour-page-status__loader" aria-hidden="true" />
                <p>{t("tourPage.loading")}</p>
            </section>
        );
    }

    if (status === "error") {
        return (
            <section className="tour-page-status" role="alert">
                <h1>{t("tourPage.loadErrorTitle")}</h1>
                <p>{t("tourPage.loadErrorDescription")}</p>
                <Link to="/">{t("tourPage.backHome")}</Link>
            </section>
        );
    }

    if (!tour) {
        return (
            <section className="tour-page-status">
                <h1>{t("tourPage.notFoundTitle")}</h1>
                <p>{t("tourPage.notFoundDescription")}</p>
                <Link to="/">{t("tourPage.backHome")}</Link>
            </section>
        );
    }

    const imageSources = [tour.image, ...(tour.gallery ?? [])].filter(hasImageAsset);

    const tourImages = imageSources.map((image, index) => ({
        id: index === 0
            ? `main-${image.asset._id}`
            : image._key ?? `${image.asset._id}-${index}`,
        src: urlFor(image)
            .width(1920)
            .height(1080)
            .fit("crop")
            .auto("format")
            .quality(85)
            .url(),
        alt: image.alt || t("tourPage.gallery.imageAlt", {
            number: index + 1,
            title: tour.title,
        }),
    }));

    const duration = formatDuration(tour.durationMinutes, language);
    const price = tour.price === null
        ? t("tourPage.onRequest")
        : new Intl.NumberFormat(language === "fr" ? "fr-FR" : "en-GB", {
            style: "currency",
            currency: "EUR",
            maximumFractionDigits: 0,
        }).format(tour.price);

    const bookingHref = `mailto:info@lucienaparis.com?subject=${encodeURIComponent(
        t("tourPage.bookingSubject", { title: tour.title }),
    )}`;

    return (
        <article className="tour-page">
            {tourImages.length > 0 ? (
                <Carousel
                    className="tour-page__gallery"
                    items={tourImages}
                    ariaLabel={t("tourPage.gallery.label", {
                        title: tour.title,
                    })}
                    translationNamespace="tourPage.gallery"
                    renderSlide={(image, index) => (
                        <>
                            <img
                                className="tour-page__gallery-image"
                                src={image.src}
                                alt={image.alt}
                                loading={index === 0 ? "eager" : "lazy"}
                            />

                            <div
                                className="tour-page__gallery-overlay"
                                aria-hidden="true"
                            />

                            <div className="tour-page__gallery-caption">
                                {tour.category && (
                                    <p className="tour-page__gallery-category">
                                        {tour.category}
                                    </p>
                                )}
                                <h1>{tour.title}</h1>
                                {tour.summary && (
                                    <p className="tour-page__gallery-summary">
                                        {tour.summary}
                                    </p>
                                )}
                            </div>
                        </>
                    )}
                />
            ) : (
                <section className="tour-page__gallery tour-page__gallery--empty">
                    <div className="tour-page__gallery-caption">
                        {tour.category && (
                            <p className="tour-page__gallery-category">
                                {tour.category}
                            </p>
                        )}
                        <h1>{tour.title}</h1>
                    </div>
                </section>
            )}

            <section
                className="tour-page__information"
                id="informations-visite"
                aria-labelledby="tour-information-title"
            >
                <div className="tour-page__information-inner">
                    <div className="tour-page__description">
                        <p className="tour-page__eyebrow">
                            {t("tourPage.informationEyebrow")}
                        </p>

                        <h2 id="tour-information-title">
                            {t("tourPage.informationTitle")}
                        </h2>

                        <p>{tour.description || tour.summary}</p>
                    </div>

                    <aside
                        className="tour-page__practical"
                        aria-labelledby="practical-information-title"
                    >
                        <h2 id="practical-information-title">
                            {t("tourPage.practicalTitle")}
                        </h2>

                        <dl>
                            <div>
                                <dt>
                                    <Clock3 size={20} aria-hidden="true" />
                                    {t("tourPage.duration")}
                                </dt>
                                <dd>{duration}</dd>
                            </div>

                            <div>
                                <dt>
                                    <Euro size={20} aria-hidden="true" />
                                    {t("tourPage.price")}
                                </dt>
                                <dd>{price}</dd>
                            </div>

                            {tour.category && (
                                <div>
                                    <dt>
                                        <Tag size={20} aria-hidden="true" />
                                        {t("tourPage.category")}
                                    </dt>
                                    <dd>{tour.category}</dd>
                                </div>
                            )}
                        </dl>

                        <a
                            className="tour-page__booking-button"
                            href={bookingHref}
                        >
                            {t("tourPage.book")}
                            <span aria-hidden="true">→</span>
                        </a>
                    </aside>
                </div>
            </section>

            {tour.meetingPoint?.address && (
                <MeetingPoint
                    name={tour.meetingPoint.name}
                    address={tour.meetingPoint.address}
                    instructions={tour.meetingPoint.instructions}
                />
            )}
        </article>
    );
}

export default TourPage;
