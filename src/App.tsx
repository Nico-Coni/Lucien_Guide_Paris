import Header from './components/Header/Header.tsx'
import Carousel, { type CarouselTour, } from './components/Carousel/Carousel.tsx'
import CategoryTours from './components/CategoryTours/CategoryTours.tsx'
import Footer from './components/Footer/Footer.tsx'
import AboutGuide from './components/AboutGuide/AboutGuide.tsx'
import './App.scss'

import LatinImage from "./assets/latin.jpg";
import MontmartreImage from "./assets/montmartre.jpg";
import MaraisImage from "./assets/marais.jpg";
import LucienPortrait from "./assets/lucien_portrait.jpg";

const tours = [
  {
    id: "latin",
    image: LatinImage,
    href: "#latin",
  },
  {
    id: "montmartre",
    image: MontmartreImage,
    href: "#montmartre",
  },
  {
    id: "marais",
    image: MaraisImage,
    href: "#marais",
  },
] satisfies readonly CarouselTour[];

function App() {


  return (
    <>
      <Header />
      <main>
        <Carousel tours={tours} />
        <CategoryTours />
        <AboutGuide portrait={LucienPortrait} />
      </main>
      <Footer
        email="info@lucienaparis.com"
        phone="+33 1 23 45 67 89"
      />

    </>
  )
}

export default App
