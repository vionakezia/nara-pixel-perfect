import { Link } from "react-router-dom";
import naraImage from "@/assets/gambarnara.png";
import fontNara from "@/assets/fontnara.png";
import logoNara from "@/assets/logonara.png";

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
            <img src={fontNara} alt="NARA" className="logo-text-img" />
          </div>
          <div className="header-logo-centered">
            <img src={logoNara} alt="NARA Logo" className="nav-logo-img-centered" />
          </div>
          <nav className="header-nav">
            <div className="nav-left">
              <Link to="/about" className="nav-link">About us</Link>
              <button onClick={onSignInClick} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Write</button>
            </div>
            <div className="nav-right">
              <button onClick={onSignInClick} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                Sign in
              </button>
              <Link to="/register" className="btn btn-get-started">Get Started</Link>
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
                src={naraImage} 
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
