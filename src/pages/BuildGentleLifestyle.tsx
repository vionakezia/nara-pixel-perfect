import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileDropdown from "../components/ProfileDropdown";
import fontNaraHijau from "@/assets/fontnarahijau.png";

const BuildGentleLifestyle = () => {
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
        <h1 className="article-page-title">{highlightText("Build a Gentle Lifestyle")}</h1>
        
        <div className="article-body">
          <h2 className="article-subtitle">{highlightText("Tips for creating a slow, balanced, and mindful life")}</h2>
          
          <p>{highlightText("A gentle lifestyle is about choosing calm over constant pressure. It doesn't mean avoiding responsibilities—it means approaching life with intention, balance, and self-compassion.")}</p>
          
          <p>{highlightText("Living gently starts with slowing down. Instead of rushing through every task, try focusing on one thing at a time. Allow yourself to enjoy simple moments, such as a quiet morning, a short walk, or a deep breath between activities.")}</p>
          
          <p>{highlightText("Setting healthy boundaries is also essential. Learn to say no when something drains your energy and yes to things that nourish you. Rest, reflection, and personal time are not luxuries—they are fundamental to well-being.")}</p>
          
          <p>{highlightText("Building a gentle lifestyle is a continuous process. By listening to your needs and honoring your limits, you create a life that feels more peaceful, meaningful, and sustainable.")}</p>
        </div>
      </main>
    </div>
  );
};

export default BuildGentleLifestyle;
