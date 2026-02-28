import { useEffect, useState } from "react"
import AdminLayout from "../components/AdminLayout"
import { supabase } from "../supabaseClient"
import "./Players.css"

export default function Players() {

  const [players, setPlayers] = useState([])

  useEffect(() => {
    fetchPlayers()
  }, [])

  const fetchPlayers = async () => {
    const { data } =
      await supabase.from("players").select("*")

    setPlayers(data)
  }

  return (
    <AdminLayout>
      <h2>Players</h2>

      <div className="grid">
        {players?.map(p => (
          <div key={p.id} className="card">

            <img src={p.image_url} alt={p.name} />

            <h3>{p.name}</h3>
            <p>{p.country}</p>
            <p>Rank: {p.ranking}</p>

          </div>
        ))}
      </div>
    </AdminLayout>
  )
}