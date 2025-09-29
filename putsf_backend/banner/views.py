from rest_framework import viewsets
from .models import Banner
from .serializers import BannerSerializer

class BannerViewSet(viewsets.ModelViewSet):
    queryset = Banner.objects.all().order_by('-created_at')
    serializer_class = BannerSerializer

    def get_serializer_context(self):
        return {'request': self.request}
