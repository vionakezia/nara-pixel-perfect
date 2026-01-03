import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ProfileDropdown from "../components/ProfileDropdown";
import fontNara from "@/assets/fontnara.png";

const fontSizes = ["10", "12", "14", "16", "18", "20", "24", "28", "32", "36", "48"];
const colors = ["#000000", "#033C35", "#FF0000", "#0000FF", "#008000", "#FFA500", "#800080", "#7C9690"];
const fonts = ["Inter", "Arial", "Georgia", "Times New Roman", "Courier New", "Verdana"];

const Editor = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  // Formatting states
  const [fontSize, setFontSize] = useState("12");
  const [textColor, setTextColor] = useState("#000000");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [fontFamily, setFontFamily] = useState("Inter");
  
  // Dropdown states
  const [showFontSizeDropdown, setShowFontSizeDropdown] = useState(false);
  const [showColorDropdown, setShowColorDropdown] = useState(false);
  const [showFontDropdown, setShowFontDropdown] = useState(false);
  
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

  const handlePublish = () => {
    // Store the content in localStorage so Profile can access it
    const publishedContent = {
      title,
      content,
      image: uploadedImage,
      fontSize,
      textColor,
      isBold,
      isItalic,
      isUnderline,
      fontFamily,
      publishedAt: new Date().toISOString()
    };
    localStorage.setItem('nara_published_content', JSON.stringify(publishedContent));
    navigate("/profile");
  };

  const getTextStyle = () => ({
    fontSize: `${fontSize}px`,
    color: textColor,
    fontWeight: isBold ? 'bold' : 'normal',
    fontStyle: isItalic ? 'italic' : 'normal',
    textDecoration: isUnderline ? 'underline' : 'none',
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
            {/* Font Size Dropdown */}
            <div className="toolbar-dropdown-container">
              <button 
                className="toolbar-option" 
                onClick={() => {
                  closeAllDropdowns();
                  setShowFontSizeDropdown(!showFontSizeDropdown);
                }}
              >
                {fontSize} px <span className="chevron">▼</span>
              </button>
              {showFontSizeDropdown && (
                <div className="toolbar-dropdown">
                  {fontSizes.map(size => (
                    <button 
                      key={size} 
                      className={`dropdown-item ${fontSize === size ? 'active' : ''}`}
                      onClick={() => {
                        setFontSize(size);
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
                <span className="color-indicator" style={{ backgroundColor: textColor }}></span>
                Color <span className="chevron">▼</span>
              </button>
              {showColorDropdown && (
                <div className="toolbar-dropdown color-dropdown">
                  {colors.map(color => (
                    <button 
                      key={color} 
                      className={`color-option ${textColor === color ? 'active' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => {
                        setTextColor(color);
                        setShowColorDropdown(false);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
            
            {/* Bold Button */}
            <button 
              className={`toolbar-option format-btn ${isBold ? 'active' : ''}`}
              onClick={() => setIsBold(!isBold)}
            >
              B
            </button>
            
            {/* Italic Button */}
            <button 
              className={`toolbar-option format-btn italic ${isItalic ? 'active' : ''}`}
              onClick={() => setIsItalic(!isItalic)}
            >
              I
            </button>
            
            {/* Underline Button */}
            <button 
              className={`toolbar-option format-btn underline ${isUnderline ? 'active' : ''}`}
              onClick={() => setIsUnderline(!isUnderline)}
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
            style={getTextStyle()}
          />
          <div className="editor-divider"></div>
          <textarea
            className="editor-textarea"
            placeholder="Start writing here.."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={getTextStyle()}
          />
        </div>

        <button className="btn btn-primary publish-btn" onClick={handlePublish}>Publish</button>
      </main>
    </div>
  );
};

export default Editor;
