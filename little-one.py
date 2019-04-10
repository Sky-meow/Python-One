
# -*- coding: UTF-8 -*-

raw_input("按下 enter 键退出，其他任意键显示...\n")



def knowType(x):
    y = str(type(x))
    if "type" in y:
        return y.replace("<",'').replace(">",'').replace('type','').replace('\'','')
    elif "class" in y:
        return y.replace("<",'').replace(">",'').replace('class','').replace('\'','')

print(knowType(1))
print(knowType(datetime.now()))


