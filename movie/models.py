from django.db import models


# Create your models here.
class Movie(models.Model):
    title = models.CharField(max_length=255)
    year = models.PositiveIntegerField()
    rate = models.PositiveIntegerField()
    note = models.CharField(max_length=255, default='', blank=True)

    def __str__(self):
        return self.title
