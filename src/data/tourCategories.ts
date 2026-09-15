import MuseumImage from "../assets/museums.jpg";
import MonumentsImage from "../assets/monuments.jpg";
import CustomTourImage from "../assets/custom-tour.jpg";

export type TourCategoryId = "museums" | "monuments" | "custom";

export type TourCategory = {
    id: TourCategoryId;
    image: string;
    href: string;
};

export const tourCategories = [
    {
        id: "museums",
        image: MuseumImage,
        href: "#museums",
    },
    {
        id: "monuments",
        image: MonumentsImage,
        href: "#monuments",
    },
    {
        id: "custom",
        image: CustomTourImage,
        href: "#custom",
    },
] satisfies readonly TourCategory[];