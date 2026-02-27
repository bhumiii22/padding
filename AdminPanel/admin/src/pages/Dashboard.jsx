import { Link } from "react-router-dom"
import { supabase } from "../supabaseClient"

export default function Dashboard() {
  const logout = async () => {
    await supabase.auth.signOut()
    localStorage.removeItem("admin")
    window.location.href = "/login"
  }
  return (
    <div className="page">
      <h1>Admin Dashboard</h1>

      <nav className="admin-nav">
        <Link to="/players">Players</Link>
        <Link to="/tournaments">Tournaments</Link>
        <Link to="/rankings">Rankings</Link>
        <button onClick={logout}>Logout</button>
      </nav>
    </div>
  )
}