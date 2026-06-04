import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { WA } from '../../config'
import { useProducts } from '../../hooks/useProducts'
import s from './CoupleGifts.module.css'

export default function CoupleGifts() {
  // sirf "couple-gifts" category ke products
  const { products: gifts, loading, error } = useProducts('couple-gifts')

  return (
    <section id="couple-gifts" className={s.section}>
      <div className={s.inner}>
        <div className={s.header}>
          <div className={s.label}>Made for Two</div>
          <h2 className={s.title}>Gifts That Say <em>"I Love You"</em></h2>
          <span className={s.divider} />
          <p className={s.sub}>Matching resin sets for couples, anniversaries and every romantic milestone.</p>
        </div>

        {loading && (
          <p style={{ textAlign: 'center', padding: '40px 0', color: 'var(--muted)' }}>Loading…</p>
        )}
        {error && !loading && (
          <p style={{ textAlign: 'center', padding: '40px 0', color: 'var(--rose)' }}>{error}</p>
        )}
        {!loading && !error && gifts.length === 0 && (
          <p style={{ textAlign: 'center', padding: '40px 0', color: 'var(--muted)' }}>
            No couple gifts added yet.
          </p>
        )}

        {!loading && !error && gifts.length > 0 && (
          <div className={s.grid}>
            {gifts.map((g, i) => (
              <motion.div key={g.id} className={s.card}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * .12 }}
              >
                <div className={s.visual} style={{ background: g.bg }}>
                  {g.images?.[0]
                    ? <img src={g.images[0]} alt={g.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      loading="lazy" />
                    : <span className={s.emoji}>{g.emoji}</span>
                  }
                  {g.badge && <span className={s.badge}>{g.badge}</span>}
                </div>

                <div className={s.body}>
                  <div className={s.name}>{g.name}</div>
                  <p className={s.desc}>{g.desc}</p>

                  {g.colors?.length > 0 && (
                    <>
                      <div className={s.includesLabel}>Colours</div>
                      <ul className={s.includesList}>
                        {g.colors.map((c, j) => (
                          <li key={j} className={s.includesItem}>
                            <span className={s.dot} />{c}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  <div className={s.rowBtn}>
                    <div className={s.priceRow}>
                      <span className={s.price}>₹{Number(g.price).toLocaleString('en-IN')}</span>
                      <span className={s.stars}>★★★★★</span>
                    </div>
                    <a
                      href={g.inStock
                        ? `https://wa.me/${WA}?text=${encodeURIComponent(`Hi! I'd like the "${g.name}" gift set.`)}`
                        : undefined}
                      target="_blank" rel="noopener noreferrer" className={s.btnWa}
                    >
                      <MessageCircle size={14} /> Order on WhatsApp
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div className={s.banner}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className={s.bannerTitle}>Can't find what you're looking for?</div>
          <p className={s.bannerSub}>We create fully custom couple sets with your names, dates and initials.</p>
          <a
            href={`https://wa.me/${WA}?text=${encodeURIComponent("Hi! I'd love a custom couple gift.")}`}
            target="_blank" rel="noopener noreferrer" className={s.bannerBtn}
          >
            <MessageCircle size={16} /> Create a Custom Gift
          </a>
        </motion.div>
      </div>
    </section>
  )
}