from django.urls import path
import bill.views as views


urlpatterns = [
    path("", views.ListBillView.as_view(), name="API to get list of Bill"),
    path("<int:id>", views.DetailBill.as_view(), name="API to update Bill"),
    path("create/", views.CreateBill.as_view(), name="API to update Bill"),
    path("search/", views.BillViewSet.as_view(), name="API to update Bill"),
]
