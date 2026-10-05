 "use client";

import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";

export default function ToastHost() {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    let timer;
    const onToast = (event) => {
      const message = event.detail?.message;
      if (!message) return;
      setToast(message);
      clearTimeout(timer);
      timer = setTimeout(() => setToast(null), 2400);
    };
    window.addEventListener("cinematic-toast", onToast);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("cinematic-toast", onToast);
    };
  }, []);

  if (!toast) return null;

  return (
    <div className="toast" role="status" aria-live="polite">
      <span className="toast-icon"><Check size={14} /></span>
      <span>{toast}</span>
      <button type="button" onClick={() => setToast(null)} aria-label="Close notification"><X size={14} /></button>
    </div>
  );
}
