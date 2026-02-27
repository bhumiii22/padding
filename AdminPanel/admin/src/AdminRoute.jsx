// import { useEffect, useState } from "react"

import { Navigate } from "react-router-dom"

// import { supabase } from "./supabaseClient"
// import { Navigate } from "react-router-dom"

// export default function AdminRoute({ children }) {
//   const [allowed, setAllowed] = useState(null)

//   useEffect(() => {
//     async function checkAdmin() {
//       const { data } = await supabase.auth.getUser()
//       if (!data.user) return setAllowed(false)

//       const { data: profile } = await supabase
//         .from("profiles")
//         .select("role")
//         .eq("id", data.user.id)
//         .single()

//       setAllowed(profile?.role === "admin")
//     }
//     checkAdmin()
//   }, [])

//   if (allowed === null) return null
//   if (!allowed) return <Navigate to="/login" />

//   return children
// }import { Navigate } from "react-router-dom"

export default function AdminRoute({ children }) {
  const isAdmin = localStorage.getItem("admin")
  return isAdmin ? children : <Navigate to="/login" />
}
