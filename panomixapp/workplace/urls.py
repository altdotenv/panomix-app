from django.urls import path
from . import views

urlpatterns = [
    path("<str:workplace>/info", view=views.GetDashboardInfo.as_view()),
    path("<str:workplace>/check", view=views.CheckWorkplace.as_view()),
    path("connect/slack", view=views.ConnectSlack.as_view()),
    # path("create", view=views.CreateDataSource.as_view(), name="create_data_source"),
    # path("delete/<int:source_id>", view=views.DeleteDataSource.as_view(), name="delete_data_source"),
    # path("update/<int:source_id>", view=views.UpdateDataSource.as_view(), name="update_data_source"),
]
