from django.urls import path
import medicine.views as views


urlpatterns = [
    path("", views.ListMedicineView.as_view(), name="API to get list of Medicine"),
    path("<int:id>", views.DetailMedicine.as_view(), name="API to update Medicine"),
    path("create/", views.CreateMedicine.as_view(), name="API to update Medicine"),
    path("search/", views.MedicineViewSet.as_view(), name="API to update Medicine"),
]
