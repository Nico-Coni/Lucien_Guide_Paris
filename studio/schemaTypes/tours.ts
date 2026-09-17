import { defineField, defineType, defineArrayMember } from "sanity";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";


type TranslatedText = {
    language: string;
    value?: string;
};

function getFrenchText(value: unknown): string {
    if (!Array.isArray(value)) return "";

    const translations = value as TranslatedText[];

    return (
        translations.find((item) => item.language === "fr")?.value?.trim() ?? ""
    );
}

export const tour = defineType({
    name: "tour",
    title: "Visites",
    type: "document",
    icon: DocumentTextIcon,

    fields: [
        defineField({
            name: "title",
            title: "Titre de la visite",
            type: "internationalizedArrayString",
            validation: (rule) =>
                rule.custom((value) =>
                    getFrenchText(value)
                        ? true
                        : "Renseigne le titre en français.",
                ),
        }),

        defineField({
            name: "summary",
            title: "Résumé",
            type: "internationalizedArrayText",
            description: "Un court texte pour les cartes et le carrousel.",
            validation: (rule) =>
                rule.custom((value) =>
                    getFrenchText(value)
                        ? true
                        : "Renseigne le résumé en français.",
                ),
        }),

        defineField({
            name: "description",
            title: "Description complète",
            type: "internationalizedArrayText",
            description: "Présente le parcours et ce que comprend la visite.",
        }),

        defineField({
            name: "slug",
            title: "Identifiant pour l’URL",
            type: "slug",
            description: "Clique sur Generate après avoir renseigné le titre.",
            options: {
                source: (document) => getFrenchText(document.title),
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),

        defineField({
            name: "category",
            title: "Catégorie",
            type: "reference",
            to: [{ type: "category" }],
            validation: (rule) => rule.required(),
        }),

        defineField({
            name: "image",
            title: "Image principale",
            type: "image",
            options: { hotspot: true },
            fields: [
                defineField({
                    name: "alt",
                    title: "Description de l’image",
                    type: "internationalizedArrayString",
                    description: "Décris la photo pour l’accessibilité.",
                    validation: (rule) =>
                        rule.custom((value) =>
                            getFrenchText(value)
                                ? true
                                : "Décris l’image en français.",
                        ),
                }),
            ],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "gallery",
            title: "Galerie photos",
            type: "array",
            description: "Ajoute les photos supplémentaires de cette visite.",
            options: {
                layout: "grid",
                sortable: true,
            },
            of: [
                defineArrayMember({
                    type: "image",
                    options: {
                        hotspot: true,
                    },
                    fields: [
                        defineField({
                            name: "alt",
                            title: "Description de l’image",
                            type: "internationalizedArrayString",
                            description: "Décris la photo en français et en anglais.",
                            validation: (rule) =>
                                rule.custom((value) =>
                                    getFrenchText(value)
                                        ? true
                                        : "Décris l’image en français.",
                                ),
                        }),
                    ],
                }),
            ],
        }),

        defineField({
            name: "durationMinutes",
            title: "Durée en minutes",
            type: "number",
            description: "Exemple : 120 pour une visite de deux heures.",
            validation: (rule) => rule.required().integer().min(1),
        }),

        defineField({
            name: "price",
            title: "Tarif en euros",
            type: "number",
            description:
                "Précise dans la description s’il est par personne ou par groupe. " +
                "Laisse vide pour une visite sur devis.",
            validation: (rule) => rule.min(0),
        }),
    ],

    preview: {
        select: {
            title: "title",
            categoryName: "category.name",
            media: "image",
        },
        prepare({ title, categoryName, media }) {
            return {
                title: getFrenchText(title) || "Visite sans titre",
                subtitle: getFrenchText(categoryName) || "Sans catégorie",
                media,
            };
        },
    },
});