from django.db import models

class Banner(models.Model):
    image = models.ImageField(upload_to="banners/")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Banner {self.id}"
