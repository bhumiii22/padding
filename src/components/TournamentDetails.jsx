
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

  useEffect(() => {
    fetchTournament();
  }, [id]);

  async function fetchTournament() {
    const { data, error } = await supabase
      .from("tournaments")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
    } else {
      setTournament(data);
    }
  }

  if (!tournament) return <p style={{ color: "#fff" }}>Loading...</p>;

  return (
    <>
      {/* HERO */}
     <section
  className="tournament-hero"
  style={{
    backgroundImage: `url(${tournament.image_url || bg})`
  }}
>
  <div className="tournament-hero-overlay">
    <h1>{tournament.name}</h1>
    <p className="location"> {tournament.location}</p>
    <span className="dates">
      {tournament.start_date} → {tournament.end_date}
    </span>
  </div>
</section>

<div className="spacer"></div>
<h1 className="pname">Tournaments Players</h1>

      {/* PLAYERS */}
      <TournamentPlayers tournamentId={id} />

      {/* RANKINGS */}
      <PlayerRanking tournamentId={id} />
    </>
  );
}
