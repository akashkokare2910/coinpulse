import React, { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    const date = new Date();
    setLastUpdated(date.toLocaleString());
  }, []);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="last-updated">
          <p>Last Updated: {lastUpdated}</p>
        </div>

        <section className="footer-icons">
          <a href="#!" className="footer-icon">
            <FaTwitter size={30} />
          </a>

          <a href="#!" className="footer-icon">
            <FaInstagram size={30} />
          </a>

          <a
            href="https://www.linkedin.com/in/akash-kokare13bz/"
            className="footer-icon"
          >
            <FaLinkedinIn size={30} />
          </a>

          <a href="http://github.com/akashkokare2910" className="footer-icon">
            <FaGithub size={30} />
          </a>
        </section>
      </div>

      <div className="footer-bottom">
        <p>
          © 2025 Copyright:
          <a href="https://coinpulse.com/" className="footer-link">
            {" "}
            CoinPulse
          </a>
        </p>
      </div>
    </footer>
  );
}
