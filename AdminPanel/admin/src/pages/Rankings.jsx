import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import AdminLayout from "../components/AdminLayout";
import "../styles/admin.css";

export default function Rankings() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRankings();
  }, []);

  const fetchRankings = async () => {
    // Fetch players sorted by rank (ascending) or points (descending)
    const { data, error } = await supabase
      .from("players")
      .select("*")
      .order('rank', { ascending: true });

    if (!error) {
      setPlayers(data);
    }
    setLoading(false);
  };

  return (
    <AdminLayout>
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div className="title-section">
            <h1>Global Rankings</h1>
            <p className="subtitle">Official Padel Player Standings</p>
          </div>
          <div className="live-status">
            <span className="pulse-icon"></span> UPDATED LIVE
          </div>
        </header>

        <section className="glass-panel roster-panel">
          {loading ? (
            <div className="loader-container">
              <span className="spinner"></span>
              <p>Syncing Leaderboard...</p>
            </div>
          ) : (
            <div className="roster-table-wrapper">
              <table className="roster-table">
                <thead>
                  <tr>
                    <th>Position</th>
                    <th>Player Name</th>
                    <th>Status</th>
                    <th>Points</th>
                    <th>Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {players.map((player, index) => (
                    <tr key={player.id} className="ranking-row">
                      <td>
                        <span className={`rank-tag ${index < 3 ? 'top-tier' : ''}`}>
                          #{player.rank || index + 1}
                        </span>
                      </td>
                      <td className="player-name-cell">
                        <strong>{player.name}</strong>
                      </td>
                      <td>
                        <span className="status-indicator active">Pro</span>
                      </td>
                      <td className="points-cell">
                        {player.points || (1000 - index * 50)} PTS
                      </td>
                      <td className="trend-cell">
                        {index === 0 ? "↔️" : "🔼"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </AdminLayout>
  );
}