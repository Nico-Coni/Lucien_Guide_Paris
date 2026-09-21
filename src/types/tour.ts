export type TourId = "latin" | "montmartre" | "marais";

export type CarouselTour = {
    id: TourId;
    image: string;
    href: string;
};