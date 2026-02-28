

//  import { NavLink } from "react-router-dom"
//  import { useState } from "react"
//  import "./Navbar.css"

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false)

//   const goToAdminPanel = () => {
//     // local
//     window.location.href = "http://localhost:5173"

//     // production (when deployed)
//     // window.location.href = "https://paddle-admin.vercel.app"
//   }

//   return (
//     <nav className="navbar">
//       {/* Logo */}
//       <div className="nav-logo">PADEL</div>

//       {/* Hamburger */}
//       <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
//         <span></span>
//         <span></span>
//         <span></span>
//       </div>

//       {/* Nav Links */}
//       <div className={`nav-menu ${menuOpen ? "open" : ""}`}>
//         <NavLink to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
//           Home
//         </NavLink>

//         <NavLink to="/gallery" className="nav-link" onClick={() => setMenuOpen(false)}>
//           Gallery
//         </NavLink>

//         <NavLink to="/tournaments" className="nav-link" onClick={() => setMenuOpen(false)}>
//           Tournaments
//         </NavLink>

//         <NavLink to="/contact" className="nav-link" onClick={() => setMenuOpen(false)}>
//           Contact
//         </NavLink>

//         {/* Admin Panel Redirect */}
//         <button className="admin-btn" onClick={goToAdminPanel}>
//          Login
//         </button>
//       </div>
//     </nav>
//   )
// }

// export default Navbar
import { NavLink, useNavigate } from "react-router-dom"
import { useState } from "react"
import "./Navbar.css"
import { useEffect } from "react"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
    const [playerName, setPlayerName] = useState(null)
  const navigate = useNavigate()
 useEffect(() => {
    const name = localStorage.getItem("player_name")
    setPlayerName(name)
  }, [])
  const goToPlayerLogin = () => {
    setMenuOpen(false)
    navigate("/player-login") // 👈 Player login page
  }

  const handleLogout = () => {
    localStorage.clear()
    setPlayerName(null)
    setMenuOpen(false)
    navigate("/player-login")
  }

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="nav-logo" onClick={() => navigate("/")}>
        PADEL
      </div>

      {/* Hamburger */}
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Nav Links */}
      <div className={`nav-menu ${menuOpen ? "open" : ""}`}>
        <NavLink to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
          Home
        </NavLink>

        <NavLink to="/gallery" className="nav-link" onClick={() => setMenuOpen(false)}>
          Gallery
        </NavLink>

        <NavLink to="/tournaments" className="nav-link" onClick={() => setMenuOpen(false)}>
          Tournaments
        </NavLink>

        <NavLink to="/contact" className="nav-link" onClick={() => setMenuOpen(false)}>
          Contact
        </NavLink>

        {playerName ? (
          <>
            <span className="playerName">Hello, {playerName}</span>

            <button className="admin-btn logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <button className="admin-btn" onClick={goToPlayerLogin}>
            Login
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar