import React from "react";
import "./Hero.scss";

function Hero() {
    return (
      <section className="section">
        <div className="container">
          <div className="hero-flex">
            <div className="hero-content">
              <h1> Capture ideas effortlessly, one note at a time.</h1>
              <h3>Capture ideas. Organize thoughts. Achieve more. </h3>
              <button>Try for Free</button>
            </div>

            <div className="hero-image">
              <img
                src="https://img.freepik.com/free-vector/social-media-manager-concept-illustration_114360-21571.jpg?ga=GA1.1.539061890.1721370777&semt=ais_hybrid "
                alt="React Logo"
              />
            </div>
          </div>
        </div>
      </section>
    );
}

export default Hero;
