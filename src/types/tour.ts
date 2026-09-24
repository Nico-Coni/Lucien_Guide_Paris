export type TourId = "latin" | "montmartre" | "marais";

export type TourMeetingPoint = {
    address: string;
};

export type CarouselTour = {
    id: TourId;
    image: string;
    href: string;
    meetingPoint: TourMeetingPoint;
    gallery: readonly string[];
};