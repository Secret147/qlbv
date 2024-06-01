from django.urls import path
import hospitalbed.views as views


urlpatterns = [
    path(
        "", views.ListHospitalBedView.as_view(), name="API to get list of HospitalBed"
    ),
    path(
        "<int:id>", views.DetailHospitalBed.as_view(), name="API to update HospitalBed"
    ),
    path(
        "create/", views.CreateHospitalBed.as_view(), name="API to update HospitalBed"
    ),
    path(
        "search/", views.HospitalBedViewSet.as_view(), name="API to update HospitalBed"
    ),
    path(
        "clinics/<int:clinic_id>/beds/",
        views.HospitalBedsByClinicView.as_view(),
        name="beds-by-clinic",
    ),
]
