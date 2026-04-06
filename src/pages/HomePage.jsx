import { Link } from "react-router-dom"
import { jakartaCameras } from "../data/cameras"
import { useLang } from "../hooks/useLang"
import VideoPlayer from "../components/VideoPlayer"

function IconLive() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="currentColor" className="text-red-500">
      <circle cx="12" cy="12" r="12"/>
    </svg>
  )
}

export default function HomePage() {
  const { t } = useLang()

  const allCams = jakartaCameras.flatMap(loc =>
    loc.cameras.map((cam, i) => ({
      location: loc.name,
      locationId: loc.id,
      cameraIdx: i,
      url: cam.url
    }))
  )

  const featured = allCams.slice(0, 6)
  const totalCams = allCams.length

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        <div className="mb-10 sm:mb-14 animate-fade-in-up">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-red-500"><IconLive /></span>
            <span className="text-xs text-neutral-500 uppercase tracking-widest">{t.home.liveTag}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            CCTV Jakarta
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base max-w-md">
            {t.home.heroTagline}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
          <div className="bg-neutral-900/50 border border-neutral-800/50 rounded-xl p-4 sm:p-5">
            <div className="text-2xl sm:text-3xl font-bold">{jakartaCameras.length}</div>
            <div className="text-xs text-neutral-500 mt-1">{t.home.totalLocations}</div>
          </div>
          <div className="bg-neutral-900/50 border border-neutral-800/50 rounded-xl p-4 sm:p-5">
            <div className="text-2xl sm:text-3xl font-bold">{totalCams}</div>
            <div className="text-xs text-neutral-500 mt-1">{t.home.totalCameras}</div>
          </div>
          <div className="col-span-2 sm:col-span-1 bg-neutral-900/50 border border-neutral-800/50 rounded-xl p-4 sm:p-5">
            <div className="text-2xl sm:text-3xl font-bold">1</div>
            <div className="text-xs text-neutral-500 mt-1">{t.home.statsCities}</div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg sm:text-xl font-semibold">{t.home.featuredTitle}</h2>
          <Link to="/list" className="text-xs text-neutral-500 hover:text-white transition-colors">
            {t.home.viewAll}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {featured.map((cam, idx) => (
            <Link
              key={idx}
              to={`/watch?location=${cam.locationId}&camera=${cam.cameraIdx}`}
              className="group bg-neutral-900/30 border border-neutral-800/50 rounded-xl overflow-hidden hover:border-neutral-700 transition-all duration-300 card-hover"
            >
              <VideoPlayer url={cam.url} title={cam.location} compact />
              <div className="px-3 py-2.5 flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{cam.location}</p>
                </div>
                <span className="text-red-500 flex-shrink-0 ml-2"><IconLive /></span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center py-6 border-t border-neutral-800/50">
          <Link
            to="/list"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
          >
            {t.home.viewAllCameras}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </Link>
        </div>

      </div>
    </div>
  )
}
