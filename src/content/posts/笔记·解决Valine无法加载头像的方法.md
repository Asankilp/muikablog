---
title: 笔记·解决Valine无法加载头像的方法
published: 2021-07-01
tags: [hexo]
category: 笔记
draft: false
abbrlink: 28963
---

# 前言：

原来的Valine默认的头像源是[gravatar.loli.net](https://gravatar.loli.net/)，最近发现[gravatar.loli.net](https://gravatar.loli.net/)在某些网络环境中无法访问，显示“已重置连接。”这种错误报告，于是更改头像源

经过调查，发现sdn.geekzu.org提供的头像源有效，于是开始更换头像源

# 更换：

如果是butterfly主题，那么更改主题配置文件中的cdn链接（官方Valine使用）：

```
valine: https://cdn.jsdelivr.net/npm/valine/dist/Valine.min.js 
```

或者（加强版Valine使用）：

```
valine: https://cdn.jsdelivr.net/gh/HCLonely/Valine@latest/dist/Valine.min.js
```

改为：

```
valine: /js/Valine.min.js
```



保存然后下载上述两种其一的valine.min.js文件（基于你原来使用哪一个），拷贝到主题的source/js文件夹

打开下载好的js，按Ctrl+F搜索loli

然后你会看到：

```
T={cdn:"https://gravatar.loli.net/avatar/
```

更改为：

```
T={cdn:"https://sdn.geekzu.org/avatar/",
```

完成更换。

当然你还可以将更改后的js上传到你的仓库里以便节省网站流量，然后再次更改主题文件即可。

如果不是Butterfly主题，那么仿照上述措施更改你主题中的valine.min.js或者是配置文件即可

# 应用：

```
hexo clean
hexo g
hexo d #看看效果
```

