import { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"
import "./TournamentLive.css"

export default function TournamentLive() {
  const [tournament, setTournament] = useState(null)
  const [matches, setMatches] = useState([])
  const [playersByMatch, setPlayersByMatch] = useState({})

  /* ================= INITIAL LOAD ================= */
  useEffect(() => {
    fetchTournament()
    fetchMatches()
    subscribeToMatches()
    subscribeToMatchPlayers()

    return () => {
      supabase.removeAllChannels()
    }
  }, [])

  /* ================= FETCH TOURNAMENT ================= */
  const fetchTournament = async () => {
    const { data } = await supabase
      .from("tournaments")
      .select("*")
      .limit(1)
      .single()

    setTournament(data)
  }

  /* ================= FETCH MATCHES ================= */
  const fetchMatches = async () => {
    const { data } = await supabase
      .from("matches")
      .select("*")
      .order("created_at", { ascending: false })

    setMatches(data || [])
  }

  /* ================= FETCH PLAYERS ================= */
  const fetchPlayers = async (matchId) => {
    const { data } = await supabase
      .from("match_players")
      .select("match_id, team, players(name)")
      .eq("match_id", matchId)

    setPlayersByMatch(prev => ({
      ...prev,
      [matchId]: data || []
    }))
  }

  /* ================= REALTIME ================= */
  const subscribeToMatches = () => {
    supabase
      .channel("matches-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "matches" },
        fetchMatches
      )
      .subscribe()
  }

  const subscribeToMatchPlayers = () => {
    supabase
      .channel("match-players-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "match_players" },
        payload => {
          fetchPlayers(payload.new.match_id)
        }
      )
      .subscribe()
  }

  /* ================= HELPERS ================= */
  const teamPlayers = (matchId, team) =>
    playersByMatch[matchId]
      ?.filter(p => p.team === team)
      .map(p => p.players.name)
      .join(", ") || "—"

  /* ================= UI ================= */
  return (
    <div className="tournament-live">
      <h1> Our Matches</h1>
      <h3>Live Matches</h3>

      {matches.length === 0 && (
        <p className="empty">No matches yet</p>
      )}

      {matches.map(match => {
        if (!playersByMatch[match.id]) fetchPlayers(match.id)

        return (
          <div key={match.id} className="match-card">
            <h2>
              {match.name}
              {match.status === "live" && (
                <span className="live-dot">● LIVE</span>
              )}
            </h2>

            <div className="score-line">
              Team A <span>{match.score_a}</span> :{" "}
              <span>{match.score_b}</span> Team B
            </div>

            <div className="teams">
              <div className="team">
                <b>Team A</b>
                <p>{teamPlayers(match.id, "A")}</p>
              </div>

              <div className="team">
                <b>Team B</b>
                <p>{teamPlayers(match.id, "B")}</p>
              </div>
            </div>

            {match.status === "ended" && (
              <p className="winner">
                Winner:{" "}
                {match.winner === "team_a"
                  ? "Team A"
                  : match.winner === "team_b"
                  ? "Team B"
                  : "Tie"}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}