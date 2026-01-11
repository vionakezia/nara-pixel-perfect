import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fontNaraHijau from "@/assets/fontnarahijau.png";

interface PublishedContent {
  title: string;
  content: string;
  image: string | null;
  titleFontSize: string;
  titleTextColor: string;
  titleIsBold: boolean;
  titleIsItalic: boolean;
  titleIsUnderline: boolean;
  contentFontSize: string;
  contentTextColor: string;
  contentIsBold: boolean;
  contentIsItalic: boolean;
  contentIsUnderline: boolean;
  fontFamily: string;
  status: "published" | "draft" | "archive";
  publishedAt: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("publish");
  const [publishedContent, setPublishedContent] = useState<PublishedContent | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('nara_published_content');
    if (saved) {
      setPublishedContent(JSON.parse(saved));
    }
  }, []);

  const getTitleStyle = (content: PublishedContent) => ({
    fontSize: `${content.titleFontSize}px`,
    color: content.titleTextColor,
    fontWeight: content.titleIsBold ? 'bold' : 'normal',
    fontStyle: content.titleIsItalic ? 'italic' : 'normal',
    textDecoration: content.titleIsUnderline ? 'underline' : 'none',
    fontFamily: content.fontFamily,
  });

  const getContentStyle = (content: PublishedContent) => ({
    fontSize: `${content.contentFontSize}px`,
    color: content.contentTextColor,
    fontWeight: content.contentIsBold ? 'bold' : 'normal',
    fontStyle: content.contentIsItalic ? 'italic' : 'normal',
    textDecoration: content.contentIsUnderline ? 'underline' : 'none',
    fontFamily: content.fontFamily,
  });

  const highlightText = (text: string) => {
    if (!searchQuery.trim()) return text;
    const regex = new RegExp(`(${searchQuery})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) => 
      regex.test(part) ? <mark key={i} className="search-highlight">{part}</mark> : part
    );
  };

  const defaultAboutText = "Hello! I love writing about anything and everything. But with NARA, I will be sharing stories about the things that drive me in life.";

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "published": return "published";
      case "draft": return "draft";
      case "archive": return "archived";
      default: return "published";
    }
  };

  const filteredContent = publishedContent && (
    (activeTab === "publish" && publishedContent.status === "published") ||
    (activeTab === "draft" && publishedContent.status === "draft") ||
    (activeTab === "archive" && publishedContent.status === "archive")
  ) ? publishedContent : null;

  return (
    <div className="profile-page">
      <header className="profile-header">
        <img 
          src={fontNaraHijau} 
          alt="NARA" 
          className="profile-logo-img" 
          onClick={() => navigate("/dashboard")}
        />
        <div className="profile-search" onClick={() => setIsSearching(true)}>
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
        <button className="profile-nav-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          Profile
        </button>
      </header>

      <section className="profile-hero">
        <div className="profile-avatar-container">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face" 
            alt="Profile" 
            className="profile-avatar-lg"
          />
          <button className="avatar-add-btn">+</button>
        </div>
        <h2 className="profile-username">{highlightText("Hello, [Username]")}</h2>
      </section>

      <nav className="profile-tabs">
        <button 
          className={`profile-tab ${activeTab === 'publish' ? 'active' : ''}`}
          onClick={() => setActiveTab('publish')}
        >
          Publish
        </button>
        <button 
          className={`profile-tab ${activeTab === 'draft' ? 'active' : ''}`}
          onClick={() => setActiveTab('draft')}
        >
          Draft
        </button>
        <button 
          className={`profile-tab ${activeTab === 'archive' ? 'active' : ''}`}
          onClick={() => setActiveTab('archive')}
        >
          Archive
        </button>
      </nav>

      <main className="profile-content">
        <aside className="profile-sidebar">
          <div className="about-card">
            <h3 className="about-card-title">{highlightText("About")}</h3>
            <p className="about-text" style={{ color: '#FFFFFF' }}>
              {highlightText(defaultAboutText)}
            </p>
            <h3 className="find-me-title">{highlightText("Find me on")}</h3>
            <div className="social-links">
              <a href="#" className="social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
                {highlightText("instagram.com/[username]")}
              </a>
              <a href="#" className="social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z"/>
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>
                </svg>
                {highlightText("x.com/[username]")}
              </a>
            </div>
          </div>
        </aside>
        <section className="profile-main">
          <div className="my-posts-section">
            <h3 className="my-posts-title">My Posts</h3>
            {filteredContent ? (
              <div className="post-card-new">
                <div className="post-card-new-header">
                  <h4 className="post-card-new-title" style={getTitleStyle(filteredContent)}>
                    {highlightText(filteredContent.title || "Untitled")}
                  </h4>
                  <span className="post-card-new-status">{getStatusLabel(filteredContent.status)}</span>
                </div>
                <p className="post-card-new-text" style={getContentStyle(filteredContent)}>
                  {highlightText(filteredContent.content || "")}
                </p>
              </div>
            ) : (
              <div className="no-posts">
                <p>No {activeTab === "publish" ? "published" : activeTab === "draft" ? "draft" : "archived"} posts yet.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;
