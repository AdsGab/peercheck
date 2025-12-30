import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const EditProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [uploadMsg, setUploadMsg] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const styles = {
    page: { fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto", minHeight: "100vh", width: "100vw", display: "flex", flexDirection: "column", background: "#ffffff", color: "#0b1a1a" },
    header: { display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", padding: "18px 28px", borderBottom: "1px solid #e6e6e6", background: "#ffffff", width: "100vw", boxSizing: "border-box", zIndex: 50 },
    logo: { display: "flex", alignItems: "center", gap: 10, fontWeight: 700, color: "#0b6b58" },
    nav: { display: "flex", gap: 18, alignItems: "center", position: "absolute", left: "50%", transform: "translateX(-50%)" },
    content: { maxWidth: 600, margin: "28px auto", padding: "0 18px", boxSizing: "border-box", width: "100%", position: "relative", zIndex: 1 },
    hiButton: { display: "flex", alignItems: "center", gap: 12, background: "#0b6b58", color: "#fff", padding: "10px 18px", borderRadius: 30, border: "none", cursor: "pointer", fontWeight: 800, outline: "none", boxShadow: "none" },
    hiIcon: { width: 28, height: 28, borderRadius: 14, background: "#d6b77a", color: "#063b2f", display: "inline-flex", alignItems: "center", justifyContent: "center" }
  };

  // Create object URL for preview when `selectedFile` changes and clean up previous URL
  useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [selectedFile]);

  function closeUploadModal() {
    setSelectedFile(null);
    setShowUploadModal(false);
    setUploadMsg('');
  }

  // Convert file to base64 string (used for localStorage fallback)
  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }

  async function handleConfirmUpload(file) {
    if (!file) return;
    setUploadMsg('Saving...');
    try {
      const b64 = await fileToBase64(file);
      const pending = { ts: Date.now(), fileName: file.name, dataUrl: b64 };
      localStorage.setItem('profilePhotoPending', JSON.stringify(pending));
      setUploadMsg('Saved locally. Photo will be uploaded when backend is available.');
      setSelectedFile(null);
      setShowUploadModal(false);
    } catch (e) {
      setUploadMsg('Failed to store photo locally.');
    }
  }

  async function handleSaveProfile() {
    // Save profile fields; if a selected file exists, persist it locally as pending
    if (!selectedFile) {
      setUploadMsg('Profile saved (no photo change).');
      return;
    }

    setUploading(true);
    setUploadMsg('Saving photo...');
    try {
      const b64 = await fileToBase64(selectedFile);
      const pending = { ts: Date.now(), fileName: selectedFile.name, dataUrl: b64 };
      localStorage.setItem('profilePhotoPending', JSON.stringify(pending));
      setUploadMsg('Saved locally. Photo will be uploaded when backend is available.');
      setSelectedFile(null);
      setPreviewUrl(null);
      setShowUploadModal(false);
    } catch (e) {
      setUploadMsg('Failed to store photo locally.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.logo}>
          <img src="/Logo.png" alt="PIRU" style={{ height: 50, objectFit: 'contain' }} />
        </div>

        <nav style={styles.nav}>
          <Link to="/dashboard" style={{ textDecoration: "none", color: "#0b6b58", fontWeight: 700 }}>Assignment</Link>
          <Link to="/upload" style={{ textDecoration: "none", color: "#0b6b58", fontWeight: 700 }}>Upload</Link>
          <Link to="/profile" style={{ textDecoration: "none", color: "#0b6b58", fontWeight: 700 }}>Profile</Link>
        </nav>

        <div style={{ position: 'absolute', right: 28, top: '50%', transform: 'translateY(-50%)' }}>
           <HiButton />
        </div>
      </header>

      <main style={styles.content}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ background: "#ffffff", padding: 24, borderRadius: 16, boxShadow: "0 12px 28px rgba(0,0,0,0.12)", maxWidth: 600, width: '100%', display: "flex", flexDirection: "column", gap: 18 }}>
            
            <h2 style={{ margin: 0, color: "#063b2f" }}>Edit Profile</h2>

            {/* AVATAR */}
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" style={{ width: 75, height: 75, borderRadius: 40, objectFit: "cover", boxShadow: "0 4px 14px rgba(0,0,0,0.18)" }} />
              ) : (
                <div style={{ width: 75, height: 75, borderRadius: 40, background: "#e9fff4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>👤</div>
              )}

              <div>
                <div style={{ fontWeight: 800, fontSize: 18, color: "#063b2f" }}>Hi, {user?.username || 'Anonymus'}</div>

                <button
                  onClick={() => setShowUploadModal(true)}
                  style={{ marginTop: 8, padding: "8px 12px", borderRadius: 10, background: "#1BC9A2", border: "none", color: "#063b2f", fontWeight: 700, cursor: "pointer", transition: "all 220ms ease", boxShadow: "0 4px 10px rgba(27,201,162,0.25)" }}
                  onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                  onMouseLeave={(e) => e.target.style.transform = "scale(1.0)"}
                >
                  Change Photo
                </button>
              </div>
            </div>

            {/* INPUTS */}
            <input placeholder="Name" defaultValue={user?.username || "Anonymus"} style={{ padding: 14, borderRadius: 12, border: "1px solid #d4e7df", background: "#f7fffc", color: "#063b2f", fontWeight: 600, boxShadow: "0 3px 10px rgba(0,0,0,0.06)" }} />

            <input placeholder="Email" defaultValue={user?.email || "anonymus@gmail.com"} style={{ padding: 14, borderRadius: 12, border: "1px solid #d4e7df", background: "#f7fffc", color: "#063b2f", fontWeight: 600, boxShadow: "0 3px 10px rgba(0,0,0,0.06)" }} />

            <input placeholder="Password" type="password" defaultValue="password1234" style={{ padding: 14, borderRadius: 12, border: "1px solid #d4e7df", background: "#f7fffc", color: "#063b2f", fontWeight: 600, boxShadow: "0 3px 10px rgba(0,0,0,0.06)" }} />

            {/* BUTTONS */}
            <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
              <button
                onClick={() => setShowSaveConfirm(true)}
                style={{ flex: 1, padding: "12px 18px", borderRadius: 14, background: "#0b6b58", color: "#fff", border: "none", fontWeight: 800, cursor: "pointer", transition: "all 240ms ease", boxShadow: "0 6px 18px rgba(0,0,0,0.18)" }}
                onMouseEnter={(e) => e.target.style.transform = "translateY(-3px)"}
                onMouseLeave={(e) => e.target.style.transform = "translateY(0px)"}
              >
                Save
              </button>

              <button
                onClick={() => { try { logout && logout(); } catch (_) { }; localStorage.removeItem('token'); navigate('/login'); }}
                style={{ flex: 1, padding: "12px 18px", borderRadius: 14, background: "#fff", color: "#063b2f", border: "1px solid #c7d8d3", fontWeight: 800, cursor: "pointer", transition: "all 240ms ease", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                onMouseEnter={(e) => e.target.style.transform = "translateY(-3px)"}
                onMouseLeave={(e) => e.target.style.transform = "translateY(0px)"}
              >
                Log Out
              </button>
            </div>

            {uploadMsg && (<div style={{ fontSize: 13, color: "#444", marginTop: 6 }}>{uploadMsg}</div>)}

          </div>
        </div>

        {/* Upload modal for changing photo */}
        {showUploadModal && (
          <UploadModal
            onClose={closeUploadModal}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            onConfirm={handleConfirmUpload}
          />
        )}

        {/* Save confirmation modal */}
        {showSaveConfirm && (
          <SaveConfirmModal onClose={() => setShowSaveConfirm(false)} onConfirm={async () => { await handleSaveProfile(); setShowSaveConfirm(false); }} />
        )}
      </main>
    </div>
  );
};

// Upload modal used when user clicks 'Change Photo' in edit panel
function UploadModal({ onClose, selectedFile, setSelectedFile, onConfirm }) {
  const overlay = { position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#02B692cc', zIndex: 1400 };
  const modal = { width: 'min(720px, 92%)', background: 'transparent', borderRadius: 12, padding: 20, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center' };
  const inner = { width: '100%', background: '#e7e7e7', borderRadius: 12, padding: 28, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 };
  const drop = { width: '100%', maxWidth: 640, height: 220, borderRadius: 10, background: '#efefef', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexDirection: 'column', gap: 12, border: '2px dashed rgba(0,0,0,0.06)' };
  const confirmBtn = { marginTop: 10, padding: '10px 26px', borderRadius: 12, background: '#02B692', color: '#063b2f', border: 'none', fontWeight: 700, cursor: 'pointer' };

  function handleDrop(e) {
    e.preventDefault();
    const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
    if (f) setSelectedFile(f);
  }

  function handleDragOver(e) { e.preventDefault(); }

  function handleFileChange(e) {
    const f = e.target.files && e.target.files[0];
    if (f) setSelectedFile(f);
  }

  return (
    <div style={overlay} role="dialog" aria-label="Upload photo modal" onClick={onClose}>
      <div style={modal} onClick={(e) => e.stopPropagation()}>
        <div style={inner}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontWeight: 800 }}>Upload Photo</div>
            <button onClick={onClose} style={{ background: '#063b2f', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: 8, cursor: 'pointer' }}>Close</button>
          </div>

          <div
            style={drop}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById('profile-upload-input') && document.getElementById('profile-upload-input').click()}
            aria-label="Select or drag image"
          >
            {selectedFile && selectedFile.type && selectedFile.type.startsWith('image/') ? (
              <img src={URL.createObjectURL(selectedFile)} alt="preview" style={{ maxHeight: 160, maxWidth: '100%', borderRadius: 8 }} />
            ) : (
              <>
                <div style={{ fontSize: 28 }}>⬆️</div>
                <div style={{ fontWeight: 700 }}>Upload Image</div>
                <div style={{ fontSize: 13, color: '#666' }}>Select or drag an image here</div>
              </>
            )}
            <input id="profile-upload-input" type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
          </div>

          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={() => { onConfirm && onConfirm(selectedFile); }}
              style={confirmBtn}
              disabled={!selectedFile}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Small confirmation modal for Save action
function SaveConfirmModal({ onClose, onConfirm }) {
  const overlay = { position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(2,182,146,0.35)', zIndex: 1400 };
  const box = { width: 380, background: '#e7fff4', borderRadius: 12, padding: 20, boxSizing: 'border-box', textAlign: 'center', color: '#063b2f' };
  const btnRow = { display: 'flex', justifyContent: 'center', gap: 12, marginTop: 12 };
  const okBtn = { background: '#02B692', color: '#063b2f', padding: '8px 18px', borderRadius: 10, border: 'none', fontWeight: 800, cursor: 'pointer' };
  const cancelBtn = { background: '#fff', color: '#063b2f', padding: '8px 18px', borderRadius: 10, border: '1px solid #ccc', cursor: 'pointer' };

  return (
    <div style={overlay} onClick={onClose} role="dialog" aria-label="Save confirmation">
      <div style={box} onClick={(e) => e.stopPropagation()}>
        <div style={{ fontWeight: 900, fontSize: 18 }}>Confirm Save</div>
        <div style={{ marginTop: 8, color: '#0b6b58' }}>Do you want to save the changes to your profile?</div>
        <div style={btnRow}>
          <button onClick={() => { onConfirm && onConfirm(); onClose && onClose(); }} style={okBtn}>Yes, Save</button>
          <button onClick={onClose} style={cancelBtn}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

function HiButton() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <button 
        onClick={() => setShowDropdown(!showDropdown)} 
        style={{ display: "flex", alignItems: "center", gap: 12, background: "#0b6b58", color: "#fff", padding: "10px 18px", borderRadius: 30, border: "none", cursor: "pointer", fontWeight: 800, outline: "none", boxShadow: "none" }} 
        aria-label="Open profile menu"
      >
        <span style={{ width: 28, height: 28, borderRadius: 14, background: "#d6b77a", color: "#063b2f", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>👤</span>
        <span>Hi, {user?.username || 'Anonymus'}</span>
      </button>
      
      {showDropdown && (
        <div style={{ position: 'absolute', top: '110%', right: 0, background: '#fff', borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.15)', padding: 8, minWidth: 160, zIndex: 2000 }}>
          <div 
            onClick={() => navigate('/edit-profile')}
            style={{ padding: '10px 12px', cursor: 'pointer', fontWeight: 600, color: '#063b2f', borderRadius: 8, transition: 'background 0.2s' }}
            onMouseEnter={(e) => e.target.style.background = '#e7fff6'}
            onMouseLeave={(e) => e.target.style.background = 'transparent'}
          >
            Edit Profile
          </div>
          <div 
            onClick={() => { try { logout && logout(); } catch (_) { }; localStorage.removeItem('token'); navigate('/login'); }}
            style={{ padding: '10px 12px', cursor: 'pointer', fontWeight: 600, color: '#d32f2f', borderRadius: 8, transition: 'background 0.2s' }}
            onMouseEnter={(e) => e.target.style.background = '#ffebee'}
            onMouseLeave={(e) => e.target.style.background = 'transparent'}
          >
            Log Out
          </div>
        </div>
      )}
    </div>
  );
}

export default EditProfilePage;
