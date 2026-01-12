import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type ModalStep = "forgot" | "check-email" | "reset" | "success";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToLogin: () => void;
}

const ForgotPasswordModal = ({ isOpen, onClose, onBackToLogin }: ForgotPasswordModalProps) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<ModalStep>("forgot");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setStep("forgot");
      setEmail("");
      setNewPassword("");
      setConfirmPassword("");
    }
  }, [isOpen]);

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("check-email");
  };

  const handleBackToLoginFromCheckEmail = () => {
    // Go directly to reset password step
    setStep("reset");
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      setStep("success");
    }
  };

  const handleLoginFromSuccess = () => {
    onClose();
    navigate("/dashboard");
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        {step === "forgot" && (
          <>
            <h2 className="modal-title">Forgot your password?</h2>
            <p className="modal-subtitle">Enter your email and we will send you a link to reset your password</p>
            
            <form onSubmit={handleForgotSubmit}>
              <div className="modal-input-with-icon modal-input-compact modal-input-icon-centered">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                <input
                  type="email"
                  className="modal-input modal-input-small"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <button type="submit" className="btn btn-white modal-btn">
                Submit
              </button>
            </form>
            
            <div className="modal-links">
              <button onClick={onBackToLogin} className="modal-link modal-back-link">
                &lt; Back to Login
              </button>
            </div>
          </>
        )}

        {step === "check-email" && (
          <>
            <div className="modal-icon-container modal-icon-center">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </div>
            <h2 className="modal-title">Check Email</h2>
            <p className="modal-subtitle">
              Please check your email inbox and click on the provided link to reset your password. If you dont receive email,{" "}
              <button className="modal-link-inline">Click Resend</button>
            </p>
            
            <div className="modal-links">
              <button onClick={handleBackToLoginFromCheckEmail} className="modal-link modal-back-link">
                &lt; Back to Login
              </button>
            </div>
          </>
        )}

        {step === "reset" && (
          <>
            <h2 className="modal-title">Reset your password</h2>
            
            <form onSubmit={handleResetPassword}>
              <input
                type="password"
                className="modal-input"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              
              <input
                type="password"
                className="modal-input"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              
              <button type="submit" className="btn btn-white modal-btn">
                Reset Password
              </button>
            </form>
            
            <div className="modal-links">
              <button onClick={onBackToLogin} className="modal-link modal-back-link">
                &lt; Back to Login
              </button>
            </div>
          </>
        )}

        {step === "success" && (
          <>
            <h2 className="modal-title modal-title-white">Password Reset Succesful!</h2>
            <p className="modal-subtitle">
              Your new password is ready to use.<br />
              Sign in to your NARA account with your updated password.
            </p>
            
            <button onClick={handleLoginFromSuccess} className="btn btn-white modal-btn">
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
