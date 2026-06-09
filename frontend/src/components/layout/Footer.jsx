import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Instagram, MessageCircle, Mail, MapPin, Heart, ArrowUp, X } from 'lucide-react'
import { IGID, WA } from '../../config'
import s from './Footer.module.css'

const shopLinks = ['Pendants','Earrings','Bracelets','Keychains','Couple Gifts','Custom Orders']

// Har info link ka content (modal me dikhega). Text apne hisaab se edit karo.
const infoContent = {
  'About Us': {
    title: 'About Us',
    body: [
      "Made By Us is a small, handmade resin art studio. Every pendant, earring and keepsake is poured, cured and finished by hand with love.",
      "We believe in slow, intentional craft — no two pieces are exactly alike. From pressed flowers to custom memory frames, we turn moments into wearable art.",
    ],
  },
  'How to Order': {
    title: 'How to Order',
    body: [
      "1. Browse our collection and pick the piece you love.",
      "2. Tap the WhatsApp or Instagram button on the product.",
      "3. Send us the message — we'll confirm details, colours and price.",
      "4. Complete payment via UPI / bank transfer.",
      "5. We craft and ship your order to your doorstep!",
    ],
  },
  'Shipping Policy': {
    title: 'Shipping Policy',
    body: [
      "We ship pan-India with safe, protective packaging.",
      "Ready pieces are dispatched within 2-3 working days. Custom orders take 7-10 days as each is made by hand.",
      "You'll receive tracking details on WhatsApp once your order ships.",
    ],
  },
  'Returns & Refunds': {
    title: 'Returns & Refunds',
    body: [
      "As each piece is handmade to order, we do not accept returns or exchanges.",
      "If your order arrives damaged, please send us a photo on WhatsApp within 48 hours of delivery and we'll arrange a replacement.",
      "Custom and personalised orders are non-refundable.",
    ],
  },
  'Care Instructions': {
    title: 'Care Instructions',
    body: [
      "Keep your resin pieces away from direct sunlight and heat to prevent yellowing.",
      "Avoid contact with perfume, water and harsh chemicals.",
      "Wipe gently with a soft, dry cloth. Store in a pouch or box when not in use.",
      "With a little care, your piece will stay beautiful for years.",
    ],
  },
  'FAQ': {
    title: 'Frequently Asked Questions',
    body: [
      "Q: Do you make custom pieces? — Yes! Message us your idea on WhatsApp.",
      "Q: How long does delivery take? — Ready pieces 2-3 days, custom 7-10 days.",
      "Q: Do you ship across India? — Yes, pan-India shipping is available.",
      "For more, scroll up to our FAQ section or chat with us on WhatsApp.",
    ],
  },
}

const infoLinks = Object.keys(infoContent)

export default function Footer() {
  const [active, setActive] = useState(null)   // konsa modal khula hai
  const content = active ? infoContent[active] : null

  return (
    <footer className={s.footer}>
      <div className={s.topBar} />
      <div className={s.inner}>
        <div className={s.grid}>
          {/* Brand */}
          <div>
            <div className={s.brand}>
              <div className={s.brandIcon}>🌸</div>
              <div>
                <div className={s.brandName}>Made By Us</div>
                <div className={s.brandSub}>Resin Art & Gifts</div>
              </div>
            </div>
            <p className={s.tagline}>Every piece tells a story. Handcrafted with love, poured with intention, made for you.</p>
            <div className={s.socials}>
              {[
                { href:`https://instagram.com/${IGID}`, Icon:Instagram },
                { href:`https://wa.me/${WA}`,    Icon:MessageCircle },
                { href:'mailto:hello@madebyus.in',      Icon:Mail },
              ].map(({ href, Icon }, i) => (
                <motion.a key={i} href={href} target="_blank" rel="noopener noreferrer"
                  className={s.socialBtn} whileHover={{ y:-2 }}>
                  <Icon size={13} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <div className={s.colTitle}>Shop</div>
            <ul className={s.colList}>
              {shopLinks.map(l => <li key={l}><a href="#shop" className={s.colLink}>{l}</a></li>)}
            </ul>
          </div>

          {/* Info */}
          <div>
            <div className={s.colTitle}>Info</div>
            <ul className={s.colList}>
              {infoLinks.map(l => (
                <li key={l}>
                  <button type="button" className={s.colLink} onClick={() => setActive(l)}>
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className={s.colTitle}>Contact</div>
            <div className={s.contacts}>
              {[
                { Icon:MessageCircle, label:'WhatsApp',  val:'+91 7696278017',   href:`https://wa.me/${WA}`},
                { Icon:Instagram,     label:'Instagram', val:`@${IGID}`,           href:`https://instagram.com/${IGID}` },
                { Icon:Mail,          label:'Email',     val:'madebyus.kt@gmail.com', href:'mailto:madebyus.kt@gmail.com' },
                { Icon:MapPin,        label:'Ships to',  val:'All across India',  href:null },
              ].map(({ Icon, label, val, href }, i) => {
                const inner = (
                  <>
                    <Icon size={12} color="rgba(255,255,255,.28)" style={{ flexShrink:0, marginTop:2 }} />
                    <div className={s.contactText}>
                      <div className={s.contactLabel}>{label}</div>
                      <div className={s.contactVal}>{val}</div>
                    </div>
                  </>
                )
                return href
                  ? <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={s.contactRow}>{inner}</a>
                  : <div key={i} className={s.contactRow}>{inner}</div>
              })}
            </div>
          </div>
        </div>

        <div className={s.bottom}>
          <span className={s.copy}>© 2025 Made By Us | Made with <Heart size={9} style={{ display:'inline', verticalAlign:'middle' }} color="var(--rose)" fill="var(--rose)" /> in India.</span>
          <span className={s.tagline2}>Handcrafted · Unique · Made with Love</span>
          <motion.button className={s.topBtn} whileHover={{ y:-2 }}
            onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}>
            <ArrowUp size={14} />
          </motion.button>
        </div>
      </div>

      {/* ---------- Info Modal ---------- */}
      <AnimatePresence>
        {content && (
          <motion.div className={s.modalOverlay}
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={() => setActive(null)}
          >
            <motion.div className={s.modalBox}
              initial={{ opacity:0, y:24, scale:.98 }}
              animate={{ opacity:1, y:0, scale:1 }}
              exit={{ opacity:0, y:24, scale:.98 }}
              transition={{ duration:.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={s.modalClose} onClick={() => setActive(null)} aria-label="Close">
                <X size={18} />
              </button>
              <h3 className={s.modalTitle}>{content.title}</h3>
              <div className={s.modalBody}>
                {content.body.map((para, i) => <p key={i}>{para}</p>)}
              </div>
              <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" className={s.modalCta}>
                <MessageCircle size={14} /> Chat with us
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  )
}