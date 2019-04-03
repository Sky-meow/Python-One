#encoding:utf-8

import xadmin
from test1.models import *

class Test1Admin(object):
    list_display = ['name'] #列表中要展示的列
    search_fields = ['name'] #模糊搜索字段集合
    list_filter = [] #过滤字段
    list_editer = [] #列表中可编辑的页面
    readonly_fields = [] #只读字段

    def queryset(self):
        '''
        重写获取数据的方法
        '''
        queryset = super().queryset() #获取父级的queryset
        queryset = queryset.filter(name__icontains='finder') #根据finder模糊查询并且不区分大小写

xadmin.site.register(test1, Test1Admin)