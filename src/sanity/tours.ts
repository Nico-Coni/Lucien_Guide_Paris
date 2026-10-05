import type { SupportedLanguage } from "../i18n";
import { sanityClient } from "./client";
import {
    TOUR_BY_SLUG_QUERY,
    TOUR_CATEGORIES_QUERY,
    TOURS_INDEX_QUERY,
} from "./queries";
import type {
    SanityTour,
    SanityTourCategoryCard,
    SanityToursIndex,
} from "./types";

export async function getTourCategories(
    language: SupportedLanguage,
): Promise<SanityTourCategoryCard[]> {
    return sanityClient.fetch<SanityTourCategoryCard[]>(TOUR_CATEGORIES_QUERY, {
        language,
        fallbackLanguage: "fr",
    });
}

export async function getToursIndex(
    language: SupportedLanguage,
): Promise<SanityToursIndex> {
    return sanityClient.fetch<SanityToursIndex>(TOURS_INDEX_QUERY, {
        language,
        fallbackLanguage: "fr",
    });
}

export async function getTourBySlug(
    slug: string,
    language: SupportedLanguage,
): Promise<SanityTour | null> {
    return sanityClient.fetch<SanityTour | null>(TOUR_BY_SLUG_QUERY, {
        slug,
        language,
        fallbackLanguage: "fr",
    });
}
