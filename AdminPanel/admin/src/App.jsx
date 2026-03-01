import { Routes, Route, Navigate } from "react-router-dom" 

import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Players from "./pages/Players"
import Tournaments from "./pages/Tournaments"
import Rankings from "./pages/Rankings"
import AdminRoute from "./AdminRoute"
import { supabase } from './supabaseClient'
import MatchDetails from "./pages/MatchDetails"



export default function App() {
  return (
   
      <Routes>
        {/* 🔥 Default route */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/players"
          element={
            <AdminRoute>
              <Players />
            </AdminRoute>
          }
        />

        <Route
          path="/tournaments"
          element={
            <AdminRoute>
              <Tournaments />
            </AdminRoute>
          }
        />

        <Route
          path="/rankings"
          element={
            <AdminRoute>
              <Rankings />
            </AdminRoute>
          }
        />
        <Route path="/matches/:id" element={<MatchDetails />} />

  
      </Routes>

  )
}