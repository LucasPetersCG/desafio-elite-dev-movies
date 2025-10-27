from django.urls import path
from .views import SearchMovies, FavoriteMoviesList, FavoriteMovieDetail, ShareFavorites, GetMoviesByIds

urlpatterns = [
    path('search/', SearchMovies.as_view(), name='search-movies'),
    path('favorites/', FavoriteMoviesList.as_view(), name='favorite-movies-list'),
    path('favorites/<int:tmdb_id>/', FavoriteMovieDetail.as_view(), name='favorite-movie-detail'),
    path('favorites/share/', ShareFavorites.as_view(), name='share-favorites'),
    path('movies-by-ids/', GetMoviesByIds.as_view(), name='movies-by-ids'),
]