// import { useEffect, useState } from "react"
// import { supabase } from "../supabaseClient"
// import AdminLayout from "../components/AdminLayout"
// import "./Dashboard.css"
// import {  useNavigate } from "react-router-dom"

// export default function Dashboard() {
//   const [matches, setMatches] = useState([])
//   const [players, setPlayers] = useState([])
//   const [activeMatch, setActiveMatch] = useState(null)
//   const [assignments, setAssignments] = useState([])
//   const [matchName, setMatchName] = useState("")

//   /* ================= FETCH ================= */
// const navigate = useNavigate()

//   const fetchMatches = async () => {
//   const { data, error } = await supabase
//     .from("matches")
//     .select(`
//       id,
//       name,
//       status,
//       score_a,
//       score_b,
//       winner,
//       created_at,
//       match_players!match_players_match_id_fkey (
//         team,
//         players (
//           name
//         )
//       )
//     `)
//     .order("created_at", { ascending: false })

//   if (error) {
//     console.error("Fetch matches error:", error)
//     return
//   }

//   setMatches(data || [])
//   setActiveMatch(data?.find(m => m.status === "live") || null)
// }

//   const fetchPlayers = async () => {
//     const { data } = await supabase
//       .from("players")
//       .select("id, name")
//       .order("name")

//     setPlayers(data || [])
//   }

//   const fetchAssignments = async (matchId) => {
//     const { data } = await supabase
//       .from("match_players")
//       .select("player_id, team, position, players(name)")
//       .eq("match_id", matchId)

//     setAssignments(data || [])
//   }

//   useEffect(() => {
//     fetchMatches()
//     fetchPlayers()
//   }, [])

//   useEffect(() => {
//     if (activeMatch) fetchAssignments(activeMatch.id)
//   }, [activeMatch])

//   /* ================= MATCH ================= */

//   const createMatch = async () => {
//     if (!matchName.trim()) return alert("Enter match name")

//     const { error } = await supabase.from("matches").insert({
//       name: matchName,
//       status: "idle",
//       score_a: 0,
//       score_b: 0,
//     })

//     if (error) {
//       console.error(error)
//       alert("Failed to create match")
//       return
//     }

//     setMatchName("")
//     fetchMatches()
//   }

//   const startMatch = async (id) => {
//     await supabase.from("matches").update({ status: "live" }).eq("id", id)
//     fetchMatches()
//   }

//   const endMatch = async (winner) => {
//     if (!activeMatch) return

//     await supabase.from("matches").update({
//       status: "ended",
//       winner,
//       ended_at: new Date(),
//     }).eq("id", activeMatch.id)

//     setActiveMatch(null)
//     setAssignments([])
//     fetchMatches()
//   }

//   const deleteMatch = async (id, status) => {
//     if (status === "live") {
//       alert("Cannot delete a live match")
//       return
//     }

//     if (!window.confirm("Delete this match permanently?")) return

//     await supabase.from("matches").delete().eq("id", id)
//     fetchMatches()
//   }

//   /* ================= SCORE ================= */

//   const updateScore = async (team, delta) => {
//     if (!activeMatch) return

//     const field = team === "A" ? "score_a" : "score_b"
//     const current = activeMatch[field]

//     if (current + delta < 0) return

//     await supabase
//       .from("matches")
//       .update({ [field]: current + delta })
//       .eq("id", activeMatch.id)

//     fetchMatches()
//   }

//   /* ================= ASSIGN ================= */

//   const teamA = assignments.filter(a => a.team === "A")
//   const teamB = assignments.filter(a => a.team === "B")

//   const isAssigned = (playerId) =>
//     assignments.some(a => a.player_id === playerId)

//   const assignPlayer = async (player_id, team, position) => {
//     if (!activeMatch) return
//     if (isAssigned(player_id)) return alert("Player already assigned")
//     if (team === "A" && teamA.length >= 2) return alert("Team A full")
//     if (team === "B" && teamB.length >= 2) return alert("Team B full")

//     await supabase.from("match_players").insert({
//       match_id: activeMatch.id,
//       player_id,
//       team,
//       position,
//     })

//     fetchAssignments(activeMatch.id)
//   }

//   /* ================= UI ================= */

//   return (
//     <AdminLayout>
//       <div className="dashboard-container">

//         <header className="dashboard-header">
//           <div>
//             <h1>Padel Command Center</h1>
//             <p className="subtitle">Admin Match Control</p>
//           </div>
//           <span className={`status-tag ${activeMatch ? "live" : "idle"}`}>
//             {activeMatch ? "LIVE MATCH" : "SYSTEM READY"}
//           </span>
//         </header>

