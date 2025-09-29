from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin-django/", admin.site.urls),
    path("api/admin/", include("accounts.urls")),
    path('', include('gallery.urls')),   # Gallery URLs at root
    path("api/", include("banner.urls")),  ]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
