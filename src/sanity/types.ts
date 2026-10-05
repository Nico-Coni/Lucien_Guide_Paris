export type SanityTourImage = {
    _key?: string;
    asset?: {
        _id: string;
        url: string;
        metadata?: {
            lqip?: string;
            dimensions?: {
                width: number;
                height: number;
            };
        };
    };
    crop?: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    };
    hotspot?: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    alt?: string;
};

export type SanityTour = {
    _id: string;
    slug: string;
    title: string;
    summary: string;
    description: string;
    category: string;
    durationMinutes: number | null;
    price: number | null;
    image: SanityTourImage | null;
    gallery: SanityTourImage[] | null;
    meetingPoint?: {
        name?: string;
        address?: string;
        instructions?: string;
    };
};

export type SanityTourCategory = {
    _id: string;
    slug: string;
    name: string;
    order?: number | null;
};

export type SanityTourCategoryCard = SanityTourCategory & {
    description: string;
    image: SanityTourImage | null;
};

export type SanityTourListItem = {
    _id: string;
    slug: string;
    title: string;
    summary: string;
    durationMinutes: number | null;
    price: number | null;
    category: SanityTourCategory | null;
    image: SanityTourImage | null;
};

export type SanityToursIndex = {
    categories: SanityTourCategory[];
    tours: SanityTourListItem[];
};
