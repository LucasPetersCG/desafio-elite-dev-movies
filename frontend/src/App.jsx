import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import SharedListPage from './pages/SharedListPage';

function App() {
  return (
    <Router>
      <header>
        <h1>Movies API</h1>
        <nav>
          <Link to="/">Pesquisar Filmes</Link>
          <Link to="/favorites">Meus Favoritos</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/shared-list" element={<SharedListPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;