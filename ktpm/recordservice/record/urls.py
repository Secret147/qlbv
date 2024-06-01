from django.urls import path
import record.views as views


urlpatterns = [
    path("", views.ListRecordView.as_view(), name="API to get list of Record"),
    path("<int:id>", views.DetailRecord.as_view(), name="API to update Record"),
    path("create/", views.CreateRecord.as_view(), name="API to update Record"),
    path("search/", views.RecordViewSet.as_view(), name="API to update Record"),
]
