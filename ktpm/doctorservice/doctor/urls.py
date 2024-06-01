from django.urls import path
import doctor.views as views


urlpatterns = [
    path("", views.ListDoctorView.as_view(), name="API to get list of doctor"),
    path("<int:id>", views.DetailDoctor.as_view(), name="API to update Doctor"),
    path("create/", views.CreateDoctor.as_view(), name="API to update Doctor"),
    path("search/", views.DoctorViewSet.as_view(), name="API to update Doctor"),
]
