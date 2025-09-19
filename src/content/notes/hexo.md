---
title: hexo
published: 2021-04-23
---
# 下载与安装

## 必备工具

1. Node.js：

   官方网站:https://nodejs.org/en/

   下载地址:https://nodejs.org/en/download/

   淘宝分流:https://npm.taobao.org/mirrors/node

2. Git:

   官方网站:http://git-scm.com/

   下载地址:https://git-scm.com/download

   淘宝分流（Windows）:https://npm.taobao.org/mirrors/git-for-windows/

## 安装hexo

0*：配置淘宝cnpm管理器（右键打开Git Bash here）（不能使用 Ctrl + C ，右键选择Paste复制）：

```bash
npm install -g cnpm --registry=http://registry.npm.taobao.org
```

（注意：只复制npm及以后的内容，不需要复制“$”）

1.确定安装hexo的位置（存放博客文件的位置，不需要新建文件夹）

2.在确定安装的位置中右键，点击Git Bash here

3.复制以下代码至弹出的命令行窗口中

```bash
npm install -g hexo-cli
```

或者：

```bash
cnpm install -g hexo-cli
```

4.创建blog文件夹：

```bash
hexo init <folder> 
cd <folder>
npm install
```

 “<floder>”为将新建的用于存放hexo文件的文件夹的名字，请更改

自此，hexo已安装完成，以下为配置教程：

# 配置：

## 常用命令：

```bash
hexo s #实时预览blog，在浏览器打开localhost:4000
hexo g #生成blog网页文件
hexo d #部署blog至远程服务器
hexo clean #清理blog网页文件
```

（不需要复制$及以后的内容）

## _config.yml

位于blog文件夹根目录下的blog配置文件。

官方帮助文档链接：https://hexo.io/zh-cn/docs/configuration

我们通常使用sublime text编辑yml和其他配置文件，下载地址：[下载 - 崇高文本 (sublimetext.com)](https://www.sublimetext.com/3)

## 文章创建：

hexo默认使用.md（Markdown）文件进行blog文章创建，通常存放在...\source\ _posts下

我们通常使用Typora来进行对Markdown文件的编辑，下载链接：https://typora.io/#download

## 文章信息编辑（front-matter）：

官方帮助文档：https://hexo.io/zh-cn/docs/front-matter

# 部署：

## 创建SSH:

打开终端，输入（填写你的邮箱）：

```bash
ssh-keygen -t rsa -C 'yourmail@example.com'
```

然后不断enter即可

在你的用户文件夹下找到.ssh文件夹，找到`id_rsa.pub`并用记事本打开，里面的内容就是你的SSH密钥

## 绑定：

登录你的Github，并跳转到[SSH and GPG keys (github.com)](https://github.com/settings/keys)

点击New SSH key，titlle任取，key中粘贴你的SSH密钥

点击Add SSH key即可

## 验证：

在终端中输入

```bash
ssh -T git@github.com
```

若输出：

```bash
Are you sure you want to continue connecting (yes/no)?
```

输入yes，输出：

```bash
Hi xxx! You've successfully authenticated, but Github does not provide shell access.
```

即成功

## 部署：

在终端中输入(npm可改成cnpm)：

```bash
npm install hexo-deployer-git --save
```

并修改`_config.yml`(hexo根目录)：

```yaml
deploy:
  type: git
  repo: <repository url> #https://bitbucket.org/JohnSmith/johnsmith.bitbucket.io
  branch: master
  message:
```

参考示例，在repo这一行输入你的仓库地址，保存

在终端中输入：

```bash
hexo d
```

开始上传你的blog文件，中途可能需要你输入账号密码，稍等片刻，你的blog就可以部署在远程服务器中

# 主题使用（butterfly）：

## 下载：

在hexo根目录打开git bash，输入以下命令以下载butterfly主题：

```bash
git clone -b master https://gitee.com/iamjerryw/hexo-theme-butterfly.git themes/butterfly
```

## 使用：

编辑`_config.yml`（请找到theme而非直接复制粘贴）：

```yaml
theme: butterfly
```

然后`hexo clean`和`hexo g`

## 配置：

敬请参阅官方配置文档：[Butterfly 安裝文檔(一) 快速開始 | Butterfly](https://butterfly.js.org/posts/21cfbf15/)

## 添加页面：

添加tags页（标签页）和categories页（分类页）和about页（关于）和link页（友情链接）都可使用此方法

以创建tags页为例：

在hexo根目录下打开source文件夹

创建文件夹并命名为tags

在新创建的文件夹中创建index.md文件

在index.md文件中添加以下内容（front-matter）：

```markdown
---
title: 标签
date: 2021-01-24 05:26:43
type: "tags"
---
```

然后执行hexo clean和hexo g即可完成创建

# 常见问题：

## hexo: command not found 或 cnpm: command not found

在终端输入以下命令:

```bash
npm install hexo-cil -g
```

或：

```bash
npm install -g cnpm --registry=http://registry.npm.taobao.org
```

然后你会看到类似于以下的输出（以安装cnpm为例）：

```bash
$ npm install -g cnpm --registry=http://registry.npm.taobao.org
npm WARN deprecated request@2.88.2: request has been deprecated, see https://github.com/request/request/issues/3142
npm WARN deprecated har-validator@5.1.5: this
C:\Users\沐沐\AppData\Roaming\npm\cnpm -> C:\Users\沐沐\AppData\Roaming\npm\node_modules\cnpm\bin\cnpm
+ cnpm@6.2.0
updated 1 package in 80.744s
```

此时复制"->"后的内容（但不要复制bin后面的内容），

也就是：C:\Users\沐沐\AppData\Roaming\npm\node_modules\cnpm\bin

依次打开设置->系统->关于->高级系统设置->环境变量

在"...的用户变量"下方找到`Path`变量，双击`Path`变量进入编辑界面，点击新建，粘贴你刚才复制的内容，回车并点击确定即可

## 如何在右键快捷菜单的新建选项中添加Markdown选项

敬请参阅：[Win10系统下鼠标右键新建Markdown文档 - 知音12138 - 博客园 (cnblogs.com)](https://www.cnblogs.com/zhiyin1209/p/12149784.html)

## Git提交时提示‘The file will have its original line endings in your working directory’

在终端中输入：

```bash
git config --global core.autocrlf  false
```

即可解决
