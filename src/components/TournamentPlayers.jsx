// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { supabase } from "../supabaseClient";
// import PlayerProfile from "./PlayerProfile";

// export default function TournamentPlayers() {
//   const { id } = useParams(); // tournament id
//   const [players, setPlayers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchPlayers();
//   }, [id]);

//   async function fetchPlayers() {
//     const { data, error } = await supabase
//       .from("players")
//       .select("*")
//       .eq("tournament_id", id);

//     if (error) {
//       console.error(error);
//     } else {
//       setPlayers(data);
//     }
//     setLoading(false);
//   }

//   if (loading) return <p style={{ color: "#fff" }}>Loading players...</p>;

//   return (
//     <>
//       {players.length === 0 && (
//         <p style={{ color: "#fff" }}>No players found</p>
//       )}

//       {players.map(player => (
//         <PlayerProfile key={player.id} player={player} />
//       ))}
//     </>
//   );
// }import { useEffect, useState } from "react";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import PlayerProfile from "./PlayerProfile";

export default function TournamentPlayers() {
  const [players, setPlayers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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
  }

  if (!players.length) return <p>No players found</p>;

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

  return (
    <PlayerProfile
      player={players[currentIndex]}
      onNext={nextPlayer}
      onPrev={prevPlayer}
      total={players.length}
      index={currentIndex}
    />
  );
}
