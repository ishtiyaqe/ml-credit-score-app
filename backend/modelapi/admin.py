from django.contrib import admin
from .models import *

@admin.register(ExampleModel)
class ExampleModelAdmin(admin.ModelAdmin):
    list_display = ('name', 'active', 'created_at', 'updated_at')
    search_fields = ('name',)
    list_filter = ('active', 'created_at')
    ordering = ('-created_at',)
    fieldsets = (
        (None, {
            'fields': ('name', 'value', 'active')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    readonly_fields = ('created_at', 'updated_at')

@admin.register(BaseModel)
class BaseModelAdmin(admin.ModelAdmin):
    list_display = ('name', 'active', 'created_at', 'updated_at')
    search_fields = ('name',)
    list_filter = ('active', 'created_at')
    ordering = ('-created_at',)
    fieldsets = (
        (None, {
            'fields': ('name', 'value', 'active')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    readonly_fields = ('created_at', 'updated_at')
