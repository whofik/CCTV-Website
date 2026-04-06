import { useState } from "react"
import { Link } from "react-router-dom"
import { jakartaCameras } from "../data/cameras"
import { useLang } from "../hooks/useLang"

function IconDown({ open }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transform transition-transform duration-200 ${open ? "rotate-0" : "-rotate-90"}`}>
      <path d="m6 9 6 6 6-6"/>
    </svg>
  )
}

function LocationRow({ loc, expanded, onToggle }) {
  return (
    <div className="border-b border-neutral-800/50 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-3 py-3 sm:px-4 sm:py-3.5 hover:bg-neutral-900/30 transition-colors btn-press"
      >
        <div className="text-left min-w-0">
          <p className="text-sm font-medium truncate">{loc.name}</p>
          {loc.description && (
            <p className="text-[11px] text-neutral-600 mt-0.5 truncate">{loc.description}</p>
          )}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-[10px] text-neutral-600 bg-neutral-900 px-1.5 py-0.5 rounded-full">{loc.cameras.length}</span>
          <IconDown open={expanded} />
        </div>
      </button>

      {expanded && (
        <div className="px-3 pb-3 sm:px-4 sm:pb-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 animate-fade-in">
          {loc.cameras.map((cam, idx) => (
            <Link
              key={idx}
              to={`/watch?location=${loc.id}&camera=${idx}`}
              className="group p-2.5 bg-neutral-900/30 border border-neutral-800/50 rounded-lg hover:border-neutral-700 transition-all duration-200 card-hover"
            >
              <div className="w-full aspect-video bg-neutral-800/50 rounded mb-2 flex items-center justify-center group-hover:bg-neutral-800/80 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-700 group-hover:text-white transition-colors">
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
                  <circle cx="12" cy="13" r="3"/>
                </svg>
              </div>
              <p className="text-[10px] font-medium truncate text-neutral-400 group-hover:text-white transition-colors">
                {cam.name || `Kamera ${cam.number}`}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default function ListPage() {
  const { t } = useLang()
  const [expanded, setExpanded] = useState({})

  const toggle = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6 animate-fade-in">
          <h1 className="text-xl sm:text-2xl font-bold">{t.list.title}</h1>
          <p className="text-xs text-neutral-500 mt-1">{jakartaCameras.length} {t.list.locations}</p>
        </div>

        <div className="bg-neutral-900/20 border border-neutral-800/50 rounded-xl overflow-hidden">
          {jakartaCameras.map(loc => (
            <LocationRow
              key={loc.id}
              loc={loc}
              expanded={!!expanded[loc.id]}
              onToggle={() => toggle(loc.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
