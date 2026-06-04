import { motion } from 'framer-motion'
import { useProducts } from '../../hooks/useProducts'
import s from './Categories.module.css'

// Category meta (emoji/desc) — count ab real data se nikalega
const CATS = [
  { id: "pendants", name: "Pendants", emoji: "❋", desc: "Wearable art in resin" },
  { id: "earrings", name: "Earrings", emoji: "✦", desc: "Lightweight handpoured" },
  { id: "bracelets", name: "Bracelets", emoji: "○", desc: "Delicate wrist pieces" },
  { id: "keychains", name: "Keychains", emoji: "◈", desc: "Carry a little art" },
  { id: "couple-gifts", name: "Couple Gifts", emoji: "♡", desc: "Made for two" },
  { id: "custom-orders", name: "Custom Orders", emoji: "✎", desc: "Your vision, our craft" },
]

export default function Categories() {
  const { products } = useProducts()
  const go = () => document.querySelector('#shop')?.scrollIntoView({ behavior: 'smooth' })

  // Har category mein kitne products hain
  const countFor = (id) => products.filter(p => p.category === id).length

  return (
    <section id="categories" className={s.section}>
      <div className={s.inner}>
        <div className={s.header}>
          <div className={s.label}>Browse by Category</div>
          <h2 className={s.title}>Find Your Perfect <em>Piece</em></h2>
          <span className={s.divider} />
        </div>
        <div className={s.grid}>
          {CATS.map((c, i) => {
            const count = countFor(c.id)
            return (
              <motion.button key={c.id} className={s.tile} onClick={go}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * .07 }}
              >
                <span className={s.tileEmoji}>{c.emoji}</span>
                <span className={s.tileName}>{c.name}</span>
                <span className={s.tileCount}>
                  {c.id === 'custom-orders' ? 'Enquire' : `${count} items`}
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </section>
  )
}