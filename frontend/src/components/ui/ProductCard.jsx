import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Instagram } from 'lucide-react'
import { WA, IGID } from '../../config'
import s from './ProductCard.module.css'

export default function ProductCard({ product: p }) {
  const [imgError, setImgError] = useState(false)

  const disc = p.mrp ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : null
  const color = p.colors?.[0] ? ` (${p.colors[0]})` : ''
  const waMsg = encodeURIComponent(`Hi! I'd like to order "${p.name}"${color}.`)
  const showImg = p.images?.[0] && !imgError   // image hai aur load hua

  return (
    <motion.div className={s.card} whileHover={{ y: -5 }} transition={{ duration: .26 }}>
      {/* Visual */}
      <div className={s.visual} style={{ background: p.bg }}>
        {showImg
          ? <img
            src={p.images[0]}
            alt={p.name}
            className={s.img}
            loading="lazy"
            onError={() => setImgError(true)}   /* image toote to emoji par switch */
          />
          : <span className={s.emoji}>{p.emoji || '🌸'}</span>
        }

        <div className={s.badges}>
          {p.badge && <span className={`${s.badge} ${s.badgeDark}`}>{p.badge}</span>}
          {disc && <span className={`${s.badge} ${s.badgeRose}`}>-{disc}%</span>}
        </div>

        {!p.inStock && (
          <div className={s.soldOut}><span className={s.soldOutTag}>Out of Stock</span></div>
        )}
      </div>

      {/* Body */}
      <div className={s.body}>
        <div className={s.stars}>
          {'★★★★★'.split('').map((_, i) => (
            <span key={i} className={`${s.star} ${i < Math.floor(p.rating) ? s.starFilled : s.starEmpty}`}>★</span>
          ))}
          <span className={s.reviewCount}>({p.reviews})</span>
        </div>

        <div className={s.name}>{p.name}</div>
        <p className={s.desc}>{p.desc}</p>

        <div className={s.colors}>
          {p.colors?.length > 0 ? p.colors.slice(0, 3).join(' · ') : '\u00A0'}
        </div>

        <div className={s.priceRow}>
          <span className={s.price}>₹{Number(p.price).toLocaleString('en-IN')}</span>
          {p.mrp && <span className={s.mrp}>₹{Number(p.mrp).toLocaleString('en-IN')}</span>}
        </div>

        <div className={s.actions}>
          <a
            href={p.inStock ? `https://wa.me/${WA}?text=${waMsg}` : undefined}
            target="_blank" rel="noopener noreferrer"
            className={`${s.btnWa}${!p.inStock ? ' ' + s.disabled : ''}`}
          >
            <MessageCircle size={13} /> WhatsApp
          </a>
          <a
            href={p.inStock ? `https://instagram.com/${IGID}` : undefined}
            target="_blank" rel="noopener noreferrer"
            className={`${s.btnIg}${!p.inStock ? ' ' + s.disabled : ''}`}
          >
            <Instagram size={13} /> Instagram
          </a>
        </div>
      </div>
    </motion.div >
  )
}