import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UploadPage = () => {
  const fileInputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState([]); // {id, file, name, editing}
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [mataKuliah, setMataKuliah] = useState("");
  const [tingkat, setTingkat] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null); // 'jurusan' | 'mata' | 'tingkat' | null

  const makeFileEntry = (f) => ({ id: `${Date.now()}-${Math.random().toString(36).slice(2,9)}`, file: f, name: f.name, editing: false });

  const truncate = (s, n = 30) => {
    if (!s) return s;
    return s.length > n ? s.slice(0, n) + '...' : s;
  };

  const handleFiles = (fileList) => {
    if (!fileList) return;
    const arr = Array.from(fileList).map((f) => makeFileEntry(f));
    setFiles((prev) => [...prev, ...arr]);
  };

  const handleFileChange = (e) => {
    handleFiles(e.target.files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const openFilePicker = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const clearFile = () => {
    setFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const styles = {
    page: {
      fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto",
      minHeight: "100vh",
      width: "100vw", // ensure full-bleed so body centering doesn't shrink us
      display: "flex",
      flexDirection: "column",
      background: "#fff",
      color: "#0b1a1a",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: 'relative',
      padding: "18px 28px",
      borderBottom: "1px solid #e6e6e6",
    },
    logo: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontWeight: 700,
      color: "#0b6b58",
    },
    nav: {
      display: "flex",
      gap: 18,
      alignItems: "center",
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
    },
    container: {
      display: "flex",
      gap: 32,
      padding: 28,
      flex: 1,
      boxSizing: "border-box",
      alignItems: "flex-start",
      flexWrap: "wrap",
      maxWidth: 1200,
      margin: "0 auto",
    },
    leftCard: {
      flex: "0 1 520px",
      background: "#06b08e",
      borderRadius: 12,
      padding: 18,
      boxSizing: "border-box",
      color: "#fff",
      minHeight: 420,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    headingDrop: { textAlign: "center", fontWeight: 700, marginBottom: 12, color: "#063b2f" },
    dropArea: {
      // outer area (green background) - keep as clickable wrapper
      borderRadius: 12,
      padding: 12,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      width: "100%",
      boxSizing: "border-box",
    },
    dropInner: {
      background: dragOver ? "#f1f1f1" : "#e9e9e9",
      borderRadius: 14,
      height: 320,
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      color: "#063b2f",
      boxSizing: "border-box",
      padding: 18,
    },
    plus: { fontSize: 48, color: "#063b2f", opacity: 0.95, marginBottom: 6 },
    small: { fontSize: 13, opacity: 0.85, color: "#063b2f" },
    controls: { display: "flex", gap: 12, alignItems: "center" },
    btnPrimary: {
      background: "#055b47",
      color: "#fff",
      padding: "10px 18px",
      borderRadius: 22,
      border: "none",
      cursor: "pointer",
    },
    btnPrimaryIcon: { display: "inline-flex", alignItems: "center", gap: 8 },
    btnGhost: {
      background: "rgba(255,255,255,0.12)",
      color: "#fff",
      padding: "8px 14px",
      borderRadius: 22,
      border: "none",
      cursor: "pointer",
    },
    iconBtn: { background: "transparent", border: "none", padding: 6, borderRadius: 6, cursor: 'pointer', color: '#063b2f' },
  smallLink: { color: "#063b2f", textDecoration: "underline", fontWeight: 600, display: "inline-flex", gap: 8, alignItems: "center", background: "transparent", border: "none", padding: 0, cursor: "pointer" },
  pillsRow: { display: "flex", gap: 12, alignItems: "center", marginBottom: 8 },
  pill: { background: "#2f6b5f", color: "#fff", padding: "10px 20px", borderRadius: 20, minWidth: 160, textAlign: "center", cursor: "pointer" },
  dropdown: { position: "absolute", marginTop: 8, background: "#fff", color: "#063b2f", borderRadius: 8, boxShadow: "0 6px 18px rgba(0,0,0,0.08)", padding: 8, zIndex: 40, minWidth: 220 },
  dropdownItem: { padding: "8px 10px", borderRadius: 6, cursor: "pointer" },
  hiButton: { display: 'flex', alignItems: 'center', gap: 12, background: '#0b6b58', color: '#fff', padding: '10px 18px', borderRadius: 30, border: 'none', cursor: 'pointer', fontWeight: 800 },
  hiIcon: { width: 28, height: 28, borderRadius: 14, background: '#d6b77a', color: '#063b2f', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800 },
    rightCol: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: 18,
      maxWidth: 720,
    },
    fieldCard: {
      background: "#f3f3f3",
      borderRadius: 12,
      padding: 18,
      minHeight: 140,
      boxSizing: "border-box",
      color: "#333",
    },
    label: { fontWeight: 700, marginBottom: 8, color: "#0b1a1a" },
    dateInput: {
      padding: "12px 14px",
      borderRadius: 12,
      border: "1px solid #ddd",
      width: 220,
    },
    footerSmall: { fontSize: 12, color: "rgba(11,26,26,0.6)" },
    link: { color: "#055b47", textDecoration: "none", fontWeight: 600 },
    infoRow: { display: "flex", gap: 12, alignItems: "center" },
    fileName: { fontSize: 14, fontWeight: 600, color: "#063b2f" },
    fileLabel: { fontWeight: 700, fontSize: 14, color: "#063b2f", marginTop: 8 },
    fileSub: { fontSize: 10, color: "#063b2f", opacity: 0.8, marginTop: 4 },
  };

  // Jurusan -> Mata Kuliah mapping (example courses per major)
  const mataKuliahOptions = {
    "Rekayasa Perangkat Lunak": ["Pemrograman Lanjut", "Basis Data", "Sistem Operasi", "Rekayasa Perangkat Lunak"],
    "Rekayasa Industri": ["Riset Operasi", "Manajemen Produksi", "Ergonomi"],
    "Rekayasa Multimedia": ["Desain Grafis", "Multimedia Interaktif", "Animasi"],
    "Rekayasa Perangkat Lunak Aplikasi": ["Pengembangan Aplikasi Mobile", "UI/UX", "Pemrograman Web"],
    "Biomedis": ["Biokimia", "Instrumen Medis", "Fisika Kedokteran"],
    "Psikologi": ["Psikologi Perkembangan", "Psikologi Pendidikan", "Psikometri"],
    "Desain Komunikasi Visual": ["Tipografi", "Branding", "Desain Editorial"],
    "Teknik Informatika": ["Algoritma", "Jaringan Komputer", "Kecerdasan Buatan"],
    "Manjemen Pemasaran": ["Prinsip Pemasaran", "Riset Pasar", "Manajemen Produk"],
  };

  const jurusanList = Object.keys(mataKuliahOptions);
  const tingkatOptions = ["Beginner", "Intermediate", "Expert"];

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.logo}>
          {/* Logo image should be placed in public/Logo.png */}
          <img src="/Logo.png" alt="PIRU" style={{ height: 50, objectFit: 'contain' }} />
        </div>

        <nav style={styles.nav}>
          <Link to="/dashboard" style={styles.link}>Assignment</Link>
          <Link to="/upload" style={{ color: '#000', fontWeight: 700 }}>Upload</Link>
          <Link to="/profile" style={{ ...styles.link, fontWeight: 700 }}>Profile</Link>
        </nav>
        
        <div style={{ position: 'absolute', right: 28, top: '50%', transform: 'translateY(-50%)' }}>
          <HiButton />
        </div>
      </header>

      <main style={{ flex: 1 }}>
        <div style={styles.container}>
          <section style={styles.leftCard}>
            <div style={styles.headingDrop}>Drop Or Add Your File Here</div>

            <div
              style={styles.dropArea}
              onClick={openFilePicker}
            >
              <div
                style={styles.dropInner}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
              >
                <div style={styles.plus}>+</div>
                <div style={styles.small}> </div>
                <div style={{ flex: 1 }} />

                {/* bottom labels */}
                {files.length > 0 ? (
                  <div style={{ marginTop: 8, textAlign: 'center' }}>
                    <div style={{ ...styles.fileName, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={files[0].name}>
                      {truncate(files[0].name)}{files.length > 1 ? ` (+${files.length - 1} more)` : ''}
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: "center", marginBottom: 6 }}>
                    <div style={styles.fileLabel}>Folder/Image/File</div>
                    <div style={styles.fileSub}>PDF/JPG/IMG/ZIP</div>
                  </div>
                )}
              </div>
            </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    multiple
                  />
                  <button onClick={openFilePicker} style={styles.smallLink} aria-label="Add from computer">
                    <span style={{ display: "inline-block", width: 16 }}>
                      📁
                    </span>
                    Add From Your Computer
                  </button>
                </div>

                {/* Per-file list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {files.length === 0 && (
                    <div style={styles.footerSmall}>No files added yet.</div>
                  )}

                  {files.map((f) => (
                    <div key={f.id} style={{ background: '#fff', borderRadius: 8, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 12, color: '#063b2f' }}>
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 28, height: 28, borderRadius: 6, background: '#f3f3f3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📄</div>
                        {f.editing ? (
                          <input
                            value={f.name}
                            onChange={(e) => setFiles((prev) => prev.map(p => p.id === f.id ? { ...p, name: e.target.value } : p))}
                            style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent' }}
                          />
                        ) : (
                          <div style={{ flex: 1, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={f.name}>{truncate(f.name)}</div>
                        )}
                      </div>

                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        {f.editing ? (
                          <button onClick={() => setFiles((prev) => prev.map(p => p.id === f.id ? { ...p, editing: false } : p))} style={styles.btnGhost}>Save</button>
                        ) : (
                          <button onClick={() => setFiles((prev) => prev.map(p => p.id === f.id ? { ...p, editing: true } : p))} style={styles.btnGhost}>Edit</button>
                        )}
                        <button
                          title="Delete file"
                          style={styles.iconBtn}
                          onClick={() => {
                            if (window.confirm(`Delete "${f.name}"?`)) {
                              setFiles((prev) => prev.filter(p => p.id !== f.id));
                            }
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: 12 }}>
                  <button style={{ ...styles.btnPrimary, ...styles.btnPrimaryIcon }} onClick={() => alert('Upload logic not implemented')}> 
                    <span style={{ display: "inline-block" }}>⬆️</span>
                    <span>Upload</span>
                  </button>
                  <button
                    style={styles.btnGhost}
                    onClick={() => {
                      if (files.length === 0) return;
                      if (window.confirm('Clear all files?')) clearFile();
                    }}
                  >
                    Clear All
                  </button>
                </div>
              </div>
          </section>

          <aside style={styles.rightCol}>
            <div>
              {/* Pills / dropdowns row */}
              <div style={styles.pillsRow}>
                <div style={{ position: "relative" }}>
                  <div
                    style={styles.pill}
                    onClick={() => setOpenDropdown(openDropdown === 'jurusan' ? null : 'jurusan')}
                  >
                    {jurusan || 'Jurusan'}
                  </div>
                  {openDropdown === 'jurusan' && (
                    <div style={styles.dropdown}>
                      {jurusanList.map((j) => (
                        <div
                          key={j}
                          style={styles.dropdownItem}
                          onClick={() => {
                            setJurusan(j);
                            setMataKuliah('');
                            setOpenDropdown(null);
                          }}
                        >
                          {j}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{ position: "relative" }}>
                  <div
                    style={styles.pill}
                    onClick={() => setOpenDropdown(openDropdown === 'mata' ? null : 'mata')}
                  >
                    {mataKuliah || 'Mata Kuliah'}
                  </div>
                  {openDropdown === 'mata' && (
                    <div style={styles.dropdown}>
                      {(mataKuliahOptions[jurusan] || []).map((m) => (
                        <div
                          key={m}
                          style={styles.dropdownItem}
                          onClick={() => {
                            setMataKuliah(m);
                            setOpenDropdown(null);
                          }}
                        >
                          {m}
                        </div>
                      ))}
                      {/* If no jurusan selected, show a hint */}
                      {!jurusan && (
                        <div style={{ padding: 8, color: '#666' }}>Please select Jurusan first</div>
                      )}
                    </div>
                  )}
                </div>

                <div style={{ position: "relative" }}>
                  <div
                    style={styles.pill}
                    onClick={() => setOpenDropdown(openDropdown === 'tingkat' ? null : 'tingkat')}
                  >
                    {tingkat || 'Tingkat Kesulitan'}
                  </div>
                  {openDropdown === 'tingkat' && (
                    <div style={styles.dropdown}>
                      {tingkatOptions.map((t) => (
                        <div
                          key={t}
                          style={styles.dropdownItem}
                          onClick={() => {
                            setTingkat(t);
                            setOpenDropdown(null);
                          }}
                        >
                          {t}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div style={styles.label}>Deskripsikan Tugas mu!</div>
              <div style={styles.fieldCard}>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add Your Text Here..."
                  style={{ width: "100%", height: 120, border: "none", resize: "vertical", background: "transparent", outline: "none" }}
                />
              </div>
            </div>

            <div>
              <div style={styles.label}>Deadline Pengumpulan</div>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  style={styles.dateInput}
                />
                
              </div>
            </div>


          </aside>
        </div>
      </main>
    </div>
  );
};

export default UploadPage;

function HiButton() {
  const navigate = useNavigate();
  return (
    <button
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => navigate('/profile', { state: { tab: 'edit' } })}
      style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#0b6b58', color: '#fff', padding: '10px 18px', borderRadius: 30, border: 'none', cursor: 'pointer', fontWeight: 800, outline: 'none', boxShadow: 'none', appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none' }}
      aria-label="Open profile edit"
    >
      <span style={{ width: 28, height: 28, borderRadius: 14, background: '#d6b77a', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#063b2f' }}>👤</span>
      <span>Hi, Anonymus</span>
    </button>
  );
}
