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
  const [hover, setHover] = useState(null);
  const [hoverItem, setHoverItem] = useState(null);


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
  
{/*Sprint 2*/}
  const styles = {
  page:{fontFamily:"Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto",minHeight:"100vh",width:"100vw",display:"flex",flexDirection:"column",background:"#fff",color:"#0b1a1a"},

  header:{display:"flex",alignItems:"center",justifyContent:"space-between",position:"relative",padding:"18px 28px",borderBottom:"1px solid #e6e6e6"},

  logo:{display:"flex",alignItems:"center",gap:10,fontWeight:700,color:"#0b6b58"},

  nav:{display:"flex",gap:18,alignItems:"center",position:"absolute",left:"50%",transform:"translateX(-50%)"},

  container:{display:"flex",gap:32,padding:28,flex:1,boxSizing:"border-box",alignItems:"flex-start",flexWrap:"wrap",maxWidth:1200,margin:"0 auto"},

  /* LEFT UPLOAD CARD */
  leftCard:{flex:"0 1 520px",background:"linear-gradient(145deg,#0b6b58,#14c5a2)",borderRadius:18,padding:22,boxSizing:"border-box",color:"#fff",minHeight:420,display:"flex",flexDirection:"column",justifyContent:"space-between",boxShadow:"0 12px 26px rgba(0,0,0,0.16)"},

  headingDrop:{textAlign:"center",fontWeight:800,fontSize:20,marginBottom:12,color:"#e7fff7"},

  dropArea:{borderRadius:16,padding:14,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",width:"100%",transition:"all 240ms ease"},

  dropInner:{background: dragOver ? "#f8fffd" : "#eef8f5",borderRadius:16,height:320,width:"100%",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",color:"#063b2f",padding:20,boxShadow:"inset 0 0 12px rgba(0,0,0,0.05)",transition:"all 240ms ease"},

  plus:{fontSize:52,color:"#0b6b58",opacity:0.9,marginBottom:8},

  small:{fontSize:14,opacity:0.85,color:"#063b2f",fontWeight:600},

  controls:{display:"flex",gap:12,alignItems:"center"},

  /* BUTTONS */
  btnPrimary:{background:"#0b6b58",color:"#fff",padding:"12px 20px",borderRadius:26,border:"none",cursor:"pointer",fontWeight:800,transition:"all 240ms ease",boxShadow:"0 6px 18px rgba(0,0,0,0.2)"},

  btnPrimaryIcon:{display:"inline-flex",alignItems:"center",gap:8},

  btnGhost:{background:"rgba(255,255,255,0.18)",color:"#fff",padding:"10px 18px",borderRadius:22,border:"none",cursor:"pointer",fontWeight:700,transition:"all 240ms ease"},

  iconBtn:{background:"transparent",border:"none",padding:6,borderRadius:8,cursor:"pointer",color:"#063b2f",transition:"all 200ms ease"},

  smallLink:{color:"#0b6b58",textDecoration:"underline",fontWeight:700,display:"inline-flex",gap:8,alignItems:"center",background:"transparent",border:"none",padding:0,cursor:"pointer"},

  pillsRow:{display:"flex",gap:12,alignItems:"center",marginBottom:8, position:"relative", zIndex:3000},

  pill:{background:"#063b2f",color:"#ffffff",padding:"12px 18px",borderRadius:14,
        minWidth:160,textAlign:"center",cursor:"pointer",fontWeight:700,
        border:"1px solid #d9ece6",transition:"all 200ms ease",
        boxShadow:"0 4px 10px rgba(0,0,0,0.08)", position:"relative", zIndex:3001},

  pillHover: { transform: "translateY(-3px)", boxShadow: "0 8px 22px rgba(0,0,0,0.12)" },

  dropdown:{position:"absolute",marginTop:8,background:"#fff",color:"#063b2f",borderRadius:12,boxShadow:"0 12px 30px rgba(0,0,0,0.16)",padding:8,zIndex:4000,minWidth:240},

  dropdownItem:{padding:"10px 12px",borderRadius:6,cursor:"pointer",fontWeight:600,transition:"all 180ms ease"},

  dropdownItemHover: { background: "#e1faf4", color: "#0b6b58", transform: "translateX(4px)", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" },

  /* PROFILE */
  hiButton:{display:"flex",alignItems:"center",gap:12,background:"#0b6b58",color:"#fff",padding:"10px 18px",borderRadius:30,border:"none",cursor:"pointer",fontWeight:800},

  hiIcon:{width:28,height:28,borderRadius:14,background:"#d6b77a",color:"#063b2f",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800},

  /* RIGHT CARD INPUTS */
  rightCol:{flex:1,display:"flex",flexDirection:"column",gap:18,maxWidth:720},

  fieldCard:{background:"#ffffff",borderRadius:14,padding:20,minHeight:140,boxSizing:"border-box",color:"#333",boxShadow:"0 8px 20px rgba(0,0,0,0.06)"},

  label:{fontWeight:700,marginBottom:8,color:"#063b2f"},

  dateInput:{padding:"12px 14px",borderRadius:12,border:"1px solid #cbd9d5",width:220,background:"#f8fffd",fontWeight:600},

  footerSmall:{fontSize:12,color:"rgba(11,26,26,0.6)"},

  link:{color:"#0b6b58",textDecoration:"none",fontWeight:700},

  infoRow:{display:"flex",gap:12,alignItems:"center"},

  fileName:{fontSize:14,fontWeight:700,color:"#063b2f"},

  fileLabel:{fontWeight:700,fontSize:14,color:"#0b6b58",marginTop:8},

  fileSub:{fontSize:11,color:"#063b2f",opacity:0.8,marginTop:4}
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
          <Link to="/" style={styles.link}>Assignment</Link>
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

{/*Sprint 2*/}
    <aside style={styles.rightCol}>

   {/* Pills Row */}
   <div style={styles.pillsRow}>

      {/* === Jurusan === */}
      <div style={{ position: "relative" }}>
         <div
            style={{
               ...styles.pill,
               ...(hover === "jurusan" ? styles.pillHover : {})
            }}
            onMouseEnter={() => setHover("jurusan")}
            onMouseLeave={() => setHover(null)}
            onClick={() =>
               setOpenDropdown(openDropdown === "jurusan" ? null : "jurusan")
            }
         >
            {jurusan || "Jurusan"}
         </div>

         {openDropdown === "jurusan" && (
            <div style={styles.dropdown}>
               {jurusanList.map((j) => (
                  <div
                     key={j}
                     style={{
                        ...styles.dropdownItem,
                        ...(hoverItem === j ? styles.dropdownItemHover : {})
                     }}
                     onMouseEnter={() => setHoverItem(j)}
                     onMouseLeave={() => setHoverItem(null)}
                     onClick={() => {
                        setJurusan(j);
                        setMataKuliah("");
                        setOpenDropdown(null);
                     }}
                  >
                     {j}
                  </div>
               ))}
            </div>
         )}
      </div>

      {/* === Mata Kuliah === */}
      <div style={{ position: "relative" }}>
         <div
            style={{
               ...styles.pill,
               ...(hover === "mata" ? styles.pillHover : {})
            }}
            onMouseEnter={() => setHover("mata")}
            onMouseLeave={() => setHover(null)}
            onClick={() =>
               setOpenDropdown(openDropdown === "mata" ? null : "mata")
            }
         >
            {mataKuliah || "Mata Kuliah"}
         </div>

         {openDropdown === "mata" && (
            <div style={styles.dropdown}>
               {(mataKuliahOptions[jurusan] || []).map((m) => (
                  <div
                     key={m}
                     style={{
                        ...styles.dropdownItem,
                        ...(hoverItem === m ? styles.dropdownItemHover : {})
                     }}
                     onMouseEnter={() => setHoverItem(m)}
                     onMouseLeave={() => setHoverItem(null)}
                     onClick={() => {
                        setMataKuliah(m);
                        setOpenDropdown(null);
                     }}
                  >
                     {m}
                  </div>
               ))}

               {!jurusan && (
                  <div style={{ padding: 8, opacity: 0.6 }}>Pilih Jurusan dulu</div>
               )}
            </div>
         )}
      </div>

      {/* === Tingkat Kesulitan === */}
      <div style={{ position: "relative" }}>
         <div
            style={{
               ...styles.pill,
               ...(hover === "tingkat" ? styles.pillHover : {})
            }}
            onMouseEnter={() => setHover("tingkat")}
            onMouseLeave={() => setHover(null)}
            onClick={() =>
               setOpenDropdown(openDropdown === "tingkat" ? null : "tingkat")
            }
         >
            {tingkat || "Tingkat Kesulitan"}
         </div>

         {openDropdown === "tingkat" && (
            <div style={styles.dropdown}>
               {tingkatOptions.map((t) => (
                  <div
                     key={t}
                     style={{
                        ...styles.dropdownItem,
                        ...(hoverItem === t ? styles.dropdownItemHover : {})
                     }}
                     onMouseEnter={() => setHoverItem(t)}
                     onMouseLeave={() => setHoverItem(null)}
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

   </div> {/* END pillsRow */}


   {/* Description card */}
   <div style={styles.label}>Deskripsikan Tugas mu!</div>
   <div style={styles.fieldCard}>
      <textarea
         value={description}
         onChange={(e) => setDescription(e.target.value)}
         placeholder="Add Your Text Here..."
         style={{ width: "100%", height: 120, border: "none", resize: "vertical", background: "transparent", outline: "none" }}
      />
   </div>

      <div style={styles.label}>Deadline Pengumpulan</div>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
         <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            style={styles.dateInput}
         />
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
