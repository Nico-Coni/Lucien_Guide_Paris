import { useEffect, useState, type JSX } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import type { SupportedLanguage } from "../../i18n";
import { urlFor } from "../../sanity/image";
import { getTourCategories } from "../../sanity/tours";
import type { SanityTourCategoryCard } from "../../sanity/types";
import "./CategoryTours.scss";

type LoadingStatus = "loading" | "success" | "error";

type CategoryRequestResult = {
    requestKey: string;
    status: Exclude<LoadingStatus, "loading">;
    categories: SanityTourCategoryCard[];
};

function CategoryTours(): JSX.Element {
    const { t, i18n } = useTranslation();
    const [requestResult, setRequestResult] = useState<CategoryRequestResult | null>(null);
    const [requestVersion, setRequestVersion] = useState(0);

    const language: SupportedLanguage = i18n.resolvedLanguage?.startsWith("en")
        ? "en"
        : "fr";
    const requestKey = `${language}:${requestVersion}`;

    useEffect(() => {
        let isCurrentRequest = true;

        void getTourCategories(language)
            .then((categories) => {
                if (!isCurrentRequest) return;

                setRequestResult({
                    requestKey,
                    status: "success",
                    categories,
                });
            })
            .catch((error: unknown) => {
                console.error("Impossible de charger les catégories depuis Sanity", error);

                if (!isCurrentRequest) return;

                setRequestResult({
                    requestKey,
                    status: "error",
                    categories: [],
                });
            });

        return () => {
            isCurrentRequest = false;
        };
    }, [language, requestKey]);

    const isCurrentResult = requestResult?.requestKey === requestKey;
    const status: LoadingStatus = isCurrentResult
        ? requestResult.status
        : "loading";
    const categories = isCurrentResult ? requestResult.categories : [];

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

                {status === "loading" && (
                    <div className="category-tours__status" aria-live="polite">
                        <span className="category-tours__loader" aria-hidden="true" />
                        <p>{t("categoryTours.loading")}</p>
                    </div>
                )}

                {status === "error" && (
                    <div className="category-tours__status" role="alert">
                        <p>{t("categoryTours.loadError")}</p>
                        <button
                            type="button"
                            onClick={() => setRequestVersion((version) => version + 1)}
                        >
                            {t("categoryTours.retry")}
                        </button>
                    </div>
                )}

                {status === "success" && categories.length > 0 && (
                    <div className="category-tours__grid">
                        {categories.map((category) => {
                            const imageUrl = category.image?.asset?._id
                                ? urlFor(category.image)
                                    .width(900)
                                    .height(620)
                                    .fit("crop")
                                    .auto("format")
                                    .quality(82)
                                    .url()
                                : null;

                            return (
                                <article
                                    className="tour-card"
                                    id={category.slug}
                                    key={category._id}
                                >
                                    <Link
                                        className="tour-card__link"
                                        to={`/visites?categorie=${encodeURIComponent(category.slug)}`}
                                        aria-label={t("categoryTours.openCategory", {
                                            title: category.name,
                                        })}
                                    >
                                        <div className="tour-card__media">
                                            {imageUrl ? (
                                                <img
                                                    src={imageUrl}
                                                    alt={category.image?.alt || t(
                                                        "categoryTours.imageAlt",
                                                        { title: category.name },
                                                    )}
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div
                                                    className="tour-card__image-placeholder"
                                                    aria-hidden="true"
                                                />
                                            )}
                                        </div>

                                        <div className="tour-card__content">
                                            <h3>{category.name}</h3>

                                            <p className="tour-card__description">
                                                {category.description}
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
                                    </Link>
                                </article>
                            );
                        })}
                    </div>
                )}

                {status === "success" && categories.length === 0 && (
                    <div className="category-tours__status">
                        <p>{t("categoryTours.empty")}</p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default CategoryTours;
