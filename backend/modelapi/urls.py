from .views import *
from django.urls import path

urlpatterns = [
    path('predict/', PredictView.as_view(), name='predict'),
]
