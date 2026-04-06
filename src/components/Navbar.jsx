import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useLang } from "../hooks/useLang"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { lang, t, toggleLang } = useLang()

  const navItems = [
    { path: "/", label: t.nav.home },
    { path: "/list", label: t.nav.list },
    { path: "/search", label: t.nav.search }
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/80 backdrop-blur-xl border-b border-neutral-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2.5 btn-press">
            <div className="w-7 h-7 bg-white rounded-md flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
                <circle cx="12" cy="13" r="3"/>
              </svg>
            </div>
            <span className="text-sm font-semibold tracking-tight">cctvin</span>
          </Link>

          <div className="hidden sm:flex items-center gap-1">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-1.5 rounded-md text-xs transition-all duration-200 ${
                  location.pathname === item.path
                    ? "bg-neutral-800 text-white"
                    : "text-neutral-500 hover:text-white hover:bg-neutral-900"
                }`}
              >
                {item.label}
              </Link>
            ))}

            <div className="w-px h-4 bg-neutral-800 mx-1" />

            <button
              onClick={toggleLang}
              className="px-2 py-1.5 rounded-md text-[10px] font-medium text-neutral-500 hover:text-white hover:bg-neutral-900 transition-all uppercase tracking-wider btn-press"
            >
              {lang}
            </button>
          </div>

          <div className="flex items-center gap-1 sm:hidden">
            <button
              onClick={toggleLang}
              className="px-2 py-1 rounded-md text-[10px] font-medium text-neutral-500 hover:text-white uppercase tracking-wider btn-press"
            >
              {lang}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-md text-neutral-500 hover:text-white transition-colors btn-press"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {isOpen
                  ? <><path d="M18 6 6 18"/><path d="m6 6 12 12"/></>
                  : <><line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="16" x2="20" y2="16"/></>
                }
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden border-t border-neutral-800 bg-neutral-950/95 backdrop-blur-xl animate-fade-in-down">
          <div className="px-3 py-2 space-y-0.5">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-xs transition-all ${
                  location.pathname === item.path
                    ? "bg-neutral-800 text-white"
                    : "text-neutral-500 hover:text-white hover:bg-neutral-900"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
