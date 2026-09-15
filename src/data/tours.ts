import type { CarouselTour } from "../components/Carousel/Carousel.tsx";

import MaraisImage from "../assets/marais.jpg";
import MontmartreImage from "../assets/montmartre.jpg";
import LatinImage from "../assets/latin.jpg";

export const tours = [
    {
        id: "marais",
        image: MaraisImage,
        href: "#marais",
    },
    {
        id: "montmartre",
        image: MontmartreImage,
        href: "#montmartre",
    },
    {
        id: "latin",
        image: LatinImage,
        href: "#latin",
    },
] satisfies readonly CarouselTour[];