//         {!activeMatch && (
//           <div style={{ marginBottom: 30 }}>
//             <input
//               value={matchName}
//               onChange={(e) => setMatchName(e.target.value)}
//               placeholder="Enter match name"
//               style={{ padding: 12, marginRight: 10 }}
//             />
//             <button className="btn-start" onClick={createMatch}>
//               ➕ CREATE MATCH
//             </button>
//           </div>
//         )}

//         {!activeMatch && matches.map(m => (
//           <div key={m.id} className="glass-panel">
//             <p><b>Match:</b> {m.name}</p>
//             <p><b>Status:</b> {m.status || "idle"}</p>

//             <div style={{ display: "flex", gap: 10 }}>
//               {m.status === "idle" && (
//                 <button className="btn-start" onClick={() => startMatch(m.id)}>
//                   START
//                 </button>
//               )}

//   {m.status === "ended" && (
//     <button
//       className="btn-start"
//       onClick={() => navigate(`/matches/${m.id}`)}
//     >
//       📊 DETAILS
//     </button>
//   )}

//               <button className="btn-end" onClick={() => deleteMatch(m.id, m.status)}>
//                 🗑 DELETE
//               </button>
//             </div>
//           </div>
//         ))}

//         {activeMatch && (
//           <section className="glass-panel">
//             <h2>{activeMatch.name}</h2>

//             <div className="score-flex">
//               <div>
//                 <h3>TEAM A</h3>
//                 {teamA.map(p => <span key={p.player_id} className="chip">{p.players.name}</span>)}
//                 <div className="point-box">{activeMatch.score_a}</div>
//                 <button onClick={() => updateScore("A", +1)}>+ POINT</button>
//                 <button onClick={() => updateScore("A", -1)}>- POINT</button>
//               </div>

//               <div className="divider-vs">VS</div>

//               <div>
//                 <h3>TEAM B</h3>
//                 {teamB.map(p => <span key={p.player_id} className="chip">{p.players.name}</span>)}
//                 <div className="point-box">{activeMatch.score_b}</div>
//                 <button onClick={() => updateScore("B", +1)}>+ POINT</button>
//                 <button onClick={() => updateScore("B", -1)}>- POINT</button>
//               </div>
//             </div>

