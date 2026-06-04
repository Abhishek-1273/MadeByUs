import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, MessageCircle } from 'lucide-react'
import { WA } from '../../config'
import s from './FAQ.module.css'

// Static FAQs
const faqs = [
  {
    id: 1,
    q: "How do I place an order?",
    a: "Simply tap the WhatsApp or Instagram button on any product and send us a message. We'll confirm the details, share payment options and get your piece ready.",
  },
  {
    id: 2,
    q: "Do you make custom pieces?",
    a: "Yes! We love custom orders. Send us your idea, colours, names or keepsakes (like dried flowers) on WhatsApp and we'll craft something one-of-a-kind for you.",
  },
  {
    id: 3,
    q: "How long does it take to receive my order?",
    a: "Ready pieces are dispatched within 2-3 days. Custom orders take 7-10 days as each piece is poured, cured and finished by hand.",
  },
  {
    id: 4,
    q: "Do you ship across India?",
    a: "Absolutely. We ship pan-India with safe, protective packaging so your resin art arrives in perfect condition.",
  },
  {
    id: 5,
    q: "How should I care for my resin jewellery?",
    a: "Keep it away from direct sunlight and harsh chemicals. Wipe gently with a soft dry cloth. With a little care, your piece will stay beautiful for years.",
  },
]

function Item({ faq, open, toggle }) {
  return (
    <div className={`${s.item}${open ? ' ' + s.itemOpen : ''}`}>
      <button className={`${s.btn}${open ? ' ' + s.btnOpen : ''}`} onClick={toggle}>
        <span>{faq.q}</span>
        <span className={`${s.chevron}${open ? ' ' + s.chevronOpen : ''}`}>
          <ChevronDown size={14} />
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: .26, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className={s.body}>
              <div className={s.bodyDivider} />
              <p className={s.answer}>{faq.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [open, setOpen] = useState(null)
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <div className={s.header}>
          <div className={s.label}>Got Questions?</div>
          <h2 className={s.title}>Frequently Asked <em>Questions</em></h2>
          <span className={s.divider} />
        </div>
        <div className={s.list}>
          {faqs.map(f => (
            <Item key={f.id} faq={f} open={open === f.id} toggle={() => setOpen(open === f.id ? null : f.id)} />
          ))}
        </div>
        <div className={s.cta}>
          <div className={s.ctaTitle}>Still have questions?</div>
          <p className={s.ctaSub}>We're happy to help — reach out on WhatsApp and we'll reply within hours.</p>
          <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" className={s.ctaBtn}>
            <MessageCircle size={14} /> Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}