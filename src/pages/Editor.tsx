import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileDropdown from "../components/ProfileDropdown";

const Editor = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="editor-page">
      <header className="editor-header">
        <h1 className="editor-logo" onClick={() => navigate("/dashboard")}>NARA</h1>
        <div className="editor-user">
          <span className="username-label">[Username]</span>
          <button className="profile-avatar" onClick={() => setShowDropdown(!showDropdown)}>
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face" 
              alt="Profile" 
            />
          </button>
        </div>
        <ProfileDropdown 
          isOpen={showDropdown} 
          onClose={() => setShowDropdown(false)}
          onProfileClick={() => navigate("/profile")}
        />
      </header>

      <main className="editor-content">
        <div className="editor-toolbar">
          <button className="toolbar-btn camera-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
          </button>
          <div className="toolbar-options">
            <button className="toolbar-option">12 px <span className="chevron">▼</span></button>
            <button className="toolbar-option">Color <span className="chevron">▼</span></button>
            <button className="toolbar-option format-btn">B</button>
            <button className="toolbar-option format-btn italic">I</button>
            <button className="toolbar-option format-btn underline">U</button>
            <button className="toolbar-option">Font <span className="chevron">▼</span></button>
          </div>
        </div>

        <div className="editor-area">
          <input
            type="text"
            className="editor-title-input"
            placeholder="Write a title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="editor-divider"></div>
          <textarea
            className="editor-textarea"
            placeholder="Start writing here.."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <button className="btn btn-primary publish-btn">Publish</button>
      </main>
    </div>
  );
};

export default Editor;
