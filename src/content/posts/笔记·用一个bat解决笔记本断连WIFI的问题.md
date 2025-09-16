---
title: 笔记·用一个bat解决笔记本断连WIFI的问题
published: 2021-08-07
tags: [Windows]
category: 笔记
draft: false
abbrlink: 35605
---

# 前言

本人11年的电脑经常断连WIFI，导致远程的时候无法连接到此电脑，于是欲通过bat解决此问题

# 开始

从网上找了一个bat源码，经测试过后可以正常工作（刚才又被迫测试了一次）

将下列代码复制到*.bat（名字任意）:

```bat
@echo off
setlocal ENABLEDELAYEDEXPANSION
set "netName=" #=号后填你的WIFI名
 
:loop
   >nul ping baidu.com -n 1
   if !errorlevel! equ 0  (
      echo [%time%]   ping is OK.
   )
   if !errorlevel! equ 1  (
      echo [%time%]   ping is Error.
      >nul netsh wlan disconnect name=%netName%
      >nul netsh wlan connect name=%netName%
   )
   >nul ping 127.0.0.1 -n 5
   goto loop
```

运行此bat即可自动在断连时自动连接WIFI

# 问题

但是这个bat会在前台运行，很容易会误关闭，于是又去网上搜索解决方法，经过多次搜索找到了方法：
将*.bat更改为：

```bat
@echo off
if "%1"=="hide" goto CmdBegin
start mshta vbscript:createobject("wscript.shell").run("""%~0"" hide",0)(window.close)&&exit
:CmdBegin

setlocal ENABLEDELAYEDEXPANSION
set "netName=" #“=”后填你的WIFI名
 
:loop
   >nul ping baidu.com -n 1
   if !errorlevel! equ 0  (
      echo [%time%]   ping is OK.
   )
   if !errorlevel! equ 1  (
      echo [%time%]   ping is Error.
      >nul netsh wlan disconnect name=%netName%
      >nul netsh wlan connect name=%netName%
   )
   >nul ping 127.0.0.1 -n 5
   goto loop

:END
```

即可隐藏cmd窗口

如需关闭，请打开运行输入：

```cmd
taskkill /im cmd.exe
```

即可关闭