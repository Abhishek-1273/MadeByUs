import { motion } from 'framer-motion'
import { MessageCircle, Instagram, Mail, Clock, MapPin, Send } from 'lucide-react'
import { WA, IGID } from '../../config'
import s from './Contact.module.css'

const methods = [
  { Icon:MessageCircle, label:'WhatsApp',     val:'+91 6283359166',  sub:'Replies within 2 hours',       href:`https://wa.me/${WA}`,                 color:'#25D366', bg:'#F0FDF4' },
  { Icon:Instagram,     label:'Instagram DM', val:`@${IGID}`,         sub:'For orders and inspiration',   href:`https://instagram.com/${IGID}`,       color:'#E1306C', bg:'#FFF0F5' },
  { Icon:Mail,          label:'Email',        val:'hello@madebyus.in',sub:'Bulk / wholesale enquiries',   href:'mailto:hello@madebyus.in',            color:'#B8965A', bg:'#F6F1E8' },
  { Icon:Clock,         label:'Hours',        val:'Mon–Sat  10am–8pm',sub:'Indian Standard Time',         href:null,                                  color:'#7B68C8', bg:'#EEEAF5' },
]

export default function Contact() {
  return (
    <section id="contact" className={s.section}>
      <div className={s.inner}>
        <div className={s.header}>
          <div className={s.label}>Say Hello</div>
          <h2 className={s.title}>Let's <em>Connect</em></h2>
          <span className={s.divider} />
          <p className={s.sub}>Questions, custom orders, collabs or just want to chat about resin? We're here.</p>
        </div>

        <div className={s.grid}>
          <motion.div className={s.methods}
            initial={{ opacity:0, x:-18 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }}
            transition={{ duration:.6 }}
          >
            {methods.map((m, i) => {
              const inner = (
                <>
                  <div className={s.methodIcon} style={{ background: m.bg }}>
                    <m.Icon size={18} color={m.color} />
                  </div>
                  <div>
                    <div className={s.methodLabel}>{m.label}</div>
                    <div className={s.methodVal}>{m.val}</div>
                    <div className={s.methodSub}>{m.sub}</div>
                  </div>
                </>
              )
              return m.href
                ? <a key={i} href={m.href} target="_blank" rel="noopener noreferrer" className={s.method}>{inner}</a>
                : <div key={i} className={s.method} style={{ cursor:'default' }}>{inner}</div>
            })}
          </motion.div>

          <motion.div className={s.form}
            initial={{ opacity:0, x:18 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }}
            transition={{ duration:.6 }}
          >
            <div className={s.formTitle}>Quick Enquiry</div>
            <p className={s.formDesc}>Tell us what you need and we'll reply on WhatsApp.</p>
            <div className={s.fields}>
              <div>
                <label className={s.fieldLabel}>Your Name</label>
                <input className={s.input} placeholder="Priya Sharma" />
              </div>
              <div>
                <label className={s.fieldLabel}>Message</label>
                <textarea className={s.textarea} rows={4} placeholder="Hi! I'm interested in a custom order for..." />
              </div>
              <a
                href={`https://wa.me/${WA}?text=${encodeURIComponent("Hi Made By Us! I'd like to enquire about:")}`}
                target="_blank" rel="noopener noreferrer"
                className={s.submitBtn}
              >
                <Send size={14} /> Send via WhatsApp
              </a>
            </div>
            <div className={s.formFooter}>
              <MapPin size={11} color="var(--faint)" />
              <span className={s.formFooterText}>Based in India · Shipping Nationwide · Est. 2021</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
