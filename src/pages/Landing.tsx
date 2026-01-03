import { Link } from "react-router-dom";
import fountainPenImage from "@/assets/fountain-pen-ink.png";

interface LandingProps {
  onSignInClick: () => void;
}

const Landing = ({ onSignInClick }: LandingProps) => {
  return (
    <div className="page-wrapper">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-top">
            <span className="logo-text">NARA</span>
          </div>
          <nav className="header-nav">
            <div className="nav-left">
              <Link to="/about" className="nav-link">About us</Link>
              <Link to="/editor" className="nav-link">Write</Link>
            </div>
            <div className="nav-center">
              <div className="nav-logo-circle">N</div>
            </div>
            <div className="nav-right">
              <button onClick={onSignInClick} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                Sign in
              </button>
              <Link to="/register" className="btn btn-primary">Get Started</Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-left">
              <div className="hero-box">
                <h1 className="hero-title">
                  Write,<br />
                  Read,<br />
                  Reflect.
                </h1>
              </div>
            </div>
            <div className="hero-right">
              <img 
                src={fountainPenImage} 
                alt="Fountain pen with ink splash" 
                className="hero-image"
              />
            </div>
          </div>
          
          <div className="hero-tagline">
            <p className="hero-tagline-text">
              Write freely. Think deeply. Live through words — with Nara
            </p>
          </div>
          
          <div className="hero-cta">
            <Link to="/register" className="btn btn-secondary">Begin Your Journey</Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <nav className="footer-nav">
            <Link to="/guidelines" className="footer-link">Community Guidelines</Link>
            <Link to="/contact" className="footer-link">Contact</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
