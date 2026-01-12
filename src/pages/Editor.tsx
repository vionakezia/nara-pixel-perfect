import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ProfileDropdown from "../components/ProfileDropdown";
import fontNara from "@/assets/fontnara.png";

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
            className="publish-btn-new" 
            onClick={() => setShowPublishDropdown(!showPublishDropdown)}
          >
            Publish
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="publish-chevron">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </button>
          {showPublishDropdown && (
            <div className="publish-dropdown-new">
              <button className="publish-dropdown-item-new" onClick={() => handlePublish("published")}>
                Publish
              </button>
              <button className="publish-dropdown-item-new" onClick={() => handlePublish("draft")}>
                Draft
              </button>
              <button className="publish-dropdown-item-new" onClick={() => handlePublish("archive")}>
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