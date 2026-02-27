import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import TournamentPlayers from "./TournamentPlayers";
import PlayerRanking from "./PlayerRanking";
import bg from "../assets/bg.png";
import "./TournamentDetails.css";

export default function TournamentDetails() {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchTournament();
  }, [id]);

  async function fetchTournament() {
    setLoading(true);

    const { data, error } = await supabase
      .from("tournaments")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching tournament:", error.message);
    } else {
      setTournament(data);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading Tournament...</p>
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="loading-container">
        <p>Tournament not found.</p>
      </div>
    );
  }

  return (
    <div className="tournament-page">

      {/* ================= HERO ================= */}
      <section className="tournament-hero">

        {/* Background */}
        <img
          src={tournament.image_url || bg}
          alt={tournament.name}
          className="hero-bg"
        />

        {/* Overlay */}
        <div className="hero-overlay"></div>

        {/* Content Container */}
        <div className="container">
          <div className="hero-content">

            <h1 className="hero-title">
              {tournament.name}
            </h1>

            <p className="hero-location">
              {tournament.location}
            </p>

            <div className="hero-date">
              {tournament.start_date} → {tournament.end_date}
            </div>

          </div>
        </div>

      </section>
<br></br>
      {/* ================= PLAYERS ================= */}
      <section className="players-section">
        <div className="container">
          <h2 className="section-title">
            Tournament Players
          </h2>

          <TournamentPlayers tournamentId={id} />
        </div>
      </section>

      {/* ================= RANKINGS ================= */}
      <section className="ranking-section">
        <div className="container">
          

          <PlayerRanking tournamentId={id} />
        </div>
      </section>

    </div>
  );
}