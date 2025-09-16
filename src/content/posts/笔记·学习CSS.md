---
title: 笔记·学习CSS
published: 2021-09-30
description: 一篇水文，当作笔记使用，用于Ctrl+C
tags: [CSS]
category: 笔记
draft: false
abbrlink: 945
---

CSS语法其实非常简单，我们只需学习一些基本的属性即可

# CSS 背景

## CSS background-color

background-color 属性指定元素的背景色。

颜色通常由以下方式指定：

- 有效的颜色名称 - 比如 "red"
- 十六进制值 - 比如 "#ff0000"
- RGB 值 - 比如 "rgb(255,0,0)"

实例：

```css
body {
  background-color: lightblue;
}
```

## 不透明度 / 透明度

opacity 属性指定元素的不透明度/透明度。取值范围为 0.0 - 1.0。值越低，越透明。

实例：

```css
div {
  opacity: 0.3;
}
```

## 使用 RGBA 的透明度

如果您不希望对子元素应用不透明度，请使用 *RGBA* 颜色值。下面的例子设置背景色而不是文本的不透明度：

RGBA 颜色值指定为：rgba(*red*, *green*, *blue*, *alpha*)。*alpha* 参数是介于 0.0（完全透明）和 1.0（完全不透明）之间的数字。

实例：

```css
div {
  background: rgba(0, 128, 0, 0.3) /* 30% 不透明度的绿色背景 */
}
```

## CSS 背景图像

background-image 属性指定用作元素背景的图像。

```css
body {
  background-image: url("https://example.com/img.jpg");
}
```

但是为了避免重复，我们一般使用

```css
body {
    background-image: url(https://cdn.jsdelivr.net/gh/WhitemuTeam/web-img/img/70856059.webp); /*此处自定义壁纸*/
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
}
```

# CSS 圆角边框

border-radius 属性用于向元素添加圆角边框：

```css
p {
  border: 2px solid red; /*添加边框*/
  border-radius: 5px; /*添加圆角*/
}
```

等待更新，不过你可以先看一下下面的实例

# 实例

通过上述教程我们很容易写出一个非常简单的CSS用于美化Bing搜索引擎

发布在[必应，UserStyles.world](https://userstyles.world/style/1170/bing)：

```css
/*Bing美化*/
/*背景图片*/
body {
    background-image: url(https://cdn.jsdelivr.net/gh/WhitemuTeam/web-img/img/70856059.webp); /*此处自定义壁纸*/
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
}
/*搜索结果美化*/
#b_results > li {
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 5px;
}
/*wiki美化*/
#b_context .b_ans,
#b_context #wpc_ag {
    background: none;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 5px;
}
/*搜索栏美化*/
#est_switch+#sb_form .b_searchboxForm, #est_switch+#sb_form .b_searchboxForm:hover {
    border-top-left-radius: 24px;
    background: rgba(0,0,0,0.5);
}
#b_header #sw_as #sa_ul, #uaanswer #sw_as #sa_ul, #sw_as #sa_ul li:last-of-type {
    border-radius: 0 0 24px 24px;
    background: rgba(0,0,0,0.6);
}
/*旁搜索按钮*/
#mfa_root .mfa_btn {
    background-image: initial;
    background-color: rgb(24, 26, 27,0.9);
}
/*隐藏小冰*/
#ev_hook {
    background-image: initial;
    height: 0;
}
.ev_talkbox_wrapper_min {
    background-color: transparent;
    opacity: 0;
}
/*调整细线*/
#b_header {
    border-bottom-color: rgb(0,0,0,0.19);
}
/*视频选项卡*/
.mc_vtvc {
    background-color: rgb(24, 26, 27,0.5);
    box-shadow: rgb(0 0 0 / 5%) 0px 0px 0px 1px, rgb(0 0 0 / 10%) 0px 2px 3px 0px;
}
/*隐藏翻译广告*/
.b_hPanel {
    opacity: 0;
    width: 0;
    height: 0;
}


```

截图：

![](https://userstyles.world/api/style/preview/1170.webp)

