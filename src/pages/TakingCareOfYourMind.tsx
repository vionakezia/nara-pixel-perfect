import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileDropdown from "../components/ProfileDropdown";
import fontNaraHijau from "@/assets/fontnarahijau.png";

const TakingCareOfYourMind = () => {
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
    <div className="article-page">
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

      <main className="article-content">
        <h1 className="article-page-title">{highlightText("Taking Care of Your Mind")}</h1>
        
        <div className="article-body">
          <h2 className="article-subtitle">{highlightText("Small steps to improve your mental well-being every day")}</h2>
          
          <p>{highlightText("Taking care of your mind is just as important as taking care of your body. In a fast-paced world, mental well-being often gets overlooked, even though it affects how we think, feel, and act every day.")}</p>
          
          <p>{highlightText("You don't need to make drastic changes to improve your mental health. Small, consistent habits can make a meaningful difference. Simple actions like getting enough sleep, drinking water regularly, and taking short breaks during the day help your mind recharge. Giving yourself permission to rest is not a weakness—it's a necessity.")}</p>
          
          <p>{highlightText("Another important step is becoming aware of your thoughts. Pay attention to how you talk to yourself. If your inner voice is harsh or critical, try replacing it with kinder and more supportive words. Over time, this practice can reduce stress and build emotional resilience.")}</p>
        </div>
      </main>
    </div>
  );
};

export default TakingCareOfYourMind;
