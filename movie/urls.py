from django.urls import path
from . import views


urlpatterns = [
    path('', views.movies, name='movies'),
    path('create', views.create, name='create_movie'),
    path('remove', views.remove, name='remove_movie'),
    path('update', views.update, name='update_movie'),
]
