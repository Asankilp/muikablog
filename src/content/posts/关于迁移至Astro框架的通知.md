---
title: 关于迁移至 Astro 框架的通知
published: 2025-09-20
description: 我们又换博客系统了
tags: ["博客"]
category: 通知
draft: false
pinned: true
abbrlink: 550
---

经过一些准备，我们将博客系统迁移至了由 [Astro] 驱动的 [Mizuki](https://github.com/matsuzaka-yuki/mizuki) 博客主题。

由于与旧有的 Hexo 系统不兼容，因此我们在主题上做出了以下变动，这些变动可能会在后期出现问题:

- 添加 `abbrlink` 支持，如果博客文章不存在 `abbrlink` 则动态根据博文 id 生成。

- 为笔记（其实不然）添加了 `notes` 页面，比如 [美文收集](https://blog.snowy.moe/notes/featuredarticles/) 

可能存在的兼容性问题如下：

- 缓存出现问题可能导致出现意料之外的情况（比如反复 404），清除缓存可以解决此问题。

- 博客自带深色主题，但是仍有可能与阅读插件冲突。

- 你可能需要重新导入 [RSS](https://blog.snowy.moe/rss.xml) 订阅。

- 如果部分博文丢失，你可能要回退到之前的 [Hexo 博客页面](https://hexo.snowy.moe)（但此页面已经不再更新）

感谢您一如既往对雪萌天文台的支持，祝您有一个愉快的阅读体验。