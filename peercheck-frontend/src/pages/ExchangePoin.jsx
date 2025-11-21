import React, { useState } from "react";
import { Link } from "react-router-dom";

const ExchangePoin = () => {
  const points = 1050;
  const roadmapMilestones = [0, 500, 1000, 1500, 3000, 10000];
  const roadmapMax = roadmapMilestones[roadmapMilestones.length - 1];
  const progress = Math.min(100, Math.round((points / roadmapMax) * 100));
  const [options] = useState([
    { points: "10.000 Poin", amount: "Rp.100.000", key: "10k" },
    { points: "1000 Poin", amount: "Rp.10.000", key: "1k" },
    { points: "100 Poin", amount: "Rp.1.000", key: "100" },
  ]);

  const styles = {
    page: { fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto", minHeight: "100vh", width: "100vw", display: "flex", flexDirection: "column", background: "#fff", color: "#0b1a1a" },
    header: { display: "flex", alignItems: "center", justifyContent: "space-between", position: 'relative', padding: "18px 28px", borderBottom: "1px solid #e6e6e6" },
    logo: { display: "flex", alignItems: "center", gap: 10, fontWeight: 700, color: "#0b6b58" },
    nav: { display: "flex", gap: 18, alignItems: "center", position: 'absolute', left: '50%', transform: 'translateX(-50%)' },
    content: { maxWidth: 1200, margin: "28px auto", padding: "0 18px", boxSizing: "border-box" },
    topRow: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 },
    progressBarWrap: { marginTop: 18, width: "100%" },
    progressTrack: { height: 14, background: "#e6e6e6", borderRadius: 12, overflow: "hidden" },
    progressFill: { height: "100%", background: "#1d6f4d", borderRadius: 12, transition: "width 400ms" },
    infoBtn: { background: '#7ff3df', color: '#063b2f', padding: '12px 18px', borderRadius: 28, fontWeight: 800, border: 'none', cursor: 'pointer' },
    bigCard: { background: '#0b6b58', color: '#fff', padding: 22, borderRadius: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
    bigCardWrapper: { marginTop: 18, display: 'flex', flexDirection: 'column', gap: 18 },
    amountBtn: { background: '#17c7a3', color: '#063b2f', padding: '14px 20px', borderRadius: 12, border: 'none', cursor: 'pointer', fontWeight: 800 },
  };

  const [showModal, setShowModal] = useState(false);
  const [pointsState, setPointsState] = useState(points);

  // exchangeState: null or { step: 'method'|'info'|'confirm'|'done', option, method, name, account }
  const [exchangeState, setExchangeState] = useState(null);

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.logo}>
          <img src="/Logo.png" alt="PIRU" style={{ height: 50, objectFit: 'contain' }} />
        </div>

        <nav style={styles.nav}>
          <Link to="/" style={{ textDecoration: "none", color: "#0b6b58", fontWeight: 600 }}>Assignment</Link>
          <Link to="/upload" style={{ textDecoration: "none", color: "#0b6b58", fontWeight: 700 }}>Upload</Link>
          <Link to="/profile" style={{ textDecoration: "none", color: "#000", fontWeight: 700 }}>Profile</Link>
        </nav>

        <div style={{ position: 'absolute', right: 28, top: '50%', transform: 'translateY(-50%)' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#0b6b58', color: '#fff', padding: '10px 18px', borderRadius: 30, border: 'none', cursor: 'pointer', fontWeight: 800 }} onMouseDown={(e) => e.preventDefault()}>
            <span style={{ width: 28, height: 28, borderRadius: 14, background: '#d6b77a', color: '#063b2f', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800 }}>👤</span>
            <span>Hi, Anonymus</span>
          </button>
        </div>
      </header>

      <main style={styles.content}>
        <div style={styles.topRow}>
          <div>
            <h2 style={{ margin: 0, fontSize: 32 }}>{points} Poin, Your Rank Now Is :</h2>
            <div style={{ marginTop: 8, fontWeight: 700, fontSize: 18 }}>Gold, Good Job !</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 380 }}>
              <div style={styles.progressBarWrap}>
                <div style={styles.progressTrack}>
                  <div style={{ ...styles.progressFill, width: `${progress}%` }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 12, color: "#666" }}>
                  {roadmapMilestones.map((m, i) => (
                    <span key={i}>{m} Poin</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <h3 style={{ margin: 0, fontSize: 18 }}>What is Poin Exchange?</h3>
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
              <div key={o.key} style={{ ...styles.bigCard, borderRadius: 12, padding: 20 }}>
                <div>
                  <div style={{ fontWeight: 800 }}>{o.points}</div>
                  <div style={{ opacity: 0.9, marginTop: 6 }}>Exchange to cash</div>
                </div>
                <div>
                  <button
                    style={styles.amountBtn}
                    onClick={() => {
                      // start exchange flow for this option
                      const numeric = parseInt(String(o.points).replace(/[^0-9]/g, ''), 10) || 0;
                      setExchangeState({ step: 'method', option: o, cost: numeric, method: '', name: 'Anonymus', account: '' });
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
                <li>Every time you perform certain activities in Peeru, you will earn points.</li>
                <li>These points can be exchanged for money.</li>
                <li>Points can be exchanged once a month.</li>
                <li>Each time you exchange a point, your points will be exchanged for a specific number of points. For example, if you exchange 1,000 points, your points will be reduced by 1,000.</li>
                <li>Warning! Your rank will decrease as your points decrease.</li>
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
                  {['ShopeePay', 'Gopay', 'Ovo', 'Bank', 'Dana', 'Link Aja'].map((m) => (
                    <button
                      key={m}
                      onClick={() => setExchangeState(prev => ({ ...prev, step: 'info', method: m }))}
                      style={{ padding: '10px 14px', borderRadius: 10, border: '1px solid #e6e6e6', background: '#f7f7f7', cursor: 'pointer', fontWeight: 700 }}
                    >
                      {m}
                    </button>
                  ))}
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
                    onClick={() => setExchangeState(prev => ({ ...prev, step: 'confirm' }))}
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
                      // simulate processing: deduct points and show done
                      setPointsState(prev => Math.max(0, prev - (exchangeState.cost || 0)));
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
          </div>
        </div>
      )}
    </div>
  );
};

export default ExchangePoin;
