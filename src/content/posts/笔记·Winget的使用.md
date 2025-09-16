---
title: 笔记·Winget的使用
published: 2021-08-22
tags: [工具]
category: 笔记
draft: false
abbrlink: 20299
---

# 开始之前·官网介绍

> 开发人员可以在 Windows 10 计算机上使用 **winget** 命令行工具来发现、安装、升级、删除和配置应用程序。 此工具是 Windows 程序包管理器服务的客户端接口。
>
> **winget** 工具当前为预览版，因此目前并不是所有已计划的功能都可用。 -doc.microsoft.com

简单来说我们可以使用Winget下载安装软件（安装时会尽量使用静默安装），但目前Winget还没有GUI版本，这可能也是Winget一大优点之一，通过我们编写bat脚本，我们可以批量下载软件而不需要手动去官网/各大应用商店来获取软件

# 准备使用·获取Winget

## 系统配置

Windows 10 1809 (10.0.17763)或更高配置

Windows 11 任何版本（目前Win11任何版本都为测试版）

## 安装方式

您可以通过以下任意方式获取Winget，但在这之前请您打开`cmd`，输入`winget -v`检查您是否安装winget，若已安装，会输出winget的版本号，反之，则没有安装

### Insider

您可以通过加入Windows 预览体验计划然后获取最新的Windows预览版本以获取Winget

