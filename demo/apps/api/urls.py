# encoding:utf-8
from django.conf import settings
from django.urls import path, re_path, include
from .schema import SwaggerSchemaView

# from rest_framework import routers
# router = routers.DefaultRouter()

app_name = 'api'
urlpatterns = [
    re_path(r'^docs/', SwaggerSchemaView.as_view()),
    re_path(r'test/', include('test1.urls')) #引入test1的url
]
