---
title: 笔记·一个简单的PythonGUI库——PySimpleGUI使用教程
published: 2021-07-10
tags: [Python]
category: 笔记
draft: false
abbrlink: 54093
---

# 介绍

PySimpleGUI是一个非常适合小白的Python GUI库，其风格简易，入门简单。

仓库地址: https://github.com/PySimpleGUI

文档站：https://pysimplegui.readthedocs.io

# 安装

首先你的电脑上要提前安装好Python环境，然后在cmd输入以下代码：

```powershell
pip install PySimpleGUI
```

等待安装好即可

# 入门·简单的GUI程序

## GUI布局

我们要先画出GUI的草图以便于自己编写GUI

这里注意要加上它们的属性（第?行，文本/输入框/按钮）

![来源于官方文档站](https://i.bmp.ovh/imgs/2021/07/024e316242ffeac3.jpg)

## 编写代码

然后我们就要开始写代码了。

打开Python文件，导入库：

```python
import PySimpleGUI as sg
```

我们看到第一行只有个文本，所以我们使用：

```python
sg.Text('Enter a number') #sg.Text('文本')
```

第二行有个输入框，所以我们使用：

```python
sg.Input()
```

第三行有个"OK"按钮，所以我们使用：

```python
sg.OK()
```

将以上代码合起来，形成：

```python
layout = [ [sg.Text('Enter a Number')],
           [sg.Input()],
           [sg.OK()]
         ]
```

现在我们要生成GUI窗口：

```python
GUI = sg.Window('Enter a number example').Layout(layout)
GUI.Read()
```

将上述代码合起来：

```python
import PySimpleGUI as sg
layout = [ [sg.Text('Enter a Number')],
           [sg.Input()],
           [sg.OK()] ]
event,value = sg.Window('Enter a number example').Layout(layout).Read()
sg.Popup(event, number)
```

运行后得到：

![](https://i.bmp.ovh/imgs/2021/07/9218483a10623753.png)

在输入框中输入12，返回值:

event : 'OK'

value : '12'

# 基本变量

以下变量对于大部分的GUI元素适用且常用，请牢记其用法

| 变量       | 用途                 | 备注                |
| ---------- | -------------------- | ------------------- |
| text       | 显示的文本           | \                   |
| size       | 元素大小             | 无法控制文字大小    |
| font       | 更改字体             | (字体名,文字大小)   |
| text_color | 文本颜色             | 例如: 'red'         |
| tooltip    | 鼠标悬停时显示的文本 | \                   |
| key        | 当元素被使用时返回值 | 在event变量中返回值 |

# 主题


因为PySimpleGUI无法使用tk美化包，您只能通过更改主题，设置按钮图片，更改字体等方式美化您的GUI

全局主题设置方法: `sg.theme(new_theme)`

若要查看所有可用主题以及其预览，请在Python终端输入:

```
import PySimpleGUI as sg
sg.theme_previewer()
```

或查看图像:

![](https://user-images.githubusercontent.com/46163555/71361827-2a01b880-2562-11ea-9af8-2c264c02c3e8.jpg)

# Layout变量

layout变量是用于存储GUI元素的列表，其大致结构如下:

```
layout=[
	line1, #第一行
	line2  #第二行，依次类推，每一行都是一个单独的列表
]
```

```
layout=[
	[sg.xxx,sg.xxx],
	[sg.xxx]
]
```

# sg.Window()

`sg.Window()`用于生成一个窗口，其大致用法如下:

```
sg.Window(title,layout=None,icon=None,size=(None,None))
```

| 变量   | 用途     | 备注             |
| ------ | -------- | ---------------- |
| title  | 窗口标题 | \                |
| size   | 窗口大小 | 无法控制文字大小 |
| icon   | 图标路径 | 例如:'LOGO.ico'  |
| layout | 窗口元素 | 2层列表元素      |

若要使窗口弹出，请按照以下操作执行:

```
GUI=sg.Window('Test GUI',layout=layout)
event,value=GUI.Read() #窗口弹出并读取用户操作
GUI.Close() #窗口关闭
```

# sg.Text()

`sg.Text`方法可以在GUI中插入文本，其常用用法为：

```
sg.Text(text,size=(None,None),font=(None,None),text_color=None)
```

| 变量       | 用途     | 备注              |
| ---------- | -------- | ----------------- |
| text       | 文本内容 | 显示的文本        |
| size       | 元素大小 | 无法控制文字大小  |
| font       | 更改字体 | (字体名,文字大小) |
| text_color | 文本颜色 | 例如: 'red'       |

# sg.Input()

`sg.Text`方法可以在GUI中插入输入框（支持输入一行），其常用用法为：

```
sg.Text(default_text='',size=(None,None),font=(None,None),text_color=None)
```

| 变量         | 用途     | 备注              |
| ------------ | -------- | ----------------- |
| default_text | 默认文本 | 可留空            |
| size         | 元素大小 | 无法控制文字大小  |
| font         | 更改字体 | (字体名,文字大小) |
| text_color   | 文本颜色 | 例如: 'red'       |

# sg.Button()

`sg.Button`方法可以在GUI中插入按钮，其常用用法为：

```
sg.Text(button_text='',size=(None,None),font=(None,None),text_color=None,tooltip=None,key=None)
```

| 变量         | 用途                 | 备注                |
| ------------ | -------------------- | ------------------- |
| default_text | 在按钮上显示的文本   | 可留空              |
| size         | 元素大小             | 无法控制文字大小    |
| font         | 更改字体             | (字体名,文字大小)   |
| text_color   | 文本颜色             | 例如: 'red'         |
| tooltip      | 鼠标悬停时显示的文本 | \                   |
| key          | 当元素被使用时返回值 | 在event变量中返回值 |

高级用法——按钮图标，需要使用以下值:

```
sg.Button(tooltip=key,
button_color=(sg.theme_background_color(),sg.theme_background_color()),
border_width=0,
image_filename=path,key=key)
```

其中变量的用法为:

| 变量           | 用途                 | 备注                |
| -------------- | -------------------- | ------------------- |
| tooltip        | 鼠标悬停时显示的文本 | \                   |
| key            | 当元素被使用时返回值 | 在event变量中返回值 |
| button_color   | 按钮的颜色           | 此时使用背景色      |
| border_width   | 按钮边框长           | 此时为0             |
| image_filename | 图标位置             | 支持jpg,png         |

# sg.Menu()

`sg.Menu()`方法可以生成一个菜单，其大致用法如下:

```
sg.Menu(menu_definition, background_color=None, text_color=None, font=None)
```

| 变量            | 用途                 | 备注                |
| --------------- | -------------------- | ------------------- |
| menu_definition | 菜单内容             | 列表                |
| size            | 元素大小             | 无法控制文字大小    |
| font            | 更改字体             | (字体名,文字大小)   |
| text_color      | 文本颜色             | 例如: 'red'         |
| tooltip         | 鼠标悬停时显示的文本 | \                   |
| key             | 当元素被使用时返回值 | 在event变量中返回值 |

例如我们可以通过以下方式生成一个菜单

```
import PySimpleGUI as sg

menu=[
    ['文件',['新建','保存','退出']],
    ['帮助',['关于','在线文档',['文档1','文档2'],'帮助']], #注意理解
]
layout=[
    [sg.Menu(menu)], #sg.Menu元素应为layout列表中的第一个元素
    [sg.Text('在菜单中选择...')]
]
event,value=sg.Window('菜单',layout=layout,size=(500,100),font=('微软雅黑 10')).Read()
```

![](https://s2.loli.net/2022/01/30/8NJPdHMRZ4j7Bv2.png)

# sg.Popup()

弹出一个窗口，其大致用法为:

```
sg.Popup('Message',title='Title',custom_text=('确认'))
```

| 变量        | 用途           | 备注                                     |
| ----------- | -------------- | ---------------------------------------- |
| *args       | 显示的文本     | 可以传入多个变量，会自动换行             |
| title       | 标题           | \                                        |
| font        | 更改字体       | (字体名,文字大小)                        |
| text_color  | 文本颜色       | 例如: 'red'                              |
| custom_text | 自定义按钮文本 | 元组(支持更多按钮)或字符串，返回按钮文本 |
| icon        | 指定窗口图标   | 一般传入图标位置                         |

此外还有Popup的衍生版本，一般有`sg.popup_ok_cancel()`, `popup_cancel()`, `sg.popup_error()`,`sg.popup_error_with_traceback()`(这个版本的报错反馈加入了表情包，查看报错信息等功能),`sg.popup_ok_cancel()`, `sg.popup_ok()`, `sg.popup_quick()`(窗口弹出后立即返回`__TIMEOUT__`), `sg.popup_yes_no()`等，但它们看起来不支持自定义按钮文本

# sg.popup_notify()

现代的信息弹出窗口，与Windows 8+的消息弹出框相似，其大致用法如下:

```
sg.popup_notify('Message',title='Title')
```

当点击后会返回`__MESSAGE_CLICKED__`，超时会返回`__TIMEOUT__`

| 变量                   | 用途                 | 备注                         |
| ---------------------- | -------------------- | ---------------------------- |
| *arg                   | 信息内容             | 可以传入多个变量，会自动换行 |
| title                  | 标题                 | \                            |
| icon                   | 更改图标             | 一般传入图标位置             |
| display_duration_in_ms | 显示时间             | 单位: 毫秒                   |
| fade_in_duration       | 淡入淡出窗口的毫秒数 | 单位: 毫秒                   |
| alpha                  | 透明度               | 0~1                          |
