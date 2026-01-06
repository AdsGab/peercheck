import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const BASE_API_URL = "http://localhost:4000/api";

const STYLES = {
  /* 🔥 Viewport Wrapper (Fixes Gray Background) */
  viewport: {
    width: "100vw",
    minHeight: "100vh",
    backgroundColor: "#ffffff",
    margin: 0,
    padding: 0,
    overflowX: "hidden",
    position: "absolute",
    top: 0,
    left: 0
  },

  page: { fontFamily: "'Inter', sans-serif", width: "100%" },

  /* HEADER & SUBHEADER */
  header: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 40px", borderBottom: "1px solid #ddd", backgroundColor: "#fff" },
  nav: { display: "flex", gap: 40 },
  navLink: { textDecoration: "none", color: "#000", fontWeight: 600, fontSize: "16px" },
  subHeader: { borderBottom: "1px solid #eee", padding: "25px 0", backgroundColor: "#fff" },
  subHeaderContent: { maxWidth: "1200px", margin: "0 auto", padding: "0 20px", display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: 800, fontSize: "16px", color: "#000" },

  /* REVIEWS CONTAINER */
  container: { maxWidth: "1200px", margin: "40px auto", padding: "0 20px", display: "flex", flexDirection: "column", gap: "30px" },

  /* REVIEW CARD STYLES */
  reviewCardWrapper: { backgroundColor: "#4CBFA6", borderRadius: "20px", padding: "15px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", position: 'relative' },
  reviewCardInner: { backgroundColor: "#E6E6E6", borderRadius: "15px", padding: "30px", display: "flex", gap: "30px", alignItems: "stretch" },
  
  leftCol: { width: "180px", flexShrink: 0, display: "flex", flexDirection: "column", gap: "5px" },
  avatar: { width: "60px", height: "60px", borderRadius: "50%", backgroundColor: "#fff", marginBottom: "10px" },
  userName: { fontWeight: 800, fontSize: "16px", color: "#000" },
  userRank: { fontWeight: 700, fontSize: "14px", color: "#000" },
  userPoints: { fontWeight: 700, fontSize: "14px", color: "#000" },
  rightCol: { flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" },
  
  content: { fontSize: "15px", lineHeight: "1.6", color: "#111", marginBottom: "30px", whiteSpace: "pre-wrap" },
  
  actionRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-end" },
  buttonGroup: { display: "flex", alignItems: "center", gap: "15px" },
  
  btnRating: { backgroundColor: "#436E62", color: "#fff", border: "none", borderRadius: "25px", padding: "10px 30px", fontWeight: 700, fontSize: "14px", cursor: "pointer" },
  btnComment: { backgroundColor: "transparent", border: "1px solid #000", color: "#000", borderRadius: "25px", padding: "10px 30px", fontWeight: 700, fontSize: "14px", cursor: "pointer" },
  btnCancel: { backgroundColor: "transparent", border: "1px solid #333", color: "#333", borderRadius: "25px", padding: "10px 30px", fontWeight: 700, fontSize: "14px", cursor: "pointer" },
  
  showCommentsLink: { fontSize: "13px", textDecoration: "underline", color: "#333", cursor: "pointer", marginLeft: "5px" },
  
  statsGroup: { textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "2px" },
  badgeText: { fontWeight: 800, fontSize: "14px", color: "#000", marginBottom: "2px" },
  rateCount: { fontWeight: 700, fontSize: "11px", color: "#000", marginTop: "2px" },

  /* COMMENTS LIST (Inside the card) */
  commentsSection: { marginTop: "20px", borderTop: "1px solid #ccc", paddingTop: "15px" },
  // 🔥 FIXED COLOR HERE: Added color: "#333"
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
    <div style={STYLES.overlayBackdrop} onClick={onClose}>
      <div style={STYLES.overlayContent} onClick={(e) => e.stopPropagation()}>
        <div style={{ ...STYLES.reviewCardWrapper, transform: "scale(1.02)" }}>
          <div style={STYLES.rateHeaderPill}>Rate This Answer &nbsp; +5 poin</div>
          <div style={STYLES.reviewCardInner}>
            <div style={STYLES.leftCol}>
              <div style={STYLES.avatar}></div>
              <div style={STYLES.userName}>{review.name}</div>
              <div style={STYLES.userRank}>{review.rank}</div>
              <div style={STYLES.userPoints}>{review.points} Poin</div>
            </div>
            <div style={STYLES.rightCol}>
              <div style={STYLES.content}>{review.content}</div>
              <div style={STYLES.starInteractiveArea}>
                <div style={STYLES.starRow} onMouseLeave={() => setHoverVal(0)}>
                  {[1, 2, 3, 4, 5].map((starIdx) => (
                    <span key={starIdx} style={{ ...STYLES.starLarge, color: starIdx <= hoverVal ? "#FFC107" : "#ccc" }} onMouseEnter={() => setHoverVal(starIdx)} onClick={() => onSubmit(starIdx)}>★</span>
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
    <div style={STYLES.overlayBackdrop} onClick={onClose}>
      <div style={STYLES.overlayContent} onClick={(e) => e.stopPropagation()}>
        <div style={STYLES.rateHeaderPill}>Leave a comment &nbsp; +5 poin</div>

        {/* Read-Only Review Card */}
        <div style={STYLES.reviewCardWrapper}>
          <div style={STYLES.reviewCardInner}>
            <div style={STYLES.leftCol}>
              <div style={STYLES.avatar}></div>
              <div style={STYLES.userName}>{review.name}</div>
              <div style={STYLES.userRank}>{review.rank}</div>
              <div style={STYLES.userPoints}>{review.points} Poin</div>
            </div>
            <div style={STYLES.rightCol}>
              <div style={{ textAlign: 'right', marginBottom: 10 }}>
                <div style={STYLES.badgeText}>{review.badge}</div>
                <Stars count={review.stars} />
                <div style={STYLES.rateCount}>{review.peopleRated} People Rate</div>
              </div>
              <div style={STYLES.content}>{review.content}</div>
            </div>
          </div>
        </div>

        {/* Input Card */}
        <div style={STYLES.reviewCardWrapper}>
          <div style={STYLES.reviewCardInner}>
            <div style={STYLES.commentInputArea}>
              <textarea 
                style={STYLES.textArea} 
                placeholder="Write your comment here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                autoFocus
              />
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-start' }}>
                <button style={STYLES.btnRating} onClick={handleSubmit} disabled={loading}>
                  {loading ? "Posting..." : "Comment"}
                </button>
                <button style={STYLES.btnCancel} onClick={onClose}>Cancel</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// --- SUCCESS MODAL ---
const SuccessModal = ({ title = "Thank For Rating !" }) => (
  <div style={STYLES.overlayBackdrop}>
    <div style={STYLES.successBox}>
      <div style={STYLES.successTitle}>{title}</div>
      <div style={STYLES.successSub}>+ 5 Poin</div>
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
      })
      .catch(err => console.error(err));
  }, [id]);

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
        setSuccessMsg("Thank For Rating !");
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
        setSuccessMsg("Thank For Comment !");
        setTimeout(() => setSuccessMsg(null), 2000);
      } else {
        alert("Failed to post comment");
      }
    } catch (err) {
      console.error(err);
      alert("Error posting comment");
    }
  };

  return (
    <div style={STYLES.viewport}>
      <div style={STYLES.page}>
        
        {/* HEADER */}
        <header style={STYLES.header}>
          <img src="/Logo.png" alt="Peeru" height={40} style={{ objectFit: 'contain' }} />
          <nav style={STYLES.nav}>
            <Link to="/dashboard" style={STYLES.navLink}>Assignment</Link>
            <Link to="/upload" style={STYLES.navLink}>Upload</Link>
            <Link to="/profile" style={STYLES.navLink}>Profile</Link>
          </nav>
          {/* 🔥 REMOVED GRAY CIRCLE DIV HERE */}
        </header>

        {/* SUB HEADER */}
        <div style={STYLES.subHeader}>
          <div style={STYLES.subHeaderContent}>
            <div>{taskInfo?.uploader_name || "Unknown"}</div>
            <div>{taskInfo?.jurusan || "Jurusan"}</div>
            <div>{taskInfo?.mata_kuliah || "Mata Kuliah"}</div>
            <div>{taskInfo?.tingkat || "Tingkat"}</div>
          </div>
        </div>

        {/* REVIEWS LIST */}
        <div style={STYLES.container}>
          {reviews.length > 0 ? (
            reviews.map((r, i) => (
              <div key={i} style={STYLES.reviewCardWrapper}>
                <div style={STYLES.reviewCardInner}>
                  <div style={STYLES.leftCol}>
                    <div style={STYLES.avatar}></div>
                    <div style={STYLES.userName}>{r.name}</div>
                    <div style={STYLES.userRank}>{r.rank}</div>
                    <div style={STYLES.userPoints}>{r.points} Poin</div>
                  </div>
                  <div style={STYLES.rightCol}>
                    <div style={STYLES.content}>{r.content || "No review content provided."}</div>
                    
                    <div style={STYLES.actionRow}>
                      <div style={STYLES.buttonGroup}>
                        <button style={STYLES.btnRating} onClick={() => setActiveRateReview(r)}>Rating</button>
                        <button style={STYLES.btnComment} onClick={() => setActiveCommentReview(r)}>Comment</button>
                        
                        {/* TOGGLE COMMENTS LINK */}
                        <span style={STYLES.showCommentsLink} onClick={() => toggleComments(r.id)}>
                          {expandedComments[r.id] ? "Hide Comments" : `Show Comments (${r.comments?.length || 0})`}
                        </span>
                      </div>
                      <div style={STYLES.statsGroup}>
                        <div style={STYLES.badgeText}>{r.badge}</div>
                        <Stars count={r.stars} />
                        <div style={STYLES.rateCount}>{r.peopleRated} People Rate</div>
                      </div>
                    </div>

                    {/* COMMENTS SECTION */}
                    {expandedComments[r.id] && r.comments && r.comments.length > 0 && (
                      <div style={STYLES.commentsSection}>
                        {r.comments.map((c, idx) => (
                          <div key={idx} style={STYLES.commentItem}>
                            <div style={STYLES.commentAuthor}>{c.commenter_name || "Anonymous"}</div>
                            <div>{c.content}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: "center", color: "#666", marginTop: 40 }}>No reviews available yet.</div>
          )}
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

        {successMsg && <SuccessModal title={successMsg} />}

      </div>
    </div>
  );
};

export default AssignmentReviewsPage;