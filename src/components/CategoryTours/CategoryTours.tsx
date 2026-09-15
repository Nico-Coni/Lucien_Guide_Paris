import type { JSX } from "react";
import { useTranslation } from "react-i18next";
import { tourCategories } from "../../data/tourCategories.ts";
import "./CategoryTours.scss";

function CategoryTours(): JSX.Element {
    const { t } = useTranslation();

    return (
        <section
            className="category-tours"
            id="visites"
            aria-labelledby="category-tours-title"
        >
            <div className="category-tours__inner">
                <header className="category-tours__header">
                    <p className="category-tours__eyebrow">
                        {t("categoryTours.eyebrow")}
                    </p>

                    <h2 id="category-tours-title">
                        {t("categoryTours.title")}
                    </h2>

                    <p>{t("categoryTours.description")}</p>
                </header>

                <div className="category-tours__grid">
                    {tourCategories.map((category) => {
                        const translationKey =
                            `categoryTours.categories.${category.id}`;

                        const title = t(`${translationKey}.title`);

                        return (
                            <article
                                className="tour-card"
                                id={category.id}
                                key={category.id}
                            >
                                <a
                                    className="tour-card__link"
                                    href={category.href}
                                    aria-label={t("categoryTours.openCategory", {
                                        title,
                                    })}
                                >
                                    <div className="tour-card__media">
                                        <img
                                            src={category.image}
                                            alt={t(`${translationKey}.imageAlt`)}
                                            loading="lazy"
                                        />
                                    </div>

                                    <div className="tour-card__content">
                                        <h3>{title}</h3>

                                        <p className="tour-card__description">
                                            {t(`${translationKey}.description`)}
                                        </p>

                                        <div className="tour-card__footer">
                                            <span>{t("categoryTours.discover")}</span>

                                            <span
                                                className="tour-card__arrow"
                                                aria-hidden="true"
                                            >
                                                →
                                            </span>
                                        </div>
                                    </div>
                                </a>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default CategoryTours;