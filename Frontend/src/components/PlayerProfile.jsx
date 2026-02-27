
import "./PlayerProfile.css";
import bg from "../assets/bg.png";
import { useEffect, useState } from "react";
export default function PlayerProfile({
  player,
  onNext,
  onPrev,
  index,
  total
}) {
  if (!player) return null;

  const [value, setValue] = useState(0);
  const target = Math.round(player.performance_rating ?? 0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const incrementTime = 20;
    const step = target / (duration / incrementTime);

    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        setValue(target);
        clearInterval(interval);
      } else {
        setValue(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(interval);
  }, [target]);

  return (
  
  // <div
  //   className="player-hero"
  //   style={{
  //     backgroundImage: `url(${player.image_url || bg})`
  //   }}
  // >
  //   {/* Top Navigation */}
  //   <div className="player-nav">
  //     <span className="nav-left" onClick={onPrev}>
  //       ‹ Previous Player
  //     </span>

  //     <span className="nav-center">
  //       {index + 1} / {total}
  //     </span>

  //     <span className="nav-right" onClick={onNext}>
  //       Next Player ›
  //     </span>
  //   </div>

  //   {/* Left Content */}
  //   <div className="player-left">
  //     <span className="player-number">
  //       Matches Won: {player.matches_won}
  //     </span>

  //     <h1 className="player-name">{player.name}</h1>
  //   </div>

  //   {/* Bottom Stats */}
  //   <div className="player-stats">
  //     <div className="pie-chart">
  //       <span className="pie-value">{value}%</span>
  //     </div>

  //     <p className="stat-label">
  //       Performance <br /> Rating
  //     </p>
  //   </div>

  //   {/* Right Panel */}
  //   <div className="player-matches">
  //     <h4>Stats</h4>

  //     <div className="match">
  //       <span>Won</span>
  //       <strong>{player.matches_won}</strong>
  //     </div>

  //     <div className="match">
  //       <span>Lost</span>
  //       <strong>{player.matches_lost}</strong>
  //     </div>

  //     <div className="match">
  //       <span>Score</span>
  //       <strong>{player.score}</strong>
  //     </div>

  //     <div className="match">
  //       <span>Age</span>
  //       <strong>{player.age}</strong>
  //     </div>
  //   </div>
  // </div>
<div className="player-hero">
  {/* IMAGE LAYER */}
  <div
    className="player-bg"
    style={{
      backgroundImage: `url(${player.image_url || bg})`
    }}
  />

  {/* Top Navigation */}
  <div className="player-nav">
    <span className="nav-left" onClick={onPrev}>‹ Previous Player</span>
    <span className="nav-center">{index + 1} / {total}</span>
    <span className="nav-right" onClick={onNext}>Next Player ›</span>
  </div>

  {/* Left Content */}
  <div className="player-left">
    <span className="player-number">Matches Won: {player.matches_won}</span>
    <h1 className="player-name">{player.name}</h1>
  </div>

  {/* Bottom Stats */}
  <div className="player-stats">
    <div className="pie-chart">
      <span className="pie-value">{value}%</span>
    </div>
    <p className="stat-label">Performance <br /> Rating</p>
  </div>

  {/* Right Panel */}
  <div className="player-matches">
    <h4>Stats</h4>
    <div className="match"><span>Won</span><strong>{player.matches_won}</strong></div>
    <div className="match"><span>Lost</span><strong>{player.matches_lost}</strong></div>
    <div className="match"><span>Score</span><strong>{player.score}</strong></div>
    <div className="match"><span>Age</span><strong>{player.age}</strong></div>
  </div>
</div>

  );
}
