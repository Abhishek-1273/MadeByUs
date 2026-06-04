import { motion } from 'framer-motion'
import { MessageCircle, ArrowRight } from 'lucide-react'
import { IGID, WA } from '../../config'
import s from './Hero.module.css'

const stats = [
  { v: '500+', l: 'Happy Customers' },
  { v: '50+',   l: 'Unique Designs'  },
  { v: '4.8 ★',  l: 'Avg. Rating'     },
  { v: '100%',   l: 'Handcrafted'     },
]

export default function Hero() {
  const go = href => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className={s.section}>
      <div className={s.glow} />
      <motion.div className={s.inner}
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .75, ease: 'easeOut' }}
      >
        <motion.div className={s.eyebrow}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .1 }}
        >
          Handcrafted with love · Made in India
        </motion.div>

        <motion.h1 className={s.heading}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15, duration: .7 }}
        >
          Art You Can <em>Wear</em><br />& Treasure
        </motion.h1>

        <motion.span className={s.divider}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: .3, duration: .45 }}
        />

        <motion.p className={s.sub}
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .3, duration: .65 }}
        >
          Each resin piece is poured by hand — filled with pressed flowers,
          gold flakes and a little magic. Jewellery & gifts that feel as special
          as the person receiving them.
        </motion.p>

        <motion.div className={s.actions}
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .42 }}
        >
          <button className={s.btnPrimary} onClick={() => go('#shop')}>
            Shop the Collection <ArrowRight size={16} />
          </button>
          <a href={`https://wa.me/${WA}?text=Hi!%20I%20want%20a%20custom%20order.`} target="_blank" rel="noopener noreferrer" className={s.btnOutline}>
            <MessageCircle size={16} /> Custom Order
          </a>
        </motion.div>

        <motion.div className={s.stats}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .55 }}
        >
          {stats.map((st, i) => (
            <div key={i} className={s.stat}>
              <div className={s.statVal}>{st.v}</div>
              <div className={s.statLabel}>{st.l}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
