import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function PlayerLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [mob, setMob] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("players")
      .select("id,name")
      .eq("email_id", email.trim())
      .eq("mob_number", mob.trim())
      .eq("password", password)
      .single();

    if (error || !data) {
      setError("Invalid login credentials");
      setLoading(false);
      return;
    }

    localStorage.setItem("player_id", data.id);
      localStorage.setItem("player_name", data.name);
    navigate("/");
  };

  return (
    <div className="login-container">
      <video className="bg-video" autoPlay muted loop playsInline>
        <source
          src="https://video.wixstatic.com/video/9c6689_bb5195e444c94d8b89a41548a10c8dab/1080p/mp4/file.mp4"
          type="video/mp4"
        />
      </video>

      <div className="video-overlay"></div>

      <div className="login-card">
        <h1>Player Login</h1>

        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="tel"
            placeholder="Mobile Number"
            required
            value={mob}
            onChange={(e) => setMob(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="error-message">⚠️ {error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Checking..." : "Login"}
          </button>
        </form>

        <div className="login-footer">
          <p className="register-text">
            New player?{" "}
            <span onClick={() => navigate("/player-register")}>
              Register here
            </span>
          </p>

          <button
            className="admin-btn"
            onClick={() => (window.location.href = "http://localhost:5173")}
          >
            Admin Panel
          </button>
        </div>
      </div>
    </div>
  );
}