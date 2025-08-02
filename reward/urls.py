'''from django.contrib import admin
from django.urls import path
from reward import views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('product/<int:product_id>/', views.product_detail, name='product_detail'),
    path('', views.home, name='home'),
    path('reward/<int:reward_id>/', views.reward_detail, name='reward_detail'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)'''

# reward/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('reward/<int:pk>/', views.reward_detail, name='reward_detail'),
]
