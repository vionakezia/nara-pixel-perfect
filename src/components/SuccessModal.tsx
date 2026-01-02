interface SuccessModalProps {
  isOpen: boolean;
  onLoginClick: () => void;
}

const SuccessModal = ({ isOpen, onLoginClick }: SuccessModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isOpen ? 'active' : ''}`}>
      <div className="modal success-modal">
        <h2 className="success-title">Account Created Succesfully!</h2>
        <p className="success-text">
          Your account has been registered.<br />
          Please login to continue.
        </p>
        <button onClick={onLoginClick} className="btn btn-white">
          Login
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
