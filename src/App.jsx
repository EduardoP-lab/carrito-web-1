import './App.css'
import './normalize.css'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import FeaturedProducts from './Components/FeaturedProducts'

function App() {

  return (
    <div className="home-screen">
      <Navbar />
      <main>
        <Hero />
        <FeaturedProducts />
      </main>
    </div>
  )
}

export default App
