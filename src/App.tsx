import React from 'react'
import Header from './components/Header/Header.tsx'
import Carousel, { type CarouselTour, } from './components/Carousel/Carousel.tsx'
import CategoryTours from './components/CategoryTours/CategoryTours.tsx'
import Footer from './components/Footer/Footer.tsx'
import './App.scss'

import LatinImage from "./assets/latin.jpg";
import MontmartreImage from "./assets/montmartre.jpg";
import MaraisImage from "./assets/marais.jpg";

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
      </main>
      <Footer />

    </>
  )
}

export default App
