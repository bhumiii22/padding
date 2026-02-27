import React, { useEffect, useRef, useState } from "react"
import "./Gallery.css"

const players = [
  {
    name: "Rohan Patel",
    rank: "#2",
    wins: 21,
    video:
      "https://ogvnrmfqjhunlwelxwhb.supabase.co/storage/v1/object/public/gallery-videos/C3027%20(1).mp4",
  },
  {
    name: "Aarav Shah",
    rank: "#1",
    wins: 25,
    video:
      "https://ogvnrmfqjhunlwelxwhb.supabase.co/storage/v1/object/public/gallery-videos/C3030%20(1).mp4",
  },
  {
    name: "Kunal Mehta",
    rank: "#3",
    wins: 18,
    video:
      "https://ogvnrmfqjhunlwelxwhb.supabase.co/storage/v1/object/public/gallery-videos/C3044%20(1).mp4",
  },
]

const Gallery = () => {
  const [current, setCurrent] = useState(0)
  const videoRef = useRef(null)

  // Auto move when video ends
  useEffect(() => {
    const video = videoRef.current

    if (video) {
      video.onended = () => {
        setCurrent((prev) => (prev + 1) % players.length)
      }
    }
  }, [current])

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
        <video
          key={current}
          ref={videoRef}
          src={players[current].video}
          autoPlay
          muted
          playsInline
          className="slide-video"
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
          <div
            className="gallery-card"
            key={index}
            onClick={() => setCurrent(index)}
          >
            <video
              src={player.video}
              muted
              loop
              autoPlay
              playsInline
            />

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
