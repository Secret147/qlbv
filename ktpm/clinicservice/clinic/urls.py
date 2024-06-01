from django.urls import path
import clinic.views as views


urlpatterns = [
    path("", views.ListClinicView.as_view(), name="API to get list of Clinic"),
    path("<int:id>", views.DetailClinic.as_view(), name="API to update Clinic"),
    path("create/", views.CreateClinic.as_view(), name="API to update Clinic"),
    path("search/", views.ClinicViewSet.as_view(), name="API to update Clinic"),
]
