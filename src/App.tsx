import { useState } from 'react';
import './index.css';
import Avatar from './components/Avatar';
import PixelIcon from './components/PixelIcon';
import WaitlistForm from './components/WaitlistForm';

const PEOPLE = [
  { name: 'Maya',  animal: 'cat',  color: '#f472b6', items: ['halo']        },
  { name: 'Jake',  animal: 'bear', color: '#60a5fa', items: ['shades']      },
  { name: 'Sofia', animal: 'dog',  color: '#34d399', items: ['headphones']  },
  { name: 'Kai',   animal: 'cat',  color: '#a78bfa', items: ['wizard']      },
  { name: 'Luna',  animal: 'bear', color: '#fb923c', items: ['cape']        },
  { name: 'Rex',   animal: 'dog',  color: '#fbbf24', items: ['sword']       },
  { name: 'Zara',  animal: 'cat',  color: '#22d3ee', items: []              },
  { name: 'Finn',  animal: 'bear', color: '#f472b6', items: ['halo']        },
  { name: 'Ivy',   animal: 'dog',  color: '#a78bfa', items: ['shades']      },
  { name: 'Max',   animal: 'cat',  color: '#34d399', items: ['headphones']  },
] as const;

const BUDDIES = [
  { animal: 'cat',  color: '#f472b6', items: ['halo'],        name: 'ANGEL HALO',   cost: 120, cardBorder: '#fde8ff', cardBg: 'linear-gradient(180deg,#fff5ff,#faf0ff)', boxBg: 'rgba(244,114,182,0.08)',  boxBorder: '#fce7f3', nameColor: '#9d4edd' },
  { animal: 'bear', color: '#60a5fa', items: ['shades'],       name: 'CYBER SHADES', cost: 80,  cardBorder: '#e0f2fe', cardBg: 'linear-gradient(180deg,#f0faff,#e8f7ff)', boxBg: 'rgba(96,165,250,0.08)',   boxBorder: '#bae6fd', nameColor: '#0e7490' },
  { animal: 'dog',  color: '#34d399', items: ['headphones'],   name: 'BEAT PHONES',  cost: 150, cardBorder: '#d1fae5', cardBg: 'linear-gradient(180deg,#f0fdf9,#e8fff5)', boxBg: 'rgba(52,211,153,0.08)',   boxBorder: '#a7f3d0', nameColor: '#065f46' },
  { animal: 'cat',  color: '#a78bfa', items: ['wizard'],       name: 'WIZARD HAT',   cost: 120, cardBorder: '#ede8ff', cardBg: 'linear-gradient(180deg,#faf8ff,#f5f0ff)', boxBg: 'rgba(167,139,250,0.08)', boxBorder: '#ddd6fe', nameColor: '#5b21b6' },
  { animal: 'bear', color: '#fb923c', items: ['cape'],         name: 'HERO CAPE',    cost: 100, cardBorder: '#ffe4d0', cardBg: 'linear-gradient(180deg,#fff7f0,#fff2e8)', boxBg: 'rgba(251,146,60,0.08)',   boxBorder: '#fed7aa', nameColor: '#92400e' },
  { animal: 'dog',  color: '#fbbf24', items: ['sword'],        name: 'PIXEL BLADE',  cost: 180, cardBorder: '#fde68a', cardBg: 'linear-gradient(180deg,#fffbeb,#fffce8)', boxBg: 'rgba(251,191,36,0.08)',   boxBorder: '#fde68a', nameColor: '#78350f' },
] as const;

const marqueePeople = [...PEOPLE, ...PEOPLE, ...PEOPLE, ...PEOPLE];

