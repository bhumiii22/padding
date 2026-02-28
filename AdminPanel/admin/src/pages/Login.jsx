import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"; 
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // Verify admin status
      const { data: admin, error: adminError } = await supabase
        .from("admins")
        .select("*")
        .eq("id", data.user.id)
        .single();

      if (adminError || !admin) {
        await supabase.auth.signOut();
        throw new Error("Access Denied: You do not have admin privileges.");
      }

      localStorage.setItem("admin", "true");
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Background Video Layer */}
      <video 
        autoPlay 
        muted 
        loop 
        playsInline 
        className="bg-video"
      >
        <source src="https://video.wixstatic.com/video/9c6689_bb5195e444c94d8b89a41548a10c8dab/1080p/mp4/file.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay for readability */}
      <div className="video-overlay"></div>

      <div className="login-card">
        <div className="card-header">
          <span className="lock-icon">🔒</span>
          <h1>Admin Portal</h1>
          <p className="subtitle">Secure Command Center Access</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error-message">⚠️ {error}</p>}

          <button className="login-button" type="submit" disabled={loading}>
            {loading ? <span className="spinner"></span> : "Access Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}