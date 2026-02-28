import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function PlayerRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    age: "",
    email_id: "",
    mob_number: "",
    image_url: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("players").insert([
      {
        name: form.name,
        age: Number(form.age),
        email_id: form.email_id.trim(),
        mob_number: form.mob_number.trim(),
        image_url: form.image_url,
        password: form.password, // stored
      },
    ]);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    alert("✅ Registration Successful");
    navigate("/player-login");
  };

  return (
    <div className="reg-container ">

         <video className="bg-video" autoPlay muted loop playsInline>
        <source
          src="https://video.wixstatic.com/video/9c6689_bb5195e444c94d8b89a41548a10c8dab/1080p/mp4/file.mp4"
          type="video/mp4"
        />
      </video>

      <div className="video-overlay"></div>
      <div className="login-card">
        <h1>Player Registration</h1>

        <form onSubmit={handleRegister} className="login-form">
          <input name="name" placeholder="Player Name" required onChange={handleChange} />
          <input name="age" type="number" placeholder="Age" required onChange={handleChange} />
          <input name="email_id" type="email" placeholder="Email" required onChange={handleChange} />
          <input name="mob_number" type="tel" placeholder="Mobile Number" required onChange={handleChange} />
          <input name="image_url" placeholder="Image URL" required onChange={handleChange} />

          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            onChange={handleChange}
          />

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            required
            onChange={handleChange}
          />

          {error && <p className="error-message">⚠️ {error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

       
        <div className="login-footer">
          <p className="register-text">
            Already Register?{" "}
            <span onClick={() => navigate("/player-login")}>
              Login here
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