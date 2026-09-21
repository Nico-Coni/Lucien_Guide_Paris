export type TestimonialId = "first" | "second" | "third";

export type TestimonialRating = 1 | 2 | 3 | 4 | 5;

export type Testimonial = {
    id: TestimonialId;
    rating: TestimonialRating;
};

export const testimonials = [
    {
        id: "first",
        rating: 5,
    },
    {
        id: "second",
        rating: 4,
    },
    {
        id: "third",
        rating: 5,
    },
] satisfies readonly Testimonial[];