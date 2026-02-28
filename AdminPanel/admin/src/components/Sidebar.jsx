import { Link, useNavigate } from "react-router-dom"
import { supabase } from "../supabaseClient"

export default function Sidebar() {
  const navigate = useNavigate()

  const logout = async () => {
    await supabase.auth.signOut()
    localStorage.removeItem("admin")
    navigate("/login")
  }

  return (
    <aside className="sidebar">
      <h2 className="logo">🏓 Admin</h2>

      <nav>
        <Link to="/admin">Dashboard</Link>
        <Link to="/players">Players</Link>
        <Link to="/tournaments">Tournaments</Link>
        <Link to="/rankings">Rankings</Link>
      </nav>

      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </aside>
  )
}