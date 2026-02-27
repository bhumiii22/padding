import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import PlayerProfile from "./PlayerProfile";

export default function TournamentPlayers() {
  const [players, setPlayers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlayers();
  }, []);

  async function fetchPlayers() {
    const { data, error } = await supabase
      .from("players")
      .select("*")
      .order("performance_rating", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setPlayers(data);
    }

    setLoading(false);
  }

  const nextPlayer = () => {
    setCurrentIndex((prev) =>
      prev === players.length - 1 ? 0 : prev + 1
    );
  };

  const prevPlayer = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? players.length - 1 : prev - 1
    );
  };

  if (loading) return <p className="players-loading">Loading players...</p>;
  if (!players.length) return <p className="players-loading">No players found</p>;

  return (
    <div className="players-wrapper">
      <div className="players-container">
        <PlayerProfile
          player={players[currentIndex]}
          onNext={nextPlayer}
          onPrev={prevPlayer}
          total={players.length}
          index={currentIndex}
        />
      </div>
    </div>
  );
}
