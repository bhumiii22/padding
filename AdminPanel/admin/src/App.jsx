import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import AdminRoute from "./AdminRoute"
import Dashboard from "./pages/Dashboard"
import Players from "./pages/Players"
import Tournaments from "./pages/Tournaments"
import Rankings from "./pages/Rankings"


export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<AdminRoute><Dashboard /></AdminRoute>} />
      <Route path="/players" element={<AdminRoute><Players /></AdminRoute>} />
      <Route path="/tournaments" element={<AdminRoute><Tournaments /></AdminRoute>} />
      <Route path="/rankings" element={<AdminRoute><Rankings /></AdminRoute>} />
    </Routes>
  )
}