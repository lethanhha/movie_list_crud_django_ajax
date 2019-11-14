from django import forms
from .models import Movie


class MovieForm(forms.ModelForm):
    class Meta:
        model = Movie
        fields = ('title', 'year', 'rate', 'note')
        # help_texts = {
        #     'title': 'Help text for title',
        # }
        widgets = {
            'title': forms.TextInput(
                attrs={
                    'placeholder': 'Movie title',
                    'class': 'form-control'}),
            'year': forms.NumberInput(
                attrs={
                    'placeholder': 'Release year',
                    'class': 'form-control'}),
            'rate': forms.NumberInput(
                attrs={
                    'placeholder': 'Your rate',
                    'class': 'form-control'}),
            'note': forms.TextInput(
                attrs={
                    'placeholder': 'Your note',
                    'class': 'form-control'}),
        }
