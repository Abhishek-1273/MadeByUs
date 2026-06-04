import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import s from './Testimonials.module.css'

// Static reviews (DB me daalne ki zaroorat nahi)
const testimonials = [
  {
    id: 1,
    name: "Ananya Sharma",
    city: "Mumbai",
    product: "Pressed Rose Pendant",
    text: "Absolutely in love with my pendant! The detail is stunning and it arrived beautifully packaged. Will definitely order again.",
    avatar: "A",
    color: "#C4707A",
  },
  {
    id: 2,
    name: "Rahul Verma",
    city: "Delhi",
    product: "Anniversary Love Box",
    text: "Got this for my wife on our anniversary. She was over the moon! The craftsmanship is incredible and so personal.",
    avatar: "R",
    color: "#5A8FA0",
  },
  {
    id: 3,
    name: "Sneha Patel",
    city: "Ahmedabad",
    product: "Floral Drop Earrings",
    text: "These earrings are so lightweight and pretty. I get compliments every time I wear them. Such unique handmade art!",
    avatar: "S",
    color: "#B8965A",
  },
  {
    id: 4,
    name: "Karan Mehta",
    city: "Bangalore",
    product: "Custom Memory Frame",
    text: "I sent them my dried wedding flowers and they preserved them perfectly. A memory I'll treasure forever. Thank you!",
    avatar: "K",
    color: "#7B68C8",
  },
]

export default function Testimonials() {
  const [idx, setIdx] = useState(0)
  const prev = () => setIdx(n => (n - 1 + testimonials.length) % testimonials.length)
  const next = () => setIdx(n => (n + 1) % testimonials.length)
  const t = testimonials[idx]

  return (
    <section className={s.section}>
      <div className={s.inner}>
        <div className={s.header}>
          <div className={s.label}>Customer Love</div>
          <h2 className={s.title}>What They <em>Say</em></h2>
          <span className={s.divider} />
        </div>

        <div className={s.wrap}>
          <AnimatePresence mode="wait">
            <motion.div key={t.id} className={s.card}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: .32 }}
            >
              <div className={s.quoteGlyph}>"</div>
              <div className={s.stars}>{'★★★★★'.split('').map((_, i) => <span key={i} className={s.star}>★</span>)}</div>
              <p className={s.quote}>{t.text}</p>
              <div className={s.author}>
                <div className={s.avatar} style={{ background: t.color }}>{t.avatar}</div>
                <div>
                  <div className={s.authorName}>{t.name}</div>
                  <div className={s.authorSub}>{t.city} · {t.product}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button className={`${s.arrowBtn} ${s.arrowLeft}`} onClick={prev}><ChevronLeft size={16} /></button>
          <button className={`${s.arrowBtn} ${s.arrowRight}`} onClick={next}><ChevronRight size={16} /></button>
        </div>

        <div className={s.dots}>
          {testimonials.map((_, i) => (
            <button key={i} className={`${s.dot} ${i === idx ? s.dotActive : s.dotInactive}`} onClick={() => setIdx(i)} />
          ))}
        </div>

        <div className={s.avatarRow}>
          {testimonials.map((t2, i) => (
            <button key={t2.id} className={`${s.avatarPill}${i === idx ? ' ' + s.pillActive : ''}`} onClick={() => setIdx(i)}>
              <div className={s.pillAvatar} style={{ background: t2.color }}>{t2.avatar}</div>
              <span className={s.pillName}>{t2.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}