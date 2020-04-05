from django.urls import path
from . import views

app_name = "users"
urlpatterns = [
    path("signup", view=views.UserSignup.as_view()),
    path("google-signup", view=views.GoogleSignup.as_view()),
    path("google-login", view=views.GoogleLogin.as_view()),
    path("send-email", view=views.SendEmailToHost.as_view()),
    path("activate/<str:uid>/<str:token>", view=views.ActivateUser.as_view())
]
