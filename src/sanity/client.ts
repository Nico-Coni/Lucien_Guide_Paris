import { createClient } from "@sanity/client";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID ?? "ewkrrmqp";
const dataset = import.meta.env.VITE_SANITY_DATASET ?? "production";

export const sanityClient = createClient({
    projectId,
    dataset,
    apiVersion: "2026-10-05",
    useCdn: true,
});
