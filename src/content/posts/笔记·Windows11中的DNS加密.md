---
title: 笔记·Windows11中的DNS加密
published: 2021-10-31
description: 打赢隐私保卫战，从设置DNS加密开始
tags: [Windows]
category: 笔记
draft: false
abbrlink: 44423
---

# 前言

总所周知，Windows11更新了一个DNS加密，现在让我们来看看这个功能的作用

# DNS加密

首先我们得先知道DNS加密是什么东西。

DNS加密就是在DNS返回给你IP地址时加密，只有你能解密开这个数据，让中间人无法查看或者篡改。其用途是防止运营商劫持网络、加快域名解析同步时间（用户端）、市场上还有个红鱼等等，可以付费自定义hosts一类的。

好的，就先介绍到这里，现在我们开始设置DNS加密

# 设置

在Windows11下打开设置->网络&Internet->以太网(WLAN->你的WIFI属性)

点击DNS服务器分配右边的编辑按钮（或者是DNS服务器分配上方的更改所有WIFI的DNS设置），第一行自动改为手动，填入加密DNS，保存即可

# 一些加密DNS

```text
360：dot.360.cn
腾讯云：dns.pub 或者 doh.pub
阿里云：dns.alidns.com
```

或者：[Public DNS+——DNSPod推出的域名递归解析服务](https://www.dnspod.cn/Products/Public.DNS)

或者搞到[红鱼](https://www.rubyfish.cn/)的DNS，这里不再详述

# 一些问题

但是您可能不能通过上述方法完成设置，因为Windows可能不认识这些DNS，换而言之，Windows不支持这些DNS，支持的DNS可以通过打开注册表：

```
计算机\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Dnscache\Parameters\DohWellKnownServers
```

查看该项下的子项就可以看到Windows支持哪些加密DNS了

当然我们也可以自己添加一个项来让Windows支持某些DNS

以阿里云的DNS为例，通过设置章节中的方法设置DNS: `223.5.5.5` `223.6.6.6`

打开注册表，跳转到上述项中，新建一个子项，名为223.5.5.5(您的DNS地址)

在此子项中新建一个名为"Template"的字符串值，内容填入：https://dns.alidns.com/dns-query

保存，回到DNS设置，选择仅加密，就可以愉快地使用了。

当然我们也可以参考上述例子来自定义自己的DNS加密

# 后话

当然你开加密DNS可能在你眼中没什么作用，但是你已经为打赢隐私保卫战走出了重要的一步