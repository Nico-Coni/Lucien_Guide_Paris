import { useEffect, type JSX } from "react";
import { Link, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { Clock3, Euro, Tag } from "lucide-react";
import { tours } from "../data/tours";
import Carousel from "../components/Carousel/Carousel";
import MeetingPoint from "../components/MeetingPoint/MeetingPoint";
import "./TourPage.scss";

function TourPage(): JSX.Element {
    const { slug } = useParams<{ slug: string }>();
    const { t } = useTranslation();

    const tour = tours.find((item) => item.id === slug);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "auto",
        });
    }, [slug]);

    if (!tour) {
        return (
            <section className="tour-page-not-found">
                <h1>{t("tourPage.notFoundTitle")}</h1>
                <p>{t("tourPage.notFoundDescription")}</p>

                <Link to="/">
                    {t("tourPage.backHome")}
                </Link>
            </section>
        );
    }

    const translationKey = `carousel.tours.${tour.id}`;

    const tourImages = [
        {
            id: `${tour.id}-main`,
            src: tour.image,
        },
        ...tour.gallery.map((image, index) => ({
            id: `${tour.id}-gallery-${index}`,
            src: image,
        })),
    ];

    return (
        <article className="tour-page">
            <Carousel
                className="tour-page__gallery"
                items={tourImages}
                ariaLabel={t("tourPage.gallery.label", {
                    title: t(`${translationKey}.title`),
                })}
                translationNamespace="tourPage.gallery"
                renderSlide={(image, index) => (
                    <>
                        <img
                            className="tour-page__gallery-image"
                            src={image.src}
                            alt={
                                index === 0
                                    ? t(`${translationKey}.imageAlt`)
                                    : t("tourPage.gallery.imageAlt", {
                                        number: index + 1,
                                        title: t(`${translationKey}.title`),
                                    })
                            }
                            loading={index === 0 ? "eager" : "lazy"}
                        />

                        <div
                            className="tour-page__gallery-overlay"
                            aria-hidden="true"
                        />

                        <div className="tour-page__gallery-caption">
                            <p>{t(`${translationKey}.category`)}</p>
                            <h1>{t(`${translationKey}.title`)}</h1>
                        </div>
                    </>
                )}
            />

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

                        <p>{t(`${translationKey}.description`)}</p>

                        <p>{t("tourPage.descriptionComplement")}</p>
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

                                <dd>
                                    {t(`${translationKey}.duration`)}
                                </dd>
                            </div>

                            <div>
                                <dt>
                                    <Euro size={20} aria-hidden="true" />
                                    {t("tourPage.price")}
                                </dt>

                                <dd>
                                    {t(`${translationKey}.price`)}
                                </dd>
                            </div>

                            <div>
                                <dt>
                                    <Tag size={20} aria-hidden="true" />
                                    {t("tourPage.category")}
                                </dt>

                                <dd>
                                    {t(`${translationKey}.category`)}
                                </dd>
                            </div>
                        </dl>

                        <a
                            className="tour-page__booking-button"
                            href="mailto:info@lucienaparis.com"
                        >
                            {t("tourPage.book")}
                            <span aria-hidden="true">→</span>
                        </a>
                    </aside>
                </div>
            </section>

            <MeetingPoint
                address={tour.meetingPoint.address}
            />
        </article >
    );
}

export default TourPage;