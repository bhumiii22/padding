import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { supabase } from "../supabaseClient"
import AdminLayout from "../components/AdminLayout"
import "./MatchDetails.css"

export default function MatchDetails() {
  const { id } = useParams()
  const [match, setMatch] = useState(null)

  useEffect(() => {
    fetchMatch()
  }, [])

  const fetchMatch = async () => {
    const { data, error } = await supabase
      .from("matches")
      .select(`
        id,
        name,
        status,
        score_a,
        score_b,
        winner,
        created_at,
        tournaments (
          name
        ),
        match_players!match_players_match_id_fkey (
          team,
          players (
            name
          )
        )
      `)
      .eq("id", id)
      .single()

    if (error) {
      console.error(error)
      return
    }

    setMatch(data)
  }

  if (!match) return <p style={{ padding: 40 }}>Loading...</p>

  const teamA = match.match_players.filter(p => p.team === "A")
  const teamB = match.match_players.filter(p => p.team === "B")

  return (
    <AdminLayout>
      <div className="match-details-container">

        <h1>{match.name}</h1>
        
        <p><b>Status:</b> {match.status}</p>

        <hr />

        <h2>Teams</h2>

        <p><b>Team A:</b></p>
        {teamA.map((p, i) => (
          <div key={i}>• {p.players.name}</div>
        ))}

        <p style={{ marginTop: 10 }}><b>Team B:</b></p>
        {teamB.map((p, i) => (
          <div key={i}>• {p.players.name}</div>
        ))}

        <hr />

        <h2>Final Score</h2>
        <p>{match.score_a} - {match.score_b}</p>

        <h2>Winner</h2>
        <p>
          {match.winner === "team_a"
            ? "Team A"
            : match.winner === "team_b"
            ? "Team B"
            : "Tie"}
        </p>

      </div>
    </AdminLayout>
  )
}