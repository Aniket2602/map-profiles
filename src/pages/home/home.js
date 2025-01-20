import { Link } from "react-router-dom";
import "./homeStyle.css";

function Home() {
  return (
    <div className="main-container">
      {/* Main Section */}
      <main>
        {/* Hero Section */}
        <section className="hero-section">
          <h1>Welcome to MapProfiles Explorer</h1>
          <p>
            Discover profiles and explore their locations interactively on a
            map.
          </p>
          <button className="cta-button">
            {/* Button linking to the profiles page */}
            <Link to="/profiles" className="link">
              Get Started
            </Link>
          </button>
        </section>
        {/* Feature Section */}
        <section className="feature-section">
          {/* Feature 1: Viewing profiles */}
          <div className="feature">
            <h2>View Profiles</h2>
            <p>
              Browse a collection of profiles with essential details like name
              and photo.
            </p>
          </div>

          {/* Feature 2: Interactive map */}
          <div className="feature">
            <h2>Interactive Map</h2>
            <p>Explore addresses dynamically on an interactive map.</p>
          </div>

          {/* Feature 3: Search and filter */}
          <div className="feature">
            <h2>Search & Filter</h2>
            <p>
              Easily search and filter profiles based on location and
              attributes.
            </p>
          </div>
        </section>
      </main>
      {/* Foot Section */}
      <footer>
        {/* Footer content */}
        <p>&copy; 2025 MapProfiles Explorer. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
