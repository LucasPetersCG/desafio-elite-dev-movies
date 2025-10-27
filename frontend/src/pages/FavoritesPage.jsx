import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { getFavoriteMovies, removeFavoriteMovie, getShareLink } from '../services/api';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    const response = await getFavoriteMovies();
    setFavorites(response.data);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (tmdb_id) => {
    await removeFavoriteMovie(tmdb_id);
    fetchFavorites(); // Atualiza a lista
  };
  
  const handleShare = async () => {
    const response = await getShareLink();
    const shareUrl = `${window.location.origin}${response.data.share_link}`;
    navigator.clipboard.writeText(shareUrl)
      .then(() => alert('Link copiado para a área de transferência!'))
      .catch(err => console.error('Erro ao copiar link: ', err));
  };

  return (
    <div>
      <h1 className="page-title">Meus Filmes Favoritos</h1>

      <div className="favorites-page-actions">
        {favorites.length > 0 && (
            <button onClick={handleShare}>Compartilhar Lista</button>
        )}
      </div>

      <div className="movie-grid">
        {favorites.map(movie => (
          <MovieCard
            key={movie.tmdb_id}
            movie={movie}
            onRemoveFavorite={handleRemoveFavorite}
            isFavorite={true}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;