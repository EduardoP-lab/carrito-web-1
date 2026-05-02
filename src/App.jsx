import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import './normalize.css'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import FeaturedProducts from './Components/FeaturedProducts'
import Carrito from './Components/Carrito'

function Home() {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
    </main>
  )
}

function App() {
  return (
    <div className="home-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
