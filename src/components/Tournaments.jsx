// import { useEffect, useState } from "react"
// import { supabase } from "../supabaseClient"
// import bg from "../assets/bg.png";
// import "./Tournament.css"

// export default function Tournaments() {
//   const [tournaments, setTournaments] = useState([])

//   useEffect(() => {
//     supabase
//       .from("tournaments")
//       .select("*")
//       .then(({ data }) => setTournaments(data))
//   }, [])

//   return (
//     <section className="tournaments-section">
//       <h2 className="tournaments-title">Our Tournaments</h2>

//       <div className="tournaments-grid">
//         {tournaments.map(t => (
//          <div
//   key={t.id}
//   className="tournament-card"
//   style={{
//     backgroundImage: `url(${t.image_url || bg})`,
//   }}
// >
//   <div className="tournament-overlay">
//     <h3>{t.name}</h3>
//     <span className="location">{t.location}</span>
//     <div className="date-badge">
//       {t.start_date} → {t.end_date}
//     </div>
//   </div>
// </div>
//         ))}
//       </div>
//     </section>
//   )
// }
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";
import bg from "../assets/bg.png";
import "./Tournament.css";

export default function Tournaments() {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    supabase
      .from("tournaments")
      .select("*")
      .then(({ data }) => setTournaments(data || []));
  }, []);

  return (
    <section className="tournaments-section">
      <h2 className="tournaments-title">Our Tournaments</h2>

      <div className="tournaments-grid">
        {tournaments.map(t => (
          <Link
            key={t.id}
            to={`/tournaments/${t.id}`}
            className="tournament-link"
          >
            <div
              className="tournament-card"
              style={{
                backgroundImage: `url(${t.image_url || bg})`,
              }}
            >
              <div className="tournament-overlay">
                <h3>{t.name}</h3>
                <span className="location">{t.location}</span>
                <div className="date-badge">
                  {t.start_date} → {t.end_date}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
