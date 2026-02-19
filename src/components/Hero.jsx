import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      {/* Background Video */}
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source
          src="https://video.wixstatic.com/video/9c6689_bb5195e444c94d8b89a41548a10c8dab/1080p/mp4/file.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay & Effects */}
      <div className="hero-overlay"></div>
      <div className="hero-light"></div>

      {/* Center Content */}
      <div className="hero-content">
        <h1 className="hero-title glow-text">
          BUILT FOR <span className="pdb">PADDLE BALL</span>
        </h1>

        <p className="hero-subtitle">
          Where legends rise and history is written on the pitch.
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">SCROLL</div>
    </section>
  );
};

export default Hero;
