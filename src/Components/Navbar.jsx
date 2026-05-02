import { useState } from 'react'

// Lista centralizada de enlaces principales para reutilizarlos en desktop y mobile.
const navLinks = [
  { label: 'Productos', href: '#productos' },
  { label: 'Contacto', href: '#contacto' },
]

// Icono SVG del carrito. Usa currentColor para heredar el color desde Tailwind.
function CartIcon({ className = 'size-5' }) {
  return (
    <svg
      // El icono es decorativo porque el enlace padre ya tiene aria-label.
      aria-hidden="true"
      // Permite cambiar el tamano del icono desde donde se usa el componente.
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      // currentColor hace que el stroke cambie con clases como text-white o text-slate-950.
      stroke="currentColor"
      strokeWidth="1.8"
    >
      {/* Dibuja la canasta principal del carrito. */}
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 4.75h2.1l1.8 10.4a2 2 0 0 0 1.96 1.66h6.98a2 2 0 0 0 1.95-1.54l1.05-4.46a2 2 0 0 0-1.95-2.46H7.1"
      />
      {/* Dibuja las ruedas del carrito. */}
      <path strokeLinecap="round" d="M9.25 20.1h.01M17 20.1h.01" />
    </svg>
  )
}

// Icono SVG de usuario. Tambien hereda color para integrarse con hover/focus.
function UserIcon({ className = 'size-5' }) {
  return (
    <svg
      // El texto accesible lo aporta el enlace padre con aria-label.
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      {/* Dibuja avatar y contorno de usuario en una sola ruta. */}
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 8.25a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.75 20.25a7.25 7.25 0 0 1 14.5 0"
      />
    </svg>
  )
}

// Icono hamburguesa del menu mobile. La clase is-open activa la animacion en App.css.
function MenuIcon({ open }) {
  return (
    <span className={`hamburger ${open ? 'is-open' : ''}`} aria-hidden="true">
      {/* Cada span representa una linea de la hamburguesa. */}
      <span />
      <span />
      <span />
    </span>
  )
}

function Navbar() {
  // Controla si el menu responsive esta abierto o cerrado.
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Cierra el menu mobile al navegar o al hacer click en el backdrop.
  const closeMenu = () => setIsMenuOpen(false)

  return (
    // Header fijo para que la navbar permanezca visible al hacer scroll.
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6 lg:px-8">
      {/* Barra principal con efecto glass, sombra y animacion nav-shell definida en CSS. */}
      <nav className="nav-shell mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/70 bg-white/80 px-4 py-3 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur-xl sm:px-6">
        {/* Bloque de marca: logo + nombre de la tienda. */}
        <a
          className="group flex items-center gap-3 text-slate-950"
          href="#inicio"
          aria-label="Ir al inicio de NovaMarket"
          onClick={closeMenu}
        >
          {/* Logo visual. La clase logo-mark aplica el brillo animado desde App.css. */}
          <span className="logo-mark grid size-11 place-items-center rounded-2xl bg-slate-950 text-sm font-black text-white shadow-lg shadow-slate-950/20">
            NM
          </span>
          {/* Texto de marca apilado para que funcione bien en pantallas pequenas. */}
          <span className="flex flex-col leading-none">
            <span className="text-lg font-black tracking-normal sm:text-xl">NovaMarket</span>
            <span className="mt-1 text-xs font-semibold uppercase tracking-normal text-emerald-600">
              ecommerce
            </span>
          </span>
        </a>

        {/* Navegacion desktop. Se oculta en mobile y aparece desde md. */}
        <div className="hidden items-center gap-2 md:flex">
          {/* Renderiza los enlaces desde navLinks para evitar duplicar contenido. */}
          {navLinks.map((link) => (
            <a
              // nav-link agrega la linea animada inferior definida en App.css.
              className="nav-link rounded-full px-4 py-2 text-sm font-bold text-slate-700 transition-colors duration-300 hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              href={link.href}
              key={link.label}
            >
              {link.label}
            </a>
          ))}

          {/* Acceso al carrito en desktop con contador flotante. */}
          <a
            className="icon-action w-[65px] flex items-center justify-center cart-action relative ml-2 size-11 rounded-full border border-slate-200 bg-white text-slate-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-950 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            href="#carrito"
            aria-label="Abrir carrito"
          >
            <CartIcon />
            {/* Badge de cantidad de productos en el carrito. */}
            <span className="absolute -right-1 -top-1 flex items-center justify-center size-5 rounded-full bg-amber-400 text-[0.65rem] font-black text-slate-950">
              0
            </span>
          </a>

          {/* Acceso a la cuenta del usuario en desktop. */}
          <a
            className="icon-action flex justify-center items-center size-11  rounded-full border border-slate-200 bg-white text-slate-900 transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            href="#cuenta"
            aria-label="Abrir mi cuenta"
          >
            <UserIcon />
          </a>
        </div>

        {/* Boton del menu mobile. aria-expanded comunica el estado a lectores de pantalla. */}
        <button
          className="grid size-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-950 shadow-sm transition-colors duration-300 hover:bg-slate-950 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 md:hidden"
          type="button"
          aria-expanded={isMenuOpen}
          // Enlaza el boton con el panel mobile que controla.
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? 'Cerrar menu' : 'Abrir menu'}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <MenuIcon open={isMenuOpen} />
        </button>
      </nav>

      {/* Capa invisible/oscura detras del menu mobile para cerrarlo al hacer click fuera. */}
      <div
        className={`mobile-backdrop md:hidden ${isMenuOpen ? 'is-visible' : ''}`}
        onClick={closeMenu}
      />

      {/* Panel de navegacion mobile. is-visible activa apertura, opacidad y desplazamiento en CSS. */}
      <div
        id="mobile-navigation"
        className={`mobile-menu mx-4 mt-3 overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 shadow-[0_24px_70px_rgba(15,23,42,0.18)] backdrop-blur-xl md:hidden ${
          isMenuOpen ? 'is-visible' : ''
        }`}
      >
        {/* Contenedor interno del menu para separar enlaces y acciones. */}
        <div className="grid gap-2 p-3">
          {/* Enlaces principales en mobile. Al hacer click se cierra el menu. */}
          {navLinks.map((link) => (
            <a
              className="mobile-link rounded-3xl px-5 py-4 text-base font-black text-slate-800 transition-colors duration-300 hover:bg-slate-950 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              href={link.href}
              key={link.label}
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}

          {/* Acciones principales del ecommerce en mobile: carrito y cuenta. */}
          <div className="grid grid-cols-2 gap-2">
            {/* Boton mobile del carrito. */}
            <a
              className="mobile-link mobile-cart-button flex min-h-16 items-center justify-center gap-2 rounded-3xl px-4 py-4 text-sm font-black text-white shadow-lg shadow-slate-950/15 transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              href="#carrito"
              onClick={closeMenu}
            >
              <CartIcon/>
              <span>Carrito</span>
            </a>
            {/* Boton mobile de mi cuenta. */}
            <a
              className="mobile-link mobile-account-button flex min-h-16 items-center justify-center gap-2 rounded-3xl px-4 py-4 text-sm font-black text-white shadow-lg shadow-emerald-950/15 transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950"
              href="#cuenta"
              onClick={closeMenu}
            >
              <UserIcon />
              Mi cuenta
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

// Exporta la navbar para poder importarla y renderizarla desde App.jsx.
export default Navbar
