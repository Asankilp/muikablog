---
title: 笔记·Python装饰器
published: 2021-12-12
description: 发篇以前的水文吧，看看学校图书馆还有没有Python的一些高级用法指导
tags: [Python]
category: 笔记
draft: false
abbrlink: 64051
---
# 装饰器

装饰器是给现有的模块增添新的小功能，可以对原函数进行功能扩展，而且还不需要修改原函数的内容，也不需要修改原函数的调用。

# 一切皆对象

首先我们来理解下 Python 中的函数:

```python
def hello(name):
    return "hello " + name
 
print(hello('White_mu'))
# 输出: 'hi White_mu'
 
# 我们甚至可以将一个函数赋值给一个变量，比如
hi = hello
# 我们尝试运行下这个
print(hi('White_mu'))
# output: 'hi White_mu'
 
# 如果我们删掉旧的hello函数，看看会发生什么！
del hello
print(hello('White_mu'))
#outputs: NameError
 
print(hi('White_mu'))
#outputs: 'hi White_mu'
```

# 在函数中定义函数

这个好理解，我们可以在函数中继续定义一个函数，例如在A函数中定义一个B函数并调用，但B函数不能被外部调用

```python
def main():
    def hello():
        print('hello')
    def bye():
        print('bye')
    hello()
    bye()

main()
#output: hello
#output: bye
```

# 在函数中返回函数

这个也好理解，我们可以在父函数中返回父函数中的子函数

```python
def hello(name):
    def hello1():
        print('hello guest!')
    def hello2():
        print('hello master!')
    if name=='White_mu':
        return hello2
    else:
        return hello1

hellomaster=hello('White_mu')
hellomaster()
#outputs: hello master!
```

# 将函数作为一个参数传给另一个参数

这个还是好理解，看一下下面的代码就明白了

```python
def a():
    print('It is a!')

def b(fun):
    print('It is b!')
    fun()

b(a)
#outputs: It is b!
#outputs: It is a!
```

# 一个简单的装饰器

接下来我们开始来做点有用的装饰器，就以统计函数运行时间为例吧

```python
import time

def count_time(fun):
    '''
    这是统计函数运行时间的函数
    '''
    def main():
        print('开始统计函数运行时间!')
        t1=time.time()
        fun()
        print('函数运行完毕，运行时间为:',time.time()-t1)
    return main

def waiting():
    '''
    这是一个普普通通的函数
    '''
    print('开始运行函数')
    print('等待1s...')
    time.sleep(1)
    print('函数运行结束')

run_time=count_time(waiting)
run_time()
```

Outputs:

```
开始统计函数运行时间!
开始运行函数
等待1s...
函数运行结束
函数运行完毕，运行时间为: 1.00374174118042
```

# @语法糖

我们将会使用语法糖优化上述代码

```python
import time

def count_time(fun):
    '''
    这是统计函数运行时间的函数
    '''
    def main():
        print('开始统计函数运行时间!')
        t1=time.time()
        fun()
        print('函数运行完毕，运行时间为:',time.time()-t1)
    return main

@count_time #语法糖：省略了"run_time=count_time(waitting)"和"run_time()"，可直接运行waiting()函数
def waiting():
    '''
    这是一个普普通通的函数
    '''
    print('开始运行函数')
    print('等待1s...')
    time.sleep(1)
    print('函数运行结束')

waitting()
```

# 装饰器传参

当我们的函数需要传递参数时，上面的例子可能就不适用了，这时我们可以使用以下方法：

```python
import time

def count_time(fun):
    '''
    这是统计函数运行时间的函数
    '''
    def main(*args, **kwargs): #我们需要传入任意参数以达到函数运行的要求
        print('开始统计函数运行时间!')
        t1=time.time()
        fun(*args, **kwargs) #传入刚才传入的函数
        print('函数运行完毕，运行时间为:',time.time()-t1)
    return main

@count_time
def hellomu(name): #这个函数需要传入name参数
    '''
    这是一个普普通通的函数
    '''
    print('开始运行函数')
    print('hello! ',name)
    print('函数运行结束')

hellomu('White_mu')
```

