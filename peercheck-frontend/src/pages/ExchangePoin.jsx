import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

{/*Sprint 1*/}
const ExchangePoin = () => {
  const { user } = useAuth();
  const roadmapMilestones = [
  { v: 0, label: 'Bronze', icon: '🥉' },
  { v: 500, label: 'Silver', icon: '🥈' },
  { v: 1000, label: 'Gold', icon: '🏆' },
  { v: 1500, label: 'Diamond', icon: '💎' },
  { v: 3000, label: 'Challanger', icon: '🏅' },
  { v: 10000, label: 'Expert', icon: '👑' },
];

  const [pointsState, setPointsState] = useState(0);
  const [userName, setUserName] = useState(user?.username || 'Anonymus');
  const [exchangeError, setExchangeError] = useState(null);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token || !user?.userId) return;
        const res = await fetch(`http://localhost:4000/api/users/${user.userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data && typeof data.contribution_points !== 'undefined') {
          setPointsState(data.contribution_points);
          // populate user's name from backend if available
          if (data.username || data.name) setUserName(data.username || data.name);
        }
      } catch (err) {
        console.error('Failed to fetch user points:', err);
      }
    };
    fetchPoints();
  }, [user?.userId]);

  // Cegah undefined (AMAN)
  const currentRank =
    roadmapMilestones.filter((r) => pointsState >= r.v).slice(-1)[0] ||
    roadmapMilestones[0];

  const nextRankIndex = roadmapMilestones.indexOf(currentRank) + 1;
  const nextRank = roadmapMilestones[nextRankIndex] || currentRank;

  let progress = 100;

  if (nextRank.v !== currentRank.v) {
    progress = ((pointsState - currentRank.v) / (nextRank.v - currentRank.v)) * 100;
  }

  progress = Math.min(100, Math.max(0, Math.round(progress)));

  const [options] = useState([
    { points: "10.000 Poin", amount: "Rp.100.000", key: "10k" },
    { points: "1000 Poin", amount: "Rp.10.000", key: "1k" },
    { points: "100 Poin", amount: "Rp.1.000", key: "100" },
  ]);

  const [hoverBigCard, setHoverBigCard] = useState(false);
  const [hoverAmountBtn, setHoverAmountBtn] = useState(null);
  
  const styles = {
  page: { fontFamily:"Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto", minHeight:"100vh", width:"100vw", display:"flex", flexDirection:"column", background:"#fdfdfd", color:"#0e1c1c" },

  header: { display:"flex", alignItems:"center", justifyContent:"space-between", padding:"18px 28px", borderBottom:"1px solid #e5e5e5", background:"#ffffff", position:"relative", boxShadow:"0 2px 12px rgba(0,0,0,0.05)" },

  logo: { display:"flex", alignItems:"center", gap:10, fontWeight:800, color:"#0d8064", fontSize:22, letterSpacing:0.3 },

  nav: { display:"flex", gap:18, alignItems:"center", position:"absolute", left:"50%", transform:"translateX(-50%)" },

  content: { maxWidth:1200, margin:"32px auto", padding:"0 22px", boxSizing:"border-box" },

  topRow: { display:"flex", justifyContent:"space-between", alignItems:"center", gap:24 },

  progressBarWrap: { marginTop:22, width:"100%" },

  progressTrack: { height:16, background:"#e9e9e9", borderRadius:14, overflow:"hidden", boxShadow:"inset 0 1px 3px rgba(0,0,0,0.15)" },

  progressFill: { height:"100%", background:"linear-gradient(90deg, #1ea97c, #159c71)", borderRadius:14, transition:"width 450ms ease-in-out", boxShadow:"0 0 12px rgba(30,169,124,0.45)" },

  infoBtn: { background:"linear-gradient(135deg, #7ff3df, #52e2ca)", color:"#063b2f", padding:"12px 20px", borderRadius:32, fontWeight:800, border:"none", cursor:"pointer", boxShadow:"0 4px 12px rgba(0,0,0,0.08)", transition:"transform .15s ease, box-shadow .15s ease" },

  bigCardWrapper: { marginTop:22, display:"flex", flexDirection:"column", gap:20 },

  bigCard: { background:"linear-gradient(135deg, #0d8064, #0a6a53)", color:"#fff", padding:26, borderRadius:16, display:"flex", justifyContent:"space-between", alignItems:"center", gap:18, boxShadow:"0 6px 18px rgba(0,0,0,0.15)", transition:"all .25s ease" },

  bigCardHover: { transform:"translateY(-4px)", boxShadow:"0 12px 26px rgba(0,0,0,0.20)" },

  amountBtn: { background:"linear-gradient(135deg, #1bd3ac, #13bb96)", color:"#063b2f", padding:"15px 24px", borderRadius:12, border:"none", cursor:"pointer", fontWeight:800, boxShadow:"0 4px 14px rgba(0,0,0,0.12)", transition:"all .2s ease" },

  amountBtnHover: { transform:"scale(1.05)", boxShadow:"0 6px 20px rgba(27,211,172,0.45)" },

  };


  const [showModal, setShowModal] = useState(false);

  // exchangeState: null or { step: 'method'|'info'|'confirm'|'done', option, method, name, account }
  const [exchangeState, setExchangeState] = useState(null);
  
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.logo}>
          <img src="/Logo.png" alt="PIRU" style={{ height: 50, objectFit: 'contain' }} />
        </div>

        <nav style={styles.nav}>
          <Link to="/dashboard" style={{ textDecoration: "none", color: "#0b6b58", fontWeight: 700 }}>Assignment</Link>
          <Link to="/upload" style={{ textDecoration: "none", color: "#0b6b58", fontWeight: 700 }}>Upload</Link>
          <Link to="/profile" style={{ textDecoration: "none", color: "#000", fontWeight: 700 }}>Profile</Link>
        </nav>

        <div style={{ position: 'absolute', right: 28, top: '50%', transform: 'translateY(-50%)' }}>
          <HiButton />
        </div>
      </header>

{/*Sprint 1*/}
      <main style={styles.content}>
        <div style={styles.topRow}>      
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              gap: 12,
            }}
            >
        <h2 style={{ margin: 0, fontSize: 32 }}>
          {pointsState} Poin, Your Rank Now Is :
        </h2>

      <span style={{ fontSize: 36 }}>
        {currentRank.icon}
      </span>
    </div>

    <div style={{ marginTop: 8, fontWeight: 700, fontSize: 18 }}>
      {currentRank.label}, Good Job !
    </div>
  </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 380 }}>
              <div style={styles.progressBarWrap}>
                <div style={styles.progressTrack}>
                  <div style={{ ...styles.progressFill, width: `${progress}%` }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 12, color: "#666" }}>
                 {roadmapMilestones.map((m, i) => (
                  <span key={i}>{m.v} Poin</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <p style={{ color: '#666', marginTop: 8, maxWidth: 780 }}>Convert your earned points into rewards. Choose a package below to exchange points for cash rewards. This is a demo action and will show a confirmation alert.</p>

          {/* Make the heading itself interactive (underlined + bold) and open the modal */}
          <div style={{ marginTop: 12 }}>
            <h3
              onClick={() => setShowModal(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setShowModal(true); }}
              style={{ margin: 0, fontSize: 18, fontWeight: 800, textDecoration: 'underline', cursor: 'pointer', display: 'inline-block' }}
              aria-haspopup="dialog"
              aria-expanded={showModal}
            >
              What is Poin Exchange?
            </h3>
          </div>

          <div style={styles.bigCardWrapper}>
  {options.map(o => (
    <div
      key={o.key}
      style={
        hoverBigCard === o.key
          ? { ...styles.bigCard, ...styles.bigCardHover, borderRadius: 12, padding: 20 }
          : { ...styles.bigCard, borderRadius: 12, padding: 20 }
      }
      onMouseEnter={() => setHoverBigCard(o.key)}
      onMouseLeave={() => setHoverBigCard(null)}
    >
      <div>
        <div style={{ fontWeight: 800 }}>{o.points}</div>
        <div style={{ opacity: 0.9, marginTop: 6 }}>Exchange to cash</div>
      </div>

{/*Sprint1*/}
      <div>
        <button
          style={
            hoverAmountBtn === o.key
              ? { ...styles.amountBtn, ...styles.amountBtnHover }
              : styles.amountBtn
          }
          onMouseEnter={() => setHoverAmountBtn(o.key)}
          onMouseLeave={() => setHoverAmountBtn(null)}
          onClick={() => {
            const numeric = parseInt(String(o.points).replace(/[^0-9]/g, ''), 10) || 0;
            setExchangeError(null);
            setExchangeState({
              step: 'method',
              option: o,
              cost: numeric,
              method: '',
              name: userName || (user?.username || 'Anonymus'),
              account: ''
            });
          }}
        >
          {o.amount}
        </button>
      </div>
    </div>
  ))}
</div>
        </div>
      </main>

      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Point Exchange Info and Rules"
          onClick={() => setShowModal(false)}
          style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.35)', zIndex: 2000 }}
        >
          <div onClick={(e) => e.stopPropagation()} style={{ width: 'min(900px, 94%)', background: '#0b6b58', color: '#fff', padding: 28, borderRadius: 12, boxSizing: 'border-box', textAlign: 'center' }}>
            <h2 style={{ margin: '0 0 12px', fontSize: 20 }}>Point Exchange Info & Rules</h2>
            <div style={{ textAlign: 'left', maxWidth: 820, margin: '0 auto' }}>
              <ol style={{ paddingLeft: 18, lineHeight: 1.9, color: '#fff', fontWeight: 700 }}>
                <li>- Every time you perform certain activities in Peeru, you will earn points.</li>
                <li>- These points can be exchanged for money.</li>
                <li>- Points can be exchanged once a month.</li>
                <li>- Each time you exchange a point, your points will be exchanged for a specific number of points. For example, if you exchange 1,000 points, your points will be reduced by 1,000.</li>
                <li>- Warning! Your rank will decrease as your points decrease.</li>
              </ol>
            </div>
            <div style={{ marginTop: 20 }}>
              <button onClick={() => setShowModal(false)} style={{ background: '#17c7a3', color: '#063b2f', padding: '10px 22px', borderRadius: 12, border: 'none', fontWeight: 800 }}>I Understand</button>
            </div>
          </div>
        </div>
      )}

      {/* Exchange flow modal(s) */}
      {exchangeState && (
        <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.35)', zIndex: 2100 }} onClick={() => setExchangeState(null)}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: 'min(720px, 96%)', background: '#fff', color: '#06201a', padding: 20, borderRadius: 12, boxSizing: 'border-box' }}>
            {exchangeState.step === 'method' && (
              <div>
                <h3 style={{ marginTop: 0 }}>Choose Exchange Method</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>

{/*Sprint1*/}
{exchangeState.step === 'method' && (
  <div>

    {/* LIST PAYMENT + LOGO */}
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
      {[
        { name: "ShopeePay", logo: "/shopeepay.jpg" },
        { name: "Gopay", logo: "/gopay.png" },
        { name: "OVO", logo: "/ovo.png" },
        { name: "Bank Transfer", logo: "/bank.png" },
        { name: "Dana", logo: "/dana.png" },
        { name: "LinkAja", logo: "/link aja.png" }
      ].map((m) => (
        <button
          key={m.name}
          onClick={() =>
            setExchangeState(prev => ({ ...prev, step: 'info', method: m.name }))
          }
          style={{
            padding: '10px 14px',
            borderRadius: 10,
            border: '1px solid #e6e6e6',
            background: '#f7f7f7',
            cursor: 'pointer',
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            minWidth: "150px"
          }}
        >
          <img
            src={m.logo}
            alt={m.name}
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              objectFit: "cover"
            }}
          />
          {m.name}
        </button>
      ))}
    </div>
  </div>
)}

                </div>
                <div style={{ marginTop: 18, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                  <button onClick={() => setExchangeState(null)} style={{ padding: '8px 12px', borderRadius: 8, background: '#eee', border: 'none', cursor: 'pointer' }}>Cancel</button>
                </div>
              </div>
            )}

            {exchangeState.step === 'info' && (
              <div>
                <h3 style={{ marginTop: 0 }}>Enter {exchangeState.method} Account Info</h3>
                <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{ fontWeight: 700 }}>Account Name</label>
                  <input value={exchangeState.name} onChange={(e) => setExchangeState(prev => ({ ...prev, name: e.target.value }))} style={{ padding: 10, borderRadius: 8, border: '1px solid #ddd' }} />
                  <label style={{ fontWeight: 700 }}>Account Number</label>
                  <input value={exchangeState.account} onChange={(e) => setExchangeState(prev => ({ ...prev, account: e.target.value }))} style={{ padding: 10, borderRadius: 8, border: '1px solid #ddd' }} />
                </div>
                <div style={{ marginTop: 18, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                  <button onClick={() => setExchangeState(null)} style={{ padding: '8px 12px', borderRadius: 8, background: '#eee', border: 'none', cursor: 'pointer' }}>Back</button>
                  <button
                    onClick={() => { setExchangeError(null); setExchangeState(prev => ({ ...prev, step: 'confirm' })); }}
                    style={{ padding: '8px 12px', borderRadius: 8, background: '#17c7a3', border: 'none', cursor: 'pointer', fontWeight: 800 }}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {exchangeState.step === 'confirm' && (
              <div>
                <h3 style={{ marginTop: 0 }}>Confirm Exchange</h3>
                <div style={{ marginTop: 8 }}>
                  <p style={{ margin: 0, fontWeight: 700 }}>{exchangeState.option.points} → {exchangeState.option.amount}</p>
                  <p style={{ margin: '6px 0 0' }}>Method: <strong>{exchangeState.method}</strong></p>
                  <p style={{ margin: '6px 0 0' }}>Name: <strong>{exchangeState.name}</strong></p>
                  <p style={{ margin: '6px 0 0' }}>Account: <strong>{exchangeState.account || '(not provided)'}</strong></p>
                </div>
                <div style={{ marginTop: 18 }}>
                  <p style={{ color: '#666' }}>You will receive an email after the transaction is processed.</p>
                </div>
                <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                  <button onClick={() => setExchangeState(prev => ({ ...prev, step: 'info' }))} style={{ padding: '8px 12px', borderRadius: 8, background: '#eee', border: 'none', cursor: 'pointer' }}>Back</button>
                  <button
                    onClick={() => {
                      setExchangeError(null);
                      const cost = exchangeState?.cost || 0;
                      if (pointsState < cost) {
                        setExchangeError('Your points are not enough to redeem this package.');
                        return;
                      }
                      // simulate processing: deduct points and show done
                      setPointsState(prev => Math.max(0, prev - cost));
                      setExchangeState(prev => ({ ...prev, step: 'done' }));
                    }}
                    style={{ padding: '8px 12px', borderRadius: 8, background: '#0b6b58', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 800 }}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            )}

            {exchangeState.step === 'done' && (
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ marginTop: 0 }}>Done! Enjoy</h3>
                <p style={{ color: '#666' }}>Your exchange request is received. You will be notified by email when it is processed.</p>
                <div style={{ marginTop: 18, display: 'flex', justifyContent: 'center' }}>
                  <button onClick={() => setExchangeState(null)} style={{ padding: '10px 18px', borderRadius: 10, background: '#17c7a3', color: '#063b2f', border: 'none', fontWeight: 800 }}>Close</button>
                </div>
              </div>
            )}
            {/* show error message when points are insufficient */}
            {exchangeError && (
              <div style={{ color: 'crimson', fontWeight: 800, marginTop: 12, textAlign: 'center' }}>{exchangeError}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

function HiButton() {
  const navigate = useNavigate();
  const { user } = useAuth();
  return (
    <button onMouseDown={(e) => e.preventDefault()} onClick={() => navigate('/profile', { state: { tab: 'edit' } })} style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#0b6b58', color: '#fff', padding: '10px 18px', borderRadius: 30, border: 'none', cursor: 'pointer', fontWeight: 800 }}>
      <span style={{ width: 28, height: 28, borderRadius: 14, background: '#d6b77a', color: '#063b2f', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800 }}>👤</span>
      <span>Hi, {user?.username || 'Anonymus'}</span>
    </button>
  );
}

export default ExchangePoin;
