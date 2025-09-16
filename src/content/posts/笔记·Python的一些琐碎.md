---
title: 笔记·Python的一些琐碎
published: 2021-09-25
description: 阅读《Python从入门到精通》时产生的笔记
tags: [Python]
category: 笔记
draft: false
abbrlink: 62081
---

# 前言

阅读《Python从入门到精通》时产生的笔记，部分以及掌握的知识点或者是不常用知识点会被省略

# Python格言

```python
>>> import this
The Zen of Python, by Tim Peters

Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
Flat is better than nested.
Sparse is better than dense.
Readability counts.
Special cases aren't special enough to break the rules.
Although practicality beats purity.
Errors should never pass silently.
Unless explicitly silenced.
In the face of ambiguity, refuse the temptation to guess.
There should be one-- and preferably only one --obvious way to do it.
Although that way may not be obvious at first unless you're Dutch.
Now is better than never.
Although never is often better than *right* now.
If the implementation is hard to explain, it's a bad idea.
If the implementation is easy to explain, it may be a good idea.
Namespaces are one honking great idea -- let's do more of those!
```

# 索引

```python
>>> a='python'
>>> a[-1] #从右往左数，-1为开始
'n'
>>> a[-2]
'o'
>>> a[:] #切片
'python'
>>> a[0:]
'python'
>>> a[3:]
'hon'
>>> a[1:2]
'y'
```

# 赋值操作符

| 运算符 | 说 明            | 用法举例 | 等价形式                              |
| ------ | ---------------- | -------- | ------------------------------------- |
| =      | 最基本的赋值运算 | x = y    | x = y                                 |
| +=     | 加赋值           | x += y   | x = x + y                             |
| -=     | 减赋值           | x -= y   | x = x - y                             |
| *=     | 乘赋值           | x *= y   | x = x * y                             |
| /=     | 除赋值           | x /= y   | x = x / y                             |
| %=     | 取余数赋值       | x %= y   | x = x % y                             |
| **=    | 幂赋值           | x **= y  | x = x ** y                            |
| //=    | 取整数赋值       | x //= y  | x = x // y                            |
| &=     | 按位与赋值       | x &= y   | x = x & y                             |
| \|=    | 按位或赋值       | x \|= y  | x = x \| y                            |
| ^=     | 按位异或赋值     | x ^= y   | x = x ^ y                             |
| <<=    | 左移赋值         | x <<= y  | x = x << y，这里的 y 指的是左移的位数 |
| >>=    | 右移赋值         | x >>= y  | x = x >> y，这里的 y 指的是右移的位数 |

```python
>>> num=0
>>> num-=10
>>> num
-10
```

# 关键字in和is

```python
>>> 1 in (1,2,3) #'in'相当于集合中的属于符号，其用于判断是否包含在指定的序列中
True
>>> 0 in (1,2,3)
False
>>> (1,2) in (1,2,3) #'in'不想当于集合中的包含符号
False
>>> 1 is 1 #is用于判断两个变量是否为同一个，"=="是判断变量是否相等
<stdin>:1: SyntaxWarning: "is" with a literal. Did you mean "=="?
True
>>> a=1
>>> b=1
>>> a is b 
True
>>> b=2
>>> a is b
False
```

# 长度，最小值，最大值和求和

```python
>>> a=[1,2,3,4,5]
>>> len(a) #元素个数
5
>>> min(a) #最小值
1
>>> max(a) #最大值
5
>>> sum(a) #求和
15
>>> a='123' #也适用于字符串
>>> len(a)
3
```

# 列表的一些操作

添加&删除

