import { defineField, defineType } from "sanity";
import { TagIcon } from "@sanity/icons/Tag";

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

export const category = defineType({
    name: "category",
    title: "Catégories de visites",
    type: "document",
    icon: TagIcon,

    fields: [
        defineField({
            name: "name",
            title: "Nom de la catégorie",
            type: "internationalizedArrayString",
            validation: (rule) =>
                rule.custom((value) =>
                    getFrenchText(value)
                        ? true
                        : "Renseigne au moins le nom en français.",
                ),
        }),

        defineField({
            name: "description",
            title: "Description",
            type: "internationalizedArrayText",
            description: "Un court texte de présentation pour la carte du site.",
        }),

        defineField({
            name: "slug",
            title: "Identifiant pour l’URL",
            type: "slug",
            description: "Clique sur Generate après avoir renseigné le nom.",
            options: {
                source: (document) => getFrenchText(document.name),
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),

        defineField({
            name: "image",
            title: "Image de présentation",
            type: "image",
            options: { hotspot: true },
            fields: [
                defineField({
                    name: "alt",
                    title: "Description de l’image",
                    type: "internationalizedArrayString",
                    description: "Pour l’accessibilité, en français et en anglais.",
                }),
            ],
            validation: (rule) => rule.required(),
        }),

        defineField({
            name: "order",
            title: "Ordre d’affichage",
            type: "number",
            description: "1 pour la première catégorie, 2 pour la suivante…",
            validation: (rule) => rule.required().integer().min(1),
        }),
    ],

    preview: {
        select: {
            name: "name",
            media: "image",
        },
        prepare({ name, media }) {
            return {
                title: getFrenchText(name) || "Catégorie sans nom",
                media,
            };
        },
    },
});