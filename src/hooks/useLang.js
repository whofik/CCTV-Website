import { useState, useEffect } from "react"
import { id, en } from "../translations"

export function useLang() {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("cctv-lang") || "id"
    } catch {
      return "id"
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem("cctv-lang", lang)
    } catch {}
  }, [lang])

  const t = lang === "en" ? en : id
  const toggleLang = () => setLang(prev => prev === "id" ? "en" : "id")

  return { lang, t, toggleLang }
}
