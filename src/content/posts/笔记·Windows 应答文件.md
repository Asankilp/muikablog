---
title: 笔记·Windows 应答文件创建
published: 2022-05-15
description: 使用应答文件全自动安装配置系统
tags: [Windows]
category: 笔记
draft: false
abbrlink: 31803
---
# 简介

Windows 应答文件是基于 XML 的文件，其中包含 Windows 安装过程中要使用的设置定义和值。 在应答文件中，指定各种设置选项。 这些选项包括如何对磁盘分区、在何处找到要安装的 Windows 映像，以及要应用哪个产品密钥。 还可以指定应用于 Windows 安装的值，例如，用户帐户的名称和显示设置。 安装程序的应答文件通常称为 Unattend.xml。

在 Windows 应答文件中，您可以指定各种安装选项，然后您就可以在Windows安装过程中自动调用 Windows 应答文件，从而实现系统全自动安装

# 创建


注意: 该过程使用的网站所使用的Jquery.min.js所指向的CDN出现问题，您可能需要使用魔法或者自行指定可用的CDN


打开https://www.windowsafg.com/，在"Desktop"选项卡上悬停，选择操作系统，这里以Windows 10/11 MBR为例

您可以在该页中看到非常多的设置，您可以使用翻译功能对此进行翻译并进行设置，这里我们仅展示常用的设置。

安装说明 一般不用填写，这里略过

![常规设置](https://img.muspace.top/Page/2022-Summer\03.png)

![区域设置](https://img.muspace.top/Page/2022-Summer\04.png)

![OOBE设置](https://img.muspace.top/Page/2022-Summer\05.png)

![分区设置(此为不擦除硬盘设置)](https://img.muspace.top/Page/2022-Summer\06.png)

![用户设置](https://img.muspace.top/Page/2022-Summer\07.png)

完成全部操作后，您可以点击Highlight All选中输出并复制到一个空的Unattend.xml中。或者Download File。

然后对该文件中的en-US全部替换为zh-CN。

至此，您的Unattend.xml已准备就绪。

# 使用

我们需要Unattend.xml对应的系统相应的镜像，我们以Windows 11为例，挂载Windows 11的ISO镜像，复制source文件夹下的install.wim到一个临时目录，使用Dism++挂载该wim文件(文件->挂载映像)，选择对应的系统版本，加载目录选择一个临时目录，取消勾选只读模式选项，点击确定。

挂载映像后打开加载目录下的Windows\Panther文件夹，拖入Unattend.xml文件。返回Dism++，保存并卸载映像

然后你可以使用该wim文件全自动安装系统，又或者使用软碟通替换镜像中install.wim文件，然后你就可以使用iso文件全自动安装系统。