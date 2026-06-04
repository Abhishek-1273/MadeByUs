import { motion } from 'framer-motion'
import { Instagram, Heart, ExternalLink } from 'lucide-react'
import { IGID } from '../../config'
import s from './InstagramGallery.module.css'

// Static gallery tiles (DB ki zaroorat nahi)
const igPosts = [
  { id: 1, emoji: "❋", likes: "2.4k", caption: "New rose pendants just dropped",  bg: "#F5ECED" },
  { id: 2, emoji: "✦",  likes: "1.8k", caption: "Behind the scenes pour",          bg: "#E8F2F5" },
  { id: 3, emoji: "♡",  likes: "3.1k", caption: "Couple sets for the season",       bg: "#F5F2E8" },
  { id: 4, emoji: "◈",  likes: "1.2k", caption: "Galaxy keychains restocked",       bg: "#EEEAF5" },
  { id: 5, emoji: "○",  likes: "2.0k", caption: "Sunset bangle in the light",       bg: "#F5F4F0" },
  { id: 6, emoji: "❋",  likes: "2.7k", caption: "Pressed flowers, preserved",       bg: "#F5ECED" },
]

export default function InstagramGallery() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <div className={s.header}>
          <div className={s.eyebrow}><Instagram size={13} /> Follow Our Journey</div>
          <h2 className={s.title}>@{IGID}</h2>
          <p className={s.sub}>Daily resin drops, behind-the-scenes and new arrivals.</p>
        </div>

        <div className={s.grid}>
          {igPosts.map((p, i) => (
            <motion.a key={p.id} href={`https://instagram.com/${IGID}`}
              target="_blank" rel="noopener noreferrer"
              className={s.tile}
              style={{ background: p.bg }}
              initial={{ opacity:0, scale:.9 }}
              whileInView={{ opacity:1, scale:1 }}
              viewport={{ once:true }}
              transition={{ delay: i * .07 }}
            >
              <span className={s.tileEmoji}>{p.emoji}</span>
              <div className={s.overlay}>
                <Heart size={15} color="#fff" fill="#fff" />
                <span className={s.overlayLikes}>{p.likes}</span>
                <span className={s.overlayCaption}>{p.caption}</span>
              </div>
            </motion.a>
          ))}
        </div>

        <div className={s.footer}>
          <a href={`https://instagram.com/${IGID}`} target="_blank" rel="noopener noreferrer" className={s.followBtn}>
            <Instagram size={16} /> Follow @{IGID} <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </section>
  )
}