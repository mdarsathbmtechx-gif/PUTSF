from rest_framework import serializers
from .models import Banner

class BannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Banner
        fields = ["id", "image", "uploaded_at"]

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        request = self.context.get("request")
        if request:
            rep["image"] = request.build_absolute_uri(instance.image.url)  # ✅ full URL
        return rep
