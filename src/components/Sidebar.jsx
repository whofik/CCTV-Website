import { useState } from "react"
import { Link } from "react-router-dom"
import { jakartaCameras } from "../data/cameras"

export default function Sidebar() {
  const [open, setOpen] = useState(false)

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-40 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center shadow-lg shadow-black/30 hover:scale-105 transition-transform btn-press"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="16" x2="20" y2="16"/>
        </svg>
      </button>
    )
  }

  return (
    <div className="fixed inset-0 z-40 sm:static sm:z-auto">
      <div
        className="absolute inset-0 bg-black/50 sm:hidden"
        onClick={() => setOpen(false)}
      />
      <aside className="absolute right-0 top-0 bottom-0 w-72 bg-neutral-950 border-l border-neutral-800 overflow-y-auto sm:relative sm:w-64 sm:top-14 sm:border-l sm:border-r-0 animate-fade-in">
        <div className="flex items-center justify-between p-3 border-b border-neutral-800">
          <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest">Lokasi</span>
          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded text-neutral-600 hover:text-white transition-colors btn-press"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
          </button>
        </div>

        <div className="p-2">
          {jakartaCameras.map(loc => (
            <details key={loc.id} className="group">
              <summary className="flex items-center justify-between px-2 py-2 rounded-md text-xs text-neutral-400 hover:text-white hover:bg-neutral-900 cursor-pointer list-none transition-colors">
                <span className="truncate">{loc.name}</span>
                <span className="text-[10px] text-neutral-700 ml-2">{loc.cameras.length}</span>
              </summary>
              <div className="ml-2 mt-0.5 space-y-0.5">
                {loc.cameras.map((cam, idx) => (
                  <Link
                    key={idx}
                    to={`/watch?location=${loc.id}&camera=${idx}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-md text-[11px] text-neutral-600 hover:text-white hover:bg-neutral-900 transition-colors"
                  >
                    <div className="w-1 h-1 rounded-full bg-neutral-700 flex-shrink-0" />
                    <span className="truncate">{cam.name || `Kamera ${cam.number}`}</span>
                  </Link>
                ))}
              </div>
            </details>
          ))}
        </div>
      </aside>
    </div>
  )
}
