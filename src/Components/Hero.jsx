// Datos de pequenas metricas que se muestran debajo del texto principal.
const heroStats = [
  { value: '24h', label: 'Envio express' },
  { value: '+120', label: 'gadgets curados' },
  { value: '12m', label: 'garantia incluida' },
]

// Icono de flecha para el boton principal del hero.
function ArrowIcon({ className = 'size-5' }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h13.5M13.5 6.5 19 12l-5.5 5.5" />
    </svg>
  )
}

// Icono de chispa para destacar el boton secundario.
function SparkIcon({ className = 'size-5' }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75 10.25 9 5 10.75 10.25 12.5 12 17.75 13.75 12.5 19 10.75 13.75 9 12 3.75ZM18 16l-.7 2.1L15.2 18.8l2.1.7.7 2.1.7-2.1 2.1-.7-2.1-.7L18 16Z" />
    </svg>
  )
}

function Hero() {
  return (
    <section
      id="inicio"
      className="hero-section relative isolate overflow-hidden px-4 pb-16 pt-8 sm:px-6 lg:min-h-[calc(100vh-6.5rem)] lg:px-8 lg:pb-20 lg:pt-8"
    >
      {/* Capas visuales del fondo: grid, luces y lineas animadas. */}
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-aurora hero-aurora-one" aria-hidden="true" />
      <div className="hero-aurora hero-aurora-two" aria-hidden="true" />
      <div className="hero-scanline" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:min-h-[calc(100vh-11rem)] lg:grid-cols-[minmax(0,1fr)_minmax(430px,0.92fr)]">
        {/* Columna de texto principal del hero. */}
        <div className="hero-copy max-w-3xl">
          <span className="hero-badge inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-4 py-2 text-sm font-black text-emerald-700 shadow-sm backdrop-blur-xl">
            <span className="size-2 rounded-full bg-emerald-500 shadow-[0_0_18px_rgba(16,185,129,0.9)]" />
            Gadgets premium para todos los dias
          </span>

          <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[0.95] text-slate-950 sm:text-6xl lg:text-7xl">
            Tecnologia que se siente del futuro.
          </h1>

          <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-slate-600 sm:text-lg">
            Descubre smartphones, audio, wearables y accesorios inteligentes con una experiencia de compra rapida, visual y pensada para amantes de la tecnologia.
          </p>

          {/* Acciones principales para llevar al usuario al catalogo o promociones. */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              className="hero-primary-button inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 text-sm font-black text-white shadow-xl shadow-emerald-500/25 transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              href="#productos"
            >
              Explorar productos
              <ArrowIcon />
            </a>
            <a
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/80 px-6 text-sm font-black text-slate-950 shadow-lg shadow-slate-950/5 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              href="#ofertas"
            >
              <SparkIcon />
              Ver ofertas
            </a>
          </div>

          {/* Metricas rapidas del ecommerce. */}
          <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
            {heroStats.map((stat) => (
              <div
                className="hero-stat rounded-3xl border border-white/70 bg-white/70 p-4 shadow-lg shadow-slate-950/5 backdrop-blur-xl"
                key={stat.label}
              >
                <p className="text-2xl font-black text-slate-950">{stat.value}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-normal text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Columna visual: composicion de gadgets y tarjetas flotantes. */}
        <div className="hero-visual relative mx-auto flex min-h-[34rem] w-full max-w-[34rem] items-center justify-center lg:mr-0">
          <div className="device-orbit" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

          <div className="phone-device" aria-label="Smartphone destacado">
            <div className="phone-screen">
              <div className="phone-camera" />
              <div className="phone-widget phone-widget-large" />
              <div className="phone-widget phone-widget-small" />
              <div className="phone-dock">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>

          <div className="watch-device" aria-label="Smartwatch destacado">
            <div className="watch-strap watch-strap-top" />
            <div className="watch-face">
              <span>98%</span>
            </div>
            <div className="watch-strap watch-strap-bottom" />
          </div>

          <div className="earbuds-case" aria-label="Audifonos inalambricos destacados">
            <div className="earbud earbud-left" />
            <div className="earbud earbud-right" />
          </div>

          <div className="floating-card floating-card-top">
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">Nuevo</span>
            <p className="mt-2 text-sm font-black text-slate-950">Smart audio Pro</p>
            <p className="text-xs font-bold text-slate-500">Cancelacion activa</p>
          </div>

          <div className="floating-card floating-card-bottom">
            <p className="text-xs font-black uppercase tracking-normal text-amber-600">Oferta flash</p>
            <p className="mt-1 text-2xl font-black text-slate-950">-35%</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
