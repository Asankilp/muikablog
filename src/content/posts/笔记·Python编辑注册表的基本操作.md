---
title: 笔记·Python编辑注册表的基本操作
published: 2021-08-04
tags: [笔记]
category: 笔记
draft: false
abbrlink: 15670
---

# 导入库

先安装库：

```powershell
pip install pypiwin32
```

然后在代码中导入：

```python
import win32api
import win32con
```



# 定位

```python
key = win32api.RegOpenKey(win32con.[注册表根目录],r'[位置]',0, win32con.KEY_ALL_ACCESS)
```

其中:

[注册表根目录]可以为:`HKEY_CLASSES_ROOT`, `HKEY_CURRENT_USER`等

[位置]可以为：`SYSTEM\Software\Microsoft`等

例如：

```python
key = win32api.RegOpenKey(win32con.HKEY_CURRENT_USER,'Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced',0, win32con.KEY_ALL_ACCESS)
```



# 创建项

创建项之前请先定位，下列操作也是如此

```python
win32api.RegCreateKey(key,'[项名]')
```

# 创建/更改值

```python
win32api.RegSetValueEx(key,'[值名]',0,win32con.[值类型],[值数据])
```

其中：

[值类型]可以为:`REG_SZ`, `REG_DWORD`等

例如:

```python
win32api.RegSetValueEx(key,'',0,win32con.REG_SZ,'Printers') #前''代表默认，后'...'代表字符串
```

```python
win32api.RegSetValueEx(key,'value',0,win32con.REG_DWORD,0)
```

# 读取值

```python
[自定义变量名]=win32api.RegQueryValueEx(key,'[值名]')
```

# 删除项

```python
win32api.RegDeleteKey(key, '[值名]')
```

# 删除值

最简单的方法（数据为空）：

```python
win32api.RegSetValueEx(key,'[值名]',0,win32con.REG_SZ,'')
```

```python
win32api.RegSetValueEx(key,'[值名]',0,win32con.REG_DWORD,0)
```

