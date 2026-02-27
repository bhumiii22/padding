// import { NavLink } from "react-router-dom";
// import { useState } from "react";
// import { supabase } from "../supabaseClient"
// import "./Navbar.css";

// const Navbar = () => {
//   console.log('Navbar component rendering')
//   const [menuOpen, setMenuOpen] = useState(false);
//    const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [error, setError] = useState("")
//   const [showLogin, setShowLogin] = useState(false)

//   const handleAdminLogin = async (e) => {
//     e.preventDefault()

//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     })

//     if (error) {
//       setError("Invalid credentials")
//       return
//     }

//     // check admin role
//     const { data: admin } = await supabase
//       .from("admins")
//       .select("id")
//       .eq("id", data.user.id)
//       .single()

//     if (!admin) {
//       setError("Not an admin")
//       await supabase.auth.signOut()
//       return
//     }

//     // ✅ redirect to admin panel app
//     window.location.href = "http://localhost:5174"
//     // production:
//     // window.location.href = "https://paddle-admin.vercel.app"
//   }


//   return (
//     <nav className="navbar">
//       {/* Logo */}
//       <div className="nav-logo">PADEL </div>

//       {/* Hamburger */}
//       <div
//         className="menu-toggle"
//         onClick={() => setMenuOpen(!menuOpen)}
//       >
//         <span></span>
//         <span></span>
//         <span></span>
//       </div>

//       {/* Nav Links */}
//       <div className={`nav-menu ${menuOpen ? "open" : ""}`}>
//         <NavLink
//           to="/"
//           className="nav-link"
//           onClick={() => setMenuOpen(false)}
//         >
//           Home
//         </NavLink>

//         <NavLink
//           to="/gallery"
//           className="nav-link"
//           onClick={() => setMenuOpen(false)}
//         >
//           Gallery
//         </NavLink>

//         <NavLink
//           to="/tournaments"
//           className="nav-link"
//           onClick={() => setMenuOpen(false)}
//         >
//           Tournaments
//         </NavLink>

//         <NavLink
//           to="/contact"
//           className="nav-link"
//           onClick={() => setMenuOpen(false)}
//         >
//           Contact
//         </NavLink>

//         {/* <a
//           href=" https://forms.gle/AzRuoXNA6ZBvFcss5"
          
//           className="register-btn"
//           onClick={() => setMenuOpen(false)}
//         >
//           Register Now
//         </a> */}
        

//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { NavLink } from "react-router-dom"
import { useState } from "react"
import { supabase } from "../supabaseClient"
import "./Navbar.css"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleAdminLogin = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // 1️⃣ Login with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError("Invalid email or password")
      setLoading(false)
      return
    }

    // 2️⃣ Check admin table
    const { data: admin, error: adminError } = await supabase
      .from("admins")
      .select("id")
      .eq("id", data.user.id)
      .single()

    if (adminError || !admin) {
      setError("You are not authorized as admin")
      await supabase.auth.signOut()
      setLoading(false)
      return
    }

    // 3️⃣ Redirect to Admin Panel
    window.location.href = "http://localhost:5173"
  }

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="nav-logo">PADEL</div>

      {/* Hamburger */}
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Links */}
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

        {/* Admin Login Button */}
        <button className="admin-btn" onClick={() => setShowLogin(!showLogin)}>
          Admin Login
        </button>
      </div>

      {/* Admin Login Form */}
      {showLogin && (
        <div className="admin-login-box">
          <form onSubmit={handleAdminLogin}>
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p className="error-text">{error}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      )}
    </nav>
  )
}

export default Navbar
