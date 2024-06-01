from django.urls import path
import medicalsupplies.views as views


urlpatterns = [
    path(
        "",
        views.ListMedicalSuppliesView.as_view(),
        name="API to get list of MedicalSupplies",
    ),
    path(
        "<int:id>",
        views.DetailMedicalSupplies.as_view(),
        name="API to update MedicalSupplies",
    ),
    path(
        "create/",
        views.CreateMedicalSupplies.as_view(),
        name="API to update MedicalSupplies",
    ),
    path(
        "search/",
        views.MedicalSuppliesViewSet.as_view(),
        name="API to update MedicalSupplies",
    ),
]
