import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { supabase } from "../supabaseClient"

export default function AdminLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const logout = async () => {
    await supabase.auth.signOut()
    localStorage.removeItem("admin")
    window.location.href = "/login"
  }

  return (
    <div className="admin-container">

      <aside className="sidebar">
        <h2>Admin Panel</h2>

        {/* Hamburger Toggle */}
        <div className={`menu-toggle ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Navigation Links */}
        <div className={`nav-menu ${menuOpen ? "open" : ""}`}>
          <Link to="/admin" onClick={() => setMenuOpen(false)}>Dashboard</Link>
          <Link to="/players" onClick={() => setMenuOpen(false)}>Players</Link>
          <Link to="/tournaments" onClick={() => setMenuOpen(false)}>Tournaments</Link>
          <Link to="/rankings" onClick={() => setMenuOpen(false)}>Rankings</Link>
          <Link to="/live" onClick={() => setMenuOpen(false)}>Live Scores</Link>

          <button onClick={logout}>Logout</button>
        </div>
      </aside>

      <main className="content">
        {children}
      </main>
    </div>
  )
}