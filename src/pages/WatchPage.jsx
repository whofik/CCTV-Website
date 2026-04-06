import { useEffect } from "react"
import { useSearchParams, Link, useNavigate } from "react-router-dom"
import { jakartaCameras } from "../data/cameras"
import VideoPlayer from "../components/VideoPlayer"
import { useLang } from "../hooks/useLang"

function replace(str, obj) {
  let result = str
  Object.keys(obj).forEach(key => {
    result = result.replace(`{${key}}`, obj[key])
  })
  return result
}

export default function WatchPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { t } = useLang()
  const locationId = searchParams.get("location")
  const cameraIdx = parseInt(searchParams.get("camera"))

  const location = jakartaCameras.find(loc => loc.id === locationId)

  useEffect(() => {
    if (!location || cameraIdx >= location.cameras.length) {
      navigate("/list")
    }
  }, [location, cameraIdx, navigate])

  if (!location) return null

  const cam = location.cameras[cameraIdx]

  const goCamera = (dir) => {
    const newIdx = dir === "prev"
      ? (cameraIdx > 0 ? cameraIdx - 1 : location.cameras.length - 1)
      : (cameraIdx < location.cameras.length - 1 ? cameraIdx + 1 : 0)
    navigate(`/watch?location=${locationId}&camera=${newIdx}`)
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="mb-4 animate-fade-in">
          <Link to="/list" className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-white transition-colors mb-3 btn-press">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
            </svg>
            {t.watch.backToList}
          </Link>

          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl font-bold truncate">{location.name}</h1>
              {location.description && (
                <p className="text-[11px] text-neutral-600 mt-1">{t.list[location.description] || location.description}</p>
              )}
            </div>
            <span className="text-[11px] text-neutral-600 ml-4 flex-shrink-0">
              {cameraIdx + 1}/{location.cameras.length}
            </span>
          </div>
        </div>

        <div className="mb-4 animate-scale-in">
          <VideoPlayer url={cam.url} title={cam.name || `${location.name} ${cameraIdx + 1}`} />
        </div>

        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => goCamera("prev")}
            className="flex items-center gap-1 px-2.5 py-2 bg-neutral-900/50 rounded-lg border border-neutral-800/50 hover:border-neutral-700 transition-all btn-press"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            <span className="hidden sm:inline text-xs">{t.watch.prev}</span>
          </button>

          <div className="flex gap-1.5 overflow-x-auto max-w-[50%]">
            {location.cameras.map((_, idx) => (
              <Link
                key={idx}
                to={`/watch?location=${locationId}&camera=${idx}`}
                className={`w-7 h-7 rounded-md text-xs font-medium flex-shrink-0 flex items-center justify-center transition-all btn-press ${
                  idx === cameraIdx
                    ? "bg-white text-black"
                    : "bg-neutral-900/50 border border-neutral-800/50 hover:border-neutral-700"
                }`}
              >
                {idx + 1}
              </Link>
            ))}
          </div>

          <button
            onClick={() => goCamera("next")}
            className="flex items-center gap-1 px-2.5 py-2 bg-neutral-900/50 rounded-lg border border-neutral-800/50 hover:border-neutral-700 transition-all btn-press"
          >
            <span className="hidden sm:inline text-xs">{t.watch.next}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>
        </div>

        {location.cameras.length > 1 && (
          <div className="animate-fade-in-up">
            <h2 className="text-sm font-semibold mb-3">{replace(t.watch.allCamerasAt, { name: location.name })}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {location.cameras.map((c, idx) => (
                <Link
                  key={idx}
                  to={`/watch?location=${locationId}&camera=${idx}`}
                  className={`p-2 rounded-lg border transition-all card-hover ${
                    idx === cameraIdx
                      ? "bg-neutral-800 border-neutral-700"
                      : "bg-neutral-900/30 border-neutral-800/50 hover:border-neutral-700"
                  }`}
                >
                  <div className="w-full aspect-video bg-neutral-900/50 rounded mb-2 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={idx === cameraIdx ? "text-white" : "text-neutral-700"}>
                      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
                      <circle cx="12" cy="13" r="3"/>
                    </svg>
                  </div>
                  <p className="text-[10px] font-medium truncate text-neutral-400">{c.name || `Kamera ${c.number}`}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
