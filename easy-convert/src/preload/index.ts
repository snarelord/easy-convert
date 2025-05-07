import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  convertFiles: (files: File[]) => {
    // send file metadata to main process (not actual file buffers)
    const filePaths = files.map((file) => ({
      name: file.name,
      path: file.path,
    }));
    ipcRenderer.send("convert-wav-to-mp3", filePaths);
  },
});
