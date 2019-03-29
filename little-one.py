#coding=utf-8

def knowType(x):
    y = str(x)
    if "type" in y:
        return y.replace("<",'').replace(">",'').replace('type','').replace('\'','')
    elif "class" in y:
        return y.replace("<",'').replace(">",'').replace('class','').replace('\'','')

print(knowType(type(1)))
print(knowType(type(datetime.now())))


