export {};

declare global {
  interface Window {
    electronAPI?: {
      convertFiles: (files: File[]) => void;
    };
  }
}
