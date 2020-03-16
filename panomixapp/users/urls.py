from django.urls import path
from . import views

app_name = "users"
urlpatterns = [
    path("workplace/create", view=views.UserCreateWorkplace.as_view()),
    path("workplaces", view=views.GetUserWorkplaces.as_view()),

]
