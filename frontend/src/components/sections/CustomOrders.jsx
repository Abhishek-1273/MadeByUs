import { motion } from 'framer-motion'
import { MessageCircle, Instagram, Clock } from 'lucide-react'
import { WA, IGID } from '../../config'
import s from './CustomOrders.module.css'

const steps = [
  { emoji: <img src='/icons/idea.png' alt='idea' width="25" />, n: '01', title: 'Share Your Idea', desc: 'DM on WhatsApp or Instagram with your concept, colours and references.' },
  { emoji: <img src='/icons/design.png' alt='design' width="25" />, n: '02', title: 'We Design & Quote', desc: 'Design plan and pricing shared within 24 hours. No surprises.' },
  { emoji: <img src='/icons/craft.png' alt='craft' width="25" />, n: '03', title: 'We Craft It', desc: 'Handpoured and cured with care. Takes 7–10 business days.' },
  { emoji: <img src='/icons/delivery.png' alt='delivery' width="25" />, n: '04', title: 'Shipped to You', desc: 'Packed lovingly and dispatched with tracking.' },
]

const chips = ['Names & Initials', 'Special Dates', 'Custom Colours', 'Pressed Flowers', 'Photo Inclusions', 'Glitter & Foils', 'Any Shape', 'Gift Boxes']

export default function CustomOrders() {
  return (
    <section id="custom-orders" className={s.section}>
      <div className={s.inner}>
        <div className={s.header}>
          <div className={s.label}>Your Vision · Our Craft</div>
          <h2 className={s.title}>Custom Orders <em>Welcome</em></h2>
          <span className={s.divider} />
          <p className={s.sub}>Have something unique in mind? We love bringing personal visions to life.</p>
        </div>

        <div className={s.body}>
          {/* Steps */}
          <div>
            <div className={s.stepsHeading}>How it works</div>
            <div className={s.steps}>
              {steps.map((st, i) => (
                <motion.div key={i} className={s.step}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * .1 }}
                >
                  <div className={s.stepIcon}>{st.emoji}</div>
                  <div>
                    <div className={s.stepNum}>Step {st.n}</div>
                    <div className={s.stepTitle}>{st.title}</div>
                    <p className={s.stepDesc}>{st.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className={s.note}>
              <Clock size={15} color="var(--gold)" style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <div className={s.noteTitle}>7–10 business days turnaround</div>
                <div className={s.noteSub}>Custom orders from ₹399. Price depends on design and materials.</div>
              </div>
            </div>
          </div>

          {/* Card */}
          <motion.div className={s.card}
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .6 }}
          >
            <div className={s.cardTitle}>Anything is Possible</div>
            <p className={s.cardDesc}>Pendants, earrings, keychains, bookmarks, magnets — if it can be cast in resin, we'll make it yours.</p>
            <div className={s.chips}>
              {chips.map((c, i) => (
                <motion.span key={i} className={s.chip}
                  initial={{ opacity: 0, scale: .85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * .05 }}
                >{c}</motion.span>
              ))}
            </div>
            <div className={s.actions}>
              <a href={`https://wa.me/${WA}?text=${encodeURIComponent("Hi! I want a custom resin order.")}`} target="_blank" rel="noopener noreferrer" className={s.btnWa}>
                <MessageCircle size={15} /> Start on WhatsApp
              </a>
              <a href={`https://instagram.com/${IGID}`} target="_blank" rel="noopener noreferrer" className={s.btnIg}>
                <Instagram size={15} /> DM on Instagram
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
