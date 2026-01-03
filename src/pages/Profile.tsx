import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface PublishedContent {
  title: string;
  content: string;
  image: string | null;
  fontSize: string;
  textColor: string;
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  fontFamily: string;
  publishedAt: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("publish");
  const [publishedContent, setPublishedContent] = useState<PublishedContent | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('nara_published_content');
    if (saved) {
      setPublishedContent(JSON.parse(saved));
    }
  }, []);

  const getTextStyle = (content: PublishedContent) => ({
    fontSize: `${content.fontSize}px`,
    color: content.textColor,
    fontWeight: content.isBold ? 'bold' : 'normal',
    fontStyle: content.isItalic ? 'italic' : 'normal',
    textDecoration: content.isUnderline ? 'underline' : 'none',
    fontFamily: content.fontFamily,
  });

  return (
    <div className="profile-page">
      <header className="profile-header">
        <h1 className="profile-logo" onClick={() => navigate("/dashboard")}>NARA</h1>
        <div className="profile-search">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <span>Search</span>
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
        <h2 className="profile-username">Hello, [Username]</h2>
      </section>

      <nav className="profile-tabs">
        <button 
          className={`profile-tab ${activeTab === 'publish' ? 'active' : ''}`}
          onClick={() => setActiveTab('publish')}
        >
          Publish
        </button>
        <button 
          className={`profile-tab ${activeTab === 'todo' ? 'active' : ''}`}
          onClick={() => setActiveTab('todo')}
        >
          To-Do
        </button>
        <button 
          className={`profile-tab ${activeTab === 'draft' ? 'active' : ''}`}
          onClick={() => setActiveTab('draft')}
        >
          Draft
        </button>
      </nav>

      <main className="profile-content">
        <aside className="profile-sidebar">
          <div className="about-card">
            <h3 className="about-card-title">About</h3>
            {publishedContent ? (
              <div className="published-content">
                {publishedContent.image && (
                  <img 
                    src={publishedContent.image} 
                    alt="Published" 
                    className="published-image"
                  />
                )}
                {publishedContent.title && (
                  <h4 
                    className="published-title"
                    style={getTextStyle(publishedContent)}
                  >
                    {publishedContent.title}
                  </h4>
                )}
                <p 
                  className="about-text"
                  style={getTextStyle(publishedContent)}
                >
                  {publishedContent.content || "Hello! I love writing about anything and everything. But with NARA, I will be sharing stories about the things that drive me in life."}
                </p>
              </div>
            ) : (
              <p className="about-text">
                Hello! I love writing about anything and everything. 
                But with NARA, I will be sharing stories about the 
                things that drive me in life.
              </p>
            )}
            <h3 className="find-me-title">Find me on</h3>
            <div className="social-links">
              <a href="#" className="social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
                instagram.com/[username]
              </a>
              <a href="#" className="social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z"/>
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>
                </svg>
                x.com/[username]
              </a>
            </div>
          </div>
        </aside>
        <section className="profile-main">
          <div className="profile-main-content">
            {/* Content area with dividers */}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;