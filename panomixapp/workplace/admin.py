from django.contrib import admin
from . import models

@admin.register(models.Workplace)
class WorkplaceAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "name",
        "created_at",
    )

@admin.register(models.UserWorkPlace)
class UserWorkplaceAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "user",
        "workplace",
        "is_admin",
        "is_accepted"
    )
