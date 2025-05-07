import React, { useState } from "react";
import styles from "./App.module.css";

const App: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files).filter((file) => file.name.endsWith(".wav"));
    setFiles(droppedFiles);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []).filter((file) => file.name.endsWith(".wav"));
    setFiles(selectedFiles);
  };

  const handleConvert = () => {
    if (files.length === 0) return; // add alert
    window.electronAPI?.convertFiles(files); // IPC bridge
  };

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>WAV to MP3 Converter</h1>

      <div className={styles.dropzone} onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
        <p>Drag and drop your WAV files here</p>
        <p>or</p>
        <input className={styles.fileInput} type="file" accept=".wav" multiple onChange={handleFileSelect} />
      </div>

      {files.length > 0 && (
        <div className={styles.fileList}>
          <h3>Files selected:</h3>
          <ul>
            {files.map((file, i) => (
              <li key={i}>{file.name}</li> // add a delete files button x
            ))}
          </ul>
          <button className={styles.convertButton} onClick={handleConvert}>
            Convert to MP3
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
