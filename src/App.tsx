import React from 'react'
import Header from './components/Header/Header.tsx'
import Caroussel, { type CarouselTour, } from './components/Caroussel/Caroussel.tsx'
import Hero from './components/Hero/Hero.tsx'
import Footer from './components/Footer/Footer.tsx'
import './App.scss'

import PassagesImage from "./assets/latin.jpg";
import MontmartreImage from "./assets/montmartre.jpg";
import LouvreImage from "./assets/marais.jpg";

const tours = [
  {
    id: "passages",
    image: PassagesImage,
    href: "#passages",
  },
  {
    id: "montmartre",
    image: MontmartreImage,
    href: "#montmartre",
  },
  {
    id: "louvre",
    image: LouvreImage,
    href: "#louvre",
  },
] satisfies readonly CarouselTour[];

function App() {


  return (
    <>
      <Header />
      <Caroussel tours={tours} />
      <Hero />
      <Footer />

    </>
  )
}

export default App
