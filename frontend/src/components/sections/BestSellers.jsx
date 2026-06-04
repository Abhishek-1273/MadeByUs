import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from '../ui/ProductCard'
import { useProducts } from '../../hooks/useProducts'
import s from './BestSellers.module.css'

const PAGE = 9

const tabs = [
  { id: 'all', label: 'All' },
  { id: 'pendants', label: 'Pendants' },
  { id: 'earrings', label: 'Earrings' },
  { id: 'bracelets', label: 'Bracelets' },
  { id: 'keychains', label: 'Keychains' },
  { id: 'couple-gifts', label: 'Couple Gifts' },
]

export default function BestSellers() {
  const [active, setActive] = useState('all')
  const [visible, setVisible] = useState(PAGE)
  const { products, loading, error } = useProducts()

  const filtered = active === 'all'
    ? products
    : products.filter(p => p.category === active)

  const list = filtered.slice(0, visible)   

  const changeTab = (id) => {
    setActive(id)
    setVisible(PAGE)   
  }

  return (
    <section id="shop" className={s.section}>
      <div className={s.inner}>
        <div className={s.header}>
          <div className={s.label}>Our Collection</div>
          <h2 className={s.title}>Bestselling <em>Favourites</em></h2>
          <span className={s.divider} />
          <p className={s.sub}>Loved by thousands across India. Every piece poured, cured and finished by hand.</p>
        </div>

        <div className={s.tabs}>
          {tabs.map(t => (
            <button key={t.id} className={`${s.tab}${active === t.id ? ' ' + s.active : ''}`}
              onClick={() => changeTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        {loading && (
          <p style={{ textAlign: 'center', padding: '40px 0', color: 'var(--muted)' }}>Loading products…</p>
        )}
        {error && !loading && (
          <p style={{ textAlign: 'center', padding: '40px 0', color: 'var(--rose)' }}>{error}</p>
        )}
        {!loading && !error && filtered.length === 0 && (
          <p style={{ textAlign: 'center', padding: '40px 0', color: 'var(--muted)' }}>No products in this category yet.</p>
        )}

        {!loading && !error && filtered.length > 0 && (
          <AnimatePresence mode="wait">
            <motion.div key={active} className={s.grid}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: .28 }}
            >
              {list.map((p, i) => (
                <motion.div key={p.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (i % PAGE) * .06 }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Show More — sirf tab dikhe jab aur products bache ho */}
        {!loading && !error && visible < filtered.length && (
          <div className={s.footer}>
            <button className={s.viewAll} onClick={() => setVisible(v => v + PAGE)}>
              Show More ({filtered.length - visible} more)
            </button>
          </div>
        )}

        <div className={s.footer}>
          <a href="https://instagram.com/madebyus.resin" target="_blank" rel="noopener noreferrer" className={s.viewAll}>
            View full collection on Instagram →
          </a>
        </div>
      </div>
    </section>
  )
}