import uuid #引入UUID类
from django.db import models

# Create your models here.

class test1(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    name = models.CharField(verbose_name='名称', max_length=25,null=True,blank=True)

    class Meta: #设置该实体类的一些属性
        verbose_name = '测试1' #类的中文名
        verbose_name_plural = verbose_name #设置后台显示的名称为verbose_name
