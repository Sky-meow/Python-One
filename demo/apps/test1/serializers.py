#encoding:utf-8
'''
序列化类
'''
from .models import *
from rest_framework import serializers

class Test1Serializers(serializers.ModelSerializer):
    
    class Meta:
        model = test1
        fields = '__all__'