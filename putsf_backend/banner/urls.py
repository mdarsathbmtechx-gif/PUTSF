from django.urls import path
from . import views

urlpatterns = [
    path("banner-upload/", views.banner_upload, name="banner_upload"),
    path("banner-list/", views.banner_list, name="banner_list"),
]
from django.urls import path
from . import views

urlpatterns = [
    path("banner/", views.BannerListCreate.as_view(), name="banner-list-create"),
]