outputs:

```
开始统计函数运行时间!
开始运行函数
hello!  White_mu
函数运行结束
函数运行完毕，运行时间为: 0.002000093460083008
```

这是传入一个参数的例子，接下来我们尝试传入多个参数

```python
def count_time(fun):
    '''
    这是统计函数运行时间的函数
    '''
    def main(*args, **kwargs): #我们需要传入任意参数以达到函数运行的要求
        print('开始统计函数运行时间!')
        t1=time.time()
        fun(*args, **kwargs) #传入刚才传入的函数
        print('函数运行完毕，运行时间为:',time.time()-t1)
    return main

@count_time
def hellomu(name,age,high='160cm'): #这个函数需要传入name,age参数，也可以选择传入high参数
    '''
    这是一个普普通通的函数
    '''
    print('开始运行函数')
    print('hello! ',name)
    print('Your age is ',age)
    print('You are ',high)
    print('函数运行结束')

hellomu('White_mu','16')
```

outputs：

```
开始统计函数运行时间!
开始运行函数
hello!  White_mu
Your age is  16
You are  160cm
函数运行结束
函数运行完毕，运行时间为: 0.001997232437133789
```

# 带参数的装饰器

用于在装饰器传入一些备注信息等之类的

```python
#这时候我们要用到3层函数
def wenhou(msg1='函数准备运行了呐~',msg2='函数运行完毕了呐~'): #第一层：用于传入备注信息
    '''
    这是一个简简单单的装饰器，用于运行函数时问候您
    '''
    def wenhou_fun(fun): #第二层：用于传入函数
        def main(*args,**kwargs): #第三层：用于装饰器主函数
            print(msg1)
            fun(*args,**kwargs)
            print(msg2)
        return main #return2次
    return wenhou_fun

@wenhou(msg1='今天有点感冒，函数快快运行好~') #这时候我们可以传入一些信息到装饰器中，当然，也可以不传
def hellomu(name,age,high='160cm'): #这个函数需要传入name,age参数，也可以选择传入high参数
    '''
    这是一个普普通通的函数
    '''
    print('开始运行函数')
    print('hello! ',name)
    print('Your age is ',age)
    print('You are ',high)
    print('函数运行结束')

hellomu('White_mu','16')
```

# 类装饰器

上面咱们一起学习了怎么写装饰器函数，在python中，其实也可以同类来实现装饰器的功能，称之为类装饰器。类装饰器的实现是调用了类里面的`__call__`函数。类装饰器的写法比我们装饰器函数的写法更加简单。

当我们将类作为一个装饰器，工作流程：

通过`__init__()`方法初始化类
通过`__call__()`方法调用真正的装饰方法

```python
class zhuangshiqi:
    '''
    一个简简单单的装饰器，兼备问候与统计运行时间功能
    '''
    def __init__(self,msg1='你好master,今天过得怎么样？函数开始运行了哦~',msg2='函数运行完毕了呐~'):
        print('正在运行类的__init__函数')
        self.msg1=msg1
        self.msg2=msg2
    def __call__(self,fun): #这里传入函数
        print('正在运行类的__call__函数')
        def main(*args): #这里传入函数的参数
           print('正在运行装饰器main函数')
           print(self.msg1)
           t1=time.time()
           fun(*args)
           print('函数运行时间',time.time()-t1)
           print(self.msg2)
        return main
    
@zhuangshiqi(msg1='希望函数能够正常运行~')
def hellomu(name,age,high='160cm'): #这个函数需要传入name,age参数，也可以选择传入high参数
    '''
    这是一个普普通通的函数
    '''
    print('开始运行函数')
    print('hello! ',name)
    print('Your age is ',age)
    print('You are ',high)
    print('函数运行结束')

        
if __name__=='__main__':
    hellomu('White_mu','16')
```

outputs:

```
正在运行类的__init__函数
正在运行类的__call__函数
正在运行装饰器main函数
希望函数能够正常运行~
开始运行函数
hello!  White_mu
Your age is  16
You are  160cm
函数运行结束
函数运行时间 0.0019986629486083984
函数运行完毕了呐~
```

