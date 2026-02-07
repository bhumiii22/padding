import "./Contact.css";


export default function Contact() {
  return (
    <section className="contact-section">
      <div className="contact-container">

        {/* LEFT CONTENT */}
        <div className="contact-info">
          <h2>Get In Touch</h2>
          <p>
            Ready to train, compete, or collaborate?
            Reach out to us through the form or connect on social media.
          </p>

          <div className="social-links">
            <a href="#" className="social instagram">Instagram</a>
            <a href="#" className="social twitter">Twitter</a>
            <a href="#" className="social facebook">Facebook</a>
            <a href="#" className="social linkedin">LinkedIn</a>
          </div>
        </div>

        {/* RIGHT FORM */}
        <form className="contact-form">
          <h3>Contact Us</h3>

          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="Email Address" />
          <input type="text" placeholder="Phone Number" />

          <textarea placeholder="Your Message"></textarea>

          <button type="submit">Send Message</button>
        </form>

      </div>
    </section>
  )
}