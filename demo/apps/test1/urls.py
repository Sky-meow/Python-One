# encoding:utf-8
from test1 import api
from django.urls import path, re_path, include
from rest_framework import routers

app_name = 'test1'
urlpatterns = [
    path('get_test1', api.get_test1)
    #path('连接名', 方法, [name='别名'])
]