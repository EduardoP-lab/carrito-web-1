import { useState } from 'react'
import { A11y, EffectCoverflow, Keyboard, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Lista de productos destacados que alimenta el carrusel de SwiperJS.
const featuredProducts = [
  {
    name: 'AeroPods Max',
    category: 'Audio',
    price: '$129.00',
    tag: 'Nuevo',
    accent: 'cyan',
    detail: 'ANC + modo ambiente',
  },
  {
    name: 'Nova Watch S9',
    category: 'Wearable',
    price: '$189.00',
    tag: 'Top ventas',
    accent: 'emerald',
    detail: 'Bateria 7 dias',
  },
  {
    name: 'PixelDock 3 en 1',
    category: 'Carga',
    price: '$79.00',
    tag: 'MagSafe',
    accent: 'amber',
    detail: 'Carga rapida 45W',
  },
  {
    name: 'Pulse Speaker Mini',
    category: 'Bocinas',
    price: '$99.00',
    tag: 'Bluetooth',
    accent: 'violet',
    detail: 'Sonido 360 grados',
  },
  {
    name: 'KeyPro Wireless',
    category: 'Setup',
    price: '$149.00',
    tag: 'RGB',
    accent: 'rose',
    detail: 'Switches silenciosos',
  },
  {
    name: 'VisionCam 4K',
    category: 'Streaming',
    price: '$119.00',
    tag: '4K',
    accent: 'sky',
    detail: 'Auto focus inteligente',
  },
  {
    name: 'Pocket Drone Air',
    category: 'Drones',
    price: '$349.00',
    tag: 'Pro',
    accent: 'lime',
    detail: 'Video HDR estable',
  },
  {
    name: 'GripPad Ultra',
    category: 'Gaming',
    price: '$89.00',
    tag: 'Low latency',
    accent: 'orange',
    detail: 'Respuesta 8ms',
  },
  {
    name: 'SmartTag Duo',
    category: 'Accesorios',
    price: '$39.00',
    tag: 'Pack x2',
    accent: 'teal',
    detail: 'Ubicacion precisa',
  },
  {
    name: 'HoloLamp Desk',
    category: 'Smart home',
    price: '$159.00',
    tag: 'Ambiente',
    accent: 'indigo',
    detail: 'Escenas dinamicas',
  },
]

// Icono de flecha reutilizado por los botones laterales.
function SliderArrowIcon({ direction = 'next' }) {
  return (
    <svg
      aria-hidden="true"
      className={`size-5 ${direction === 'previous' ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13.5 6.5 19 12l-5.5 5.5" />
    </svg>
  )
}

// Visual abstracto del gadget. Cambia de color segun el accent del producto.
function ProductVisual({ accent }) {
  return (
    <div className={`product-visual product-visual-${accent}`} aria-hidden="true">
      <div className="product-device-glow" />
      <div className="product-chip">
        <span />
        <span />
        <span />
      </div>
      <div className="product-orbit-ring" />
    </div>
  )
}

function FeaturedProducts() {
  // Swiper usa realIndex para reportar el producto activo aunque el loop duplique slides internamente.
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <section id="productos" className="featured-products-section relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      <div className="featured-products-glow" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-700">
              Productos destacados
            </span>
            <h2 className="mt-5 max-w-2xl text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
              Gadgets elegidos para actualizar tu setup.
            </h2>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-8 text-slate-600">
              Desliza con el dedo en mobile o usa los controles laterales para explorar los productos mas buscados.
            </p>
          </div>

          <div className="flex items-center md:justify-end">
            <span className="min-w-16 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-center text-sm font-black text-slate-500 shadow-sm backdrop-blur-xl">
              {String(currentIndex + 1).padStart(2, '0')} / {featuredProducts.length}
            </span>
          </div>
        </div>

        <div className="product-slider-wrap mt-12">
          <button
            className="slider-control slider-control-side slider-control-previous featured-swiper-prev"
            type="button"
            aria-label="Ver producto anterior"
          >
            <SliderArrowIcon direction="previous" />
          </button>

          <Swiper
            className="featured-swiper"
            modules={[A11y, EffectCoverflow, Keyboard, Navigation, Pagination]}
            effect="coverflow"
            loop
            centeredSlides
            grabCursor
            keyboard={{ enabled: true }}
            navigation={{
              prevEl: '.featured-swiper-prev',
              nextEl: '.featured-swiper-next',
            }}
            pagination={{
              el: '.featured-swiper-pagination',
              clickable: true,
            }}
            slidesPerView="auto"
            speed={650}
            spaceBetween={18}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 150,
              modifier: 1.15,
              scale: 0.86,
              slideShadows: false,
            }}
            breakpoints={{
              640: { spaceBetween: 22 },
              1024: { spaceBetween: 30 },
            }}
            onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
          >
            {featuredProducts.map((product) => (
              <SwiperSlide key={product.name}>
                <article className="product-card">
                  <div className="product-card-inner">
                    <div className="flex items-center justify-between gap-4">
                      <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-black text-white">
                        {product.tag}
                      </span>
                      <span className="text-sm font-black text-emerald-600">{product.category}</span>
                    </div>

                    <ProductVisual accent={product.accent} />

                    <div>
                      <h3 className="text-2xl font-black text-slate-950">{product.name}</h3>
                      <p className="mt-2 text-sm font-bold text-slate-500">{product.detail}</p>
                    </div>

                    <div className="mt-6 flex items-center justify-between gap-4">
                      <p className="text-3xl font-black text-slate-950">{product.price}</p>
                      <button className="product-buy-button" type="button">
                        Agregar +
                      </button>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            className="slider-control slider-control-side slider-control-next featured-swiper-next"
            type="button"
            aria-label="Ver producto siguiente"
          >
            <SliderArrowIcon />
          </button>
        </div>

        <div className="featured-swiper-pagination mt-6 flex justify-center gap-2" />
      </div>
    </section>
  )
}

export default FeaturedProducts
