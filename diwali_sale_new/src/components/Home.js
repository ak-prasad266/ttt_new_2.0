import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <div className="fireworks-layer">
        <div className="firecracker left-to-right">🎆</div>
        <div className="firecracker bottom-to-top">🧨</div>
        <div className="firecracker left-to-right delay">🎇</div>
      </div>

      <h1 className="flash-title">🪔🎉 Welcome to the Grand Diwali Sale! 🎇✨</h1>
      <p className="tagline">
        Enjoy sparkling offers on <strong>Mobiles</strong>, <strong>Earbuds</strong>, and <strong>Watches</strong> 🔥
      </p>

      <div className="categories">
        <Link className="btn" to="/mobiles">📱 Mobiles</Link>
        <Link className="btn" to="/earbuds">🎧 Earbuds</Link>
        <Link className="btn" to="/watches">⌚ Watches</Link>
      </div>

      <img src="/diwali_sale.jpeg" alt="Diwali" className="diwali-img" />

      {/* <hr style={{ width: "80%", borderColor: "rgba(255,255,255,0.3)" }} /> */}
      <footer className="footer">🪔 Made with ❤️ for the Festival of Lights 🪔</footer>
    </div>
  );
};

export default Home;
