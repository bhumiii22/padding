
import { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"
import "./Players.css"
import "./Hero.css"
export default function Players() {
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)
const [current, setCurrent] = useState(0)

const nextPlayer = () => {
  setCurrent((prev) => (prev + 1) % players.length)
}

const prevPlayer = () => {
  setCurrent((prev) =>
    prev === 0 ? players.length - 1 : prev - 1
  )
}
  useEffect(() => {
    fetchPlayers()
  }, [])

  async function fetchPlayers() {
    const { data, error } = await supabase
      .from("players")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error(error)
    } else {
      setPlayers(data)
    }
    setLoading(false)
  }

  if (loading) return <p>Loading players...</p>
return (
  <div className="players-section">
    {/* LEFT: Carousel */}
    <div className="players-carousel">
      <button className="nav-arrow left" onClick={prevPlayer}>‹</button>

      <div className="carousel-stage">
        {players.map((player, index) => (
          <div
            key={player.id}
            className={`player-card ${index === current ? "active" : ""}`}
          >
            <img
              src={player.image_url || "/p1.png"}
              alt={player.name}
            />

            <div className="player-info">
              <h3>{player.name}</h3>
              <span>{player.city}</span>
              <span className="age">Age {player.age}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="nav-arrow right" onClick={nextPlayer}>›</button>
    </div>

    {/* RIGHT: Text */}
    <div className="players-content">
      <h2 className=" hero-title glow-text">Our <span>Players</span></h2>
      <p>
        Meet our elite squad of talented athletes who represent
        passion, discipline, and excellence on the field.
      </p>
    <div className="spacer"></div>
      <button className="hero-btn">View Full Squad</button>
    </div>
  </div>
)
}