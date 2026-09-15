import type { JSX } from "react";
import { useTranslation } from "react-i18next";
import "./AboutGuide.scss";

type AboutGuideProps = {
    portrait: string;
};

type FeatureIconName = "group" | "heart" | "star" | "leaf";

const features: ReadonlyArray<{
    id: string;
    icon: FeatureIconName;
}> = [
        { id: "privateTours", icon: "group" },
        { id: "authentic", icon: "heart" },
        { id: "experience", icon: "star" },
        { id: "sustainable", icon: "leaf" },
    ];

function FeatureIcon({ name }: { name: FeatureIconName }): JSX.Element {
    const paths: Record<FeatureIconName, JSX.Element> = {
        group: (
            <>
                <circle cx="9" cy="8" r="3" />
                <path d="M3.5 19v-1.5A4.5 4.5 0 0 1 8 13h2a4.5 4.5 0 0 1 4.5 4.5V19" />
                <path d="M15 5.5a3 3 0 0 1 0 5.8M16 14a4 4 0 0 1 4 4v1" />
            </>
        ),
        heart: (
            <path d="M20.8 5.8a5 5 0 0 0-7.1 0L12 7.5l-1.7-1.7a5 5 0 0 0-7.1 7.1L12 21l8.8-8.1a5 5 0 0 0 0-7.1Z" />
        ),
        star: (
            <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.2L5.8 21 7 14.2l-5-4.9 6.9-1L12 2Z" />
        ),
        leaf: (
            <>
                <path d="M20.5 3.5C13 3.5 6 7 6 14a6 6 0 0 0 6 6c7 0 8.5-9.5 8.5-16.5Z" />
                <path d="M4 21c2.5-6.5 7-10.5 13-13" />
            </>
        ),
    };

    return (
        <svg
            className="guide-feature__icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            {paths[name]}
        </svg>
    );
}

function AboutGuide({ portrait }: AboutGuideProps): JSX.Element {
    const { t } = useTranslation();

    return (
        <section
            className="about-guide"
            id="a-propos"
            aria-labelledby="about-guide-title"
        >
            <div className="about-guide__inner">
                <figure className="about-guide__portrait">
                    <img src={portrait} alt={t("aboutGuide.photoAlt")} loading="lazy" />
                </figure>

                <div className="about-guide__content">
                    <p className="about-guide__eyebrow">{t("aboutGuide.eyebrow")}</p>

                    <h2 id="about-guide-title">{t("aboutGuide.title")}</h2>

                    <p className="about-guide__identity">{t("aboutGuide.identity")}</p>

                    <p className="about-guide__description">
                        {t("aboutGuide.description")}
                    </p>

                    <ul className="about-guide__features">
                        {features.map((feature) => (
                            <li className="guide-feature" key={feature.id}>
                                <span className="guide-feature__icon-wrapper">
                                    <FeatureIcon name={feature.icon} />
                                </span>
                                <span>{t(`aboutGuide.features.${feature.id}`)}</span>
                            </li>
                        ))}
                    </ul>

                    <blockquote className="about-guide__quote">
                        <p>“{t("aboutGuide.quote")}”</p>
                        <cite>{t("aboutGuide.signature")}</cite>
                    </blockquote>
                </div>
            </div>
        </section>
    );
}

export default AboutGuide;
