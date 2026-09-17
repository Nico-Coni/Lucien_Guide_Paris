import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { internationalizedArray } from "sanity-plugin-internationalized-array";

export default defineConfig({
  name: 'default',
  title: 'Lucien Guide a Paris',

  projectId: 'ewkrrmqp',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), internationalizedArray({
    languages: [
      { id: "fr", title: "Français" },
      { id: "en", title: "English" },
    ],
    defaultLanguages: ["fr", "en"],
    fieldTypes: ["string", "text"],
    languageDisplay: "titleOnly",
  }),
  ],

  schema: {
    types: schemaTypes,
  },
})
