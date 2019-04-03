from django.shortcuts import render
from rest_framework.views import APIView
from django.utils.encoding import force_text, smart_text, smart_str

# Create your views here.

# def api_token(func):
#     '''
#     API的token验证装饰器
#     '''
#     def method(request, *args, **kwargs):
#         if not request.get('token')
