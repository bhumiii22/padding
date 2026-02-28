
import { Link } from "react-router-dom"
import { supabase } from "../supabaseClient"

export default function AdminLayout({ children }) {

  const logout = async () => {
    await supabase.auth.signOut()
    localStorage.removeItem("admin")
    window.location.href = "/login"
  }

  return (
    <div className="admin-container">

      <aside className="sidebar">
        <h2>Admin Panel</h2>
         <Link to="/admin">Dashboard</Link>
       
        <Link to="/players">Players</Link>
        <Link to="/tournaments">Tournaments</Link>
        <Link to="/rankings">Rankings</Link>
        <Link to="/live">Live Scores</Link>

        <button onClick={logout}>Logout</button>
      </aside>

      <main className="content">
        {children}
      </main>
    </div>
  )
}