```python
>>> a=[1,2,3] 
>>> a.append(4) #添加单个元素
>>> a
[1, 2, 3, 4]
>>> a.extend([5,6]) #添加多个元素，要用列表形式
>>> a
[1, 2, 3, 4, 5, 6]
>>> a.insert(0,0) #在指定位置插入元素，第一个参数为位置，第二个参数为插入内容
>>> a
[0, 1, 2, 3, 4, 5, 6]
>>> a.pop() #删除元素，默认是最后一个元素
6 #返回删除元素的内容
>>> a
[0, 1, 2, 3, 4, 5]
>>> a.pop(0) #删除指定位置的元素
0
>>> a
[1, 2, 3, 4, 5]
>>> a.remove(5) #按元素内容删除元素
>>> a
[1, 2, 3, 4]
>>> del a #直接删除整个变量
>>> a
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'a' is not defined
```

其他

```python
>>> a=[1,2,3]
>>> a.index(3) #查找指定元素的位置
2
>>> b=[1,1,2,3]
>>> b.index(1) #查找时仅寻找到第一项
0
>>> a.reverse() #反转元素位置
>>> a
[3, 2, 1]
>>> a.count(1) #统计元素出现次数
1
>>> a=[1,1,2,3]
>>> a.count(1)
2
>>> a=[3,1,2,0]
>>> a.sort() #对元素进行排列
>>> a
[0, 1, 2, 3]
```

# 字典的一些操作

```python
>>> a={
... '123':'abc',
... '456':'def'}
>>> a
{'123': 'abc', '456': 'def'}
>>> b=a.copy() #复制a的全部数据
>>> b
{'123': 'abc', '456': 'def'}
>>> b.clear() #清空b的全部数据
>>> b
{}
>>> c=['1.','2.','3.']
>>> c1=dict.fromkeys(c) #从c列表中提取信息以生成一个字典
>>> c1
{'1.': None, '2.': None, '3.': None}
>>> c1=dict.fromkeys(c,'Emtry') #指定字典的默认值
>>> c1
{'1.': 'Emtry', '2.': 'Emtry', '3.': 'Emtry'}
>>> a.get('123') #获取'1,2,3'对应的值
'abc'
>>> a.get('789','Emtry') #若获取对应值失败，返回默认值
'Emtry'
>>> a.keys() #从a字典中提取信息（:前）以生成一个列表
dict_keys(['123', '456'])
>>> '789' in a.keys() #判断某个值是否在字典中
False
>>> a.values() #从a字典中提取信息（：后）以生成一个列表
dict_values(['abc', 'def']) 
>>> a.items()
dict_items([('123', 'abc'), ('456', 'def')]) #从a字典中提取信息（全）以生成一个items
>>> for i in a: #用for遍历时返回:前值
...     print(i)
...
123
456
>>> for i,c in a: #无法一次性遍历全部信息
...     print(i,'->',c)
...
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ValueError: too many values to unpack (expected 2)
>>> for i,c in a.items(): #用items方法试试
...     print(i,'->',c)
...
123 -> abc #可以一次性遍历全部信息
456 -> def
```

# 集合

```python
>>> a={1,2,3}
>>> a
{1, 2, 3}
>>> b=set({1,2,3,'a','b','c'}) #生成混合集合或空集合时常用set()方法
>>> b.add('d') #添加元素
>>> b
{1, 2, 3, 'a', 'b', 'c'}
>>> b.add(1) #添加元素，但是不会存在多个相同的元素
>>> b
{1, 2, 3, 'a', 'b', 'd', 'c'}
>>> b.remove('d') #删除元素
>>> b
{1, 2, 3, 'a', 'b', 'c'}
>>> a={1,2,3}
#常见集合运算
>>> print('交集',a&b)
交集 {1, 2, 3}
>>> print('并集',a|b)
并集 {1, 2, 3, 'a', 'b', 'c'}
>>> print('差集',a-b)
差集 set()
>>> print('差集',b-a)
差集 {'a', 'b', 'c'}
>>> print('对称差集',b^a)
对称差集 {'a', 'b', 'c'}>>> b.add(1)
```

# 列表推导式

```python
>>> a=[a for a in range(3)]
>>> a
[0, 1, 2]
>>> c=[b for b in range(5) if b!=2] #添加一个条件
>>> c
[0, 1, 3, 4]
```

# 列表生成式

