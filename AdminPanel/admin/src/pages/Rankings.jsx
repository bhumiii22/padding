import { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"

export default function Rankings() {
  const [rankings, setRankings] = useState([])

  useEffect(() => {
    fetchRankings()
  }, [])

  async function fetchRankings() {
    const { data } = await supabase.from("rankings").select("*")
    setRankings(data || [])
  }

  return (
    <div className="page">
      <h2>Rankings</h2>

      {rankings.map(r => (
        <div key={r.id} className="row">
          Player ID: {r.player_id} | Score: {r.score}
        </div>
      ))}
    </div>
  )
}