from django.shortcuts import render
from django.http import HttpResponse
from .models import Movie
from .forms import MovieForm


# Create your views here.
def movies(request):
    movie_objs = Movie.objects.all()
    form = MovieForm()
    context = {'movies': movie_objs, 'form': form}
    return render(request, 'movie/movies.html', context)


def create(request):
    form = MovieForm(request.POST)
    if form.is_valid():
        form_save = form.save()
        context = {'movie': form_save}
        return render(request, 'movie/a_movie.html', context)
    else:
        return HttpResponse('Failed')


def update(request):
    movie = Movie.objects.get(id=request.POST['id'])
    form = MovieForm(request.POST, instance=movie)
    if form.is_valid:
        form.save()
        return HttpResponse('Updated')
    else:
        return HttpResponse('Failed')


def remove(request):
    Movie.objects.get(id=request.POST['id']).delete()
    return HttpResponse('Removed')
