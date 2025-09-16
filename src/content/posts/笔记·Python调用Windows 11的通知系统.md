---
title: 笔记·Python调用Windows 11的通知系统
published: 2022-09-04
description: Windows-10-Toast-Notifications已死
tags: [Python]
category: 笔记
draft: false
abbrlink: 63374
---

# 前情提要

在这之前我通常使用[Windows-10-Toast-Notifications](https://github.com/jithurjacob/Windows-10-Toast-Notifications)来调用Windows的通知系统，但是从我更新到了22622后我发现这个库现在不起作用，于是几经辗转，找到了一个可用的库。

# 开始使用

[Windows-Toasts](https://github.com/DatGuy1/Windows-Toasts)是一个现在还在更新的python库，你可以通过pypi安装此库:

```
python -m pip install windows-toasts
```

由于此库没有官方文档库，因此本文凭自己的使用经验撰写。

# 简单使用

通过以下命令开始简单使用此库并输出一个Windows通知：

```
>>> from windows_toasts import WindowsToaster, ToastText1
>>> wintoaster = WindowsToaster('Python')
>>> newToast = ToastText1()
>>> newToast.SetBody('Hello, world!')
>>> newToast.on_activated = lambda _: print('Toast clicked!')
>>> wintoaster.show_toast(newToast)
```

你将会得到:

![弹窗效果](https://img.muspace.top/Page/2022-Summer/12.png)

并且您可以在消息通知中找到此通知。

让我们来看看这些命令的作用

## 消息样式

第一行是导入类，你可以看到我们导入了`WindowsToaster`和`ToastText1`，前者是最基础的类，您可以看到我们将通过此类显示弹窗；后者是众多消息样式的一种，下表列出了所有消息样式的类名和作用。

| 类名               | 作用                                                         |
| ------------------ | ------------------------------------------------------------ |
| ToastText1         | 最多可包含三行文本自动换行的单个字符串                       |
| ToastText2         | 第一行上有一个粗体文本字符串，第二行和第三行有一个自动换行常规文本字符串 |
| ToastText3         | 一个在第一行和第二行上自动换行的粗体文本字符串，在第三行上有一个常规文本字符串 |
| ToastText4         | 第一行有一个粗体文本字符串，第二行有一个常规文本字符串，第三行上的一个常规文本字符串 |
| ToastImageAndText1 | 最多可包含三行文本的图像和单个字符串                         |
| ToastImageAndText2 | 一个图像，第一行有一个粗体文本字符串，一个常规文本字符串，在第二行和第三行上换行 |
| ToastImageAndText3 | 一个图像，第一行上的一个粗体文本字符串，一个常规字符串，在第二行和第三行上自动换行的文本 |
| ToastImageAndText4 | 一个图像，第一行有一个粗体文本字符串，一个常规文本字符串，在第二行上，在第三行上有一个常规文本字符串 |

在第三行中我们将定义这些类来继续，而定义时不需要传入任何参数。

## 设置程序名

第二行是调用了WindowsToaster()类，当我们定义这个类时，我们需要传入一个**applicationText: str**参数，而这个参数就是用来指定弹出窗口的程序名。

## 设置文本

在第四行中我们将使用上表中列出的类来设置文本，这些类有以下常用方法:

| 函数                                        | 作用         |
| ------------------------------------------- | ------------ |
| newToast.SetHeadline(**headlineText: str**) | 设置标题     |
| newToast.SetBody(**bodyText: str**)         | 设置Body文字 |

无论如何，在`ToastText1`和`ToastImageAndText1`中您无法使用SetBody方法

## 点击后操作

```
newToast.on_activated = lambda _: fun()
```

在第五行中我们定义了点击了后的操作，但是我们实际运行的时候看不到任何文本被print出来，这是因为在show_toast之后程序就结束了，来不及运行print，但是我们可以使用加入一个等待时间来print出文本，当您点击消息的时候，这会立即输出文本而无需等待5s，但是函数会在5s后结束。

```
def toast():
    wintoaster = WindowsToaster('Moemu')
    newToast = ToastText3()
    newToast.SetHeadline('这是标题')
    newToast.SetBody('这是第一行 \n 这是第二行')
    newToast.on_activated = lambda _: print('1')
    wintoaster.show_toast(newToast)
    time.sleep(5)
```

## 最终输出

完成了对消息框的定义后，我们可以输出消息框。

```
wintoaster.show_toast(newToast)
```

这会立即弹出消息框，然后结束。

## 加入图片

众所周知，我们可以在消息框中加入图片，除定义支持插入图片消息样式外，我们需要定义图片。

```
newToast.SetImage(IMGPATH)
```

# 高级操作

实际上，这个库还有很多高级操作，您可以通过查阅其示例函数查看它们。

https://github.com/DatGuy1/Windows-Toasts/blob/master/tests/test_toasts.py