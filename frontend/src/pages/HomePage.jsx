import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import { searchMovies, getFavoriteMovies, addFavoriteMovie, removeFavoriteMovie } from '../services/api';

const HomePage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Função para buscar os favoritos ao carregar a página
  const fetchFavorites = async () => {
    const response = await getFavoriteMovies();
    setFavorites(response.data);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleSearch = async (query) => {
    const response = await searchMovies(query);
    setSearchResults(response.data.results);
  };

  const handleAddFavorite = async (movie) => {
    // Mapeia os dados do TMDb para o formato esperado pelo backend
    const movieData = {
      tmdb_id: movie.id,
      title: movie.title,
      overview: movie.overview,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
        release_date: movie.release_date,
    };
    await addFavoriteMovie(movieData);
    fetchFavorites(); // Atualiza a lista de favoritos
  };

  const handleRemoveFavorite = async (tmdb_id) => {
    await removeFavoriteMovie(tmdb_id);
    fetchFavorites();
  };

  const isMovieFavorite = (tmdb_id) => {
    return favorites.some(fav => fav.tmdb_id === tmdb_id);
  };

  return (
    <div>
      <h1 className="page-title">Busca de Filmes</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="movie-grid">
        {searchResults.map(movie => (
          <MovieCard
            key={movie.id}
            movie={{...movie, tmdb_id: movie.id}}
            onAddFavorite={handleAddFavorite}
            onRemoveFavorite={handleRemoveFavorite}
            isFavorite={isMovieFavorite(movie.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;