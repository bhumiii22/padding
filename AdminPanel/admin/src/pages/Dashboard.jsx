import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import AdminLayout from "../components/AdminLayout";
import "../styles/admin.css";

export default function Dashboard() {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [teamA, setTeamA] = useState([]);
  const [teamB, setTeamB] = useState([]);
  const [matchActive, setMatchActive] = useState(false);
  
  const scoreMap = ["0", "15", "30", "40", "AD"];
  const [p1Index, setP1Index] = useState(0);
  const [p2Index, setP2Index] = useState(0);
  const [gamesP1, setGamesP1] = useState(0);
  const [gamesP2, setGamesP2] = useState(0);

  useEffect(() => {
    fetchPlayers();
  }, []);

  async function fetchPlayers() {
    const { data, error } = await supabase.from("players").select("*").order('name');
    if (!error) setPlayers(data);
  }

  // Team Building Logic: Prevents more than 2 per team and duplicate players
  const addToTeam = (player, team) => {
    if (matchActive) return; // Prevent roster changes during live play
    const isAssigned = teamA.find(p => p.id === player.id) || teamB.find(p => p.id === player.id);
    if (isAssigned) return;

    if (team === 'A' && teamA.length < 2) setTeamA([...teamA, player]);
    else if (team === 'B' && teamB.length < 2) setTeamB([...teamB, player]);
  };

  const handleStartMatch = () => {
    if (teamA.length > 0 && teamB.length > 0) {
      setMatchActive(true);
      setP1Index(0); setP2Index(0); setGamesP1(0); setGamesP2(0);
    }
  };

  const handleEndMatch = async () => {
    if (window.confirm("End match and save results?")) {
      // Add Supabase Logic here to save match result
      setMatchActive(false);
      setTeamA([]); setTeamB([]);
      setP1Index(0); setP2Index(0); setGamesP1(0); setGamesP2(0);
    }
  };

  return (
    <AdminLayout>
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div className="title-section">
            <h1>Padel Command Center</h1>
            <p className="subtitle">Secure Match Official Interface</p>
          </div>
          <div className={`status-tag ${matchActive ? 'live' : 'idle'}`}>
            {matchActive ? "LIVE SESSION" : "SYSTEM READY"}
          </div>
        </header>

        {/* SCOREBOARD SECTION */}
        <section className="glass-panel scoreboard-panel">
          <div className="score-flex">
            <div className={`team-side ${p1Index > p2Index ? 'leading' : ''}`}>
              <span className="team-meta">TEAM ALPHA</span>
              <div className="roster-chips">
                {teamA.map(p => (
                  <span key={p.id} className="chip" onClick={() => !matchActive && setTeamA(teamA.filter(x => x.id !== p.id))}>
                    {p.name} {!matchActive && <i>×</i>}
                  </span>
                ))}
              </div>
              <div className="score-display">
                <span className="game-count">{gamesP1}</span>
                <div className="point-box">{scoreMap[p1Index]}</div>
              </div>
              {matchActive && (
                <div className="score-actions">
                  <button className="btn-pt" onClick={() => setP1Index(i => Math.min(4, i + 1))}>PT</button>
                  <button className="btn-game" onClick={() => {setGamesP1(g => g + 1); setP1Index(0); setP2Index(0);}}>GAME</button>
                </div>
              )}
            </div>

            <div className="divider-vs">VS</div>

            <div className="team-side">
              <span className="team-meta">TEAM OMEGA</span>
              <div className="roster-chips">
                {teamB.map(p => (
                  <span key={p.id} className="chip" onClick={() => !matchActive && setTeamB(teamB.filter(x => x.id !== p.id))}>
                    {p.name} {!matchActive && <i>×</i>}
                  </span>
                ))}
              </div>
              <div className="score-display">
                <span className="game-count">{gamesP2}</span>
                <div className="point-box">{scoreMap[p2Index]}</div>
              </div>
              {matchActive && (
                <div className="score-actions">
                  <button className="btn-pt" onClick={() => setP2Index(i => Math.min(4, i + 1))}>PT</button>
                  <button className="btn-game" onClick={() => {setGamesP2(g => g + 1); setP1Index(0); setP2Index(0);}}>GAME</button>
                </div>
              )}
            </div>
          </div>
          
          <div className="session-controls">
            {!matchActive ? (
              <button className="btn-start" onClick={handleStartMatch} disabled={teamA.length === 0 || teamB.length === 0}>
                INITIALIZE MATCH
              </button>
            ) : (
              <button className="btn-end" onClick={handleEndMatch}>TERMINATE & SAVE</button>
            )}
          </div>
        </section>

        {/* PLAYER ROSTER SECTION */}
        {!matchActive && (
          <section className="glass-panel roster-panel">
            <div className="panel-header">
              <h2>Player Assignment</h2>
              <div className="search-box">
                <input 
                  type="text" 
                  placeholder="Filter roster..." 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                />
              </div>
            </div>
            <div className="roster-grid">
              {players.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map(p => (
                <div key={p.id} className="player-card">
                  <div className="p-info">
                    <span className="rank">#{p.rank || 'N/A'}</span>
                    <span className="name">{p.name}</span>
                  </div>
                  <div className="p-actions">
                    <button onClick={() => addToTeam(p, 'A')} className="mini-assign">A</button>
                    <button onClick={() => addToTeam(p, 'B')} className="mini-assign">B</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </AdminLayout>
  );
}