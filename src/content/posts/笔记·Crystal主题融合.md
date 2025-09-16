---
title: 笔记·将美星メイ与Crystal Dew World联动的主题融合进 Shizuku 版中
published: 2024-08-13
description: 花了2个小时在陌生的两个女人上
tags: [折腾]
category: 笔记
draft: false
abbrlink: 4122
---

大概是在今年四五月份的时候，微星和 Crystal Dew World 联动搞了个 CrystalDiskInfo 和 CrystalDiskMark 的主题，而msi日本官方给的是一个整合包，只有微星日v美星メイ的2个主题。但作为一个DD，如果能同时拥有 Shizuku 和 美星メイ 就好了，那么接下来我们来研究如何将美星メイ的主题融合进 Shizuku 版中。

你也能通过这篇教程探索如何研发自己的Crystal主题包，我会在文章底部给出主题融合后的CrystalDiskInfo 和 CrystalDiskMark的便携版下载链接。

![MeiMihoshi_CrystalDewWorld_wallpaper](https://storage-asset.msi.com/jp/picture/Landing/MihoshiMei/gallery/MeiMihoshi_CrystalDewWorld_wallpaper.jpg)

## 修改主题

首先要清楚CrystalDiskInfo 和 CrystalDiskMark 的主题目录在哪里，略微翻一下就能翻到：`./CdiResource/themes`

看起来只要把美星メイ的主题文件夹直接拖入就ok了，但是这样行不通，观察一下主题文件夹，原来每个文件夹开头都有`Shizuku`字样，那么试着把美星メイ的主题文件夹改名为`ShizukuMSIMei`，可以识别了，但主题的背景还是无法加载。

这是某个Shizuku主题的目录：

```
    SDdiskStatusBad-100.png
    SDdiskStatusBad-125.png
	...
    SDdiskStatusUnknown-250.png
    SDdiskStatusUnknown-300.png
    ShizukuBackground-300.png
    theme.ini
```

不难发现`ShizukuBackground-300.png`便是主题背景，那么只要把美星メイ的主题下的背景图片重命名为这个就可以了。

（请注意：对于 CrystalDiskMark ，不需要重命名背景图片的操作）

## 修改音效

如果你不知道CrystalDiskInfo其实有自带**语音**音效的话，那么试着将语言调整为日语，然后点几下Shizuku就可以听见了，要是不行，考虑一下更新新版本。

语音文件是`./CdiResource/voice/ShizukuVoice.dll`，替换该文件并把语言调整为日语即可体验

## 修改语言

如果你看不懂日文，没关系，你可以把日文本地化文件里面的内容调整为简体中文本地化文件即可。

语言文件在`./language`目录下。

或许你会看到简体中文本地化语言文件的版本已经落后了，但这没有关系，你仍然可以使用它，如果需要，我可以去更新一下汉化包。

## 修改关于页面背景

打开关于页面，你或许什么也看不见，因为关于页的字体是黑色的，并且窗口下方有一片白色区域。（或许关于页面的背景还是Shizuku，这时你也需要依据上文修改主题下关于页的文件名）

在不修改源代码的情况下，你只能手动修改`ShizukuAbout-300.png`的背景为白色才能看得舒服一点。

![ShizukuAbout-300](https://img.snowy.moe/2024/ShizukuAbout-300.png)

请注意：导出时请修改图片分辨率为:1920x**1980**



大功告成，享受你的美星メイ吧。

![效果图](https://img.snowy.moe/2024/image-20240812224542895.png)

参考链接：

1. [-美星メイ-　MSIノートPCイメージキャラクター & MSIオフィシャルVTuber 特設ページ](https://jp.msi.com/Landing/mihoshimei/nb#crystaldewworld)
2. [hiyohiyo/CrystalDiskInfo: CrystalDiskInfo (github.com)](https://github.com/hiyohiyo/CrystalDiskInfo)
3. MeiMihoshi_CrystalDewWorld.7z https://pan.baidu.com/s/1xq-uwqFafkxB4Py62G8ToQ?pwd=65bx 提取码: 65bx