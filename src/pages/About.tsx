import type { JSX } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import LucienPortrait from "../assets/lucien_portrait.jpg";
import "./About.scss";

const profileItems = [
    "profession",
    "experience",
    "format",
    "location",
] as const;

const classicItems = [
    "museums&monuments",
    "themes&neighborhoods",
    "personalized",
] as const;

const valueItems = [
    "storytelling",
    "tailored",
    "human",
] as const;

function About(): JSX.Element {
    const { t } = useTranslation();

    return (
        <article className="about-page">
            <section
                className="about-page__hero"
                aria-labelledby="about-page-title"
            >
                <div className="about-page__hero-inner">
                    <div className="about-page__introduction">
                        <p className="about-page__eyebrow">
                            {t("aboutPage.eyebrow")}
                        </p>

                        <h1 id="about-page-title">
                            {t("aboutPage.title")}
                        </h1>

                        <p className="about-page__lead">
                            {t("aboutPage.lead")}
                        </p>

                        <Link className="about-page__button" to="/#visites">
                            {t("aboutPage.discoverTours")}
                            <span aria-hidden="true">→</span>
                        </Link>
                    </div>

                    <div className="about-page__portrait-wrapper">
                        <figure className="about-page__portrait">
                            <img
                                src={LucienPortrait}
                                alt={t("aboutPage.photoAlt")}
                            />

                            <figcaption>
                                {t("aboutPage.photoCaption")}
                            </figcaption>
                        </figure>
                    </div>
                </div>
            </section>

            <section
                className="about-page__classics"
                aria-labelledby="about-classics-title"
            >
                <div className="about-page__classics-inner">
                    <header className="about-page__section-heading">
                        <p className="about-page__eyebrow">
                            {t("aboutPage.classics.eyebrow")}
                        </p>

                        <h2 id="about-classics-title">
                            {t("aboutPage.classics.title")}
                        </h2>

                        <p>{t("aboutPage.classics.description")}</p>
                    </header>

                    <div className="about-page__classics-grid">
                        {classicItems.map((item, index) => (
                            <article
                                className="about-classic-card"
                                key={item}
                            >
                                <span
                                    className="about-classic-card__number"
                                    aria-hidden="true"
                                >
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                <h3>
                                    {t(`aboutPage.classics.items.${item}.title`)}
                                </h3>

                                <p>
                                    {t(
                                        `aboutPage.classics.items.${item}.description`,
                                    )}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section
                className="about-page__story"
                aria-labelledby="about-story-title"
            >
                <div className="about-page__story-inner">
                    <header className="about-page__section-heading">
                        <p className="about-page__eyebrow">
                            {t("aboutPage.story.eyebrow")}
                        </p>

                        <h2 id="about-story-title">
                            {t("aboutPage.story.title")}
                        </h2>
                    </header>

                    <div className="about-page__story-content">
                        <div className="about-page__story-text">
                            <p>{t("aboutPage.story.paragraph1")}</p>
                            <p>{t("aboutPage.story.paragraph2")}</p>
                            <p>{t("aboutPage.story.paragraph3")}</p>
                        </div>

                        <dl className="about-page__profile">
                            {profileItems.map((item) => (
                                <div
                                    className="about-page__profile-item"
                                    key={item}
                                >
                                    <dt>
                                        {t(`aboutPage.profile.${item}.label`)}
                                    </dt>

                                    <dd>
                                        {t(`aboutPage.profile.${item}.value`)}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </section>

            <section
                className="about-page__values"
                aria-labelledby="about-values-title"
            >
                <div className="about-page__values-inner">
                    <header className="about-page__section-heading">
                        <p className="about-page__eyebrow">
                            {t("aboutPage.values.eyebrow")}
                        </p>

                        <h2 id="about-values-title">
                            {t("aboutPage.values.title")}
                        </h2>

                        <p>{t("aboutPage.values.description")}</p>
                    </header>

                    <div className="about-page__values-grid">
                        {valueItems.map((item, index) => (
                            <article
                                className="about-value-card"
                                key={item}
                            >
                                <span
                                    className="about-value-card__number"
                                    aria-hidden="true"
                                >
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                <h3>
                                    {t(`aboutPage.values.items.${item}.title`)}
                                </h3>

                                <p>
                                    {t(
                                        `aboutPage.values.items.${item}.description`,
                                    )}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="about-page__quote">
                <div className="about-page__quote-inner">
                    <blockquote>
                        <p>“{t("aboutPage.quote.text")}”</p>
                        <cite>{t("aboutPage.quote.author")}</cite>
                    </blockquote>
                </div>
            </section>

            <section className="about-page__cta">
                <div className="about-page__cta-inner">
                    <div>
                        <p className="about-page__eyebrow">
                            {t("aboutPage.cta.eyebrow")}
                        </p>

                        <h2>{t("aboutPage.cta.title")}</h2>

                        <p>{t("aboutPage.cta.description")}</p>
                    </div>

                    <Link className="about-page__button" to="/#visites">
                        {t("aboutPage.cta.button")}
                        <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </section>
        </article>
    );
}

export default About;