```python
>>> a=[i**2 for i in range(4)]
>>> a
[0, 1, 4, 9]
>>> [m+n for m in range(5) for n in range(2)]
[0, 1, 1, 2, 2, 3, 3, 4, 4, 5]
>>> [x+y for x in ['A','B','C'] for y in ['a','b','c']]
['Aa', 'Ab', 'Ac', 'Ba', 'Bb', 'Bc', 'Ca', 'Cb', 'Cc']
```



# 函数

## 默认参数

```python
>>> def main(a,b=123):
...     print('a=',a)
...     print('b=',b)
...
>>> main(123)
a= 123
b= 123
>>> main(456,000)
a= 456
b= 0
```

## 可变参数

```python
>>> def main(abc,*args,**kwargs):
...     print('abc=',abc)
...     print('args=',args)
...     print('kwargs=',kwargs)
...
>>> main(abc=123,name='Whitemu')
abc= 123
args= ()
kwargs= {'name': 'Whitemu'}
>>> def main(*args):
...     print(args)
...
>>> main(456)
(456,)
>>> main(456,789)
(456, 789)
```

## 文档字符串

```python
>>> def main():
...     '''
...     It is a main
...     '''
...     print('main')
...
>>> main.__doc__
'\n\tIt is a main\n\t'
>>> help(main)
Help on function main in module __main__:

main()
    It is a main

```

## 函数注释

`main.py`

```python
def main(time:str='Input your time',Mode:str="Y or N?") -> str:
    '''
    main函数帮助文档：
    time - 你的时间，字符串
    Mode - 模式，仅支持Y或N
    '''
    print('The time is',time)
```

