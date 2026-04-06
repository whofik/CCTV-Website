import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import HomePage from "./pages/HomePage"
import ListPage from "./pages/ListPage"
import SearchPage from "./pages/SearchPage"
import WatchPage from "./pages/WatchPage"

function AnimatedRoutes() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<div className="page-enter"><HomePage /></div>} />
      <Route path="/list" element={<div className="page-enter"><ListPage /></div>} />
      <Route path="/search" element={<div className="page-enter"><SearchPage /></div>} />
      <Route path="/watch" element={<div className="page-enter"><WatchPage /></div>} />
    </Routes>
  )
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-neutral-950 text-white">
        <Navbar />
        <main className="pt-14">
          <AnimatedRoutes />
          <Sidebar />
        </main>
      </div>
    </Router>
  )
}
