import { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"

export default function Tournaments() {
  const [tournaments, setTournaments] = useState([])
  const [title, setTitle] = useState("")

  useEffect(() => {
    fetchTournaments()
  }, [])

  async function fetchTournaments() {
    const { data } = await supabase.from("tournaments").select("*")
    setTournaments(data || [])
  }

  async function addTournament() {
    if (!title) return
    await supabase.from("tournaments").insert([{ title }])
    setTitle("")
    fetchTournaments()
  }

  async function deleteTournament(id) {
    await supabase.from("tournaments").delete().eq("id", id)
    fetchTournaments()
  }

  return (
    <div className="page">
      <h2>Tournaments</h2>

      <input placeholder="Tournament title" value={title} onChange={e => setTitle(e.target.value)} />
      <button onClick={addTournament}>Add</button>

      {tournaments.map(t => (
        <div key={t.id} className="row">
          {t.title}
          <button onClick={() => deleteTournament(t.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}