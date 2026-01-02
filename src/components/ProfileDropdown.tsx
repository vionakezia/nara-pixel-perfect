import { useEffect, useRef } from "react";

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onProfileClick: () => void;
}

const ProfileDropdown = ({ isOpen, onClose, onProfileClick }: ProfileDropdownProps) => {
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
        <p className="dropdown-role">Writer</p>
        <div className="dropdown-divider"></div>
        <button className="dropdown-item" onClick={onProfileClick}>Profile</button>
        <button className="dropdown-item">Settings</button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
