import type { CarouselTour } from "../types/tour";

import MaraisImage from "../assets/marais.jpg";
import MontmartreImage from "../assets/montmartre.jpg";
import LatinImage from "../assets/latin.jpg";

export const tours = [
    {
        id: "marais",
        image: MaraisImage,
        href: "#marais",
        gallery: [],
        meetingPoint: {
            address: "Place des Vosges, 75004 Paris",
        },
    },
    {
        id: "montmartre",
        image: MontmartreImage,
        href: "#montmartre",
        gallery: [],
        meetingPoint: {
            address: "Place des Abbesses, 75018 Paris",
        },
    },
    {
        id: "latin",
        image: LatinImage,
        href: "#latin",
        gallery: [],
        meetingPoint: {
            address: "Place Saint-Michel, 75006 Paris",
        },
    },
] satisfies readonly CarouselTour[];
