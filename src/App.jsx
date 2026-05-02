import './App.css'
import './normalize.css'
import Navbar from './Components/Navbar'

function App() {

  return (
    <>
      <Navbar />
      <main id="inicio" className="min-h-screen px-4 pt-32 sm:px-6 lg:px-8">
        <section className="mx-auto flex max-w-7xl flex-col gap-6 py-16">
          <span className="w-fit rounded-full bg-emerald-100 px-4 py-2 text-sm font-black text-emerald-700">
            Nueva temporada
          </span>
          <h1 className="max-w-3xl text-5xl font-black leading-tight text-slate-950 sm:text-6xl">
            Compra rapido, bonito y sin vueltas.
          </h1>
          <p className="max-w-2xl text-lg font-medium leading-8 text-slate-600">
            Una experiencia ecommerce moderna preparada para catalogos, carrito y cuentas de usuario.
          </p>
        </section>
      </main>
    </>
  )
}

export default App
