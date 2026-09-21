import Header from './components/Header/Header.tsx'
import TourCarousel from './components/TourCarousel/TourCarousel.tsx'
import CategoryTours from './components/CategoryTours/CategoryTours.tsx'
import Footer from './components/Footer/Footer.tsx'
import AboutGuide from './components/AboutGuide/AboutGuide.tsx'
import './App.scss'
import { tours } from './data/tours.ts'
import LucienPortrait from "./assets/lucien_portrait.jpg";
import TestimonialsCarousel from "./components/TestimonialsCarousel/TestimonialsCarousel.tsx";
import { testimonials } from "./data/testimonials.ts";

function App() {


  return (
    <>
      <Header />
      <main>
        <TourCarousel tours={tours} />
        <CategoryTours />
        <AboutGuide portrait={LucienPortrait} />
        <TestimonialsCarousel testimonials={testimonials} />
      </main>
      <Footer
        email="info@lucienaparis.com"
        phone="+33 1 23 45 67 89"
      />

    </>
  )
}

export default App
