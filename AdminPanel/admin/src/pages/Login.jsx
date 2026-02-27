import { useState } from "react"
import { supabase } from "../supabaseClient"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      return
    }

    // Check admin table
    const { data: admin } = await supabase
      .from("admins")
      .select("*")
      .eq("id", data.user.id)
      .single()

    if (!admin) {
      setError("Not an admin")
      await supabase.auth.signOut()
      return
    }

    localStorage.setItem("admin", "true")
    navigate("/")
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Admin Login</h2>

      <input
        type="email"
        placeholder="Admin email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">Login</button>
    </form>
  )
}