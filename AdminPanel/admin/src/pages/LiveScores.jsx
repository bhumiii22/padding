import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import "../styles/admin.css";

export default function LiveScores() {
  const [match, setMatch] = useState(null);
  const scoreMap = ["0", "15", "30", "40", "AD"];

  useEffect(() => {
    // 1. Initial Fetch of the live match
    const fetchLiveMatch = async () => {
      const { data } = await supabase
        .from("matches")
        .select("*")
        .eq("status", "live")
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      if (data) setMatch(data);
    };

    fetchLiveMatch();

    // 2. Real-time Subscription to catch updates instantly
    const channel = supabase
      .channel('realtime-match')
      .on('postgres_changes', 
        { event: 'UPDATE', schema: 'public', table: 'matches' }, 
        (payload) => {
          if (payload.new.status === 'live') {
            setMatch(payload.new);
          } else if (payload.new.status === 'finished') {
            setMatch(null); // Clear screen if match ends
          }
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  if (!match) return (
    <div className="dashboard-container">
      <div className="glass-panel" style={{ textAlign: 'center' }}>
        <h2 style={{color: '#94a3b8'}}>No Live Matches</h2>
        <p>Waiting for the admin to start a new session...</p>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Live Scoreboard 🎾</h1>
        <div className="status-tag live">LIVE ON COURT</div>
      </header>

      {/* Using your exact Digital Design */}
      <section className="glass-panel scoreboard-panel">
        <div className="score-flex">
          {/* Team A */}
          <div className="team-side">
            <span className="team-meta">TEAM ALPHA</span>
            <div className="roster-chips">
              {match.team_a?.map((name, i) => (
                <span key={i} className="chip">{name}</span>
              ))}
            </div>
            <div className="score-display">
              <span className="game-score-label">{match.games_a}</span>
              <div className="point-box">{match.score_a}</div>
            </div>
          </div>

          <div className="divider-vs">VS</div>

          {/* Team B */}
          <div className="team-side">
            <span className="team-meta">TEAM OMEGA</span>
            <div className="roster-chips">
              {match.team_b?.map((name, i) => (
                <span key={i} className="chip">{name}</span>
              ))}
            </div>
            <div className="score-display">
              <span className="game-score-label">{match.games_b}</span>
              <div className="point-box">{match.score_b}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}