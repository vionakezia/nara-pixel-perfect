import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onProfileClick: () => void;
}

const ProfileDropdown = ({ isOpen, onClose, onProfileClick }: ProfileDropdownProps) => {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleWriterClick = () => {
    onClose();
    navigate("/editor");
  };

  const handleProfileClick = () => {
    onClose();
    onProfileClick();
  };

  const handleSignOut = () => {
    onClose();
    navigate("/");
  };

  if (!isOpen) return null;

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      <div className="dropdown-pointer"></div>
      <div className="dropdown-content">
        <div className="dropdown-avatar">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face" 
            alt="Profile" 
          />
        </div>
        <p className="dropdown-username">[username]</p>
        <p className="dropdown-email">username@gmail.com</p>
        <button className="dropdown-item" onClick={handleWriterClick}>Writer</button>
        <button className="dropdown-item" onClick={handleProfileClick}>Profile</button>
        <div className="dropdown-signout-container">
          <button className="dropdown-signout-btn" onClick={handleSignOut}>Sign Out</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdown;
