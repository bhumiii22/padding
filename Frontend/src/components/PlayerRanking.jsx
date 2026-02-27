import { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"
import "./PlayerRanking.css"

export default function PlayerRanking() {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    fetchPlayers()
  }, [])

  async function fetchPlayers() {
    const { data, error } = await supabase.from("players").select("*")
    if (error) return console.error(error)

    const ranked = [...data]
      .sort(() => Math.random() - 0.5)
      .map((p, i) => ({
        ...p,
        rank: i + 1,
        accuracy: Math.floor(Math.random() * 25) + 65,
        matches: Math.floor(Math.random() * 15) + 10,
      }))

    setPlayers(ranked)
  }

  if (players.length < 3) {
    return <p className="loading">Loading rankings...</p>
  }

  const topThree = players.slice(0, 3)
  const rest = players.slice(3)

  // podium order: #2 | #1 | #3
  const podium = [topThree[1], topThree[0], topThree[2]]

  return (
    <section className="ranking-page">
      <h1 className="ranking-title">Player Rankings</h1>

      {/* 🏆 TOP 3 */}
      <div className="top-three-horizontal">
        {podium.map((p, index) => (
          <div
            key={p.id}
            className={`top-box ${index === 1 ? "rank-1" : ""}`}
          >
            <img src={p.image_url || "/p1.png"} alt={p.name} />
            <span className="top-rank">#{p.rank}</span>
            <span className="top-name">{p.name}</span>
          </div>
        ))}
      </div>

      {/* 📋 REST */}
      <div className="ranking-list">
        {rest.map((p) => (
          <div key={p.id} className="ranking-row">
            <span className="row-rank">#{p.rank}</span>

            <div className="row-player">
              <img src={p.image_url || "/p1.png"} alt={p.name} />
              <div>
                <strong>{p.name}</strong>
                <p>{p.city}</p>
              </div>
            </div>

            <div className="row-stats">
              <span>{p.accuracy}%</span>
              <span>{p.matches} matches</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}