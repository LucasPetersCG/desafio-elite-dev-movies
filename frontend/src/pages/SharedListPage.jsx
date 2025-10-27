import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getMoviesByIds } from '../services/api';
import MovieCard from '../components/MovieCard';

const SharedListPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchSharedMovies = async () => {
      const ids = searchParams.get('ids');
      if (ids) {
        try {
          const response = await getMoviesByIds(ids);
          setMovies(response.data);
        } catch (error) {
          console.error("Erro ao buscar filmes compartilhados:", error);
        }
      }
      setLoading(false);
    };

    fetchSharedMovies();
  }, [searchParams]);

  if (loading) {
    return <p>Carregando lista de filmes...</p>;
  }

  return (
    <div>
      <h1 className="page-title">Lista de Favoritos Compartilhada</h1>
      <div className="movie-grid">
        {movies.length > 0 ? (
          movies.map(movie => (
            // Reutilizamos o MovieCard, mas sem as funções de adicionar/remover
            <div key={movie.tmdb_id} className="movie-card">
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} style={{width: '100%', borderRadius: '4px'}} />
              <span style={{backgroundColor: '#f5c518', color: '#000', padding: '5px 10px', borderRadius: '5px', fontWeight: 'bold', position: 'absolute', top: '15px', right: '15px'}}>{movie.vote_average.toFixed(1)}</span>
              <h3>{movie.title}</h3>
              <p style={{fontSize: '0.9rem', color: '#ccc'}}>Lançamento: {new Date(movie.release_date).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</p>
            </div>
          ))
        ) : (
          <p>Nenhum filme encontrado nesta lista.</p>
        )}
      </div>
    </div>
  );
};

export default SharedListPage;