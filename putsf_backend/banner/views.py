from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage
from .models import Banner

@csrf_exempt
def banner_upload(request):
    if request.method == "POST" and request.FILES.get("file"):
        file = request.FILES["file"]
        fs = FileSystemStorage()
        filename = fs.save(file.name, file)
        banner = Banner.objects.create(image=filename)
        return JsonResponse({"id": banner.id, "image": banner.image.url})
    return JsonResponse({"error": "Invalid request"}, status=400)

def banner_list(request):
    banners = Banner.objects.all().values("id", "image")
    return JsonResponse(list(banners), safe=False)


from rest_framework import generics
from .models import Banner
from .serializers import BannerSerializer

class BannerListCreate(generics.ListCreateAPIView):
    queryset = Banner.objects.all().order_by("-uploaded_at")
    serializer_class = BannerSerializer

