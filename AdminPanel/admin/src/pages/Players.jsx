import { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"

export default function Players() {
  const [players, setPlayers] = useState([])
  const [name, setName] = useState("")

  useEffect(() => {
    fetchPlayers()
  }, [])

  async function fetchPlayers() {
    const { data } = await supabase.from("players").select("*")
    setPlayers(data || [])
  }

  async function addPlayer() {
    if (!name) return
    await supabase.from("players").insert([{ name }])
    setName("")
    fetchPlayers()
  }

  async function deletePlayer(id) {
    await supabase.from("players").delete().eq("id", id)
    fetchPlayers()
  }

  return (
    <div className="page">
      <h2>Players</h2>

      <input placeholder="Player name" value={name} onChange={e => setName(e.target.value)} />
      <button onClick={addPlayer}>Add</button>

      {players.map(p => (
        <div key={p.id} className="row">
          {p.name}
          <button onClick={() => deletePlayer(p.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}