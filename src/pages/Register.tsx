import { useState } from "react";
import { Link } from "react-router-dom";

interface RegisterProps {
  onSuccess: () => void;
  onLoginClick: () => void;
}

const Register = ({ onSuccess, onLoginClick }: RegisterProps) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.agreeTerms && formData.password === formData.confirmPassword) {
      onSuccess();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  return (
    <div className="register-page">
      {/* Header */}
      <header className="register-header">
        <div className="register-header-logo">
          <Link to="/" className="logo-circle">N</Link>
        </div>
        <span className="register-logo-text">NARA</span>
      </header>

      {/* Form */}
      <h2 className="register-subtitle">Create your account</h2>
      
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-input"
            placeholder="Choose a username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-input"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="form-input"
            placeholder="Re-enter password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-checkbox">
          <input
            type="checkbox"
            id="agreeTerms"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange}
            required
          />
          <label htmlFor="agreeTerms">I agree to the Terms & Privacy Policy</label>
        </div>

        <div className="register-submit">
          <button type="submit" className="btn btn-primary" style={{ padding: '16px 48px', fontSize: '18px' }}>
            Create Account
          </button>
        </div>

        <div className="register-footer">
          <p className="register-footer-text">
            Already have an account?{" "}
            <button 
              type="button"
              onClick={onLoginClick} 
              className="register-footer-link"
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}
            >
              Login
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
