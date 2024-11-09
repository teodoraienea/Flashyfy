import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/login/login'; 
import Register from './pages/login/register'; 

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Login />} /> {/* Redirects to Login if no match */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
