---
title: 笔记·Windows手动下载更新
published: 2022-06-06
description: 用作笔记用途
tags: [Windows]
category: 笔记
draft: false
abbrlink: 34021
---

# 前言

总所周知，Windows在某些时候无法下载更新，这时候就要手动安装更新来解决问题了

# 获取补丁

获取到您要下载的补丁号（KBxxxxxx），打开[Microsoft Update Catalog](https://www.catalog.update.microsoft.com/Home.aspx)，在右上方的搜索框中输入该补丁号

在搜索结果中寻找您要安装的补丁，点击右方download按钮

# 直接安装补丁

如标题，下载补丁后可以直接双击该.msu文件安装

# 手动安装补丁

如标题，直接安装补丁可能会比预期花费的时间要稍微长，这时我们可以通过提取.msu中的.cab文件安装补丁

打开管理员cmd，输入：

```powershell
expand KBXXXXXX.msu . -F:*
```

其中，KBXXXXX.msu代表的是该补丁文件名（或其路径）

然后我们应该可以看到目录中出现了XXX.cab文件

接下来我们继续在cmd中输入：

```powershell
dism /online /add-package /packagepath:.\XXX.cab /norestart
```

其中，.\XXX.cab代表的是该文件的文件名（或其路径）

安装完毕。

Done.