import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Gallery from './components/Gallery'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { lazy, Suspense } from 'react'

const ServiceDetail = lazy(() => import('./pages/ServiceDetail'))


function ScrollToHash() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [location.hash])

  return null
}

function Home() {
  return (
    <>
      <main style={{ animation: 'fadeIn 0.3s ease' }}>
        <Hero />
        <Services />
        <About />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services/:serviceId" element={
          <Suspense fallback={<div style={{ padding: '6rem 2rem', textAlign: 'center' }}>Loading...</div>}>
            <ServiceDetail />
          </Suspense>
        } />
      </Routes>
    </BrowserRouter>
  )
}
