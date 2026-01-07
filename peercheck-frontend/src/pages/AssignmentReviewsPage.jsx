import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const BASE_API_URL = "http://localhost:4000/api";

// --- CONSTANTS FOR CONSISTENT STYLING ---
const ACCENT_COLOR_LIGHT = "#4DF3C8";
const ACCENT_COLOR_DARK = "#063b2f"; 
const BG_COLOR = "#F8F8F8";
const CARD_BG = "white";
const TEXT_COLOR_PRIMARY = "#2C2C2C";
const TEXT_COLOR_SECONDARY = "#666";

const styles = { 
    header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', padding: '18px 28px', borderBottom: '1px solid #e6e6e6', background: CARD_BG, width: '100vw', boxSizing: 'border-box' },
    logo: { display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700, color: '#0b6b58' },
    nav: { display: 'flex', gap: 18, alignItems: 'center', position: 'absolute', left: '50%', transform: 'translateX(-50%)' },
    link: { color: '#0b6b58', textDecoration: 'none', fontWeight: 700 }, 
    hiButton: { display: 'flex', alignItems: 'center', gap: 12, background: '#0b6b58', color: '#fff', padding: '10px 18px', borderRadius: 30, border: 'none', cursor: 'pointer', fontWeight: 800 },
    hiIcon: { width: 28, height: 28, borderRadius: 14, background: '#d6b77a', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#063b2f' },
    
    // Page Layout
    page: { fontFamily: "'Inter', sans-serif", minHeight: "100vh", backgroundColor: BG_COLOR, width: "100%", display: 'flex', flexDirection: 'column' },
    mainContent: { padding: "28px", maxWidth: "1400px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "30px", flex: 1, width: '100%', boxSizing: 'border-box' },
    
    // Task Info Strip
    topStrip: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: "20px", fontWeight: 700, fontSize: "14px" },
    userInfo: { display: 'flex', alignItems: 'center', gap: '15px', flex: 1 },
    avatarCircle: { width: '50px', height: '50px', backgroundColor: '#d6b77a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '24px', color: '#063b2f' },
    infoTags: { display: 'flex', gap: '12px', alignItems: 'center' },
    infoTag: { background: ACCENT_COLOR_DARK, color: '#fff', padding: '8px 16px', borderRadius: '12px', fontWeight: 600, fontSize: '14px' },

    // --- Review Specific Styles ---
    reviewCardWrapper: { backgroundColor: "#4CBFA6", borderRadius: "20px", padding: "15px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", position: 'relative' },
    reviewCardInner: { backgroundColor: "#E6E6E6", borderRadius: "15px", padding: "30px", display: "flex", gap: "30px", alignItems: "stretch" },
    
    leftCol: { width: "180px", flexShrink: 0, display: "flex", flexDirection: "column", gap: "5px" },
    reviewAvatar: { width: "60px", height: "60px", borderRadius: "50%", backgroundColor: "#d6b77a", marginBottom: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "30px", color: "#063b2f" },
    userName: { fontWeight: 800, fontSize: "16px", color: "#000" },
    userRank: { fontWeight: 700, fontSize: "14px", color: "#000" },
    userPoints: { fontWeight: 700, fontSize: "14px", color: "#000" },
    rightCol: { flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" },
    
    content: { fontSize: "15px", lineHeight: "1.6", color: "#111", marginBottom: "30px", whiteSpace: "pre-wrap" },
    
    actionRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-end" },
    buttonGroup: { display: "flex", alignItems: "center", gap: "15px" },
    
    btnRating: { backgroundColor: "#436E62", color: "#fff", border: "none", borderRadius: "25px", padding: "10px 30px", fontWeight: 700, fontSize: "14px", cursor: "pointer" },
    btnComment: { backgroundColor: "transparent", border: "1px solid #000", color: "#000", borderRadius: "25px", padding: "10px 30px", fontWeight: 700, fontSize: "14px", cursor: "pointer" },
    btnDisabled: { backgroundColor: "#ccc", color: "#666", border: "none", borderRadius: "25px", padding: "10px 30px", fontWeight: 700, fontSize: "14px", cursor: "not-allowed" },
    btnCancel: { backgroundColor: "transparent", border: "1px solid #333", color: "#333", borderRadius: "25px", padding: "10px 30px", fontWeight: 700, fontSize: "14px", cursor: "pointer" },
    
    showCommentsLink: { fontSize: "13px", textDecoration: "underline", color: "#333", cursor: "pointer", marginLeft: "5px" },
    
    statsGroup: { textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "2px" },
    badgeText: { fontWeight: 800, fontSize: "14px", color: "#000", marginBottom: "2px" },
    rateCount: { fontWeight: 700, fontSize: "11px", color: "#000", marginTop: "2px" },

    /* COMMENTS LIST (Inside the card) */
    commentsSection: { marginTop: "20px", borderTop: "1px solid #ccc", paddingTop: "15px" },
    commentItem: { marginBottom: "10px", padding: "10px", backgroundColor: "#f9f9f9", borderRadius: "10px", fontSize: "14px", color: "#333" },
    commentAuthor: { fontWeight: 700, fontSize: "13px", marginBottom: "4px", color: "#0b6b58" },

    /* OVERLAY STYLES */
    overlayBackdrop: { position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.7)", zIndex: 1000, display: "flex", justifyContent: "center", alignItems: "center" },
    overlayContent: { width: "100%", maxWidth: "1200px", padding: "0 20px", display: "flex", flexDirection: "column", gap: "20px", position: "relative" },
    
    rateHeaderPill: { position: "absolute", top: "-25px", left: "50%", transform: "translateX(-50%)", backgroundColor: "#436E62", color: "#fff", padding: "10px 40px", borderRadius: "30px", fontWeight: 800, fontSize: "14px", zIndex: 10, boxShadow: "0 4px 10px rgba(0,0,0,0.2)" },
    
    starInteractiveArea: { display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" },
    starRow: { display: "flex", gap: "15px", cursor: "pointer" },
    starLarge: { fontSize: "32px", transition: "transform 0.2s" },
    
    commentInputArea: { display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' },
    textArea: { width: '100%', border: 'none', background: 'transparent', outline: 'none', fontSize: '16px', minHeight: '100px', fontFamily: 'inherit', resize: 'none', color: '#000' },

    successBox: { backgroundColor: "#4CBFA6", width: "300px", height: "200px", borderRadius: "20px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", boxShadow: "0 10px 25px rgba(0,0,0,0.3)", color: "#fff", textAlign: "center" },
    successTitle: { fontWeight: 800, fontSize: "20px", marginBottom: "10px" },
    successSub: { fontWeight: 700, fontSize: "16px" }
};

function HiButton() {
    const navigate = useNavigate();
    const { user } = useAuth();
    return (
        <button onClick={() => navigate('/profile', { state: { tab: 'edit' } })} style={styles.hiButton}>
            <span style={styles.hiIcon}>👤</span>
            <span>Hi, {user?.username || 'Guest'}</span>
        </button>
    );
}

function AppNavbar({ activePage }) {
    const linkStyle = (page) => ({ ...styles.link, textDecoration: 'none', color: activePage === page ? '#000' : styles.link.color, fontWeight: 700 });
    return (
        <header style={styles.header}>
            <div style={styles.logo}>
                <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="/Logo.png" alt="PIRU" style={{ height: 50, objectFit: 'contain' }} />
                </Link>
            </div>
            <nav style={styles.nav}>
                <Link to="/dashboard" style={linkStyle('assignment')}>Assignment</Link>
                <Link to="/upload" style={linkStyle('upload')}>Upload</Link>
                <Link to="/profile" style={linkStyle('profile')}>Profile</Link>
            </nav>
            <div style={{ position: 'absolute', right: 28, top: '50%', transform: 'translateY(-50%)' }}><HiButton /></div>
        </header>
    );
}

const Stars = ({ count }) => (
  <div style={{ display: "flex", gap: "3px" }}>
    {[...Array(5)].map((_, i) => (
      <span key={i} style={{ color: i < count ? "#FFC107" : "transparent", textShadow: i >= count ? "0 0 0 #000" : "none", fontSize: "18px" }}>{i < count ? "★" : "☆"}</span>
    ))}
  </div>
);

// --- HELPER: Rank Logic ---
const getRankLabel = (points) => {
  if (points >= 10000) return "Expert";
  if (points >= 3000) return "Challenger";
  if (points >= 1500) return "Diamond";
  if (points >= 1000) return "Gold";
  if (points >= 500) return "Silver";
  return "Bronze";
};

// --- RATING OVERLAY ---
const RatingOverlay = ({ review, onClose, onSubmit }) => {
  const [hoverVal, setHoverVal] = useState(0);
  return (
    <div style={styles.overlayBackdrop} onClick={onClose}>
      <div style={styles.overlayContent} onClick={(e) => e.stopPropagation()}>
        <div style={{ ...styles.reviewCardWrapper, transform: "scale(1.02)" }}>
          <div style={styles.rateHeaderPill}>Rate This Answer &nbsp; +5 poin</div>
          <div style={styles.reviewCardInner}>
            <div style={styles.leftCol}>
              <div style={styles.reviewAvatar}>👤</div>
              <div style={styles.userName}>{review.name}</div>
              <div style={styles.userRank}>{review.rank}</div>
              <div style={styles.userPoints}>{review.points} Poin</div>
            </div>
            <div style={styles.rightCol}>
              <div style={styles.content}>{review.content}</div>
              <div style={styles.starInteractiveArea}>
                <div style={styles.starRow} onMouseLeave={() => setHoverVal(0)}>
                  {[1, 2, 3, 4, 5].map((starIdx) => (
                    <span key={starIdx} style={{ ...styles.starLarge, color: starIdx <= hoverVal ? "#FFC107" : "#ccc" }} onMouseEnter={() => setHoverVal(starIdx)} onClick={() => onSubmit(starIdx)}>★</span>
                  ))}
                </div>
                <div style={{ fontWeight: 700, marginTop: 10, fontSize: '14px', color: '#333' }}>
                   {hoverVal > 0 ? (hoverVal === 5 ? "Perfect !" : "Good") : "Click to Rate"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- COMMENT OVERLAY ---
const CommentOverlay = ({ review, onClose, onSubmit }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setLoading(true);
    await onSubmit(text);
    setLoading(false);
  };

  return (
    <div style={styles.overlayBackdrop} onClick={onClose}>
      <div style={styles.overlayContent} onClick={(e) => e.stopPropagation()}>
        <div style={styles.rateHeaderPill}>Leave a comment &nbsp; +5 poin</div>

        {/* Read-Only Review Card */}
        <div style={styles.reviewCardWrapper}>
          <div style={styles.reviewCardInner}>
            <div style={styles.leftCol}>
              <div style={styles.reviewAvatar}>👤</div>
              <div style={styles.userName}>{review.name}</div>
              <div style={styles.userRank}>{review.rank}</div>
              <div style={styles.userPoints}>{review.points} Poin</div>
            </div>
            <div style={styles.rightCol}>
              <div style={{ textAlign: 'right', marginBottom: 10 }}>
                <div style={styles.badgeText}>{review.badge}</div>
                <Stars count={review.stars} />
                <div style={styles.rateCount}>{review.peopleRated} People Rate</div>
              </div>
              <div style={styles.content}>{review.content}</div>
            </div>
          </div>
        </div>

        {/* Input Card */}
        <div style={styles.reviewCardWrapper}>
          <div style={styles.reviewCardInner}>
            <div style={styles.commentInputArea}>
              <textarea 
                style={styles.textArea} 
                placeholder="Write your comment here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                autoFocus
              />
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-start' }}>
                <button style={styles.btnRating} onClick={handleSubmit} disabled={loading}>
                  {loading ? "Posting..." : "Comment"}
                </button>
                <button style={styles.btnCancel} onClick={onClose}>Cancel</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// --- SUCCESS MODAL ---
const SuccessModal = ({ title = "Thank For Rating !", points = "+ 5 Poin" }) => (
  <div style={styles.overlayBackdrop}>
    <div style={styles.successBox}>
      <div style={styles.successTitle}>{title}</div>
      {points && <div style={styles.successSub}>{points}</div>}
    </div>
  </div>
);

// --- MAIN COMPONENT ---
const AssignmentReviewsPage = () => {
  const { id } = useParams();
  const { user } = useAuth() || {};

  const [reviews, setReviews] = useState([]);
  const [taskInfo, setTaskInfo] = useState(null);
  const [expandedComments, setExpandedComments] = useState({}); 

  // Interactions
  const [activeRateReview, setActiveRateReview] = useState(null);
  const [activeCommentReview, setActiveCommentReview] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [hasGainedPoints, setHasGainedPoints] = useState(false);

  // FETCH DATA
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(`${BASE_API_URL}/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => {
        setTaskInfo(data);
        
        // Map backend data to UI structure
        const enrichedReviews = (data.answers || []).map((r, i) => {
          const points = r.reviewer_points || 0;
          return {
            ...r,
            name: r.reviewer_name || "Unknown User",
            rank: getRankLabel(points),
            points: points,
            
            // ⭐ REAL RATING DATA
            stars: r.average_rating || 0, 
            peopleRated: r.rating_count || 0,
            badge: (r.average_rating >= 4) ? "Trusted Answer" : "Decent Answer",
            
            // ⭐ REAL COMMENTS DATA
            comments: r.comments || [] 
          };
        });
        setReviews(enrichedReviews);
        
        // Check if user has already commented on any review to initialize point state (approximate)
        if (user) {
            const alreadyCommented = enrichedReviews.some(r => 
                r.comments && r.comments.some(c => c.commenter_name === user.username)
            );
            if (alreadyCommented) {
                setHasGainedPoints(true);
            }
        }
      })
      .catch(err => console.error(err));
  }, [id, user]);

  // TOGGLE COMMENTS
  const toggleComments = (reviewId) => {
    setExpandedComments(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
  };

  // SUBMIT RATING
  const handleRateSubmit = async (score) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${BASE_API_URL}/tasks/answers/${activeRateReview.id}/rate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ score: score })
      });

      if (res.ok) {
        // Optimistic Update
        setReviews(prev => prev.map(r => {
          if (r.id === activeRateReview.id) {
            return { 
                ...r, 
                stars: score, 
                peopleRated: r.peopleRated + 1, 
                badge: score >= 4 ? "Trusted Answer" : "Decent Answer" 
            };
          }
          return r;
        }));

        setActiveRateReview(null);
        
        // Point Logic
        if (!hasGainedPoints) {
            setSuccessMsg({ title: "Thank For Rating !", points: "+ 5 Poin" });
            setHasGainedPoints(true);
        } else {
            setSuccessMsg({ title: "Rating Submitted !", points: null });
        }
        
        setTimeout(() => setSuccessMsg(null), 2000);
      } else {
        alert("Failed to submit rating");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting rating");
    }
  };

  // SUBMIT COMMENT
  const handleCommentSubmit = async (text) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${BASE_API_URL}/tasks/answers/${activeCommentReview.id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ content: text })
      });

      if (res.ok) {
        // Optimistic Update
        const newComment = {
            id: Date.now(), // Temp ID
            content: text,
            commenter_name: user?.username || "You",
            created_at: new Date().toISOString()
        };

        setReviews(prev => prev.map(r => {
            if (r.id === activeCommentReview.id) {
                return { ...r, comments: [...(r.comments || []), newComment] };
            }
            return r;
        }));

        setActiveCommentReview(null);
        
        // Point Logic
        if (!hasGainedPoints) {
            setSuccessMsg({ title: "Thank For Comment !", points: "+ 5 Poin" });
            setHasGainedPoints(true);
        } else {
            setSuccessMsg({ title: "Comment Posted !", points: null });
        }
        
        setTimeout(() => setSuccessMsg(null), 2000);
      } else {
        alert("Failed to post comment");
      }
    } catch (err) {
      console.error(err);
      alert("Error posting comment");
    }
  };
  
  const isTaskOwner = user?.username === taskInfo?.uploader_name;

  return (
    <div style={styles.page}>
        
        {/* HEADER */}
        <AppNavbar activePage="assignment" />

        <div style={styles.mainContent}>

          {/* 1. TOP STRIP: User Info + Tags (MATCHES DETAILS PAGE) */}
          <div style={styles.topStrip}>
              <div style={styles.userInfo}>
                  <div style={styles.avatarCircle}>
                      👤
                  </div>
                  <span style={{ color: '#000', fontWeight: 'bold', fontSize: '16px' }}>{taskInfo?.uploader_name || "Unknown Uploader"}</span>
                  <span style={{ color: TEXT_COLOR_SECONDARY, fontWeight: 400 }}>•</span>
                  <span style={{ color: TEXT_COLOR_SECONDARY, fontWeight: 400 }}>{taskInfo?.created_at ? new Date(taskInfo.created_at).toLocaleDateString() : ""}</span>
              </div>
              
              <div style={styles.infoTags}>
                  <div style={styles.infoTag}>{taskInfo?.jurusan || "Jurusan"}</div>
                  <div style={styles.infoTag}>{taskInfo?.mata_kuliah || "Mata Kuliah"}</div>
                  <div style={styles.infoTag}>{taskInfo?.tingkat || "Tingkat"}</div>
              </div>
          </div>

          <h2 style={{ margin: "20px 0 10px 0", color: "#0b6b58", fontWeight: "bold" }}>Reviews</h2>

          {/* REVIEWS LIST */}
          <div>
            {reviews.length > 0 ? (
              reviews.map((r, i) => {
                  const isMyReview = user && (r.name === user.username);
                  const canInteract = !isTaskOwner && !isMyReview;

                  return (
                    <div key={i} style={styles.reviewCardWrapper}>
                      <div style={styles.reviewCardInner}>
                        <div style={styles.leftCol}>
                          <div style={styles.reviewAvatar}>👤</div>
                          <div style={styles.userName}>{r.name}</div>
                          <div style={styles.userRank}>{r.rank}</div>
                          <div style={styles.userPoints}>{r.points} Poin</div>
                        </div>
                        <div style={styles.rightCol}>
                          <div style={styles.content}>{r.content || "No review content provided."}</div>
                          
                          <div style={styles.actionRow}>
                            <div style={styles.buttonGroup}>
                              {canInteract ? (
                                  <>
                                    <button style={styles.btnRating} onClick={() => setActiveRateReview(r)}>Rating</button>
                                    <button style={styles.btnComment} onClick={() => setActiveCommentReview(r)}>Comment</button>
                                  </>
                              ) : (
                                  <button style={styles.btnDisabled} disabled>
                                      {isTaskOwner ? "No interact (Owner)" : "Your Answer"}
                                  </button>
                              )}
                              
                              <span style={styles.showCommentsLink} onClick={() => toggleComments(r.id)}>
                                {expandedComments[r.id] ? "Hide Comments" : `Show Comments (${r.comments?.length || 0})`}
                              </span>
                            </div>
                            <div style={styles.statsGroup}>
                              <div style={styles.badgeText}>{r.badge}</div>
                              <Stars count={r.stars} />
                              <div style={styles.rateCount}>{r.peopleRated} People Rate</div>
                            </div>
                          </div>

                          {/* COMMENTS SECTION */}
                          {expandedComments[r.id] && r.comments && r.comments.length > 0 && (
                            <div style={styles.commentsSection}>
                              {r.comments.map((c, idx) => (
                                <div key={idx} style={styles.commentItem}>
                                  <div style={styles.commentAuthor}>{c.commenter_name || "Anonymous"}</div>
                                  <div>{c.content}</div>
                                  {user && c.commenter_name === user.username && (
                                     <div style={{fontSize:'10px', color: '#888', fontStyle: 'italic'}}>You</div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
              })
            ) : (
              <div style={{ textAlign: "center", color: "#666", marginTop: 40 }}>No reviews available yet.</div>
            )}
          </div>
        </div>

        {/* MODALS */}
        {activeRateReview && (
          <RatingOverlay 
            review={activeRateReview} 
            onClose={() => setActiveRateReview(null)} 
            onSubmit={handleRateSubmit} 
          />
        )}

        {activeCommentReview && (
          <CommentOverlay 
            review={activeCommentReview} 
            onClose={() => setActiveCommentReview(null)} 
            onSubmit={handleCommentSubmit} 
          />
        )}

        {successMsg && <SuccessModal title={successMsg.title} points={successMsg.points} />}

    </div>
  );
};

export default AssignmentReviewsPage;