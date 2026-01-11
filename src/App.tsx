import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Guidelines from "./pages/Guidelines";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Topics from "./pages/Topics";
import Dashboard from "./pages/Dashboard";
import Editor from "./pages/Editor";
import Profile from "./pages/Profile";
import TakingCareOfYourMind from "./pages/TakingCareOfYourMind";
import JournalPrompts from "./pages/JournalPrompts";
import BuildGentleLifestyle from "./pages/BuildGentleLifestyle";
import SignInModal from "./components/SignInModal";
import SuccessModal from "./components/SuccessModal";
import NotFound from "./pages/NotFound";
import "./styles/nara.css";

const AppContent = () => {
  const navigate = useNavigate();
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const handleSignInClick = () => {
    setIsSignInOpen(true);
  };

  const handleSignInClose = () => {
    setIsSignInOpen(false);
  };

  const handleRegisterSuccess = () => {
    setIsSuccessOpen(true);
  };

  const handleLoginFromSuccess = () => {
    setIsSuccessOpen(false);
    navigate("/topics");
  };

  const handleLoginClick = () => {
    setIsSignInOpen(true);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing onSignInClick={handleSignInClick} />} />
        <Route path="/about" element={<About />} />
        <Route path="/guidelines" element={<Guidelines />} />
        <Route path="/contact" element={<Contact />} />
        <Route 
          path="/register" 
          element={
            <Register 
              onSuccess={handleRegisterSuccess} 
              onLoginClick={handleLoginClick}
            />
          } 
        />
        <Route path="/topics" element={<Topics />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/taking-care-of-your-mind" element={<TakingCareOfYourMind />} />
        <Route path="/journal-prompts" element={<JournalPrompts />} />
        <Route path="/build-gentle-lifestyle" element={<BuildGentleLifestyle />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      <SignInModal isOpen={isSignInOpen} onClose={handleSignInClose} />
      <SuccessModal isOpen={isSuccessOpen} onLoginClick={handleLoginFromSuccess} />
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;
