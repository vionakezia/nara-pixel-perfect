import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TOPICS = [
  "Self Improvement", "Pyschology", "Money", "Mental Health", "Artificial Intelligence",
  "Entrepreneurship", "Books", "Social Media", "Feminism", "Climate Change", "Space",
  "Nonfiction", "Family", "Art", "Fiction", "Poetry", "Why This Happened to Me",
  "Software Development", "Bussiness", "Music", "Parenting", "Life", "Society", "Education"
];

const Topics = () => {
  const navigate = useNavigate();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const handleContinue = () => {
    navigate("/dashboard");
  };

  return (
    <div className="topics-page">
      <header className="topics-header">
        <div className="logo-circle">N</div>
        <h1 className="topics-logo-text">NARA</h1>
      </header>
      
      <main className="topics-content">
        <h2 className="topics-title">Hi, [Username]</h2>
        <p className="topics-subtitle">
          Welcome to Nara. Before you start exploring, choose a few topics you like.
        </p>
        
        <div className="topics-grid">
          {TOPICS.map((topic) => (
            <button
              key={topic}
              className={`topic-chip ${selectedTopics.includes(topic) ? 'active' : ''}`}
              onClick={() => toggleTopic(topic)}
            >
              {topic}
            </button>
          ))}
        </div>
        
        <button className="btn btn-primary topics-continue" onClick={handleContinue}>
          Continue
        </button>
      </main>
    </div>
  );
};

export default Topics;
