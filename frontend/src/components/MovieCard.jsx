import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  position: relative;
  background: #000000ff;
`;

const Poster = styled.img`
  width: 100%;
  border-radius: 4px;
`;

const Rating = styled.span`
  background-color: #f5c518; /* Cor amarela similar ao IMDb */
  color: #000;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  position: absolute;
  top: 15px;
  right: 15px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
`;

const MovieDetails = styled.div`
  padding: 0 0.5rem;
  text-align: left;
  flex-grow: 1;
`;

const ReleaseDate = styled.p`
  font-size: 0.9rem;
  color: #ccc;
  margin: 0.5rem 0;
`;

const Overview = styled.p`
  font-size: 0.85rem;
  color: #e0e0e0;
  line-height: 1.4;
  margin: 0.5rem 0;
  text-align: justify;
`;

const MovieCard = ({ movie, onAddFavorite, onRemoveFavorite, isFavorite }) => {
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/500x750?text=Imagem+N%C3%A3o+Dispon%C3%ADvel';
    
    const formattedDate = movie.release_date
        ? new Date(movie.release_date).toLocaleDateString('pt-BR', {timeZone: 'UTC'})
        : 'Data não informada';
    
    const truncatedOverview = movie.overview
        ? movie.overview.length > 200
            ? movie.overview.substring(0, 200) + '...'
            : movie.overview
        : 'Sinopse não disponível.';


  return (
     <div className="movie-card">
        <Poster src={posterUrl} alt={movie.title} />
        <Rating>{movie.vote_average.toFixed(1)}</Rating>
        
        <MovieDetails>
            <h3>{movie.title}</h3>
            <Overview>{truncatedOverview}</Overview>
            <ReleaseDate>Lançamento: {formattedDate}</ReleaseDate>
        </MovieDetails>



        {isFavorite ? (
            <button onClick={() => onRemoveFavorite(movie.tmdb_id)}>Remover dos Favoritos</button>
        ) : (
            <button onClick={() => onAddFavorite(movie)}>Adicionar aos Favoritos</button>
        )}
    </div>
  );
};

export default MovieCard;