import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, MessageCircle } from 'lucide-react'
import { IGID, WA } from '../../config'
import s from './Navbar.module.css'

const links = [
  { label: 'Shop',          href: '#shop' },
  { label: 'Categories',    href: '#categories' },
  { label: 'Couple Gifts',  href: '#couple-gifts' },
  { label: 'Custom Orders', href: '#custom-orders' },
  { label: 'About',         href: '#about' },
  { label: 'Contact',       href: '#contact' },
]

export default function Navbar() {
  const [open,     setOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const go = href => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        className={`${s.header}${scrolled ? ' ' + s.scrolled : ''}`}
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: .5, ease: 'easeOut' }}
      >
        <div className={s.inner}>
          <a href="#" className={s.logo}>
            <div className={s.logoIcon}>🌸</div>
            <div>
              <div className={s.logoName}>Made By Us</div>
              <div className={s.logoSub}>Resin Art & Gifts</div>
            </div>
          </a>

          <nav className={s.nav}>
            {links.map(l => (
              <button key={l.label} className={s.navLink} onClick={() => go(l.href)}>
                {l.label}
              </button>
            ))}
          </nav>

          <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" className={s.orderBtn}>
            <MessageCircle size={14} /> Order Now
          </a>

          <button className={s.burger} onClick={() => setOpen(v => !v)}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className={s.drawer}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: .28, ease: 'easeInOut' }}
          >
            <nav className={s.drawerNav}>
              {links.map((l, i) => (
                <motion.button
                  key={l.label} className={s.drawerLink}
                  onClick={() => go(l.href)}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * .055 }}
                >
                  {l.label}
                </motion.button>
              ))}
            </nav>
            <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" className={s.drawerBtn}>
              <MessageCircle size={16} /> Order on WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