![VSCode:引用时效果](https://i.bmp.ovh/imgs/2021/09/6a9e17f0a822ed0c.png)

## 匿名函数

```python
>>> a = lambda x,y:x+y
>>> a(1,2)
3
```

# 类

## 私有属性

```python
class Stu:
    def __init__(self,name):
        self.name=name
        self.__name='WhitemuTeam' #定义私有属性:__name，类似的，还有__abc之类，只需要在前面加上__即可
    def main(self):
        print('Your name is:',self.name)
        print('My name is',self.__name)

stu=Stu('White_mu')
stu.main()
print('The name in Stu is',stu.name)
print('The __name in Stu is',stu.__name)
```

输出:

```python
Your name is: White_mu
My name is WhitemuTeam
The name in Stu is White_mu
Traceback (most recent call last):
  File "C:\Users\28734\Desktop\main.py", line 12, in <module>
    print('The __name in Stu is',stu.__name)
AttributeError: 'Stu' object has no attribute '__name'
```

# Python内建异常

BaseExceptiona 所有异常的基类
SystemExitb python 解释器请求退出
KeyboardInterruptc 用户中断执行(通常是输入^C)
Exceptiond 常规错误的基类
StopIteratione 迭代器没有更多的值
GeneratorExita 生成器(generator)发生异常来通知退出
SystemExith Python 解释器请求退出
StandardErrorg 所有的内建标准异常的基类
ArithmeticErrord 所有数值计算错误的基类
FloatingPointErrord 浮点计算错误
OverflowError 数值运算超出最大限制
ZeroDivisionError 除(或取模)零 (所有数据类型)
AssertionErrord 断言语句失败
AttributeError 对象没有这个属性
EOFError 没有内建输入,到达 EOF 标记
EnvironmentErrord 操作系统错误的基类
IOError 输入/输出操作失败
OSErrord 操作系统错误
WindowsErrorh Windows 系统调用失败
ImportError 导入模块/对象失败
KeyboardInterruptf 用户中断执行(通常是输入^C)
LookupErrord 无效数据查询的基类
IndexError 序列中没有没有此索引(index)
KeyError 映射中没有这个键
MemoryError 内存溢出错误(对于 Python 解释器不是致命的)
NameError 未声明/初始化对象 (没有属性)
UnboundLocalErrorh 访问未初始化的本地变量
ReferenceErrore 弱引用(Weak reference)试图访问已经垃圾回收了的对象
RuntimeError 一般的运行时错误
NotImplementedErrord 尚未实现的方法
SyntaxError Python 语法错误
IndentationErrorg 缩进错误
TabErrorg Tab 和空格混用
SystemError 一般的解释器系统错误
TypeError 对类型无效的操作
ValueError 传入无效的参数
UnicodeErrorh Unicode 相关的错误
UnicodeDecodeErrori Unicode 解码时的错误
UnicodeEncodeErrori Unicode 编码时错误
UnicodeTranslateErrorf Unicode 转换时错误
Warningj 警告的基类
DeprecationWarningj 关于被弃用的特征的警告
FutureWarningi 关于构造将来语义会有改变的警告
OverflowWarningk 旧的关于自动提升为长整型(long)的警告
PendingDeprecationWarningi 关于特性将会被废弃的警告
RuntimeWarningj 可疑的运行时行为(runtime behavior)的警告
SyntaxWarningj 可疑的语法的警告
UserWarningj 用户代码生成的警告

# finally子句

```python
#a=1
try:
    print(a)
except:
    print('Error')
finally: #无论是否有异常都会执行下列语句
    print('exit...')
```

运行结果：

```
C:\Users\28734\Desktop>py main.py
Error
exit...

C:\Users\28734\Desktop>py main.py
1
exit...

```

再来一次，这次我们不设置a变量

```python
try:
    print(a)
except KeyboardInterrupt:
    print('Error')
finally:
    print('exit...')
```

输出

```python
C:\Users\28734\Desktop>py main.py
exit... #可以看到即使报错也可以执行finally子句下的内容
Traceback (most recent call last):
  File "C:\Users\28734\Desktop\main.py", line 2, in <module>
    print(a)
NameError: name 'a' is not defined
```

# 标准库

Python中自带的一些库

## sys

### 识别操作系统

我们会用到`sys.platform`来识别操作系统

```
>>> import sys
>>> print(sys.platform)
win32
```

win32代表的是Windows系统（包括但不限于x32和x64体系版本）

Linux->linux

Mac OS X->darwin

### 处理命令行参数

我们会用到`sys.argv`

learn.py:

```python
import sys

a=sys.argv
print(a)
```

cmd:

```powershell
C:\Users\28734\Desktop>py learn.py abc 123
['learn.py', 'abc', '123']
```

你可以看到列表的第一个元素是我们的py文件名，第二个开始才是我们运行时指定的参数的内容

如果用Vscode直接运行learn.py呢？

```powershell
C:\Users\28734>C:/Users/28734/AppData/Local/Programs/Python/Python39/python.exe c:/Users/28734/Desktop/learn.py
['c:/Users/28734/Desktop/learn.py']
```

您可以看到它返回了文件路径，说明了列表中的元素和命令行中输入的明亮有关

### 退出程序

我们会用到`sys.exit`  但是我们更常用的是`exit()`

```
>>> sys.exit()

C:\Users\28734\Desktop>
```

## os

### 获取当前文件所在目录

```python
import os

print("__file__:",__file__)
print("os.path.dirname(__file__):",os.path.dirname(__file__))
```

运行结果：

```
__file__: c:\Users\28734\Desktop\learn.py
os.path.dirname(__file__): c:\Users\28734\Desktop
```

可以看到，Python中自带的变量`__file__`是Py文件的路径（包括文件名），而`os.path.dirname(__file__)`返回的是不带文件名的版本

### 获取/切换当前路径

```python
import os

print(os.getcwd()) #获取当前路径，输出：C:\Users\28734\Desktop（即源cmd当前路径，否则就是文件路径）
os.chdir("c:\\") #切换路径
print(os.getcwd())
```

### 重命名文件

```python
import os

os.rename("a.text", "b.txt")
```

a.text被重命名为b.txt

### 查看指定的路径是否存在

```python
import os

folder = os.path.exists("c:\windows") #查看指定的路径是否存在
print(folder) #若存在，返回True，若不存在，则False
```

### 判断给出的路径是否是一个文件

```python
import os

folder = os.path.isfile("c:\\windows\\system32")
print(folder) #若是一个文件，则True，若不是或不存在，则False
```

反之，我们可以使用

```python
import os

folder = os.path.isdir("c:\\windows\\system32")
print(folder) #若是一个文件夹，则True，若不是或不存在，则False
```

### 创建一个文件夹

```python
import os

os.mkdir("d:\\mu")
```

### 创建多个文件夹

```python
import os

os.makedirs("d:\\mu1\\mu2\\mu3")
```

## random

```python
import random

print(random.random()) #用于生成随机0~1的浮点数，不能指定参数
print(random.randint(1,100)) #用于生成随机整数
print(random.uniform(1,100)) #用于生成随机浮点数
```

```python
import random

seq1 = (1, 15, 8, 97, 22)
seq2 = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
print(random.choice(seq1)) #用于随机抽取序列中的元素
print(random.choice(seq2))
```

# 文件

## 文件模式

用open打开文件时的mode：

### 文件格式

t：以文本格式打开文件（默认）。一般用于文本文件，如：txt。
b：以二进制格式打开文件。一般用于非文本文件，如：图片。
这一类参数可以与其它的模式参数组合使用，用于指定打开文件的格式。

### 读写模式

r：以只读方式打开文件（默认模式）。文件指针定位在文件头的位置。如果文件不存在会报错。
w：以只写方式打开文件。如果文件存在，则打开文件，清空文件内容，从文件头开始编辑；如果文件不存在，则创建新文件，打开编辑。
a：以追加方式打开文件，同样是只写，不允许进行读操作。如果文件存在，则打开文件，将文件指针定位到文件尾。因此，新的内容是追加在已有内容之后。如果文件不存在，则创建新文件进行写入。
+：打开一个文件进行更新（可读写）。注意：该模式不能单独使用，需要与r/w/a组合使用。文件指针的位置取决于另一个组合参数。

### 组合模式

r+：打开一个文件用于读写。如果文件存在，则打开文件，将文件指针定位在文件头，新写入的内容在原有内容的前面；如果文件不存在会报错。
w+：打开一个文件用于读写。如果文件存在，则打开文件，清空原有内容，进入编辑模式；如果文件不存在，则创建一个新文件进行读写操作。
a+：以追加模式打开一个文件用于读写。如果文件存在，则打开文件，将文件指针定位在文件尾，新写入的内容在原有内容的后面；如果文件不存在，则创建一个新文件用于读写。
所有上面这些模式默认都是t——文本模式，如果要以二进制模式打开，需要加上参数b，如：rb、rb+、wb、wb+、ab、ab+。

在了解了各种模式参数的具体用法后，根据您要打开的文件类型，以及打开文件后的操作类型来选用正确的mode参数即可。

## 按行读文件

我们会用到`x.readline`或者是`x.readlines`

```python
>>> f=open('abc.txt','r')
>>> f.readline()
'123\n'
>>> f.readline()
'abc\n'
>>> f.readline()
'efg'
```

可以看到，单次只能读取一行

而用到x.readlines时会返回一个列表

```python
>>> f=open('abc.txt','r')
>>> a=f.readlines()
>>> a
['123\n', 'abc\n', 'efg']
```

上述的方法都会保留换行符，可以用for遍历列表中的元素再用`i.split`方法去掉字符串后再生成一个新的列表

## 按行写文件

我们会用到`x.writelines`方法

```python
>>> open('abc.txt','w')
>>> f.writelines(['hello','world'])
```

你也可以使用字符串按行写文件

# 时间和日期

## 时间日期格式化符号

用于格式化时间日期：

- %y 两位数的年份表示（00-99）
- %Y 四位数的年份表示（000-9999）
- %m 月份（01-12）
- %d 月内中的一天（0-31）
- %H 24小时制小时数（0-23）
- %I 12小时制小时数（01-12）
- %M 分钟数（00=59）
- %S 秒（00-59）
- %a 本地简化星期名称
- %A 本地完整星期名称
- %b 本地简化的月份名称
- %B 本地完整的月份名称
- %c 本地相应的日期表示和时间表示
- %j 年内的一天（001-366）
- %p 本地A.M.或P.M.的等价符
- %U 一年中的星期数（00-53）星期天为星期的开始
- %w 星期（0-6），星期天为星期的开始
- %W 一年中的星期数（00-53）星期一为星期的开始
- %x 本地相应的日期表示
- %X 本地相应的时间表示
- %Z 当前时区的名称
- %% %号本身
- %f 毫秒

## 获取当前时间

```python
>>> import time
>>> print('当前时间:',time.localtime())
当前时间: time.struct_time(tm_year=2021, tm_mon=10, tm_mday=1, tm_hour=8, tm_min=3, tm_sec=30, tm_wday=4, tm_yday=274, tm_isdst=0)
>>> print('当前时间:',time.asctime(time.localtime()))
当前时间: Fri Oct  1 08:04:41 2021
```

```python
>>> import datetime
>>> print('当前日期',datetime.date.today())
当前日期 2021-10-01
>>> print('当前是星期几',datetime.date.today().weekday())
当前是星期几 4
```

## 计算程序运行时间

```python
import time

times=time.time()

for i in range(10):
	time.sleep(1)

print('代码运行时间',time.time() -times)
```

输出结果：

```powershell
代码运行时间 11.105396270751953
```

# 加密与解密

## MD5加密

```python
>>> import hashlib
>>> text='Hello world'
>>> hashlib.md5(text.encode()).hexdigest()
'3e25960a79dbc69b674cd4ec67a72c62'
```

## Base64加解密

```python
>>> import base64
>>> text='Hello world'
>>> base64text=base64.b64encode(text.encode())
>>> print('base64加密后：',base64text)
base64加密后： b'SGVsbG8gd29ybGQ='
>>> newtext=base64.b64decode(base64text)
>>> print('base64解密后',newtext)
base64解密后 b'Hello world'
```

# 获取目录

## 运行目录（cmd）

```python
import os
cmd=os.getcwd()
```

## Py文件目录

```python
import os
py=os.path.dirname(os.path.abspath(__file__))
```

## EXE文件目录

```
import sys
print(sys.executable)
```

运行结果(.py)

```
C:\Users\28734\AppData\Local\Programs\Python\Python39\python.exe
```

**故在非EXE中调试时，获取的是Python.exe所在位置**

# 获取某文件的文件名并拆分

```python
import os
file='E:\...\xxx.jpg' #文件目录
#获取文件名
filedir=os.path.split(file) #filedir: ['E:\...\xxx.jpg','xxx.jpg']
filename=filedir[1] #filename: xxx.jpg
#拆分文件名
file=filename.split('.') #以“.”号分割字符串 file: ['xxx','jpg']
name=file[0] #name: xxx
houzui=file[1] #houzui: jpg
```

# 拆分字符串

```python
a='123456.6543321.000000'
a1=a.split('.') #a1: 123456
```



# 当前时间获取

```python
import datetime
time = datetime.datetime.now() #获取当前时间（2021-08-15 23:50:40.236077）
realtime = time.strftime("%Y-%m-%d") #格式化获取到的时间（2021-08-15）
```

# 计算时间差

```python
from dateutil import parser
d1 = '2021-01-01'
d2 = '2021-02-01'
days = str((parser.parse(d2) - parser.parse(d1)).days)
```

# 从XML提取信息

`temp.xml`:

未经格式化：

```xml
<?xml version="1.0" encoding="utf-8" ?><images><image><startdate>20210813</startdate><fullstartdate>202108130900</fullstartdate><enddate>20210814</enddate><url>/th?id=OHR.UbehebeCrater_ZH-CN0157876978_1920x1080.jpg&amp;rf=LaDigue_1920x1080.jpg&amp;pid=hp</url><urlBase>/th?id=OHR.UbehebeCrater_ZH-CN0157876978</urlBase><copyright>死亡谷国家公园里的优比喜比火山口，加利福尼亚州 (© Albert Knapp/Alamy)</copyright><copyrightlink>https://www.bing.com/search?q=%E6%AD%BB%E4%BA%A1%E8%B0%B7%E5%9B%BD%E5%AE%B6%E5%85%AC%E5%9B%AD&amp;form=hpcapt&amp;mkt=zh-cn</copyrightlink><headline></headline><drk>1</drk><top>1</top><bot>1</bot><hotspots></hotspots></image><tooltips><loadMessage><message>正在加载...</message></loadMessage><previousImage><text>上一个图像</text></previousImage><nextImage><text>下一个图像</text></nextImage><play><text>播放视频</text></play><pause><text>暂停视频</text></pause></tooltips></images>
```

经格式化

```xml
<images>
	<image>
		<startdate>20210813</startdate>
		<fullstartdate>202108130900</fullstartdate>
		<enddate>20210814</enddate>
		<url>/th?id=OHR.UbehebeCrater_ZH-CN0157876978_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp</url>
		<urlBase>/th?id=OHR.UbehebeCrater_ZH-CN0157876978</urlBase>
		<copyright>死亡谷国家公园里的优比喜比火山口，加利福尼亚州 (© Albert Knapp/Alamy)</copyright>
		<copyrightlink>https://www.bing.com/search?q=%E6%AD%BB%E4%BA%A1%E8%B0%B7%E5%9B%BD%E5%AE%B6%E5%85%AC%E5%9B%AD&form=hpcapt&mkt=zh-cn</copyrightlink>
		<headline/>
		<drk>1</drk>
		<top>1</top>
		<bot>1</bot>
		<hotspots/>
	</image>
<tooltips>
	<loadMessage>
		<message>正在加载...</message>
	</loadMessage>
	<previousImage>
		<text>上一个图像</text>
	</previousImage>
	<nextImage>
		<text>下一个图像</text>
	</nextImage>
	<play>
		<text>播放视频</text>
	</play>
	<pause>
		<text>暂停视频</text>
	</pause>
	</tooltips>
</images>
```

Python源码：

```python
from xml.dom import minidom
dom=minidom.parse("temp.xml") #加载和读取XML文件
root=dom.documentElement #获取XML文档对象
msg = root.getElementsByTagName('copyright') #数据所在节点名
information1 = msg[0].firstChild.data #获取文本名
print('拍摄地(作者)：',information1)
```

# 多线程运行任务

```python
from threading import Thread  
t1 = Thread(target=first) #指定t1线程的任务——运行first函数
t2 = Thread(target=sec) #指定t2线程的任务——运行sec函数
#多线程开始
t1.start()
t2.start()
```

# 给图片插入句子

```python
import cv2
from PIL import ImageFont, ImageDraw, Image
import numpy as np	
bk_img= cv2.imread("first.jpg") #读取first.jpg
word = 'Hello world' #此处写你的句子
fontpath= "HarmonyOS_Sans_SC_Black.ttf" #设置字体
font= ImageFont.truetype(fontpath,32) #设置字体长度
img_pil= Image.fromarray(bk_img) #转换数据
draw= ImageDraw.Draw(img_pil) #简化模块长度
draw.text((70,230), word, font= font, fill= (0,0,0))
#绘制文字信息，(70,230)为字体的位置，(0,0,0)为颜色RGB码
bk_img= np.array(img_pil) #转换数组
cv2.imshow("finally",bk_img) #展示图片
cv2.waitKey() #展示图片时按任意键继续
cv2.imwrite("finally.jpg",bk_img)#写入图片
```

# 打开指定网站

```python
import webbrowser
url = 'https://muspace.top'
webbrowser.open_new(url)
```

# 注册表

```python
import win32api
import win32con
key = win32api.RegOpenKey(win32con.HKEY_LOCAL_MACHINE,'SYSTEM\CurrentControlSet\Control\Session Manager\Memory Management\PrefetchParameters',0, win32con.KEY_ALL_ACCESS)
#定位：key = win32api.RegOpenKey(win32.com.[第一级目录],'注册表位置',0,win32con.KEY_ALL_ACCESS)
win32api.RegCreateKey(key,'{2227A280-3AEA-1069-A2DE-08002B30309D}')
#新建项：win32api.RegCreateKey(key,'[项名]')
win32api.RegSetValueEx(key,'EnablePrefetcher',0,win32con.REG_SZ,'00000001')
#写注册表：win32api.RegSetValueEx(key,'[值名]',0,win32con.[值类型],('[值]'))
```

# 随机从txt中读取值

```python
def txt():
    import random
    with open('sen.txt', 'r' , encoding='utf8') as f: #打开sen.txt
        datas = f.readlines() #按换行符获取值
        data  =  random.choice(datas) #随机选择数据
    if data.strip() == '': #当获取到的数据为空时
        txt() #重新执行函数
    else:
        return data.strip() #反之，返回值
```

# 查找图片并扫描其二维码

```python
import numpy as np
from PIL import Image
from pyzbar import pyzbar
import glob
import os
import sys

PATH_TO_TEST_IMAGES_DIR = os.path.dirname(os.path.abspath(__file__)) #获取Py文件所在路径
img=PATH_TO_TEST_IMAGES_DIR + "/*.[jp][pn]g"

for pidImage in glob.glob(img): #查找jpg和png文件
    print('要解析二维码的图片: ',pidImage)
    im = np.array(Image.open(pidImage)) # 读取文件，转成数组
try:
    print(pyzbar.decode(im)[0].data.decode("utf-8")) # 输出内容
    os.remove(pidImage) #扫过移除二维码
    print('识别完毕，自动移除二维码')
except:
    print('无法识别二维码,请检查你的图片是否正确或确认程序根目录中含有图片')
```

# 图片转码

```python
from PIL import Image 
pidImage='xxx.jpg'
im = Image.open(pidImage).convert('RGB') # 打开图片
im.save(newfilename,'webp') #以webp方式保存图片
```

# 使用字典方法实现switch，改掉叠if杀人书的习惯

> From：[Python那些优雅的写法：switch-case - 简书 (jianshu.com)](https://www.jianshu.com/p/e4d3cb75e532)

```python
# switch = {"valueA":functionA,"valueB":functionB,"valueC":functionC}
# try:
#　　switch["value"]() #执行相应的方法。
# except KeyError as e:
#       pass 或 functionX #执行default部分

switch = {
    "a":lambda:x:x*2,
    "b":lambda:x:x*3,
    "c":lambda:x:x**x
}
try:
    swtich["c"](6)
except KeyError as e:
    pass
```

# 进度条显示

```python
from tqdm import tqdm
for i in tqdm(range(100000)):
	#print('hello world')
```

# 解压zip压缩包

```python
import zipfile
with zipfile.ZipFile(zipname) as zf:
                zf.extractall()
```

# 遍历文件夹中的所有文件并重命名

```python
for file in os.listdir(imgdir):
	newname=file+'.jpg'
	new_name=file.replace(file,newname)
	#重命名
    os.renames(os.path.join(imgdir,file),os.path.join(imgdir,new_name))
```

# requirements.txt

用于指示程序所用第三方库

## 生成

```powershell
# 安装
pip install pipreqs
# 在当前目录生成
pipreqs . --encoding=utf8 --force
```

## 使用

```powershell
pip install -r requirements.txt
```

# 管理员权限获取

注意: 无法在Debug中调试该项，请直接通过文件运行

```python
if ctypes.windll.shell32.IsUserAnAdmin():
	# main()
else:
    ctypes.windll.shell32.ShellExecuteW(None, "runas", sys.executable, __file__, None, 1)
```

