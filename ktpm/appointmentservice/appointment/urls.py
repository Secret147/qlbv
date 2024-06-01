from django.urls import path
import appointment.views as views


urlpatterns = [
    path(
        "", views.ListAppointmentView.as_view(), name="API to get list of Appointment"
    ),
    path(
        "<int:id>", views.DetailAppointment.as_view(), name="API to update Appointment"
    ),
    path(
        "create/", views.CreateAppointment.as_view(), name="API to update Appointment"
    ),
    path(
        "search/", views.AppointmentViewSet.as_view(), name="API to update Appointment"
    ),
    path(
        "getdoctor/<int:id>/",
        views.ApppointmentofDoctorView.as_view(),
        name="API to update Appointment",
    ),
]
