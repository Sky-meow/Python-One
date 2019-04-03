#encoding:utf-8
from rest_framework.decorators import api_view
from test1.models import test1
from test1.serializers import Test1Serializers
from api.response import JsonResponse,api_paging,get_parameter_dic

@api_view(['GET'])
def get_test1(request):
    '''
    通过GET获取test1的数据
    '''
    queryset = test1.objects.all() #获取所有

    return api_paging(queryset, request, Test1Serializers)