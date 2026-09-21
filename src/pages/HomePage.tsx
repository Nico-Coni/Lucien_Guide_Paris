import TourCarousel from "../components/TourCarousel/TourCarousel";
import CategoryTours from "../components/CategoryTours/CategoryTours";
import AboutGuide from "../components/AboutGuide/AboutGuide";
import { tours } from "../data/tours";
import LucienPortrait from "../assets/lucien_portrait.jpg";
import TestimonialsCarousel from "../components/TestimonialsCarousel/TestimonialsCarousel";
import { testimonials } from "../data/testimonials";

function HomePage() {
    return (
        <>
            <TourCarousel tours={tours} />
            <CategoryTours />
            <AboutGuide portrait={LucienPortrait} />
            <TestimonialsCarousel testimonials={testimonials} />
        </>
    );
}

export default HomePage;