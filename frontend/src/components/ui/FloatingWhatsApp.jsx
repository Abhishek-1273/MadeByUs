import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'
import { WA } from '../../config'
import s from './FloatingWhatsApp.module.css'

export default function FloatingWhatsApp() {
  const [show, setShow] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 2500)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <div className={s.wrap}>
          <AnimatePresence>
            {open && (
              <motion.div className={s.popup}
                initial={{ opacity:0, scale:.88, y:10 }}
                animate={{ opacity:1, scale:1, y:0 }}
                exit={{ opacity:0, scale:.88, y:10 }}
                transition={{ duration:.2 }}
              >
                <div className={s.popupHead}>
                  <div className={s.popupAvatar}>🌸</div>
                  <div>
                    <div className={s.popupName}>Made By Us</div>
                    <div className={s.popupStatus}>Usually replies in 2 hrs</div>
                  </div>
                  <button className={s.closeBtn} onClick={() => setOpen(false)}><X size={15} /></button>
                </div>
                <div className={s.popupBody}>
                  <div className={s.bubble}>Hi there! 👋 Looking for something special? We'd love to help you find the perfect resin piece!</div>
                  <a href={`https://wa.me/${WA}?text=${encodeURIComponent("Hi Made By Us! 🌸")}`} target="_blank" rel="noopener noreferrer" className={s.chatBtn}>
                    <MessageCircle size={14} /> Start Chatting
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button className={s.fab}
            initial={{ scale:0, opacity:0 }}
            animate={{ scale:1, opacity:1 }}
            transition={{ type:'spring', stiffness:200, damping:16 }}
            onClick={() => setOpen(v => !v)}
          >
            <AnimatePresence mode="wait">
              {open
                ? <motion.span key="x"   initial={{ rotate:-90,opacity:0 }} animate={{ rotate:0,opacity:1 }} exit={{ rotate:90,opacity:0 }}><X size={21}/></motion.span>
                : <motion.span key="msg" initial={{ rotate:90,opacity:0  }} animate={{ rotate:0,opacity:1 }} exit={{ rotate:-90,opacity:0 }}><MessageCircle size={21} fill="white"/></motion.span>
              }
            </AnimatePresence>
            {!open && <span className={s.pulse} />}
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  )
}
