import { useEffect, useRef, useState } from "react"
import Hls from "hls.js"

function isHls(url) {
  return url.includes(".m3u8")
}

export default function VideoPlayer({ url, title, compact = false }) {
  const videoRef = useRef(null)
  const iframeRef = useRef(null)
  const boxRef = useRef(null)
  const [err, setErr] = useState(false)
  const [loading, setLoading] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)

  const hls = isHls(url)

  useEffect(() => {
    setErr(false)
    setLoading(true)
    setPlaying(false)
    setReady(false)

    if (hls && videoRef.current) {
      if (Hls.isSupported()) {
        const h = new Hls({ maxBufferLength: 10, maxMaxBufferLength: 30 })
        h.loadSource(url)
        h.attachMedia(videoRef.current)
        h.on(Hls.Events.MANIFEST_PARSED, () => {
          videoRef.current?.play().catch(() => {})
          setPlaying(true)
          setLoading(false)
          setReady(true)
        })
        h.on(Hls.Events.FRAG_CHANGED, () => {
          if (loading) { setLoading(false); setReady(true) }
        })
        h.on(Hls.Events.ERROR, (_, data) => {
          if (data.fatal) { setErr(true); setLoading(false) }
        })
        return () => h.destroy()
      }
    }

    if (!hls && iframeRef.current) {
      iframeRef.current.onload = () => { setLoading(false); setPlaying(true); setReady(true) }
      iframeRef.current.onerror = () => { setErr(true); setLoading(false) }
    }
  }, [url, hls])

  const togglePlay = () => {
    if (hls && videoRef.current) {
      if (playing) { videoRef.current.pause(); setPlaying(false) }
      else { videoRef.current.play().catch(() => {}); setPlaying(true) }
    }
  }

  const goFull = () => {
    if (boxRef.current?.requestFullscreen) boxRef.current.requestFullscreen()
  }

  if (err) {
    return (
      <div className={`${compact ? "min-h-32" : "w-full aspect-video"} bg-neutral-900 rounded-xl border border-neutral-800/50 flex flex-col items-center justify-center gap-2`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-700">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <p className="text-[11px] text-neutral-600">Stream error</p>
      </div>
    )
  }

  return (
    <div ref={boxRef} className={`relative bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800/50 group ${compact ? "min-h-32" : "w-full aspect-video"}`}>
      {loading && !ready && (
        <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center z-20">
          <div className="w-5 h-5 border-2 border-neutral-800 border-t-neutral-500 rounded-full animate-spin" />
        </div>
      )}

      {!playing && hls && ready && (
        <button onClick={togglePlay} className="absolute inset-0 z-10 flex items-center justify-center bg-neutral-900/60 hover:bg-neutral-900/40 transition-colors btn-press">
          <div className="w-10 h-10 bg-white/10 backdrop-blur rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          </div>
        </button>
      )}

      {playing && !compact && (
        <div className="absolute bottom-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={togglePlay} className="p-1.5 bg-black/40 rounded-md hover:bg-black/60 transition-colors btn-press">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="white">
              {playing
                ? <><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></>
                : <polygon points="5 3 19 12 5 21 5 3"/>
              }
            </svg>
          </button>
        </div>
      )}

      {playing && (
        <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5 px-2 py-0.5 bg-black/40 rounded-md">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[9px] text-white font-medium tracking-wide">LIVE</span>
        </div>
      )}

      {!compact && playing && (
        <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={goFull} className="p-1.5 bg-black/40 rounded-md hover:bg-black/60 transition-colors btn-press">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>
            </svg>
          </button>
        </div>
      )}

      {hls ? (
        <video ref={videoRef} muted playsInline className="w-full h-full cursor-pointer" onClick={togglePlay} />
      ) : (
        <iframe ref={iframeRef} src={url} title={title} className="w-full h-full border-0" allow="autoplay; fullscreen" allowFullScreen sandbox="allow-scripts allow-same-origin allow-popups" />
      )}
    </div>
  )
}
