import Navbar from '@/components/layout/Navbar'
import ChatWindow from '@/components/chat/ChatWindow'

export default function ChatPage() {
  return (
    <>
      <Navbar />
      <main style={{ position:'relative', zIndex:1, height:'100vh', display:'flex', flexDirection:'column', paddingTop:73 }}>
        <div style={{ display:'flex', flex:1, overflow:'hidden' }}>

          {/* Sidebar info */}
          <aside style={{ width:260, background:'rgba(11,14,27,0.95)', borderRight:'1px solid rgba(79,110,247,0.12)', padding:'24px 20px', overflowY:'auto', flexShrink:0, display:'flex', flexDirection:'column', gap:24 }}>
            <div>
              <span className="label">🤖 Prof IA</span>
              <h3 style={{ fontSize:16, marginBottom:6 }}>Professeur de Maths</h3>
              <p style={{ fontSize:12 }}>Spécialisé dans le programme officiel tunisien — Bac & FST.</p>
            </div>

            <div style={{ height:1, background:'rgba(255,255,255,0.06)' }} />

            <div>
              <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:12 }}>Sujets couverts</div>
              {[
                { icon:'📐', label:'Analyse (limites, dérivées, intégrales)' },
                { icon:'🔢', label:'Algèbre & Complexes' },
                { icon:'📊', label:'Probabilités & Statistiques' },
                { icon:'📏', label:'Géométrie dans l\'espace' },
                { icon:'🎓', label:'Préparation Bac & FST' },
              ].map(s => (
                <div key={s.label} style={{ display:'flex', gap:10, padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.04)', fontSize:12, color:'var(--muted)' }}>
                  <span>{s.icon}</span><span>{s.label}</span>
                </div>
              ))}
            </div>

            <div style={{ background:'rgba(79,110,247,0.08)', border:'1px solid rgba(79,110,247,0.2)', borderRadius:12, padding:16 }}>
              <div style={{ fontSize:11, color:'var(--accent)', fontFamily:'var(--font-mono)', marginBottom:8, textTransform:'uppercase', letterSpacing:'0.06em' }}>💡 Conseil</div>
              <p style={{ fontSize:12, lineHeight:1.6 }}>Sois précis dans ta question. Précise si c'est pour le Bac, la FST, ou un chapitre spécifique.</p>
            </div>
          </aside>

          {/* Chat main */}
          <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
            <div style={{ padding:'16px 24px', borderBottom:'1px solid rgba(79,110,247,0.12)', display:'flex', alignItems:'center', gap:12 }}>
              <div style={{ width:36, height:36, background:'linear-gradient(135deg,#4f6ef7,#7c3aed)', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>∑</div>
              <div>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:600, fontSize:15 }}>Professeur IA — Maths Tunisie</div>
                <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:'var(--teal)' }}>
                  <span style={{ width:7, height:7, background:'var(--teal)', borderRadius:'50%', animation:'pulse 2s infinite', display:'inline-block' }} />
                  En ligne · Programme Bac & FST
                </div>
              </div>
            </div>
            <div style={{ flex:1, overflowY:'auto', padding:'0 24px 24px' }}>
              <ChatWindow />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
