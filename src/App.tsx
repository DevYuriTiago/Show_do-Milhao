import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import Admin from './pages/Admin';
import GameOver from './pages/GameOver';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/game-over" element={<GameOver />} />
      </Routes>
    </Router>
  );
}

export default App;