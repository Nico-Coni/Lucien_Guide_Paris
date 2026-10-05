import { useEffect, useState, type JSX } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";
import type { SupportedLanguage } from "../i18n";
import TourCard from "../components/TourCard/TourCard";
import { getToursIndex } from "../sanity/tours";
import type { SanityToursIndex } from "../sanity/types";
import "./ToursPage.scss";

type LoadingStatus = "loading" | "success" | "error";

type ToursRequestResult = {
    requestKey: string;
    status: Exclude<LoadingStatus, "loading">;
    data: SanityToursIndex;
};

const EMPTY_INDEX: SanityToursIndex = {
    categories: [],
    tours: [],
};

function ToursPage(): JSX.Element {
    const { t, i18n } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [requestResult, setRequestResult] = useState<ToursRequestResult | null>(null);
    const [requestVersion, setRequestVersion] = useState(0);

    const language: SupportedLanguage = i18n.resolvedLanguage?.startsWith("en")
        ? "en"
        : "fr";
    const requestKey = `${language}:${requestVersion}`;

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, []);

    useEffect(() => {
        let isCurrentRequest = true;

        void getToursIndex(language)
            .then((result) => {
                if (!isCurrentRequest) return;

                setRequestResult({
                    requestKey,
                    status: "success",
                    data: result,
                });
            })
            .catch((error: unknown) => {
                console.error("Impossible de charger les visites depuis Sanity", error);

                if (!isCurrentRequest) return;

                setRequestResult({
                    requestKey,
                    status: "error",
                    data: EMPTY_INDEX,
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
    const data = isCurrentResult ? requestResult.data : EMPTY_INDEX;

    const selectedCategorySlug = searchParams.get("categorie") ?? "all";
    const categoryExists = data.categories.some(
        (category) => category.slug === selectedCategorySlug,
    );
    const activeCategory = categoryExists ? selectedCategorySlug : "all";
    const visibleTours = activeCategory === "all"
        ? data.tours
        : data.tours.filter((tour) => tour.category?.slug === activeCategory);

    const getCategoryCount = (categoryId: string): number =>
        data.tours.filter((tour) => tour.category?._id === categoryId).length;

    const selectCategory = (categorySlug: string): void => {
        const nextSearchParams = new URLSearchParams(searchParams);

        if (categorySlug === "all") {
            nextSearchParams.delete("categorie");
        } else {
            nextSearchParams.set("categorie", categorySlug);
        }

        setSearchParams(nextSearchParams);
    };

    return (
        <div className="tours-page">
            <header className="tours-page__hero">
                <div className="tours-page__hero-inner">
                    <p className="tours-page__eyebrow">{t("toursPage.eyebrow")}</p>
                    <h1>{t("toursPage.title")}</h1>
                    <p>{t("toursPage.description")}</p>
                </div>
            </header>

            <section
                className="tours-page__catalogue"
                aria-labelledby="tours-catalogue-title"
            >
                <div className="tours-page__catalogue-inner">
                    <div className="tours-page__catalogue-heading">
                        <h2 id="tours-catalogue-title">
                            {t("toursPage.catalogueTitle")}
                        </h2>

                        {status === "success" && (
                            <p aria-live="polite">
                                {t("toursPage.results", { count: visibleTours.length })}
                            </p>
                        )}
                    </div>

                    {status === "success" && data.categories.length > 0 && (
                        <div
                            className="tours-page__filters"
                            role="group"
                            aria-label={t("toursPage.filtersLabel")}
                        >
                            <button
                                className={activeCategory === "all" ? "is-active" : ""}
                                type="button"
                                aria-pressed={activeCategory === "all"}
                                onClick={() => selectCategory("all")}
                            >
                                {t("toursPage.allCategories")}
                                <span>{data.tours.length}</span>
                            </button>

                            {data.categories.map((category) => {
                                const count = getCategoryCount(category._id);
                                const isActive = activeCategory === category.slug;

                                return (
                                    <button
                                        className={isActive ? "is-active" : ""}
                                        type="button"
                                        aria-pressed={isActive}
                                        disabled={count === 0}
                                        onClick={() => selectCategory(category.slug)}
                                        key={category._id}
                                    >
                                        {category.name}
                                        <span>{count}</span>
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {status === "loading" && (
                        <div className="tours-page__status" aria-live="polite">
                            <span className="tours-page__loader" aria-hidden="true" />
                            <p>{t("toursPage.loading")}</p>
                        </div>
                    )}

                    {status === "error" && (
                        <div className="tours-page__status" role="alert">
                            <h2>{t("toursPage.errorTitle")}</h2>
                            <p>{t("toursPage.errorDescription")}</p>
                            <button
                                type="button"
                                onClick={() => setRequestVersion((version) => version + 1)}
                            >
                                {t("toursPage.retry")}
                            </button>
                        </div>
                    )}

                    {status === "success" && visibleTours.length > 0 && (
                        <div className="tours-page__grid">
                            {visibleTours.map((tour) => (
                                <TourCard tour={tour} key={tour._id} />
                            ))}
                        </div>
                    )}

                    {status === "success" && visibleTours.length === 0 && (
                        <div className="tours-page__status">
                            <h2>{t("toursPage.emptyTitle")}</h2>
                            <p>{t("toursPage.emptyDescription")}</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default ToursPage;
