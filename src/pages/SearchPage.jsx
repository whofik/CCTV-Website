import { useState } from "react"
import { Link } from "react-router-dom"
import { allCameras } from "../data/cameras"
import { useLang } from "../hooks/useLang"

function flattenCams() {
  const result = []
  allCameras.forEach(loc => {
    loc.cameras.forEach((cam, idx) => {
      result.push({
        locationName: loc.name,
        locationId: loc.id,
        camera: cam,
        cameraIdx: idx,
        url: cam.url
      })
    })
  })
  return result
}

export default function SearchPage() {
  const { t } = useLang()
  const [q, setQ] = useState("")

  const allFlat = flattenCams()
  const results = q.length > 0
    ? allFlat.filter(c => c.locationName.toLowerCase().includes(q.toLowerCase()))
    : []

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6 animate-fade-in">
          <h1 className="text-xl sm:text-2xl font-bold">{t.search.title}</h1>
          <p className="text-xs text-neutral-500 mt-1">{t.search.desc}</p>
        </div>

        <div className="relative mb-6 animate-fade-in">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
          </svg>
          <input
            type="text"
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder={t.search.placeholder}
            className="w-full pl-9 pr-8 py-2.5 bg-neutral-900/50 border border-neutral-800/50 rounded-lg text-sm text-white placeholder-neutral-600 focus:border-neutral-700 transition-colors"
            autoFocus
          />
          {q && (
            <button
              onClick={() => setQ("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
              </svg>
            </button>
          )}
        </div>

        {q.length === 0 ? (
          <div className="text-center py-16 text-neutral-700">
            <p className="text-sm">{t.search.emptyState}</p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-sm text-neutral-500">{t.search.noResults}</p>
          </div>
        ) : (
          <div>
            <p className="text-[11px] text-neutral-600 mb-3">{results.length} {t.search.found}</p>
            <div className="space-y-1.5">
              {results.map((cam, idx) => (
                <Link
                  key={idx}
                  to={`/watch?location=${cam.locationId}&camera=${cam.cameraIdx}`}
                  className="flex items-center justify-between px-3 py-2.5 bg-neutral-900/30 border border-neutral-800/50 rounded-lg hover:border-neutral-700 transition-all duration-200 group btn-press"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{cam.locationName}</p>
                    <p className="text-[10px] text-neutral-600">{cam.camera.name || `Kamera ${cam.camera.number}`}</p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-700 group-hover:text-white group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-3">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