1. 加入[Windows Insider](https://insider.windows.com/zh-cn/register)，按照网页的指引加入Windows 预览体验成员计划（您需要一个微软账户），需要提醒您的是，Windows预览版本虽然包含了较新的功能，但这些功能也有可能带来漏洞，加入前请三思
2. 加入后，依次点击Windows开始菜单->设置->更新与安全->Windows预览体验计划->点击 入门 按钮-> 在 “选择账户开始” 下，选择 + 以连接注册 Microsoft 的帐户并继续。

3. 按照屏幕上的说明选择想要获取 Insider 预览版本的体验和频道。 (不确定要选择哪个频道? [了解更多有关频道的信息。](https://docs.microsoft.com/zh-cn/windows-insider/flighting))
4. 查看隐私声明和程序条款，确认并选择 **“立即重启”** 或 **“稍后重启”** 以完成设备设置。
5. 检查数据设置后，转到 [**“设置”** > **“更新和安全”** > **“Windows 更新”**](https://aka.ms/WIPWindowsUpdate)，然后选择 **“检查更新”** 按钮，以根据所选设置下载最新的 Insider 预览版。 设备将像往常一样通过 Windows 更新进行更新。

6. 更新完毕后，再次像上述方法检查您是否安装Winget（若没有，请到微软应用商店安装App installer）

### Github

1. 转到[Releases · microsoft/winget-cli (github.com)](https://github.com/microsoft/winget-cli/releases)，下载[Microsoft.DesktopAppInstaller_8wekyb3d8bbwe.msixbundle](https://github.com/microsoft/winget-cli/releases/download/v1.0.11692/Microsoft.DesktopAppInstaller_8wekyb3d8bbwe.msixbundle)（文件名视版本不同可能会有差异，此超链接指向文章发布时最新的Winget安装包）

2. 打开此安装包（.msixbundle），点击install按钮，若出现“For proper functioning of the app, try to launch a Windows app package.”则说明安装成功，退出此窗口

3. 再次像上述方法检查您是否安装Winget

# 开始使用·常用指令

## 启动

由于Winget不具有GUI窗口，所以您需要通过cmd（命令提示符）来使用Winge），Win+R输入cmd来打开cmd

当然这里推荐使用[Windows Terminal](https://www.microsoft.com/zh-cn/p/windows-terminal/9n0dx20hk701#activetab=pivot:overviewtab)来替代cmd

打开上述的任何一款命令提示符，输入winget即可查看winget菜单

## 语法

```powershell
winget [<命令>] [<选项>]
```

命令：

```powershell
  install    安装给定的程序包
  show       显示包的相关信息
  source     管理程序包的来源
  search     查找并显示程序包的基本信息
  list       显示已安装的程序包
  upgrade    升级给定的程序包
  uninstall  卸载给定的程序包
  hash       哈希安装程序的帮助程序
  validate   验证清单文件
  settings   打开设置
  features   显示实验性功能的状态
  export     导出已安装程序包的列表
  import     安装文件中的所有程序包
```

如需特定命令的更多详细信息，请向其传递帮助参数。 [-?]

选项：

```powershell
下列选项可用：
  -v,--version  显示工具的版本
  --info        显示工具的常规信息
```

## 常用指令

### search

我们先从search开始，毕竟下载软件前得先搜索是吧

它的语法为：

```powershell
winget search [[-q] <query>] [<选项>]
```

其中：

```powershell
以下参数可用：
  -q,--query   用于搜索程序包的查询

下列选项可用：
  --id         按 id 筛选结果
  --name       按名称筛选结果
  --moniker    按名字对象筛选结果
  --tag        按标签筛选
  --command    按命令筛选结果
  -s,--source  使用指定的源查找程序包
  -n,--count   显示不超过指定数量的结果
  -e,--exact   使用精确匹配查找程序包
```

可在此找到更多帮助： https://aka.ms/winget-command-search

假如我们想要搜索Winget中可下载的所有软件，我们可输入：

```powershell
winget search
```

使用下列指令把输出结果存入list.txt（默认在运行目录下）：

```powershell
winget search >> list.text
```

假如我们像要搜索Winget中指定的一款软件（这里以Github为例），我们可输入：

```powershell
winget search -q Github
```

输出：

```powershell
名称                               ID                                版本         匹配
---------------------------------------------------------------------------------------------------
GitNote                            zhaopengme.gitnote                3.1.0        Tag: github
GitHubReleaseNotes                 StefHeyenrath.GitHubReleaseNotes  1.0.7.1      Tag: github
Cacher                             PenguinLabs.Cacher                2.42.1       Tag: github
AppInstaller File Builder(Preview) Microsoft.AppInstallerFileBuilder 1.2020.221.0 Tag: GitHub
Gitify                             manosim.gitify                    4.2.1        Tag: github
Git Large File Storage             GitHub.GitLFS                     2.13.3       Tag: github
GitHub CLI                         GitHub.cli                        1.14.0       Tag: GitHub
MarkRight                          dvcrn.markright                   0.1.11       Tag: github
GitHub Desktop Beta                GitHub.GitHubDesktopBeta          2.9.1-beta1
GitHub Desktop                     GitHub.GitHubDesktop              2.9.0
classroom-assistant                GitHub.ClassroomAssistant         2.0.3
Atom                               GitHub.Atom                       1.58.0
Atom Beta                          GitHub.Atom.Beta                  1.58.0-beta0
AnimeBack                          LeGitHubDeTai.AnimeBack           8.0.5
Gridea                             getgridea.gridea                  0.9.2        Tag: github pages
```

### install

现在我们要下载软件了，我们使用install命令来安装

它的语法如下：

```powershell
winget install [[-q] <query>] [<选项>]
```

其中：

```powershell
  -q,--query        用于搜索程序包的查询

下列选项可用：
  -m,--manifest     程序包清单的路径
  --id              按 id 筛选结果
  --name            按名称筛选结果
  --moniker         按名字对象筛选结果
  -v,--version      使用指定的版本；默认为最新版本
  -s,--source       使用指定的源查找程序包
  --scope           选择安装范围(用户或计算机)
  -e,--exact        使用精确匹配查找程序包
  -i,--interactive  请求交互式安装；可能需要用户输入
  -h,--silent       请求无提示安装
  --locale          要使用的区域设置(BCP47 格式)
  -o,--log          日志位置（如果支持）
  --override        覆盖待传递的参数至安装程序
  -l,--location     要安装到的位置（如支持）
  --force           覆盖安装程序哈希检查
```

可在此找到更多帮助： https://aka.ms/winget-command-install

让我们来下载Github Desktop来试试看吧

```powershell
winget install GitHub.GitHubDesktop
```

其中，GitHub.GitHubDesktop是我们刚才通过Search命令获取到的ID

如果要指定安装的位置，则可以输入：

```powershell
winget install GitHub.GitHubDesktop -l --E:\Programs Files
```

### list

当然我们可以通过list命令来看看我们安装的软件（包括控制面板里的全部软件）

它的语法如下：

```powershell
winget list [[-q] <query>] [<选项>]
```

其中：

```powershell
以下参数可用：
  -q,--query   用于搜索程序包的查询

下列选项可用：
  --id         按 id 筛选结果
  --name       按名称筛选结果
  --moniker    按名字对象筛选结果
  -s,--source  使用指定的源查找程序包
  --tag        按标签筛选
  --command    按命令筛选结果
  -n,--count   显示不超过指定数量的结果
  -e,--exact   使用精确匹配查找程序包
```

可在此找到更多帮助： https://aka.ms/winget-command-list

当然我们可以搜索我们安装的软件

```powershell
winget list -q "github desktop"
```

### upgrade

我们可以使用upgrade命令来升级我们的软件（仅在search列表中的软件有效，您也可以通过list列表看看您的软件支不支持）

（它的语法和上面差不多，但是多了一个： --all（如果可用，将所有已安装的程序包更新为最新版本））

```powershell
winget upgrade "BandicamCompany.Bandicam"
```

### uninstall

同样地，我们还可以卸载软件

（它的语法和上面差不多）

```powershell
winget uninstall "Github desktop"
```

## 批量安装软件

写个bat即可（建议以管理员模式运行bat）

```powershell
winget install "Youdao.YoudaoNote"
winget install "Youdao.YoudaoDict"
winget install "baidu.baidunetdisk"
```

