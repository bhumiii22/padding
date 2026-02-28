import { Navigate } from "react-router-dom"

export default function AdminRoute({ children }) {
  const isAdmin = localStorage.getItem("admin")
  return isAdmin ? children : <Navigate to="/login" />
}