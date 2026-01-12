import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileDropdown from "../components/ProfileDropdown";
import fontNaraHijau from "@/assets/fontnarahijau.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const highlightText = (text: string) => {
    if (!searchQuery.trim()) return text;
    const regex = new RegExp(`(${searchQuery})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) => 
      regex.test(part) ? <mark key={i} className="search-highlight">{part}</mark> : part
    );
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header-lined">
        <div className="dashboard-header-left">
          <img src={fontNaraHijau} alt="NARA" className="dashboard-logo-img" onClick={() => navigate("/dashboard")} />
          <div className="search-bar" onClick={() => setIsSearching(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            {isSearching ? (
              <input
                type="text"
                className="search-input"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => !searchQuery && setIsSearching(false)}
                autoFocus
              />
            ) : (
              <span>Search</span>
            )}
          </div>
        </div>
        <nav className="dashboard-nav-lined">
          <button className="nav-item-lined" onClick={() => navigate("/dashboard")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Home
          </button>
          <span className="nav-separator">|</span>
          <button className="nav-item-lined" onClick={() => navigate("/editor")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Write
          </button>
          <span className="nav-separator">|</span>
          <button className="nav-item-lined" onClick={() => setShowDropdown(!showDropdown)}>
            <div className="profile-icon-box">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            Profile
          </button>
        </nav>
        <ProfileDropdown 
          isOpen={showDropdown} 
          onClose={() => setShowDropdown(false)}
          onProfileClick={() => navigate("/profile")}
        />
      </header>

      <main className="dashboard-content">
        <div className="dashboard-main">
          <section className="welcome-section">
            <h2 className="welcome-title">{highlightText("Hello, [Username]")}</h2>
            <p className="welcome-subtitle">{highlightText("Let's continue your journey")}</p>
          </section>

          <section className="recommended-section">
            <h3 className="section-title">{highlightText("Recommended for you")}</h3>
            
            <article className="article-card" onClick={() => navigate("/taking-care-of-your-mind")}>
              <h4 className="article-title">{highlightText("Taking Care of Your mind")}</h4>
              <p className="article-desc">{highlightText("Small steps to improve your mental well-being every day")}</p>
            </article>
            
            <article className="article-card" onClick={() => navigate("/journal-prompts")}>
              <h4 className="article-title">{highlightText("Journal Prompts for Self-Reflection")}</h4>
              <p className="article-desc">{highlightText("Simple prompts to help you understand your thoughts better")}</p>
            </article>
            
            <article className="article-card" onClick={() => navigate("/build-gentle-lifestyle")}>
              <h4 className="article-title">{highlightText("Build a Gentle Lifestyle")}</h4>
              <p className="article-desc">{highlightText("Tips for creating a slow, balanced, and mindful life.")}</p>
            </article>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
