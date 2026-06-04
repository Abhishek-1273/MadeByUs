import { motion } from 'framer-motion'
import s from './Process.module.css'

const steps = [
  { n:'01', emoji:'🌸', title:'Flowers Pressed',  desc:'Real botanicals picked and pressed for weeks until perfectly preserved.' },
  { n:'02', emoji:'⚗️', title:'Resin Mixed',       desc:'Food-grade epoxy measured and mixed to crystal clarity.' },
  { n:'03', emoji:'🎨', title:'Colours Poured',    desc:'Pigments, foils and florals arranged by hand in each unique mould.' },
  { n:'04', emoji:'✨', title:'Cured & Polished',  desc:'Pieces cure 24–72 hrs, then sanded to a glass finish.' },
  { n:'05', emoji:'📦', title:'Packed with Love',  desc:'Wrapped carefully and shipped with tracking.' },
]

export default function Process() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <div className={s.header}>
          <div className={s.label}>Behind the Magic</div>
          <h2 className={s.title}>From Studio to <em>Your Hands</em></h2>
        </div>
        <div className={s.grid}>
          {steps.map((st, i) => (
            <motion.div key={i} className={s.step}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * .1 }}
            >
              <div className={s.icon}>
                {st.emoji}
                <span className={s.num}>{st.n}</span>
              </div>
              <div className={s.stepTitle}>{st.title}</div>
              <p className={s.stepDesc}>{st.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
