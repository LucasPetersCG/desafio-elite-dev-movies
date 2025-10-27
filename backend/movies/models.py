from django.db import models

class FavoriteMovie(models.Model):
    tmdb_id = models.IntegerField(unique=True)
    title = models.CharField(max_length=255)
    overview = models.TextField()
    release_date = models.CharField(max_length=20, null=True, blank=True)
    poster_path = models.CharField(max_length=255, null=True, blank=True)
    vote_average = models.FloatField(default=0)

    def __str__(self):
        return self.title
