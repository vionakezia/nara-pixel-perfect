import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileDropdown from "../components/ProfileDropdown";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [todos, setTodos] = useState([
    { id: 1, text: "Write today's journal", checked: false },
    { id: 2, text: "Read 1 new post", checked: false },
    { id: 3, text: "Upload a photo", checked: false },
  ]);

  const toggleTodo = (id: number) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="dashboard-header-left">
          <h1 className="dashboard-logo">NARA</h1>
          <div className="search-bar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <span>Search</span>
          </div>
        </div>
        <nav className="dashboard-nav">
          <button className="nav-item" onClick={() => navigate("/dashboard")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Home
          </button>
          <button className="nav-item" onClick={() => navigate("/editor")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Write
          </button>
          <button className="nav-item" onClick={() => navigate("/todo")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            To-Do
          </button>
          <button className="nav-item" onClick={() => setShowDropdown(!showDropdown)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            Profile
          </button>
        </nav>
        <ProfileDropdown 
          isOpen={showDropdown} 
          onClose={() => setShowDropdown(false)}
          onProfileClick={() => navigate("/profile")}
        />
      </header>

      <main className="dashboard-content">
        <div className="dashboard-main">
          <section className="welcome-section">
            <h2 className="welcome-title">Hello, [Username]</h2>
            <p className="welcome-subtitle">Let's continue your journey</p>
          </section>

          <section className="recommended-section">
            <h3 className="section-title">Recommended for you</h3>
            
            <article className="article-card">
              <h4 className="article-title">Taking Care of Your mind</h4>
              <p className="article-desc">Small steps to improve your mental well-being every day</p>
            </article>
            
            <article className="article-card">
              <h4 className="article-title">Journal Prompts for Self-Reflection</h4>
              <p className="article-desc">Simple prompts to help you understand your thoughts better</p>
            </article>
            
            <article className="article-card">
              <h4 className="article-title">Build a Gentle Lifestyle</h4>
              <p className="article-desc">Tips for creating a slow, balanced, and mindful life.</p>
            </article>
          </section>
        </div>

        <aside className="dashboard-sidebar">
          <div className="todo-widget">
            <h3 className="widget-title">Your To-Do List</h3>
            <ul className="todo-list">
              {todos.map(todo => (
                <li key={todo.id} className="todo-item">
                  <input 
                    type="checkbox" 
                    checked={todo.checked}
                    onChange={() => toggleTodo(todo.id)}
                    className="todo-checkbox"
                  />
                  <span className={todo.checked ? 'completed' : ''}>{todo.text}</span>
                </li>
              ))}
            </ul>
            <p className="active-recently">Active Recently</p>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Dashboard;
