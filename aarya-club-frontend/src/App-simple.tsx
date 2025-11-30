import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="club-logo">🎓</div>
        <h1>Aarya Club</h1>
        <h2>CSE Department Cultural Club</h2>
        <p>Welcome to the Aarya Club Management System!</p>
        
        <div className="features">
          <div className="feature-card">
            <h3>🎉 Events Management</h3>
            <p>Create and manage cultural events</p>
          </div>
          <div className="feature-card">
            <h3>👥 Members Management</h3>
            <p>Add and organize club members</p>
          </div>
          <div className="feature-card">
            <h3>📊 Dashboard</h3>
            <p>Overview of club activities</p>
          </div>
        </div>

        <div className="actions">
          <button className="btn-primary" onClick={() => window.location.href = '/login'}>
            Admin Login
          </button>
          <button className="btn-secondary" onClick={() => window.location.href = '/register'}>
            Register Admin
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
