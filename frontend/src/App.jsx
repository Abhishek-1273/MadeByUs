import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import Navbar           from './components/layout/Navbar'
import Hero             from './components/sections/Hero'
import Categories       from './components/sections/Categories'
import BestSellers      from './components/sections/BestSellers'
import CoupleGifts      from './components/sections/CoupleGifts'
import Process          from './components/sections/Process'
import CustomOrders     from './components/sections/CustomOrders'
import InstagramGallery from './components/sections/InstagramGallery'
import Testimonials     from './components/sections/Testimonials'
import About            from './components/sections/About'
import FAQ              from './components/sections/FAQ'
import Contact          from './components/sections/Contact'
import Footer           from './components/layout/Footer'
import FloatingWhatsApp from './components/ui/FloatingWhatsApp'

import './index.css'

function Loader() {
  return (
    <motion.div
      initial={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:.45 }}
      style={{
        position:'fixed', inset:0, zIndex:200,
        background:'var(--bg)',
        display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center', gap:16,
      }}
    >
      <motion.div
        animate={{ scale:[1,1.1,1], rotate:[0,8,-8,0] }}
        transition={{ duration:1.4, repeat:Infinity, ease:'easeInOut' }}
        style={{ fontSize:48 }}
      >🌸</motion.div>
      <div style={{ textAlign:'center' }}>
        <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:'1.35rem', fontWeight:600, color:'var(--ink)' }}>
          Made By Us
        </div>
        <div style={{ fontFamily:'Poppins,sans-serif', fontSize:'.72rem', color:'var(--muted)', marginTop:3 }}>
          Handcrafted Resin Art & Gifts
        </div>
      </div>
      <div style={{ width:100, height:2, background:'var(--line)', borderRadius:99, overflow:'hidden' }}>
        <motion.div
          style={{ height:'100%', background:'var(--rose)', borderRadius:99 }}
          initial={{ width:'0%' }}
          animate={{ width:'100%' }}
          transition={{ duration:1.25, ease:'easeInOut' }}
        />
      </div>
    </motion.div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>
      {!loading && (
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:.35 }}>
          <Navbar />
          <main>
            <Hero />
            <Categories />
            <BestSellers />
            <CoupleGifts />
            <Process />
            <CustomOrders />
            <InstagramGallery />
            <Testimonials />
            <About />
            <FAQ />
            <Contact />
          </main>
          <Footer />
          <FloatingWhatsApp />
        </motion.div>
      )}
    </>
  )
}
