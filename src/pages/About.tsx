import { Link } from "react-router-dom";
import naraImage from "@/assets/gambarnara.png";
import logoNara from "@/assets/logonara.png";

const About = () => {
  return (
    <div className="page-wrapper">
      {/* Page Header */}
      <header className="page-header">
        <div className="page-header-logo">
          <Link to="/">
            <img src={logoNara} alt="NARA Logo" className="page-logo-img" />
          </Link>
        </div>
        <h1 className="page-header-title">About us</h1>
      </header>

      {/* Content */}
      <main className="container">
        <div className="about-content">
          <div className="about-left">
            <h2 className="about-title-large">Where<br />ideas live</h2>
            <div className="about-text-large">
              <p>
                Nara is a calm space built for those who find meaning in words. Here, 
                writing isn't just about expression — it's about reflection, connection, 
                and growth.
              </p>
              <p>
                We believe every thought deserves a place to rest, and every story has 
                the power to inspire. Whether you're journaling your day, crafting poetry, 
                or sharing insights, Nara welcomes you.
              </p>
            </div>
          </div>
          <div className="about-right">
            <img 
              src={naraImage} 
              alt="Fountain pen with ink splash" 
              className="hero-image"
              style={{ maxWidth: '350px' }}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
