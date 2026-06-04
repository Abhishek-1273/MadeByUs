import { motion } from 'framer-motion'
import { Heart, Award, Leaf, Users } from 'lucide-react'
import s from './About.module.css'

const values = [
  { Icon:Heart, color:'#C4707A', bg:'#F7EDEF', label:'Made with Love',  desc:'Every piece poured and finished by hand with genuine care.' },
  { Icon:Leaf,  color:'#6A9A68', bg:'#EAF2E8', label:'Eco Conscious',   desc:'Non-toxic resins and sustainable packaging wherever possible.' },
  { Icon:Award, color:'#B8965A', bg:'#F6F1E8', label:'Premium Quality', desc:'Only the finest pigments, botanicals and hardware.' },
  { Icon:Users, color:'#7B68C8', bg:'#EEEAF5', label:'Community First', desc:'Built on real customer stories and a love for handmade art.' },
]

export default function About() {
  return (
    <section id="about" className={s.section}>
      <div className={s.inner}>
        <div className={s.grid}>
          <motion.div
            initial={{ opacity:0, x:-28 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }}
            transition={{ duration:.7 }}
          >
            <div className={s.label}>Our Story</div>
            <h2 className={s.title}>A Studio Built on <em>Passion</em></h2>
            <span className={s.divider} />
            <div className={s.paras}>
              <p className={s.para}>Made By Us started in 2021 from a tiny apartment studio with a handful of pigments, some moulds and a dream — to create jewellery and gifts that feel as personal and precious as the moments they represent.</p>
              <p className={s.para}>We press real flowers from our garden, chase perfect galaxy swirls and stay up late watching resin cure — because we genuinely love what we make. Every piece that leaves our studio is one we'd proudly wear ourselves.</p>
              <p className={s.para}>From birthday keychains to anniversary love boxes, we've been part of over 2,000 special moments across India. And we're just getting started.</p>
            </div>
            <div className={s.sig}>
              <div className={s.sigIcon}>🌸</div>
              <div>
                <div className={s.sigName}>Kajal & Tanveer</div>
                <div className={s.sigRole}>Co-founders, Made By Us</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity:0, x:28 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }}
            transition={{ duration:.7 }}
          >
            <div className={s.valuesGrid}>
              {values.map((v, i) => (
                <motion.div key={i} className={s.valueCard}
                  initial={{ opacity:0, y:14 }}
                  whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true }}
                  transition={{ delay: i * .08 }}
                >
                  <div className={s.valueIcon} style={{ background: v.bg }}>
                    <v.Icon size={16} color={v.color} />
                  </div>
                  <div className={s.valueName}>{v.label}</div>
                  <p className={s.valueDesc}>{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
