import { Link } from 'react-router-dom'
import { useCart } from '../Context/CartContext'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

function formatCurrency(value) {
  return currencyFormatter.format(value)
}

function CartIcon({ className = 'size-5' }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.75h2.1l1.8 10.4a2 2 0 0 0 1.96 1.66h6.98a2 2 0 0 0 1.95-1.54l1.05-4.46a2 2 0 0 0-1.95-2.46H7.1" />
      <path strokeLinecap="round" d="M9.25 20.1h.01M17 20.1h.01" />
    </svg>
  )
}

function TrashIcon({ className = 'size-5' }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.25h13.5M9.75 7.25v-1.5a1.5 1.5 0 0 1 1.5-1.5h1.5a1.5 1.5 0 0 1 1.5 1.5v1.5M8 10.25l.55 8a1.75 1.75 0 0 0 1.74 1.63h3.42a1.75 1.75 0 0 0 1.74-1.63l.55-8M10.75 11.75v5M13.25 11.75v5" />
    </svg>
  )
}

function LockIcon({ className = 'size-5' }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.25 10.25v-2.1a4.75 4.75 0 0 1 9.5 0v2.1M6.75 10.25h10.5a2 2 0 0 1 2 2v5.5a2 2 0 0 1-2 2H6.75a2 2 0 0 1-2-2v-5.5a2 2 0 0 1 2-2Z" />
    </svg>
  )
}

function TruckIcon({ className = 'size-5' }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.75 6.25h9.5v9.5h-9.5v-9.5ZM14.25 9.25h2.8l2.2 2.75v3.75h-5v-6.5ZM7.25 18.25h.01M16.75 18.25h.01" />
    </svg>
  )
}

function CartProductVisual({ accent }) {
  return (
    <div className={`cart-product-visual cart-product-visual-${accent}`} aria-hidden="true">
      <span />
    </div>
  )
}

function Carrito() {
  const { cartItems, decreaseItem, increaseItem, removeItem, totals } = useCart()

  return (
    <main className="cart-page px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <section className="relative mx-auto max-w-7xl">
        <div className="cart-page-glow" aria-hidden="true" />

        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-700">
              <CartIcon className="size-4" />
              Carrito de compras
            </span>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
              Revisa tus gadgets antes de finalizar.
            </h1>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-8 text-slate-600">
              Ajusta cantidades, elimina productos y confirma el total de tu compra en tiempo real.
            </p>
          </div>

          <Link
            className="cart-continue-button inline-flex min-h-12 items-center justify-center rounded-full px-5 text-sm font-black text-white"
            to="/#productos"
          >
            Seguir comprando
          </Link>
        </div>

        <div className="relative z-10 mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_25rem]">
          <div className="grid gap-4">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <article className="cart-item" key={item.id}>
                  <CartProductVisual accent={item.accent} />

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-black uppercase tracking-normal text-emerald-600">
                          {item.category}
                        </p>
                        <h2 className="mt-1 text-xl font-black text-slate-950">{item.name}</h2>
                        <p className="mt-2 text-sm font-semibold text-slate-500">{item.detail}</p>
                      </div>

                      <p className="text-xl font-black text-slate-950">{formatCurrency(item.price)}</p>
                    </div>

                    <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="cart-quantity-control" aria-label={`Cantidad de ${item.name}`}>
                        <button type="button" onClick={() => decreaseItem(item.id)} aria-label="Disminuir cantidad">
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button type="button" onClick={() => increaseItem(item.id)} aria-label="Aumentar cantidad">
                          +
                        </button>
                      </div>

                      <div className="flex items-center justify-between gap-4 sm:justify-end">
                        <p className="text-sm font-black text-slate-500">
                          Suma: <span className="text-slate-950">{formatCurrency(item.price * item.quantity)}</span>
                        </p>
                        <button
                          className="cart-remove-button"
                          type="button"
                          aria-label={`Eliminar ${item.name}`}
                          onClick={() => removeItem(item.id)}
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="cart-empty-state">
                <CartIcon className="size-8" />
                <h2 className="mt-4 text-2xl font-black text-slate-950">Tu carrito esta vacio</h2>
                <p className="mt-2 text-sm font-semibold text-slate-500">
                  Vuelve al catalogo y agrega tus gadgets favoritos.
                </p>
              </div>
            )}
          </div>

          <aside className="cart-summary">
            <div className="cart-summary-header">
              <div>
                <p className="text-sm font-black uppercase tracking-normal text-emerald-600">Resumen</p>
                <h2 className="mt-1 text-2xl font-black text-slate-950">Total de compra</h2>
              </div>
              <span className="grid size-12 place-items-center rounded-2xl bg-slate-950 text-white">
                <LockIcon />
              </span>
            </div>

            <div className="mt-6 grid gap-4">
              <div className="cart-summary-row">
                <span>Productos ({totals.itemCount})</span>
                <strong>{formatCurrency(totals.subtotal)}</strong>
              </div>
              <div className="cart-summary-row">
                <span>Descuento</span>
                <strong className="text-emerald-600">- {formatCurrency(totals.discount)}</strong>
              </div>
              <div className="cart-summary-row">
                <span>Envio</span>
                <strong>{totals.shipping === 0 ? 'Gratis' : formatCurrency(totals.shipping)}</strong>
              </div>
              <div className="cart-summary-row">
                <span>IVA estimado</span>
                <strong>{formatCurrency(totals.tax)}</strong>
              </div>
            </div>

            <div className="cart-total-box mt-6">
              <span>Total</span>
              <strong>{formatCurrency(totals.total)}</strong>
            </div>

            <button className="cart-checkout-button !mt-5" type="button" disabled={cartItems.length === 0}>
              Finalizar compra
            </button>

            <div className="mt-5 grid gap-3">
              <div className="cart-benefit">
                <TruckIcon />
                <span>Envio gratis desde $300</span>
              </div>
              <div className="cart-benefit">
                <LockIcon />
                <span>Pago seguro con cifrado</span>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}

export default Carrito
