import { useEffect, useState } from "react"
import AdminLayout from "../components/AdminLayout"
import { supabase } from "../supabaseClient"
import "./Tournaments.css"
export default function Tournaments() {

  const [tournaments, setTournaments] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data } =
      await supabase.from("tournaments").select("*")

    setTournaments(data)
  }

  return (
    <AdminLayout>
      <h2>Tournaments</h2>

      <div className="grid">
        {tournaments?.map(t => (
          <div key={t.id} className="card">

            <img src={t.image_url} alt={t.name} />

            <h3>{t.name}</h3>
            <p>{t.location}</p>
            <p>{t.start_date} → {t.end_date}</p>

          </div>
        ))}
      </div>
    </AdminLayout>
  )
}