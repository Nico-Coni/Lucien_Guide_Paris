import type { JSX } from "react";
import { useTranslation } from "react-i18next";
import Carousel from "../Carousel/Carousel";
import type { Testimonial } from "../../data/testimonials";
import "./TestimonialsCarousel.scss";

type TestimonialsCarouselProps = {
    testimonials: readonly Testimonial[];
};

function TestimonialsCarousel({
    testimonials,
}: TestimonialsCarouselProps): JSX.Element | null {
    const { t } = useTranslation();

    if (testimonials.length === 0) {
        return null;
    }

    return (
        <section
            className="testimonials"
            id="avis-clients"
            aria-labelledby="testimonials-title"
        >
            <header className="testimonials__header">
                <p className="testimonials__eyebrow">
                    {t("testimonials.eyebrow")}
                </p>

                <h2 id="testimonials-title">
                    {t("testimonials.title")}
                </h2>

                <p className="testimonials__description">
                    {t("testimonials.description")}
                </p>
            </header>

            <Carousel
                className="testimonials-carousel"
                items={testimonials}
                ariaLabel={t("testimonials.carousel.label")}
                translationNamespace="testimonials.carousel"
                renderSlide={(testimonial) => {
                    const translationKey =
                        `testimonials.items.${testimonial.id}`;

                    return (
                        <article className="testimonial-card">
                            <div
                                className="testimonial-card__rating"
                                aria-label={t("testimonials.rating", {
                                    count: testimonial.rating,
                                })}
                            >
                                <span className="testimonial-card__stars" aria-hidden="true">
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <span
                                            className={
                                                index < testimonial.rating ? "is-filled" : undefined
                                            }
                                            key={index}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </span>

                                <span className="testimonial-card__rating-value">
                                    {testimonial.rating}/5
                                </span>
                            </div>

                            <blockquote className="testimonial-card__quote">
                                <p>{t(`${translationKey}.quote`)}</p>
                            </blockquote>

                            <footer className="testimonial-card__author">
                                <strong>
                                    {t(`${translationKey}.author`)}
                                </strong>

                                <span>
                                    {t(`${translationKey}.details`)}
                                </span>
                            </footer>
                        </article>
                    );
                }}
            />
        </section>
    );
}

export default TestimonialsCarousel;