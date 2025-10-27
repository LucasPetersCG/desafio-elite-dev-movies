from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from decouple import config
import requests
from .models import FavoriteMovie
from .serializers import FavoriteMovieSerializer

# View para pesquisar filmes na API do TMDb
class SearchMovies(APIView):
    def get(self, request):
        query = request.query_params.get('query', None)
        if not query:
            return Response({'error': 'A query de pesquisa é obrigatória.'}, status=status.HTTP_400_BAD_REQUEST)

        api_key = config('TMDB_API_KEY')
        url = f"https://api.themoviedb.org/3/search/movie?api_key={api_key}&query={query}&language=pt-BR"
        
        try:
            response = requests.get(url)
            response.raise_for_status() # Lança um erro para respostas ruins (4xx ou 5xx)
            return Response(response.json())
        except requests.exceptions.RequestException as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# View para gerenciar a lista de favoritos
class FavoriteMoviesList(APIView):
    def get(self, request):
        movies = FavoriteMovie.objects.all()
        serializer = FavoriteMovieSerializer(movies, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = FavoriteMovieSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FavoriteMovieDetail(APIView):
    def delete(self, request, tmdb_id):
        try:
            movie = FavoriteMovie.objects.get(tmdb_id=tmdb_id)
            movie.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except FavoriteMovie.DoesNotExist:
            return Response({'error': 'Filme não encontrado na lista de favoritos.'}, status=status.HTTP_404_NOT_FOUND)

class ShareFavorites(APIView):
    def get(self, request):
        # Lógica para obter a lista de filmes favoritos
        movies = FavoriteMovie.objects.all()
        # Gera uma lista de IDs dos filmes
        movie_ids = list(movies.values_list('tmdb_id', flat=True))
        
        # Gera a URL de compartilhamento. O frontend usará esses IDs.
        # Ex: http://localhost:3000/shared-list?ids=123,456,789
        share_link = f"/shared-list?ids={','.join(map(str, movie_ids))}"
        
        return Response({'share_link': share_link})

class GetMoviesByIds(APIView):
    def get(self, request):
        ids_str = request.query_params.get('ids', '')
        if not ids_str:
            return Response({'error': 'Nenhum ID foi fornecido.'}, status=status.HTTP_400_BAD_REQUEST)

        tmdb_ids = [int(id) for id in ids_str.split(',')]
        
        # Busca no banco de dados pelos filmes favoritos que correspondem aos IDs
        movies = FavoriteMovie.objects.filter(tmdb_id__in=tmdb_ids)
        serializer = FavoriteMovieSerializer(movies, many=True)
        return Response(serializer.data)