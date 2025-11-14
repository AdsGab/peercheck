import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

const UploadPage = () => {
  const fileInputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const onFileChosen = (file) => {
    if (!file) return;
    setFileName(file.name || "selected-file");
  };

  const handleFileChange = (e) => {
    const f = e.target.files && e.target.files[0];
    onFileChosen(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    onFileChosen(f);
  };

  const openFilePicker = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const clearFile = () => {
    setFileName(null);
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
    dropArea: {
      background: dragOver ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.16)",
      borderRadius: 12,
      height: 320,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      cursor: "pointer",
      color: "#0b1a1a",
    },
    plus: { fontSize: 48, color: "#0b1a1a", opacity: 0.9, marginBottom: 10 },
    small: { fontSize: 13, opacity: 0.95 },
    controls: { display: "flex", gap: 12, alignItems: "center" },
    btnPrimary: {
      background: "#055b47",
      color: "#fff",
      padding: "10px 18px",
      borderRadius: 22,
      border: "none",
      cursor: "pointer",
    },
    btnGhost: {
      background: "rgba(255,255,255,0.12)",
      color: "#fff",
      padding: "8px 14px",
      borderRadius: 22,
      border: "none",
      cursor: "pointer",
    },
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
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.logo}>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="4" fill="#06b08e" />
            <path d="M6 8h12v2H6zM6 12h12v2H6z" fill="#fff" />
          </svg>
          <span>Peer Reviewer</span>
        </div>

        <nav style={styles.nav}>
          <Link to="/" style={styles.link}>Assignment</Link>
          <Link to="/upload" style={styles.link}>Upload</Link>
          <Link to="#" style={styles.link}>Profile</Link>
        </nav>
      </header>

      <main style={{ flex: 1 }}>
        <div style={styles.container}>
          <section style={styles.leftCard}>
            <div
              style={styles.dropArea}
              onClick={openFilePicker}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
            >
              <div style={styles.plus}>+</div>
              <div style={styles.small}>Drop Or Add Your File Here</div>
              <div style={{ height: 12 }} />
              <div style={{ fontSize: 13, opacity: 0.9 }}>Folder/Image/File (PDF/JPG/IMG/ZIP)</div>

              {fileName && (
                <div style={{ marginTop: 12 }}>
                  <span style={styles.fileName}>{fileName}</span>
                </div>
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <button onClick={openFilePicker} style={styles.btnGhost}>Add From Your Computer</button>
              </div>

              <div style={{ display: "flex", gap: 12 }}>
                <button style={styles.btnPrimary}>Upload</button>
                <button style={styles.btnGhost} onClick={() => alert("Edit not implemented")}>Edit</button>
                <button style={styles.btnGhost} onClick={clearFile}>Delete</button>
              </div>
            </div>
          </section>

          <aside style={styles.rightCol}>
            <div>
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
                <div style={styles.footerSmall}>{deadline ? `Selected: ${deadline}` : "DD/MM/YYYY"}</div>
              </div>
            </div>

            <div style={{ marginTop: 28 }}>
              <div style={styles.footerSmall}>Tips: Use clear file names and set a reasonable deadline.</div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default UploadPage;
