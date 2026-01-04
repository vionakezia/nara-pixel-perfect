import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileDropdown from "../components/ProfileDropdown";
import fontNaraHijau from "@/assets/fontnarahijau.png";

const ToDo = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [todos, setTodos] = useState([
    { id: 1, text: "Write today's journal", checked: false },
    { id: 2, text: "Read 1 new post", checked: false },
    { id: 3, text: "Upload a photo", checked: false },
    { id: 4, text: "Comment on a friend's post", checked: false },
    { id: 5, text: "Update profile bio", checked: false },
  ]);

  const toggleTodo = (id: number) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  const highlightText = (text: string) => {
    if (!searchQuery.trim()) return text;
    const regex = new RegExp(`(${searchQuery})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) => 
      regex.test(part) ? <mark key={i} className="search-highlight">{part}</mark> : part
    );
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="dashboard-header-left">
          <img src={fontNaraHijau} alt="NARA" className="dashboard-logo-img" onClick={() => navigate("/dashboard")} />
          <div className="search-bar" onClick={() => setIsSearching(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            {isSearching ? (
              <input
                type="text"
                className="search-input"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => !searchQuery && setIsSearching(false)}
                autoFocus
              />
            ) : (
              <span>Search</span>
            )}
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
          <button className="nav-item active" onClick={() => navigate("/todo")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <path d="M9 12l2 2 4-4"/>
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

      <main className="todo-page-content">
        <h2 className="todo-page-title">{highlightText("Your To-Do List")}</h2>
        <div className="todo-full-list">
          {todos.map(todo => (
            <div key={todo.id} className="todo-full-item">
              <input 
                type="checkbox" 
                checked={todo.checked}
                onChange={() => toggleTodo(todo.id)}
                className="todo-checkbox-lg"
              />
              <span className={todo.checked ? 'completed' : ''}>{highlightText(todo.text)}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ToDo;
