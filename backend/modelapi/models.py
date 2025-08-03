from django.db import models

# Create your models here.


class ExampleModel(models.Model):
    name = models.CharField(max_length=100)
    value = models.FileField(upload_to='saved_models/')
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class BaseModel(models.Model):
    name = models.CharField(max_length=100)
    value = models.FileField(upload_to='saved_base_models/')
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name