import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ProfileDropdown from "../components/ProfileDropdown";
import fontNara from "@/assets/fontnara.png";

const fontSizes = ["10", "12", "14", "16", "18", "20", "24", "28", "32", "36", "48"];
const colors = ["#000000", "#FFFFFF", "#033C35", "#FF0000", "#0000FF", "#008000", "#FFA500", "#800080", "#7C9690"];
const fonts = ["Inter", "Arial", "Georgia", "Times New Roman", "Courier New", "Verdana"];

const Editor = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  // Title formatting states
  const [titleFontSize, setTitleFontSize] = useState("24");
  const [titleTextColor, setTitleTextColor] = useState("#000000");
  const [titleIsBold, setTitleIsBold] = useState(true);
  const [titleIsItalic, setTitleIsItalic] = useState(false);
  const [titleIsUnderline, setTitleIsUnderline] = useState(false);
  
  // Content formatting states
  const [contentFontSize, setContentFontSize] = useState("14");
  const [contentTextColor, setContentTextColor] = useState("#000000");
  const [contentIsBold, setContentIsBold] = useState(false);
  const [contentIsItalic, setContentIsItalic] = useState(false);
  const [contentIsUnderline, setContentIsUnderline] = useState(false);
  const [fontFamily, setFontFamily] = useState("Inter");
  
  // Active field for formatting
  const [activeField, setActiveField] = useState<"title" | "content">("title");
  
  // Dropdown states
  const [showFontSizeDropdown, setShowFontSizeDropdown] = useState(false);
  const [showColorDropdown, setShowColorDropdown] = useState(false);
  const [showFontDropdown, setShowFontDropdown] = useState(false);
  const [showPublishDropdown, setShowPublishDropdown] = useState(false);
  
  // Image upload
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublish = (status: "published" | "draft" | "archive") => {
    if (!title.trim() && !content.trim()) {
      setShowPublishDropdown(false);
      return;
    }
    
    // Store the content in localStorage so Profile can access it
    const publishedContent = {
      title,
      content,
      image: uploadedImage,
      titleFontSize,
      titleTextColor,
      titleIsBold,
      titleIsItalic,
      titleIsUnderline,
      contentFontSize,
      contentTextColor,
      contentIsBold,
      contentIsItalic,
      contentIsUnderline,
      fontFamily,
      status,
      publishedAt: new Date().toISOString()
    };
    localStorage.setItem('nara_published_content', JSON.stringify(publishedContent));
    setShowPublishDropdown(false);
    navigate("/profile");
  };

  const getCurrentFontSize = () => activeField === "title" ? titleFontSize : contentFontSize;
  const setCurrentFontSize = (size: string) => activeField === "title" ? setTitleFontSize(size) : setContentFontSize(size);
  const getCurrentTextColor = () => activeField === "title" ? titleTextColor : contentTextColor;
  const setCurrentTextColor = (color: string) => activeField === "title" ? setTitleTextColor(color) : setContentTextColor(color);
  const getCurrentIsBold = () => activeField === "title" ? titleIsBold : contentIsBold;
  const setCurrentIsBold = (val: boolean) => activeField === "title" ? setTitleIsBold(val) : setContentIsBold(val);
  const getCurrentIsItalic = () => activeField === "title" ? titleIsItalic : contentIsItalic;
  const setCurrentIsItalic = (val: boolean) => activeField === "title" ? setTitleIsItalic(val) : setContentIsItalic(val);
  const getCurrentIsUnderline = () => activeField === "title" ? titleIsUnderline : contentIsUnderline;
  const setCurrentIsUnderline = (val: boolean) => activeField === "title" ? setTitleIsUnderline(val) : setContentIsUnderline(val);

  const getTitleStyle = () => ({
    fontSize: `${titleFontSize}px`,
    color: titleTextColor,
    fontWeight: titleIsBold ? 'bold' : 'normal',
    fontStyle: titleIsItalic ? 'italic' : 'normal',
    textDecoration: titleIsUnderline ? 'underline' : 'none',
    fontFamily: fontFamily,
  });

  const getContentStyle = () => ({
    fontSize: `${contentFontSize}px`,
    color: contentTextColor,
    fontWeight: contentIsBold ? 'bold' : 'normal',
    fontStyle: contentIsItalic ? 'italic' : 'normal',
    textDecoration: contentIsUnderline ? 'underline' : 'none',
    fontFamily: fontFamily,
  });

  const closeAllDropdowns = () => {
    setShowFontSizeDropdown(false);
    setShowColorDropdown(false);
    setShowFontDropdown(false);
  };

  return (
    <div className="editor-page">
      <header className="editor-header">
        <img 
          src={fontNara} 
          alt="NARA" 
          className="editor-logo-img" 
          onClick={() => navigate("/dashboard")}
        />
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
          <button className="toolbar-btn camera-btn" onClick={() => fileInputRef.current?.click()}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
          </button>
          <input 
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
          
          <div className="toolbar-options">
            {/* Field Selector */}
            <div className="toolbar-field-selector">
              <button 
                className={`field-btn ${activeField === 'title' ? 'active' : ''}`}
                onClick={() => setActiveField('title')}
              >
                Title
              </button>
              <button 
                className={`field-btn ${activeField === 'content' ? 'active' : ''}`}
                onClick={() => setActiveField('content')}
              >
                Content
              </button>
            </div>

            {/* Font Size Dropdown */}
            <div className="toolbar-dropdown-container">
              <button 
                className="toolbar-option" 
                onClick={() => {
                  closeAllDropdowns();
                  setShowFontSizeDropdown(!showFontSizeDropdown);
                }}
              >
                {getCurrentFontSize()} px <span className="chevron">▼</span>
              </button>
              {showFontSizeDropdown && (
                <div className="toolbar-dropdown">
                  {fontSizes.map(size => (
                    <button 
                      key={size} 
                      className={`dropdown-item ${getCurrentFontSize() === size ? 'active' : ''}`}
                      onClick={() => {
                        setCurrentFontSize(size);
                        setShowFontSizeDropdown(false);
                      }}
                    >
                      {size} px
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Color Dropdown */}
            <div className="toolbar-dropdown-container">
              <button 
                className="toolbar-option" 
                onClick={() => {
                  closeAllDropdowns();
                  setShowColorDropdown(!showColorDropdown);
                }}
              >
                <span className="color-indicator" style={{ backgroundColor: getCurrentTextColor(), border: getCurrentTextColor() === '#FFFFFF' ? '1px solid #ccc' : 'none' }}></span>
                Color <span className="chevron">▼</span>
              </button>
              {showColorDropdown && (
                <div className="toolbar-dropdown color-dropdown">
                  {colors.map(color => (
                    <button 
                      key={color} 
                      className={`color-option ${getCurrentTextColor() === color ? 'active' : ''}`}
                      style={{ backgroundColor: color, border: color === '#FFFFFF' ? '1px solid #ccc' : 'none' }}
                      onClick={() => {
                        setCurrentTextColor(color);
                        setShowColorDropdown(false);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
            
            {/* Bold Button */}
            <button 
              className={`toolbar-option format-btn ${getCurrentIsBold() ? 'active' : ''}`}
              onClick={() => setCurrentIsBold(!getCurrentIsBold())}
            >
              B
            </button>
            
            {/* Italic Button */}
            <button 
              className={`toolbar-option format-btn italic ${getCurrentIsItalic() ? 'active' : ''}`}
              onClick={() => setCurrentIsItalic(!getCurrentIsItalic())}
            >
              I
            </button>
            
            {/* Underline Button */}
            <button 
              className={`toolbar-option format-btn underline ${getCurrentIsUnderline() ? 'active' : ''}`}
              onClick={() => setCurrentIsUnderline(!getCurrentIsUnderline())}
            >
              U
            </button>
            
            {/* Font Family Dropdown */}
            <div className="toolbar-dropdown-container">
              <button 
                className="toolbar-option" 
                onClick={() => {
                  closeAllDropdowns();
                  setShowFontDropdown(!showFontDropdown);
                }}
              >
                {fontFamily} <span className="chevron">▼</span>
              </button>
              {showFontDropdown && (
                <div className="toolbar-dropdown font-dropdown">
                  {fonts.map(font => (
                    <button 
                      key={font} 
                      className={`dropdown-item ${fontFamily === font ? 'active' : ''}`}
                      style={{ fontFamily: font }}
                      onClick={() => {
                        setFontFamily(font);
                        setShowFontDropdown(false);
                      }}
                    >
                      {font}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="editor-area">
          {uploadedImage && (
            <div className="uploaded-image-container">
              <img src={uploadedImage} alt="Uploaded" className="uploaded-image" />
              <button 
                className="remove-image-btn"
                onClick={() => setUploadedImage(null)}
              >
                ×
              </button>
            </div>
          )}
          <input
            type="text"
            className="editor-title-input"
            placeholder="Write a title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setActiveField('title')}
            style={getTitleStyle()}
          />
          <div className="editor-divider"></div>
          <textarea
            className="editor-textarea"
            placeholder="Start writing here.."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setActiveField('content')}
            style={getContentStyle()}
          />
        </div>

        <div className="publish-dropdown-container">
          <button 
            className="btn btn-primary publish-btn" 
            onClick={() => setShowPublishDropdown(!showPublishDropdown)}
          >
            Publish
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="publish-chevron">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </button>
          {showPublishDropdown && (
            <div className="publish-dropdown">
              <button className="publish-dropdown-item" onClick={() => handlePublish("published")}>
                <span className="publish-dropdown-text">Publish</span>
              </button>
              <button className="publish-dropdown-item" onClick={() => handlePublish("draft")}>
                <span className="publish-dropdown-text">Draft</span>
              </button>
              <button className="publish-dropdown-item" onClick={() => handlePublish("archive")}>
                <span className="publish-dropdown-text">Archive</span>
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Editor;
