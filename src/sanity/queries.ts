import { defineQuery } from "groq";

export const TOUR_CATEGORIES_QUERY = defineQuery(/* groq */ `
    *[
        _type == "category" && defined(slug.current)
    ] | order(order asc, _id asc) {
        _id,
        "slug": slug.current,
        "name": coalesce(
            name[language == $language][0].value,
            name[language == $fallbackLanguage][0].value,
            ""
        ),
        "description": coalesce(
            description[language == $language][0].value,
            description[language == $fallbackLanguage][0].value,
            ""
        ),
        order,
        image {
            asset->{
                _id,
                url
            },
            crop,
            hotspot,
            "alt": coalesce(
                alt[language == $language][0].value,
                alt[language == $fallbackLanguage][0].value,
                ""
            )
        }
    }
`);

export const TOURS_INDEX_QUERY = defineQuery(/* groq */ `
    {
        "categories": *[
            _type == "category" && defined(slug.current)
        ] | order(order asc, _id asc) {
            _id,
            "slug": slug.current,
            "name": coalesce(
                name[language == $language][0].value,
                name[language == $fallbackLanguage][0].value,
                ""
            ),
            order
        },
        "tours": *[
            _type == "tour" && defined(slug.current)
        ] | order(_createdAt desc) {
            _id,
            "slug": slug.current,
            "title": coalesce(
                title[language == $language][0].value,
                title[language == $fallbackLanguage][0].value,
                ""
            ),
            "summary": coalesce(
                summary[language == $language][0].value,
                summary[language == $fallbackLanguage][0].value,
                ""
            ),
            durationMinutes,
            price,
            "category": category->{
                _id,
                "slug": slug.current,
                "name": coalesce(
                    name[language == $language][0].value,
                    name[language == $fallbackLanguage][0].value,
                    ""
                )
            },
            image {
                asset->{
                    _id,
                    url
                },
                crop,
                hotspot,
                "alt": coalesce(
                    alt[language == $language][0].value,
                    alt[language == $fallbackLanguage][0].value,
                    ""
                )
            }
        }
    }
`);

export const TOUR_BY_SLUG_QUERY = defineQuery(/* groq */ `
    *[_type == "tour" && slug.current == $slug][0] {
        _id,
        "slug": slug.current,
        "title": coalesce(
            title[language == $language][0].value,
            title[language == $fallbackLanguage][0].value,
            ""
        ),
        "summary": coalesce(
            summary[language == $language][0].value,
            summary[language == $fallbackLanguage][0].value,
            ""
        ),
        "description": coalesce(
            description[language == $language][0].value,
            description[language == $fallbackLanguage][0].value,
            summary[language == $language][0].value,
            summary[language == $fallbackLanguage][0].value,
            ""
        ),
        "category": coalesce(
            category->name[language == $language][0].value,
            category->name[language == $fallbackLanguage][0].value,
            ""
        ),
        durationMinutes,
        price,
        image {
            asset->{
                _id,
                url,
                metadata {
                    lqip,
                    dimensions { width, height }
                }
            },
            crop,
            hotspot,
            "alt": coalesce(
                alt[language == $language][0].value,
                alt[language == $fallbackLanguage][0].value,
                ""
            )
        },
        gallery[] {
            _key,
            asset->{
                _id,
                url,
                metadata {
                    lqip,
                    dimensions { width, height }
                }
            },
            crop,
            hotspot,
            "alt": coalesce(
                alt[language == $language][0].value,
                alt[language == $fallbackLanguage][0].value,
                ""
            )
        },
        meetingPoint {
            address,
            "name": coalesce(
                name[language == $language][0].value,
                name[language == $fallbackLanguage][0].value,
                ""
            ),
            "instructions": coalesce(
                instructions[language == $language][0].value,
                instructions[language == $fallbackLanguage][0].value,
                ""
            )
        }
    }
`);
