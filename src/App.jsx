import './App.css'
import './normalize.css'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'

function App() {

  return (
    <div className="home-screen">
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  )
}

export default App
