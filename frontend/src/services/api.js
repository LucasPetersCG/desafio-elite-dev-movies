import axios from 'axios';

// O Vite disponibiliza as variáveis de ambiente no objeto `import.meta.env`
const apiBaseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: apiBaseURL
});

// Função para pesquisar filmes
export const searchMovies = (query) => api.get(`/search/?query=${query}`);

// Funções para gerenciar favoritos
export const getFavoriteMovies = () => api.get('/favorites/');
export const addFavoriteMovie = (movie) => api.post('/favorites/', movie);
export const removeFavoriteMovie = (tmdb_id) => api.delete(`/favorites/${tmdb_id}/`);

// Função para gerar o link de compartilhamento
export const getShareLink = () => api.get('/favorites/share/');
export const getMoviesByIds = (ids) => api.get(`/movies-by-ids/?ids=${ids}`);

export default api;