export default function App() {
  const [submitted, setSubmitted] = useState(false);
  const [count, setCount] = useState(847);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSuccess = () => {
    setSubmitted(true);
    setCount(c => c + 1);
  };

  const scrollToWaitlist = () => {
    setMenuOpen(false);
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="navbar-logo" onClick={scrollToWaitlist}>
            <div className="navbar-logo-icon">
              <PixelIcon icon="trophy" color="#ffffff" size={20} />
            </div>
            <span className="navbar-logo-text">ChallengeBuddy</span>
          </div>
          <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
            <span /><span /><span />
          </button>
          <div className={`navbar-links${menuOpen ? ' open' : ''}`}>
            <a href="#how" className="navbar-link" onClick={() => setMenuOpen(false)}>How it works</a>
            <a href="#features" className="navbar-link" onClick={() => setMenuOpen(false)}>Features</a>
            <button className="btn-join-nav" onClick={scrollToWaitlist}>Join Waitlist</button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-grid" />

        {/* Pixel squares */}
        <div style={{ position:'absolute',top:'11%',left:'13%',width:9,height:9,borderRadius:3,background:'#c4b5fd',animation:'bob3 3.2s ease-in-out infinite' }} />
        <div style={{ position:'absolute',top:'24%',right:'14%',width:7,height:7,borderRadius:2,background:'#22d3ee',animation:'bob 3.6s ease-in-out 0.4s infinite' }} />
        <div style={{ position:'absolute',bottom:'19%',left:'10%',width:11,height:11,borderRadius:3,background:'#fbbf24',animation:'bob2 4.1s ease-in-out 0.8s infinite' }} />
        <div style={{ position:'absolute',bottom:'13%',right:'11%',width:8,height:8,borderRadius:3,background:'#fb923c',animation:'bob3 3.8s ease-in-out 1.2s infinite' }} />
        <div style={{ position:'absolute',top:'50%',left:'22%',width:6,height:6,borderRadius:2,background:'#34d399',animation:'bob 5s ease-in-out 2s infinite' }} />
        <div style={{ position:'absolute',top:'38%',right:'22%',width:7,height:7,borderRadius:2,background:'#f472b6',animation:'bob2 4.5s ease-in-out 1.5s infinite' }} />

        {/* Left floating avatars */}
        <div className="hero-float" style={{ left:'3%',top:'15%',animation:'bob 4.2s ease-in-out infinite',filter:'drop-shadow(0 12px 24px rgba(124,58,237,0.18))' }}>
          <Avatar animal="cat" color="#f472b6" size={98} items={['halo']} />
        </div>
        <div className="hero-float" style={{ left:'9%',bottom:'19%',animation:'bob2 5.6s ease-in-out 0.7s infinite',filter:'drop-shadow(0 10px 20px rgba(96,165,250,0.2))' }}>
          <Avatar animal="bear" color="#60a5fa" size={74} items={['shades']} />
        </div>
        <div className="hero-float" style={{ left:'19%',top:'8%',animation:'bob3 6.2s ease-in-out 1.3s infinite',opacity:0.7 }}>
          <Avatar animal="dog" color="#34d399" size={58} items={['headphones']} />
        </div>
        {/* Right floating avatars */}
        <div className="hero-float" style={{ right:'3%',top:'13%',animation:'bob2 4.6s ease-in-out 0.4s infinite',filter:'drop-shadow(0 12px 24px rgba(124,58,237,0.18))' }}>
          <Avatar animal="cat" color="#a78bfa" size={94} items={['wizard']} />
        </div>
        <div className="hero-float" style={{ right:'9%',bottom:'21%',animation:'bob 5.2s ease-in-out 1.1s infinite',filter:'drop-shadow(0 10px 20px rgba(251,146,60,0.2))' }}>
          <Avatar animal="bear" color="#fb923c" size={76} items={['cape']} />
        </div>
        <div className="hero-float" style={{ right:'19%',top:'7%',animation:'bob3 5.8s ease-in-out 0.9s infinite',opacity:0.7 }}>
          <Avatar animal="dog" color="#fbbf24" size={60} items={['sword']} />
        </div>

        {/* Center content */}
        <div className="hero-content">
          <div className="badge-live">
            <div className="badge-dot" />
            <span className="badge-text">WAITLIST NOW OPEN</span>
          </div>
          <h1 className="hero-h1">Make goals<br />a group sport.</h1>
          <p className="hero-sub">Pick a challenge, invite your crew, and log daily photo proof. ChallengeBuddy turns personal goals into a game you actually finish — together.</p>
          <div id="waitlist">
            <WaitlistForm count={count} submitted={submitted} onSuccess={handleSuccess} variant="hero" />
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="ticker-wrap">
        <div className="ticker-track">
          {marqueePeople.map((p, i) => (
            <div key={i} className="ticker-item">
              <div className="ticker-avatar-box">
                <Avatar animal={p.animal} color={p.color} size={50} items={p.items as any} />
              </div>
              <span className="ticker-name">{p.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section className="how-section" id="how">
        <div className="how-inner">
          <div style={{ textAlign:'center',marginBottom:72 }}>
            <div className="section-eyebrow" style={{ color:'#22d3ee' }}>▸ HOW IT WORKS ◂</div>
            <h2 className="section-h2-lg">Three steps to<br />not giving up.</h2>
          </div>
          <div className="how-steps">
            <div className="how-step">
              <div className="how-icon" style={{ background:'linear-gradient(180deg,#9b6bff,#7c3aed)',boxShadow:'0 6px 0 #5b21b6,0 10px 26px rgba(124,58,237,0.3)' }}>
                <PixelIcon icon="target" color="#ffffff" size={36} />
              </div>
              <div className="how-num" style={{ color:'#c4b5fd' }}>01</div>
              <h3 className="how-title">Create a challenge</h3>
              <p className="how-body">Pick a goal — run daily, read 20 min, hit the gym — then invite your crew and set real milestone rewards for hitting it.</p>
            </div>
            <div className="how-arrow">▸</div>
            <div className="how-step">
              <div className="how-icon" style={{ background:'linear-gradient(180deg,#22d3ee,#0e8fb0)',boxShadow:'0 6px 0 #0a6f88,0 10px 26px rgba(34,211,238,0.3)' }}>
                <PixelIcon icon="camera" color="#ffffff" size={36} />
              </div>
              <div className="how-num" style={{ color:'#22d3ee' }}>02</div>
              <h3 className="how-title">Log daily proof</h3>
              <p className="how-body">Snap a quick photo every day. No photos, no credit. Your crew sees it live and can cheer, react, or nudge the slackers.</p>
            </div>
            <div className="how-arrow">▸</div>
            <div className="how-step">
              <div className="how-icon" style={{ background:'linear-gradient(180deg,#fbbf24,#f59e0b)',boxShadow:'0 6px 0 #b45309,0 10px 26px rgba(251,191,36,0.3)' }}>
                <PixelIcon icon="trophy" color="#3a1c04" size={36} />
              </div>
              <div className="how-num" style={{ color:'#fbbf24' }}>03</div>
              <h3 className="how-title">Win together</h3>
              <p className="how-body">Climb the live leaderboard, keep your streak alive, and cash in milestone rewards when you cross the finish line.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="features-section" id="features">
        <div style={{ maxWidth:1100,margin:'0 auto' }}>
          <div style={{ textAlign:'center',marginBottom:66 }}>
            <div className="section-eyebrow" style={{ color:'#8b5cf6' }}>▸ FEATURES ◂</div>
            <h2 className="section-h2">Everything you need<br />to actually follow through.</h2>
          </div>
          <div className="features-grid">
            {[
              { icon:'camera' as const, color:'#22d3ee', bg:'rgba(34,211,238,0.12)', border:'rgba(34,211,238,0.35)', glow:'rgba(34,211,238,0.18)', title:'Photo proof required', body:'No more "yeah I did it, trust me." Snap a photo, submit it, your crew sees it live. Zero wiggle room for excuses.' },
              { icon:'trophy' as const, color:'#fbbf24', bg:'rgba(251,191,36,0.12)',  border:'rgba(251,191,36,0.35)',  glow:'rgba(251,191,36,0.18)',  title:'Live leaderboard', body:"See who's crushing it and who's slipping — updated the instant someone logs proof. Nothing hides from the board." },
              { icon:'gift'   as const, color:'#fb923c', bg:'rgba(251,146,60,0.12)',  border:'rgba(251,146,60,0.35)',  glow:'rgba(251,146,60,0.18)',  title:'Custom milestone rewards', body:'Real stakes make people show up. Set custom rewards at 25%, 50%, and the finish line. Losers buy pizza. Winners skip dishes.' },
              { icon:'person' as const, color:'#8b5cf6', bg:'rgba(124,58,237,0.12)',  border:'rgba(124,58,237,0.35)',  glow:'rgba(124,58,237,0.18)',  title:'Your pixel buddy', body:'Earn coins for every proof you log. Spend them on hats, capes, and gear for your avatar. Your buddy levels up as you do.' },
            ].map(f => (
              <div key={f.title} className="feature-card">
                <div style={{ position:'absolute',top:-28,right:-28,width:100,height:100,borderRadius:'50%',background:`radial-gradient(circle,${f.glow},transparent 70%)`,pointerEvents:'none' }} />
                <div className="feature-icon" style={{ background:f.bg,border:`2px solid ${f.border}` }}>
                  <PixelIcon icon={f.icon} color={f.color} size={28} />
                </div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-body">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUDDY SHOWCASE ── */}
      <section className="buddy-section">
        <div style={{ maxWidth:1100,margin:'0 auto' }}>
          <div style={{ textAlign:'center',marginBottom:56 }}>
            <div className="section-eyebrow" style={{ color:'#fbbf24' }}>▸ YOUR PIXEL BUDDY ◂</div>
            <h2 className="section-h2" style={{ marginBottom:18 }}>Earn coins. Unlock drip.</h2>
            <p style={{ fontFamily:'Nunito',fontSize:17,fontWeight:700,color:'#7267a0',lineHeight:1.65,margin:'0 auto 28px',maxWidth:520 }}>Every proof you log earns coins. Spend them on hats, capes, shades, and gear for your pixel buddy. Show up more, unlock more.</p>
            <div className="coins-badge">
              <PixelIcon icon="coin" color="#fbbf24" size={16} />
              <span className="coins-badge-label">+1 coin</span>
              <span className="coins-badge-sub">per proof logged</span>
            </div>
          </div>
          <div className="buddy-grid">
            {BUDDIES.map(b => (
              <div key={b.name} className="buddy-card" style={{ border:`2px solid ${b.cardBorder}`,background:b.cardBg }}>
                <div className="buddy-avatar-box" style={{ background:b.boxBg,border:`1.5px solid ${b.boxBorder}` }}>
                  <Avatar animal={b.animal} color={b.color} size={64} items={b.items as any} />
                </div>
                <div style={{ textAlign:'center' }}>
                  <div className="buddy-name" style={{ color:b.nameColor }}>{b.name}</div>
                  <div className="buddy-cost">
                    <PixelIcon icon="coin" color="#fbbf24" size={11} />
                    <span className="buddy-cost-num">{b.cost}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ── */}
      <section className="who-section">
        <div style={{ maxWidth:1100,margin:'0 auto' }}>
          <div style={{ textAlign:'center',marginBottom:66 }}>
            <div className="section-eyebrow" style={{ color:'#fb923c' }}>▸ WHO IT'S FOR ◂</div>
            <h2 className="section-h2">Built for any crew.</h2>
          </div>
          <div className="who-grid">
            <div className="who-card" style={{ borderColor:'#e0d5f8',background:'linear-gradient(180deg,#fdf5ff,#faf8ff)' }}>
              <div className="who-avatars">
                <div className="who-avatar-bubble" style={{ background:'#f0eaff',marginRight:-12,zIndex:3 }}><Avatar animal="cat"  color="#f472b6" size={46} items={['halo']} /></div>
                <div className="who-avatar-bubble" style={{ background:'#f0eaff',marginRight:-12,zIndex:2 }}><Avatar animal="dog"  color="#34d399" size={46} items={['headphones']} /></div>
                <div className="who-avatar-bubble" style={{ background:'#f0eaff',zIndex:1 }}><Avatar animal="bear" color="#60a5fa" size={46} items={['shades']} /></div>
              </div>
              <div className="who-eyebrow" style={{ color:'#9d8cc4' }}>FRIEND GROUPS</div>
              <h3 className="who-title">The squad that goals together</h3>
              <p className="who-body">"We're all doing Dry January." "Let's finally run a 5K." ChallengeBuddy is what makes the plan actually stick.</p>
            </div>
            <div className="who-card" style={{ borderColor:'#d1fae5',background:'linear-gradient(180deg,#f0fdf9,#faf8ff)' }}>
              <div className="who-avatars">
                <div className="who-avatar-bubble" style={{ background:'#ecfdf5',marginRight:-12,zIndex:2 }}><Avatar animal="bear" color="#fb923c" size={46} items={['cape']} /></div>
                <div className="who-avatar-bubble" style={{ background:'#ecfdf5',zIndex:1 }}><Avatar animal="cat"  color="#a78bfa" size={46} items={['wizard']} /></div>
              </div>
              <div className="who-eyebrow" style={{ color:'#34d399' }}>GYM PARTNERS</div>
              <h3 className="who-title">Accountability that bites back</h3>
              <p className="who-body">Your gym buddy moved. Your workout partner bailed again. ChallengeBuddy keeps both of you honest from anywhere.</p>
            </div>
            <div className="who-card" style={{ borderColor:'#fde68a',background:'linear-gradient(180deg,#fffbeb,#faf8ff)' }}>
              <div className="who-avatars">
                <div className="who-avatar-bubble" style={{ background:'#fef9c3',borderColor:'#fef9c3' }}><Avatar animal="dog" color="#fbbf24" size={46} items={['sword']} /></div>
              </div>
              <div className="who-eyebrow" style={{ color:'#fbbf24' }}>SOLO QUITTERS</div>
              <h3 className="who-title">You've tried going it alone</h3>
              <p className="who-body">Research says you're 65% more likely to reach a goal with an accountability partner. ChallengeBuddy is that — times five.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="cta-section">
        <div style={{ position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(124,58,237,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.06) 1px,transparent 1px)',backgroundSize:'28px 28px',pointerEvents:'none' }} />
        <div style={{ position:'absolute',top:-90,left:'6%',width:300,height:300,borderRadius:'50%',background:'radial-gradient(circle,rgba(124,58,237,0.1),transparent 70%)',pointerEvents:'none' }} />
        <div style={{ position:'absolute',bottom:-80,right:'6%',width:340,height:340,borderRadius:'50%',background:'radial-gradient(circle,rgba(34,211,238,0.08),transparent 70%)',pointerEvents:'none' }} />
        <div style={{ position:'absolute',left:'5%',top:'50%',transform:'translateY(-52%)',animation:'bob 4s ease-in-out infinite',opacity:0.6 }}>
          <Avatar animal="cat" color="#f472b6" size={80} items={['halo']} />
        </div>
        <div style={{ position:'absolute',right:'5%',top:'50%',transform:'translateY(-52%)',animation:'bob2 4.6s ease-in-out 0.5s infinite',opacity:0.6 }}>
          <Avatar animal="bear" color="#fb923c" size={80} items={['cape']} />
        </div>
        <div className="cta-content">
          <div className="section-eyebrow" style={{ color:'#7c3aed' }}>▸ JOIN THE WAITLIST ◂</div>
          <h2 className="cta-h2">Ready to level up?</h2>
          <p className="cta-sub">Be first when ChallengeBuddy launches. Early signups get a free PRO month and exclusive founder-only gear for their buddy.</p>
          <WaitlistForm count={count} submitted={submitted} onSuccess={handleSuccess} variant="cta" />
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-logo">
            <div className="footer-logo-icon"><PixelIcon icon="trophy" color="#ffffff" size={14} /></div>
            <span className="footer-logo-text">ChallengeBuddy © 2026</span>
          </div>
          <div className="footer-right">
            <PixelIcon icon="flame" color="#fb923c" size={12} />
            MADE FOR GOAL-CHASERS
          </div>
        </div>
      </footer>
    </>
  );
}
