import React, { useEffect, useState } from "react"
import "./gallery.css"

const players = [
  {
    name: "Rohan Patel",
    rank: "#2",
    wins: 21,
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Aarav Shah",
    rank: "#1",
    wins: 25,
    image:
      "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Kunal Mehta",
    rank: "#3",
    wins: 18,
    image:
      "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=1600&q=80",
  },
]

const Gallery = () => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % players.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + players.length) % players.length)
  }

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % players.length)
  }

  return (
    <div className="gallery-page">
      {/* SLIDESHOW */}
      <section className="slideshow">
        <img
          src={players[current].image}
          alt={players[current].name}
          className="slide-img"
        />

        <div className="slide-overlay">
          <h2>{players[current].name}</h2>
          <p>
            RANK {players[current].rank} • {players[current].wins} WINS
          </p>
        </div>

        <button className="nav-btn left" onClick={prevSlide}>
          ‹
        </button>
        <button className="nav-btn right" onClick={nextSlide}>
          ›
        </button>
      </section>

      {/* TITLE */}
      <h1 className="gallery-title">Players in Action</h1>

      {/* GRID */}
      <section className="gallery-grid">
        {players.map((player, index) => (
          <div className="gallery-card" key={index}>
            <img src={player.image} alt={player.name} loading="lazy" />
            <div className="card-overlay">
              <span>
                {player.name}
                <small>
                  Rank {player.rank} • {player.wins} Wins
                </small>
              </span>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Gallery
