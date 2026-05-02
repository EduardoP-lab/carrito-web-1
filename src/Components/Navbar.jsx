import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../Context/CartContext'

// Lista centralizada de enlaces principales para reutilizarlos en desktop y mobile.
const navLinks = [
  { label: 'Productos', href: '/#productos' },
  { label: 'Contacto', href: '/#contacto' },
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

// Icono para la opcion "Mi cuenta" del dropdown desktop.
function ProfileIcon({ className = 'size-5' }) {
  return (
    <svg
      // Es decorativo porque el texto de la opcion comunica la accion.
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      {/* Representa una credencial de usuario. */}
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 4.75h10.5a2 2 0 0 1 2 2v10.5a2 2 0 0 1-2 2H6.75a2 2 0 0 1-2-2V6.75a2 2 0 0 1 2-2Z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.25 10a2.75 2.75 0 1 0 5.5 0 2.75 2.75 0 0 0-5.5 0ZM8.25 16.6a4.4 4.4 0 0 1 7.5 0" />
    </svg>
  )
}

// Icono para la opcion "Configuracion" del dropdown.
function SettingsIcon({ className = 'size-5' }) {
  return (
    <svg
      // El color se hereda del contenedor para responder al hover.
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      {/* Dibuja un engrane simple para ajustes. */}
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.4 4.9 11.05 3h1.9l.65 1.9 1.55.64 1.8-.88 1.34 1.34-.88 1.8.64 1.55 1.95.65v1.9l-1.95.65-.64 1.55.88 1.8-1.34 1.34-1.8-.88-1.55.64-.65 1.9h-1.9l-.65-1.9-1.55-.64-1.8.88-1.34-1.34.88-1.8-.64-1.55L4 11.9V10l1.95-.65.64-1.55-.88-1.8 1.34-1.34 1.8.88 1.55-.64Z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.25 10.95a2.75 2.75 0 1 0 5.5 0 2.75 2.75 0 0 0-5.5 0Z" />
    </svg>
  )
}

// Icono de sol para indicar el modo claro del tema.
function SunIcon({ className = 'size-5' }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      {/* Circulo central y rayos del sol. */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.75a4.25 4.25 0 1 0 0 8.5 4.25 4.25 0 0 0 0-8.5ZM12 3.75v1.5M12 18.75v1.5M20.25 12h-1.5M5.25 12h-1.5M17.83 6.17l-1.06 1.06M7.23 16.77l-1.06 1.06M17.83 17.83l-1.06-1.06M7.23 7.23 6.17 6.17" />
    </svg>
  )
}

// Icono de luna para indicar el modo oscuro del tema.
function MoonIcon({ className = 'size-5' }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      {/* Media luna construida con una sola ruta. */}
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.25 15.95A7.5 7.5 0 0 1 8.05 4.75a7.5 7.5 0 1 0 11.2 11.2Z"
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
  const { cartItemCount } = useCart()
  // Controla si el menu responsive esta abierto o cerrado.
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  // Controla si el menu desplegable del usuario en desktop esta abierto.
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)
  // Guarda el tema elegido desde el dropdown. false = claro, true = oscuro.
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  // Referencia al contenedor del dropdown para detectar clicks fuera.
  const accountMenuRef = useRef(null)

  // Cierra el menu mobile al navegar o al hacer click en el backdrop.
  const closeMenu = () => setIsMenuOpen(false)
  // Cierra el dropdown de usuario cuando se elige una opcion normal.
  const closeAccountMenu = () => setIsAccountMenuOpen(false)

  // Aplica una clase global al html para que el CSS pueda cambiar colores por tema.
  useEffect(() => {
    document.documentElement.classList.toggle('theme-dark', isDarkTheme)
  }, [isDarkTheme])

  // Cierra el dropdown al hacer click fuera o al presionar Escape.
  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!accountMenuRef.current?.contains(event.target)) {
        setIsAccountMenuOpen(false)
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsAccountMenuOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    // Header sticky para que la navbar acompane el scroll sin salirse del flujo del hero.
    <header className="sticky top-0 z-50 px-4 py-4 sm:px-6 lg:px-8 relative">
      {/* Barra principal con efecto glass, sombra y animacion nav-shell definida en CSS. */}
      <nav className="nav-shell mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/70 bg-white/80 px-4 py-3 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur-xl sm:px-6">
        {/* Bloque de marca: logo + nombre de la tienda. */}
        <Link
          className="group flex items-center gap-3 text-slate-950"
          to="/"
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
        </Link>

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
          <Link
            className="icon-action w-[65px] flex items-center justify-center cart-action relative ml-2 size-11 rounded-full border border-slate-200 bg-white text-slate-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-950 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            to="/carrito"
            aria-label="Abrir carrito"
          >
            <CartIcon />
            {/* Badge de cantidad de productos en el carrito. */}
            <span className="absolute -right-1 -top-1 flex items-center justify-center size-5 rounded-full bg-amber-400 text-[0.65rem] font-black text-slate-950">
              {cartItemCount}
            </span>
          </Link>

          {/* Contenedor relativo para posicionar el dropdown debajo del icono de usuario. */}
          <div className="relative" ref={accountMenuRef}>
            {/* Boton de usuario desktop. Abre y cierra el menu desplegable animado. */}
            <button
              className="icon-action flex justify-center items-center size-11 rounded-full border border-slate-200 bg-white text-slate-900 transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              type="button"
              aria-haspopup="menu"
              aria-expanded={isAccountMenuOpen}
              aria-controls="account-dropdown"
              aria-label={isAccountMenuOpen ? 'Cerrar menu de usuario' : 'Abrir menu de usuario'}
              onClick={() => setIsAccountMenuOpen((open) => !open)}
            >
              <UserIcon />
            </button>

            {/* Menu desktop de usuario. La clase is-visible dispara la animacion en App.css. */}
            <div
              id="account-dropdown"
              className={`account-dropdown absolute right-0 top-[calc(100%+0.75rem)] w-72 rounded-[1.5rem] border border-white/70 bg-white/95 p-2 shadow-[0_24px_70px_rgba(15,23,42,0.18)] backdrop-blur-xl ${
                isAccountMenuOpen ? 'is-visible' : ''
              }`}
              role="menu"
            >
              {/* Pequeno encabezado para dar contexto visual al menu. */}
              <div className="account-dropdown-header rounded-[1.15rem] px-4 py-3">
                <p className="text-xs font-black uppercase tracking-normal text-emerald-600">Usuario</p>
                <p className="mt-1 text-sm font-black text-slate-950">Gestiona tu experiencia</p>
              </div>

              {/* Opcion para entrar a la pagina de cuenta. */}
              <a
                className="account-menu-item"
                href="#cuenta"
                role="menuitem"
                onClick={closeAccountMenu}
              >
                <span className="account-menu-icon bg-emerald-100 text-emerald-700">
                  <ProfileIcon />
                </span>
                <span>
                  <span className="block text-sm font-black">Mi cuenta</span>
                  <span className="block text-xs font-semibold text-slate-500">Perfil y pedidos</span>
                </span>
              </a>

              {/* Opcion para ir a configuracion de usuario. */}
              <a
                className="account-menu-item"
                href="#configuracion"
                role="menuitem"
                onClick={closeAccountMenu}
              >
                <span className="account-menu-icon bg-amber-100 text-amber-700">
                  <SettingsIcon />
                </span>
                <span>
                  <span className="block text-sm font-black">Configuracion</span>
                  <span className="block text-xs font-semibold text-slate-500">Preferencias y seguridad</span>
                </span>
              </a>

              {/* Opcion de tema. Mantiene abierto el menu para que se vea el cambio de estado. */}
              <button
                className="account-menu-item w-full"
                type="button"
                role="menuitem"
                onClick={() => setIsDarkTheme((dark) => !dark)}
              >
                <span className="account-menu-icon bg-slate-900 text-white">
                  {isDarkTheme ? <MoonIcon /> : <SunIcon />}
                </span>
                <span className="min-w-0 flex-1 text-left">
                  <span className="block text-sm font-black">Tema</span>
                  <span className="block text-xs font-semibold text-slate-500">
                    {isDarkTheme ? 'Oscuro' : 'Claro'}
                  </span>
                </span>
                {/* Switch visual que refleja si el tema oscuro esta activo. */}
                <span className={`theme-switch ${isDarkTheme ? 'is-dark' : ''}`} aria-hidden="true">
                  <span />
                </span>
              </button>
            </div>
          </div>
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
        className={`mobile-menu absolute left-0 right-0 top-full z-50 mx-4 overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 shadow-[0_24px_70px_rgba(15,23,42,0.18)] backdrop-blur-xl md:hidden ${
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
            <Link
              className="mobile-link mobile-cart-button flex min-h-16 items-center justify-center gap-2 rounded-3xl px-4 py-4 text-sm font-black text-white shadow-lg shadow-slate-950/15 transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              to="/carrito"
              onClick={closeMenu}
            >
              <CartIcon/>
              <span>Carrito ({cartItemCount})</span>
            </Link>
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
