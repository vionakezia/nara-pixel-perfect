import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ForgotPasswordModal from "./ForgotPasswordModal";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignInModal = ({ isOpen, onClose }: SignInModalProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showResetFromEmail, setShowResetFromEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign in logic here
    console.log("Sign in:", formData);
    onClose();
    navigate("/topics");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateAccount = () => {
    onClose();
    navigate("/register");
  };

  const handleForgotPasswordClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowForgotPassword(true);
  };

  const handleCloseForgotPassword = () => {
    setShowForgotPassword(false);
    setShowResetFromEmail(false);
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
  };

  const handleShowResetModal = () => {
    setShowResetFromEmail(true);
    setShowForgotPassword(true);
  };

  if (!isOpen && !showForgotPassword) return null;

  if (showForgotPassword) {
    return (
      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={handleCloseForgotPassword}
        onBackToLogin={handleBackToLogin}
      />
    );
  }

  return (
    <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <h2 className="modal-title">Your words are waiting</h2>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            className="modal-input"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          
          <input
            type="password"
            name="password"
            className="modal-input"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          
          <button type="submit" className="btn btn-white modal-btn">
            Sign in
          </button>
        </form>

        <div className="modal-links">
          <button onClick={handleForgotPasswordClick} className="modal-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            Forgot password?
          </button>
          <p className="modal-no-account">
            No account?{" "}
            <button 
              onClick={handleCreateAccount}
              className="modal-link modal-create-link"
            >
              Create one!
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
