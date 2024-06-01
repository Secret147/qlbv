from django.urls import path
import patient.views as views


urlpatterns = [
    path("", views.ListPatientView.as_view(), name="API to get list of Patient"),
    path("<int:id>", views.DetailPatient.as_view(), name="API to update Patient"),
    path("create/", views.CreatePatient.as_view(), name="API to update Patient"),
    path("search/", views.PatientViewSet.as_view(), name="API to update Patient"),
]