//             <div className="session-controls">
//               <button className="btn-end" onClick={() => endMatch("team_a")}>END → TEAM A</button>
//               <button className="btn-end" onClick={() => endMatch("team_b")}>END → TEAM B</button>
//               <button className="btn-end" onClick={() => endMatch("tie")}>END → TIE</button>
//             </div>
//           </section>
//         )}
//       </div>
//     </AdminLayout>
//   )
// }
import { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"
import AdminLayout from "../components/AdminLayout"
import { useNavigate } from "react-router-dom"
import "./Dashboard.css"

export default function Dashboard() {
  const navigate = useNavigate()

  const [matches, setMatches] = useState([])
  const [players, setPlayers] = useState([])
  const [activeMatch, setActiveMatch] = useState(null)
  const [assignments, setAssignments] = useState([])
  const [matchName, setMatchName] = useState("")

  /* ================= FETCH ================= */

  const fetchMatches = async () => {
    const { data, error } = await supabase
      .from("matches")
      .select("id,name,status,score_a,score_b,winner,created_at")
      .order("created_at", { ascending: false })

    if (error) {
      console.error(error)
      return
    }

    setMatches(data || [])
    setActiveMatch(data?.find(m => m.status === "live") || null)
  }

  const fetchPlayers = async () => {
    const { data } = await supabase
      .from("players")
      .select("id,name")
      .order("name")

    setPlayers(data || [])
  }

  const fetchAssignments = async (matchId) => {
    const { data } = await supabase
      .from("match_players")
      .select("player_id,team,position,players(name)")
      .eq("match_id", matchId)

    setAssignments(data || [])
  }

  useEffect(() => {
    fetchMatches()
    fetchPlayers()
  }, [])

  useEffect(() => {
    if (activeMatch) fetchAssignments(activeMatch.id)
  }, [activeMatch])

  /* ================= MATCH ================= */

  const createMatch = async () => {
    if (!matchName.trim()) return alert("Enter match name")

    await supabase.from("matches").insert({
      name: matchName,
      status: "idle",
      score_a: 0,
      score_b: 0,
    })

    setMatchName("")
    fetchMatches()
  }

  const startMatch = async (id) => {
    await supabase.from("matches").update({ status: "live" }).eq("id", id)
    fetchMatches()
  }

  const endMatch = async (winner) => {
    if (!activeMatch) return

    await supabase.from("matches").update({
      status: "ended",
      winner,
      ended_at: new Date(),
    }).eq("id", activeMatch.id)

    setActiveMatch(null)
    setAssignments([])
    fetchMatches()
  }

  const deleteMatch = async (id, status) => {
    if (status === "live") return alert("Cannot delete live match")
    if (!window.confirm("Delete match permanently?")) return

    await supabase.from("matches").delete().eq("id", id)
    fetchMatches()
  }

  /* ================= SCORE ================= */

  const updateScore = async (team, delta) => {
    if (!activeMatch) return

    const field = team === "A" ? "score_a" : "score_b"
    const current = activeMatch[field]

    if (current + delta < 0) return

    await supabase
      .from("matches")
      .update({ [field]: current + delta })
      .eq("id", activeMatch.id)

    fetchMatches()
  }

  /* ================= ASSIGN ================= */

  const teamA = assignments.filter(a => a.team === "A")
  const teamB = assignments.filter(a => a.team === "B")

  const isAssigned = (id) =>
    assignments.some(a => a.player_id === id)

  const assignPlayer = async (player_id, team, position) => {
    if (isAssigned(player_id)) return
    if (team === "A" && teamA.length >= 2) return alert("Team A full")
    if (team === "B" && teamB.length >= 2) return alert("Team B full")

    await supabase.from("match_players").insert({
      match_id: activeMatch.id,
      player_id,
      team,
      position,
    })

    fetchAssignments(activeMatch.id)
  }

  /* ================= UI ================= */

  return (
    <AdminLayout>
      <div className="dashboard-container">

        {/* HEADER */}
        <header className="dashboard-header">
          <div>
            <h1>Padel Command Center</h1>
            <p className="subtitle">Admin Match Control</p>
          </div>
          <span className={`status-tag ${activeMatch ? "live" : "idle"}`}>
            {activeMatch ? "LIVE MATCH" : "SYSTEM READY"}
          </span>
        </header>

        {/* CREATE MATCH */}
        {!activeMatch && (
          <div style={{ marginBottom: 30 }}>
            <input
              value={matchName}
              onChange={(e) => setMatchName(e.target.value)}
              placeholder="Enter match name"
            />
            <button className="btn-start" onClick={createMatch}>
              ➕ CREATE MATCH
            </button>
          </div>
        )}

        {/* MATCH LIST */}
        {!activeMatch && matches.map(m => (
          <div key={m.id} className="glass-panel">
            <p><b>Match:</b> {m.name}</p>
            <p><b>Status:</b> {m.status}</p>

            <div style={{ display: "flex", gap: 10 }}>
              {m.status === "idle" && (
                <button onClick={() => startMatch(m.id)} className="btn-start">
                  START
                </button>
              )}

              {m.status === "ended" && (
                <button
                  className="btn-start"
                  onClick={() => navigate(`/matches/${m.id}`)}
                >
                  📊 DETAILS
                </button>
              )}

              <button className="btn-end" onClick={() => deleteMatch(m.id, m.status)}>
                🗑 DELETE
              </button>
            </div>
          </div>
        ))}

        {/* LIVE MATCH */}
        {activeMatch && (
          <>
            <section className="glass-panel">
              <h2>{activeMatch.name}</h2>

              <div className="score-flex">
                <div>
                  <h3>TEAM A</h3>
                  {teamA.map(p => (
                    <span key={p.player_id} className="chip">{p.players.name}</span>
                  ))}
                  <div className="point-box">{activeMatch.score_a}</div>
                  <button onClick={() => updateScore("A", +1)}>+ POINT</button>
                  <button onClick={() => updateScore("A", -1)}>- POINT</button>
                </div>

                <div className="divider-vs">VS</div>

                <div>
                  <h3>TEAM B</h3>
                  {teamB.map(p => (
                    <span key={p.player_id} className="chip">{p.players.name}</span>
                  ))}
                  <div className="point-box">{activeMatch.score_b}</div>
                  <button onClick={() => updateScore("B", +1)}>+ POINT</button>
                  <button onClick={() => updateScore("B", -1)}>- POINT</button>
                </div>
              </div>

              <div className="session-controls">
                <button onClick={() => endMatch("team_a")} className="btn-end">
                  END → TEAM A
                </button>
                <button onClick={() => endMatch("team_b")} className="btn-end">
                  END → TEAM B
                </button>
                <button onClick={() => endMatch("tie")} className="btn-end">
                  END → TIE
                </button>
              </div>
            </section>

            {/* PLAYER ASSIGNMENT */}
            <section className="glass-panel">
              <h2>Assign Players</h2>

              <div className="roster-grid">
                {players.map(p => (
                  <div key={p.id} className="player-card">
                    <span>{p.name}</span>
                    <div>
                      <button disabled={isAssigned(p.id)} onClick={() => assignPlayer(p.id, "A", 1)}>A1</button>
                      <button disabled={isAssigned(p.id)} onClick={() => assignPlayer(p.id, "A", 2)}>A2</button>
                      <button disabled={isAssigned(p.id)} onClick={() => assignPlayer(p.id, "B", 1)}>B1</button>
                      <button disabled={isAssigned(p.id)} onClick={() => assignPlayer(p.id, "B", 2)}>B2</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </AdminLayout>
  )
}