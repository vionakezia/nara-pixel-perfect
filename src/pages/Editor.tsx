import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ProfileDropdown from "../components/ProfileDropdown";
import fontNaraHijau from "@/assets/fontnarahijau.png";

const fontSizes = ["10", "12", "14", "16", "18", "20", "24", "28", "32", "36", "48"];
const colors = ["#000000", "#FFFFFF", "#033C35", "#FF0000", "#0000FF", "#008000", "#FFA500", "#800080", "#7C9690"];
const fonts = ["Inter", "Arial", "Georgia", "Times New Roman", "Courier New", "Verdana"];

const Editor = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Dropdown states
  const [showFontSizeDropdown, setShowFontSizeDropdown] = useState(false);
  const [showColorDropdown, setShowColorDropdown] = useState(false);
  const [showFontDropdown, setShowFontDropdown] = useState(false);
  const [showPublishDropdown, setShowPublishDropdown] = useState(false);
  
  // Image upload
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Current formatting for display
  const [currentFontSize, setCurrentFontSize] = useState("14");
  const [currentColor, setCurrentColor] = useState("#000000");
  const [currentFont, setCurrentFont] = useState("Inter");

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

  const applyFormat = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value);
  }, []);

  const handleFontSizeChange = (size: string) => {
    // Convert px size to execCommand size (1-7 scale)
    const sizeMap: { [key: string]: string } = {
      "10": "1", "12": "2", "14": "3", "16": "4", "18": "5", "20": "5", 
      "24": "6", "28": "6", "32": "7", "36": "7", "48": "7"
    };
    applyFormat('fontSize', sizeMap[size] || "3");
    setCurrentFontSize(size);
    setShowFontSizeDropdown(false);
  };

  const handleColorChange = (color: string) => {
    applyFormat('foreColor', color);
    setCurrentColor(color);
    setShowColorDropdown(false);
  };

  const handleFontChange = (font: string) => {
    applyFormat('fontName', font);
    setCurrentFont(font);
    setShowFontDropdown(false);
  };

  const handleBold = () => {
    applyFormat('bold');
  };

  const handleItalic = () => {
    applyFormat('italic');
  };

  const handleUnderline = () => {
    applyFormat('underline');
  };

  const handlePublish = (status: "published" | "draft" | "archive") => {
    const title = titleRef.current?.innerText?.trim() || "";
    const content = contentRef.current?.innerHTML || "";
    const titleHTML = titleRef.current?.innerHTML || "";
    
    if (!title && !contentRef.current?.innerText?.trim()) {
      setShowPublishDropdown(false);
      return;
    }
    
    // Store the content in localStorage so Profile can access it
    const publishedContent = {
      title,
      titleHTML,
      content,
      image: uploadedImage,
      status,
      publishedAt: new Date().toISOString()
    };
    localStorage.setItem('nara_published_content', JSON.stringify(publishedContent));
    setShowPublishDropdown(false);
    navigate("/profile");
  };

  const closeAllDropdowns = () => {
    setShowFontSizeDropdown(false);
    setShowColorDropdown(false);
    setShowFontDropdown(false);
  };

  return (
    <div className="editor-page">
      <header className="dashboard-header-lined">
        <div className="dashboard-header-left">
          <img 
            src={fontNaraHijau} 
            alt="NARA" 
            className="dashboard-logo-img" 
            onClick={() => navigate("/dashboard")}
          />
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
          <button className="nav-item-lined">
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
                {currentFontSize} px <span className="chevron">▼</span>
              </button>
              {showFontSizeDropdown && (
                <div className="toolbar-dropdown">
                  {fontSizes.map(size => (
                    <button 
                      key={size} 
                      className={`dropdown-item ${currentFontSize === size ? 'active' : ''}`}
                      onClick={() => handleFontSizeChange(size)}
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
                <span className="color-indicator" style={{ backgroundColor: currentColor, border: currentColor === '#FFFFFF' ? '1px solid #ccc' : 'none' }}></span>
                Color <span className="chevron">▼</span>
              </button>
              {showColorDropdown && (
                <div className="toolbar-dropdown color-dropdown">
                  {colors.map(color => (
                    <button 
                      key={color} 
                      className={`color-option ${currentColor === color ? 'active' : ''}`}
                      style={{ backgroundColor: color, border: color === '#FFFFFF' ? '1px solid #ccc' : 'none' }}
                      onClick={() => handleColorChange(color)}
                    />
                  ))}
                </div>
              )}
            </div>
            
            {/* Bold Button */}
            <button 
              className="toolbar-option format-btn"
              onClick={handleBold}
            >
              B
            </button>
            
            {/* Italic Button */}
            <button 
              className="toolbar-option format-btn italic"
              onClick={handleItalic}
            >
              I
            </button>
            
            {/* Underline Button */}
            <button 
              className="toolbar-option format-btn underline"
              onClick={handleUnderline}
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
                {currentFont} <span className="chevron">▼</span>
              </button>
              {showFontDropdown && (
                <div className="toolbar-dropdown font-dropdown">
                  {fonts.map(font => (
                    <button 
                      key={font} 
                      className={`dropdown-item ${currentFont === font ? 'active' : ''}`}
                      style={{ fontFamily: font }}
                      onClick={() => handleFontChange(font)}
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
          <div
            ref={titleRef}
            className="editor-title-editable"
            contentEditable
            data-placeholder="Write a title"
            style={{ fontSize: '36px', fontWeight: 'bold' }}
          />
          <div className="editor-divider"></div>
          <div
            ref={contentRef}
            className="editor-content-editable"
            contentEditable
            data-placeholder="Start writing here.."
            style={{ fontSize: '14px' }}
          />
        </div>

        <div className="publish-dropdown-container">
          <button 
            className="publish-btn-rounded" 
            onClick={() => setShowPublishDropdown(!showPublishDropdown)}
          >
            Publish
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              className={`publish-chevron ${showPublishDropdown ? 'chevron-up' : 'chevron-down'}`}
            >
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </button>
          {showPublishDropdown && (
            <div className="publish-dropdown-green">
              <button className="publish-dropdown-item-white" onClick={() => handlePublish("published")}>
                Publish
              </button>
              <button className="publish-dropdown-item-white" onClick={() => handlePublish("draft")}>
                Draft
              </button>
              <button className="publish-dropdown-item-white" onClick={() => handlePublish("archive")}>
                Archive
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Editor;