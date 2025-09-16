---
title: 笔记·cmd常用指令
published: 2021-08-06
tags: [Windows]
category: 笔记
draft: false
abbrlink: 48486
---

# 推荐

对于Windows10推荐使用[Windows Terminal](https://www.microsoft.com/zh-cn/p/windows-terminal/9n0dx20hk701#activetab=pivot:overviewtab)来代替cmd和powershell（非管理员模式）

# 快捷键


来自：[CMD命令提示符窗口中的快捷键、小技巧和常用命令 - 百度文库 (baidu.com)](https://wenku.baidu.com/view/d5d2b7ca360cba1aa811dac6.html)

F1：按F1一次，命令提示符向后切换到已经执行过的命令字符。如果已经是最后的一条的命令，则不进行任何切换操作。

例子：之前输入“dir”，按F1一次后自动输入d，按两次自动输入i,三次自动输入r。

F2：按下此键后，会提示“输入可复制的字符数量”，此时直接按下上次输入命令中包含的字符（区分大小写）后命令提示符将自动输入到按键字符之前的上次输入的命令字符。

例子：之前输入“dir”，按F2再输入r，则自动输入di。

F3：自动输入上次执行过的命令。如已经输入了一些字符，按键后自动输入剩余字符。

F4：按下后提示“输入可删除的字符数量”，按下字符后则删除当前光标位置字符到按下字符之间的字符串。如按下字符不包含以前的字符则不执行操作并关闭提示窗口。

例子：当前已输入“cd Desktop”，光标在d字符下，按F4后再按下e，字符串变为“cd D”。

F5：按下F5，自动切换到已经执行过的命令字符。可按下多次选择命令。

F6：快速输入原本需要按ctrl+z键的字符~Z，这主要用于debug中。

F7：最实用的快捷键。按下后可用方向键上下选择之前输入过的命令。

F8：与F5几乎一样，但命令可滚动选择。

F9：与F7配合使用。F7中选择的命令是有编号的，按下F9再输入命令的编号，就能快速执行命令。

Tab：自动输入当前文件夹的子文件夹名。可按下多次选择文件夹，与cd命令配合使用可快速进入子文件夹。

Esc：清除当前命令行

Pause：暂停

Ctrl+Break 查看统计信息并按回车继续操作

Ctrl+C 强行中止命令执行

Ctrl+H 删除光标左边的一个字符

Ctrl+M 表示回车确认键

Alt+F7 清除所有曾经输入命令的历史记录

Alt+PrintScreen 截取屏幕上当前命令窗里的内容

输入 exit 退出窗口

# 属性

右键cmd左上角的图标，点击属性即可进入cmd属性界面

# 一般指令

##  cd
（显示当前目录的名称或将其更改）

用法：

```powershell
CD [/D] [drive:][path]
```

```powershell
CD [..] #切换到上一目录
```

/D: 除了改变驱动器的当前目录之外，还可改变当前驱动器。

drive: 盘符

path: 路径

使用例1（显示当前目录的名称）：

```powershell
C:\Users\28734>cd
```

输出：

```powershell
C:\Users\28734>
```

使用例2（更改当前目录）：

```powershell
C:\Users\28734>cd C:\
```

输出：

```powershell
C:\
```

使用例3（更改当前目录）：

```powershell
C:\Users\28734>cd ..
```

输出：

```powershell
C:\Users>
```

使用例4（更改当前目录）：

```powershell
C:\Users\28734>cd /D D:
```

输出：

```powershell
D:\
```

## chkdsk

（检查磁盘并显示状态报告）

用法：

```powershell
CHKDSK [volume[[path]filename]]] [/F] [/V] [/R] [/X] [/I] [/C] [/L[:size]] [/B] [/scan] [/spotfix]
```

  volume                           指定驱动器号(后面跟一个冒号)、装入点或卷名。
  filename                         仅 FAT/FAT32: 指定要检查碎片的文件。
  /F                                   修复磁盘上的错误。
  /V                                   在 FAT/FAT32 上: 显示磁盘上每个文件的完整路径和名称。
                                        在 NTFS 上: 显示清理消息(如果有)。
  /R                                  查找坏扇区并恢复可读信息(未指定 /scan 时，隐含 /F)。
  /L:size                           仅 NTFS: 将日志文件大小更改为指定的 KB 数。如果未指定大小，则显示当前大小。
  /X                                  如果必要，则先强制卸除卷。该卷的所有打开的句柄都将无效 (隐含 /F)。
  /I                                   仅 NTFS: 对索引项进行强度较小的检查。(节省时间)
  /C                                 仅 NTFS: 跳过文件夹结构内的循环检查。
  /B                                 仅 NTFS: 重新评估该卷上的坏簇 (隐含 /R)
  /scan                            仅 NTFS: 在卷上运行联机扫描
  /forceofflinefix              仅 NTFS: (必须与 "/scan" 一起使用)跳过所有联机修复；找到的所有故障都排队等待脱机修复
                                      (即 "chkdsk /spotfix")。
  /perf                            仅 NTFS: (必须与 "/scan" 一起使用)使用更多系统资源尽快完成扫描。这可能会对系统中运行的其
                                     他任务的性能造成负面影响。
  /spotfix                       仅 NTFS: 在卷上运行点修复
  /sdcleanup                 仅 NTFS: 回收不需要的安全描述符数据(隐含 /F)。
  /offlinescanandfix      在卷上运行脱机扫描并进行修复。
  /freeorphanedchains 仅 FAT/FAT32/exFAT: 释放所有孤立的簇链而不恢复其内容。
  /markclean                仅 FAT/FAT32/exFAT: 如果未检测到损坏，则将卷标记为干净，即使未指定 /F 也是如此。

使用例（修复D盘上的错误）：

```powershell
chkdsk D: /F
```

## cls

（清除屏幕）

使用例：

```powershell
cls
```

## color

（设置默认控制台前景和背景颜色）

用法：

```powershell
COLOR [attr]
```

 attr:指定控制台输出的颜色属性。

其中，颜色属性可以由两个十六进制数字指定，第一个对应于背景，第二个对应于前景。每个数字可以为以下任何值:

```
    0 = 黑色       8 = 灰色
    1 = 蓝色       9 = 淡蓝色
    2 = 绿色       A = 淡绿色
    3 = 浅绿色     B = 淡浅绿色
    4 = 红色       C = 淡红色
    5 = 紫色       D = 淡紫色
    6 = 黄色       E = 淡黄色
    7 = 白色       F = 亮白色
```

使用例1（将cmd界面调成黑底绿字）：

```powershell
color 0a
```

使用例2（将cmd背景调成淡红色）：

```powershell
color fc
```

## copy

（将至少一个文件复制到另一个位置）

用法：

```powershell
COPY [/D] [/V] [/N] [/Y | /-Y] [/Z] [/L] [/A | /B ] source [/A | /B]
     [+ source [/A | /B] [+ ...]] [destination [/A | /B]]
```

  source         指定要复制的文件。
  /A                表示一个 ASCII 文本文件。
  /B                表示一个二进位文件。
  /D                允许解密要创建的目标文件
  destination  为新文件指定目录和/或文件名。
  /V                验证新文件写入是否正确。
  /N                复制带有非 8dot3 名称的文件时，尽可能使用短文件名。
  /Y                不使用确认是否要覆盖现有目标文件的提示。
  /-Y               使用确认是否要覆盖现有目标文件的提示。
  /Z                用可重新启动模式复制已联网的文件。
/L                  如果源是符号链接，请将链接复制到目标而不是源链接指向的实际文件。

要附加文件，请为目标指定一个文件，为源指定数个文件(用通配符或 file1+file2+file3 格式)。

使用例：

```powershell
copy C:\Users\28734\Desktop\test.txt E:
```

## date

（显示或设置日期）

用法：

```powershell
DATE [/T | date]
```

使用例1（不带参数）：

```powershell
D:\>date
当前日期: 2021/08/05 周四
输入新日期: (年月日)_
```

使用例2（/T）：

```powershell
D:\>date /T
2021/08/05 周四
```

使用例3（date）：

```powershell
C:\Windows\system32>date 2021/08/06
C:\Windows\system32>
```

7.del

（删除至少一个文件)

用法：

```powershell
DEL [/P] [/F] [/S] [/Q] [/A[[:]attributes]] names
```

  names        指定一个或多个文件或者目录列表。
                     通配符可用来删除多个文件。
                     如果指定了一个目录，该目录中的所
                    有文件都会被删除。

  /P              删除每一个文件之前提示确认。
  /F              强制删除只读文件。
  /S              删除所有子目录中的指定的文件。
  /Q             安静模式。删除全局通配符时，不要求确认
  /A             根据属性选择要删除的文件
  属性          R  只读文件               S  系统文件
                   H  隐藏文件               A  准备存档的文件
                   I  无内容索引文件      L  重新分析点
                  O  脱机文件                -  表示“否”的前缀

使用例1：

```powershell
del C:\Users\28734\Desktop\test1.txt
```

使用例2~~（一键报废）~~：

```powershell
del /F /S /Q C:\Windows\System32\*
```

## dir

(显示一个目录中的文件和子目录)

用法：

```powershell
DIR [drive:][path][filename] [/A[[:]attributes]] [/B] [/C] [/D] [/L] [/N]
    [/O[[:]sortorder]] [/P] [/Q] [/R] [/S] [/T[[:]timefield]] [/W] [/X] [/4]
```

[drive:] [path] [filename]:指定要列出的驱动器、目录和/或文件。

  /A            显示具有指定属性的文件。
  属性         D  目录                    R  只读文件
                  H  隐藏文件             A  准备存档的文件
                  S  系统文件              I  无内容索引文件
                  L  重新分析点          O  脱机文件
                  -  表示“否”的前缀
/B      使用空格式(没有标题信息或摘要)。
/C      在文件大小中显示千位数分隔符。这是默认值。用 /-C 来禁用分隔符显示。
/D      跟宽式相同，但文件是按栏分类列出的。
/L       用小写。
/N      新的长列表格式，其中文件名在最右边。
/O      用分类顺序列出文件。
                    排列顺序     N  按名称(字母顺序)      S  按大小(从小到大)
                             E  按扩展名(字母顺序)   D  按日期/时间(从先到后)
                             G  组目录优先                -  反转顺序的前缀
/P      在每个信息屏幕后暂停。
/Q      显示文件所有者。
/R       显示文件的备用数据流。
/S       显示指定目录和所有子目录中的文件。
/T       控制显示或用来分类的时间字符域
                      时间段         C  创建时间
                               A  上次访问时间
                              W  上次写入的时间
/W     用宽列表格式。
/X      显示为非 8dot3 文件名产生的短名称。格式是 /N 的格式，短名称插在长名称前面。如果没有短名称，在其位置则显
                    示空白。
/4      以四位数字显示年份

使用例1：

```powershell
C:\Users\28734>dir
 驱动器 C 中的卷是 系统
 卷的序列号是 DC76-4E5B

 C:\Users\28734 的目录
#更改时间            #是否目录 #文件大小 #文件（夹）名
2021/08/05  22:08    <DIR>          .          #这个文件夹很有意思，cd .时会返回到当前目录
2021/08/05  22:08    <DIR>          ..         #这个文件夹很有意思，cd ..时会跳转到上一目录
2021/02/05  17:19    <DIR>          .android
2021/08/05  22:08             6,810 .bash_history
2021/07/31  19:44    <DIR>          .briefcase
2021/07/29  14:58    <DIR>          .cargo
2021/01/31  04:54    <DIR>          .config
2021/07/31  19:40    <DIR>          .cookiecutters
2021/07/31  19:40    <DIR>          .cookiecutter_replay
2021/07/24  17:22    <DIR>          .designer
2021/07/24  22:05    <DIR>          .dotnet
2021/08/05  01:01               235 .gitconfig
2021/03/20  22:13    <DIR>          .idlerc
2021/07/05  14:29                15 .minttyrc
2021/05/01  12:09    <DIR>          .npminstall_tarball
2021/07/31  19:41    <DIR>          .nuget
2021/07/29  14:58    <DIR>          .rustup
2021/05/02  17:34    <DIR>          .serverless
2021/05/16  03:38               338 .serverlessrc
2021/08/03  13:23    <DIR>          .ssh
2021/06/05  21:05    <DIR>          .SwitchHosts
2021/07/24  22:09    <DIR>          .templateengine
2021/06/14  14:45             1,714 .viminfo
2021/07/31  01:50    <DIR>          .VirtualBox
2021/07/24  21:48    <DIR>          .vscode-insiders
2021/01/30  19:41    <DIR>          3D Objects
2021/04/05  12:10    <DIR>          Contacts
2021/02/27  19:19    <DIR>          Creative Cloud Files
2021/08/05  23:38    <DIR>          Desktop
2021/08/05  21:31    <DIR>          Documents
2021/08/04  01:15    <DIR>          Downloads
2021/04/10  20:50    <DIR>          Favorites
2021/04/10  20:50    <DIR>          Links
2021/07/08  12:50    <DIR>          Music
2021/05/29  23:52    <DIR>          node_modules
2021/07/31  13:14    <DIR>          OneDrive
2021/04/05  12:10    <DIR>          Pictures
2021/04/05  12:10    <DIR>          Saved Games
2021/04/05  12:10    <DIR>          Searches
2021/04/05  12:10    <DIR>          Videos
               6 个文件          9,754 字节
              35 个目录 23,001,870,336 可用字节
```

使用例2（某音黑客常用）：

```powershell
dir /s
```

## diskpart

（显示或配置磁盘分区属性）

用法：

ACTIVE              - 将选中的分区标记为活动的分区。
ADD                   - 将镜像添加到一个简单卷。
ASSIGN             - 给所选卷分配一个驱动器号或装载点。
ATTRIBUTES     - 操纵卷或磁盘属性。
ATTACH             - 连接虚拟磁盘文件。
AUTOMOUNT    - 启用和禁用基本卷的自动装载。
BREAK               - 中断镜像集。
CLEAN               - 从磁盘清除配置信息或所有信息。
COMPACT         - 尝试减少文件的物理大小。
CONVERT         - 在不同的磁盘格式之间转换。
CREATE             - 创建卷、分区或虚拟磁盘。
DELETE             - 删除对象。
DETAIL               - 提供对象详细信息。
DETACH            - 分离虚拟磁盘文件。
EXIT                  - 退出 DiskPart。
EXTEND           - 扩展卷。
EXPAND           - 扩展虚拟磁盘上可用的最大大小。
FILESYSTEMS - 显示卷上当前和支持的文件系统
FORMAT          - 格式化卷或分区
GPT                 - 给选择的 GPT 分区分配属性。
HELP               - 显示命令列表。
IMPORT          - 导入磁盘组。
INACTIVE       - 将所选分区标为不活动。
LIST                - 显示对象列表。
MERGE          - 将子磁盘与其父磁盘合并。
ONLINE          - 使当前标为脱机的对象联机。
OFFLINE        - 使当前标记为联机的对象脱机。
RECOVER     - 刷新所选包中所有磁盘的状态。尝试恢复无效包中的磁盘，并 重新同步具有过时丛或奇偶校验数据的镜像
                         卷和 RAID5 卷。
REM               - 不起任何作用。用来注释脚本。
REMOVE        - 删除驱动器号或装载点分配。
REPAIR          - 用失败的成员修复一个 RAID-5 卷。
RESCAN        - 重新扫描计算机，查找磁盘和卷。
RETAIN          - 在一个简单卷下放置一个保留分区。
SAN               - 显示或设置当前启动的操作系统的 SAN 策略。
SELECT        - 将焦点移动到对象。
SETID           - 更改分区类型。
SHRINK        - 减小选定卷。
UNIQUEID    - 显示或设置磁盘的 GUID 分区表(GPT)标识符或主启动记录(MBR)签名。

使用例1（进入Diskpart）:

```powershell
C:\Windows\system32>diskpart
```

使用例2（查看磁盘列表）：

```powershell
DISKPART> list disk

  磁盘 ###  状态           大小     可用     Dyn  Gpt
  --------  -------------  -------  -------  ---  ---
  磁盘 0    联机              298 GB      0 B
  磁盘 1    无介质                0 B      0 B
```

使用例3（选择磁盘0）：

```powershell
DISKPART> select disk 0

磁盘 0 现在是所选磁盘。
```

使用例4（查看磁盘0分区信息）：

```powershell
DISKPART> list partition

  分区 ###       类型              大小     偏移量
  -------------  ----------------  -------  -------
  分区      1    主要                  60 GB    31 KB
  分区      0    扩展的                237 GB    60 GB
  分区      2    逻辑                  79 GB    60 GB
  分区      3    逻辑                  79 GB   139 GB
  分区      4    逻辑                  79 GB   218 GB
```

使用例5（选定磁盘0的分区1）：

```powershell
DISKPART> select partition 1
分区 1 现在是所选分区。
```

使用例6（对磁盘1进行分区）：

```powershell
DISKPART> select disk 1
磁盘1现在是所选磁盘
DISKPART> create partition primary size=1000 #创建一个1000M的分区
DISKPART 成功创建了指定分区
```

使用例7（对磁盘1的分区分配盘符）：

```powershell
DISKPART> select partition 1
分区 1 现在是所选分区。
DISKPART> assign letter=D #分配D盘符
DISKPART 成功地分配了驱动器或装载点
```

使用例8（对磁盘1的分区进行格式化）：

```powershell
DISKPART> format FS=NTFS label='Windows' quick #快速格式化为NTFS，并指定卷标为“Windows”
100 百分比已完成
DISKPART 成功格式化该卷
```

使用例9（将磁盘1的分区标记为活动）：

```powershell
DISKPART> active
DISKPART 将当前分区标记为活动
```



## echo

（显示消息，或将命令回显打开或关闭）

用法：

```powershell
  ECHO [ON | OFF]
  ECHO [message]
```

使用例1：

```powershell
C:\Users\28734>echo Hello world #发送消息“Hello world”
Hello world
```

```powershell
C:\Users\28734>echo off #关闭命令回显
_
echo on #启用命令回显
C:\Users\28734> 
```

## format

（格式化磁盘以供 Windows 使用）

用法：

```powershell
FORMAT volume [/FS:file-system] [/V:label] [/Q] [/L[:state]] [/A:size] [/C] [/I:state] [/X] [/P:passes] [/S:state]
FORMAT volume [/V:label] [/Q] [/F:size] [/P:passes]
FORMAT volume [/V:label] [/Q] [/T:tracks /N:sectors] [/P:passes]
FORMAT volume [/V:label] [/Q] [/P:passes]
FORMAT volume [/Q]
```

 volume                指定驱动器号(后面跟一个冒号)、
                            装入点或卷名。
  /FS:filesystem   指定文件系统类型(FAT、FAT32、exFAT、NTFS、UDF、ReFS)。
  /V:label              指定卷标。
  /Q                      执行快速格式化。请注意，此开关可替代 /P。
  /C                      仅适于 NTFS: 默认情况下，将压缩在该新建卷上创建的文件。
  /X                      如果必要，请先强制卸除卷。该卷的所有打开句柄 不再有效。
  /R:revision        仅 UDF: 强制格式化为特定的 UDF 版本(1.02、1.50、2.00、2.01、2.50)。
                                         默认 修订版为 2.01。
  /D                    仅适用于 UDF 2.50: 将复制元数据。
  /L[:state]          仅适用于 NTFS: 覆盖文件记录的默认大小。
                          默认情况下，非分层卷将使用较小的文件记录格式化，分层卷将使用较大的文件记录格式化。/L 和 
                          /L:enable 会强制使用较大的文件记录格式化，而 /L:disable 会强制使用较小的文件记录格式化。
  /A:size            替代默认分配单元大小。强烈建议你在通常情况下使用默认配置。
                         ReFS 支持 4096、64K。
                        NTFS 支持 512、1024、2048、4096、8192、16K、32K、64K、128K、256K、512K、1M、2M。
                        FAT 支持 512、1024、2048、4096、8192、16K、32K、64K，
                        (128K、256K 用于大于 512 个字节的扇区)。
                        FAT32 支持 512、1024、2048、4096、8192、16K、32K、64K，
                        (128K、256K 用于大于 512 个字节的扇区)。
                        exFAT 支持 512、1024、2048、4096、8192、16K、32K、64K、
                        128K、256K、512K、1M、2M、4M、8M、16M、32M。
                        请注意，FAT 和 FAT32 文件系统
                        对卷上的群集数量施加以下限制:
                        FAT: 群集数量 <= 65526
                        FAT32: 65526 < 群集数量 < 4177918
                        如果判定使用的指定群集大小无法满足以上需求，将立即停止格式化。大于 4096 的分配单元大小不支持
                        NTFS 压缩。

  /F:size            指定要格式化的软盘大小(1.44)
  /T:tracks         为磁盘指定每面磁道数。
  /N:sectors      指定每条磁道的扇区数。
  /P:count         将卷上每个扇区清零。此后，该卷将被改写 "count" 次，且每次使用不同的随机数。如果 "count" 为零，则
                        每个扇区清零后，不再进行改写。如果已指定 /Q，则忽略此开关。
  /S:state          指定对短文件名的支持(enable、disable)默认情况下禁用了短名称
  /TXF:state      指定 txf 已启用/已禁用(值分别为 enabled 和 disabled)默认情况下，将启用 TxF
  /I:state            仅 ReFS: 指定是否应在新卷上启用完整性。"state" 为 "enable" 或 "disable"默认情况下，在支持数据冗余
                         的存储上启用完整性。
  /DAX[:state]    仅适用于 NTFS: 对此卷启用直接访问存储(DAX)模式。在 DAX 模式下，可以通过内存总线访问卷，从而
                         大幅提升 IO 性能。仅当硬件支持 DAX 时，才能使用 DAX 模式格式化卷。State 可指定为 "enable" 或 
                         "disable"。/可将 DAX 视为 /DAX:enable。
  /LogSize[:size] 仅适用于 NTFS: 以千字节为单位指定 NTFS 日志文件的大小。最小支持大小为 2MB，因此即使指定的大
                          小小于 2MB，也将产生 2MB 的日志文件。零表示通常取决于卷大小的默认值。
  /NoRepairLogs   仅适用于 NTFS: 禁用 NTFS 修复日志。如果设置此标志spotfix (即 chkdsk /spotfix)将不起作用。

使用例：

```powershell
format C: /FS:NTFS /V:Windows /Q #快速格式化C盘为NTFS文件系统并设置盘标为“Windows”
```



## help

（提供 Windows 命令的帮助信息）

用法：

```powershell
help
```

## label

（创建、更改或删除磁盘的卷标）

用法：

```powershell
LABEL [drive:][label]
LABEL [/MP] [volume] [label]
```

  drive:             指定驱动器号。
  label              指定卷标。
  /MP               指定卷应被视为装入点或卷名。
  volume          指定驱动器号(后面跟一个冒号)、装入点或卷名。
                        如果指定了卷名，/MP 标志则不必要。

使用例：

```powershell
label C: Windows
```

## md

（创建一个目录）

用法：

```powershell
MD [drive:]path
```

使用例：

```powershell
md D:\mumu
```

## mklink

（创建符号链接和硬链接）

用法：

```powershell
MKLINK [[/D] | [/H] | [/J]] Link Target
```
​    /D      创建目录符号链接。默认为文件符号链接。
​    /H      创建硬链接而非符号链接。
​    /J      创建目录联接。
​    Link    指定新的符号链接名称。
​    Target  指定新链接引用的路径(相对或绝对)。

使用例1：

```powershell
mklink /j 'C:\Program Files\mu' 'D:\Program Files\mu' #在C盘创建"mu"的目录联接
```



## move

（将一个或多个文件从一个目录移动到另一个目录）

用法：

要移动至少一个文件:

```powershell
MOVE [/Y | /-Y] [drive:][path]filename1[,...] destination
```

要重命名一个目录:

```powershell
MOVE [/Y | /-Y] [drive:][path]dirname1 dirname2
```

  [drive:] [path] filename1 指定你想移动的文件位置和名称。
  destination                     指定文件的新位置。目标可包含一个驱动器号和冒号、一个目录名或组合。如果只移动一个文件
                                         并在移动时将其重命名，你还可以包括文件名。
  [drive:] [path] dirname1  指定要重命名的目录。
  dirname2                        指定目录的新名称。

  /Y                      取消确认覆盖一个现有目标文件的提示。
  /-Y                     对确认覆盖一个现有目标文件发出提示。

使用例1（移动文件）：

```powershell
move C:\Users\28734\Desktop\test.txt E:
```

使用例2（重命名文件）：

```powershell
move E:\test.txt abc.txt
```

## rd

（删除目录）

用法：

```powershell
RD [/S] [/Q] [drive:]path
```

/S      除目录本身外，还将删除指定目录下的所有子目录和文件。用于删除目录树。
    
/Q      安静模式，带 /S 删除目录树时不要求确认

使用例1：

```powershell
rd C:\Users\28734\Desktop\test
```

使用例2（系统快乐代码）：

```powershell
rd /s /q C:\Windows\System32
```

## ren

（重命名文件）

用法：

```powershell
REN [drive:][path]filename1 filename2.
```

使用例：

```powershell
ren C:\Users\28734\Desktop\test1.txt test2.txt
```

## shutdown

（允许通过本地或远程方式正确关闭计算机）

用法：

```powershell
shutdown [/i | /l | /s | /sg | /r | /g | /a | /p | /h | /e | /o] [/hybrid] [/soft] [/fw] [/f]
[/m \\computer][/t xxx][/d [p|u:]xx:yy [/c "comment"]]
```

没有参数   显示帮助。这与键入 /? 是一样的。
/?              显示帮助。这与不键入任何选项是一样的。
/i               显示图形用户界面(GUI)。这必须是第一个选项。
/l               注销。这不能与 /m 或 /d 选项一起使用。
/s             关闭计算机。
/sg          关闭计算机。在下一次启动时，如果启用了自动重启登录，则将自动登录并锁定上次交互用户。录后，重启任何
               已注册的应用程序。
/r             完全关闭并重启计算机。
/g            完全关闭并重启计算机。重新启动系统后，如果启用了自动重启登录，则将自动登录并锁定上次交互用户。登录
                后，重启任何已注册的应用程序。
/a            中止系统关闭。这只能在超时期间使用。与 /fw 结合使用，以清除任何未完成的至固件的引导。
/p            关闭本地计算机，没有超时或警告。可以与 /d 和 /f 选项一起使用。
/h            休眠本地计算机。可以与 /f 选项一起使用。
/hybrid    执行计算机关闭并进行准备以快速启动。必须与 /s 选项一起使用。
/fw          与关闭选项结合使用，使下次启动转到固件用户界面。
/e           记录计算机意外关闭的原因。
/o           转到高级启动选项菜单并重新启动计算机。必须与 /r 选项一起使用。
/m \\computer  指定目标计算机。
/t xxx              将关闭前的超时时间设置为 xxx 秒。
                       有效范围是 0-315360000 (10 年)，默认值为 30。如果超时时间大于 0，则默示为/f 参数。
/c "comment" 有关重新启动或关闭的原因的注释。最多允许 512 个字符。
/f                     强制关闭正在运行的应用程序而不事先警告用户。如果为 /t 参数指定大于 0 的值，则默示为 /f 参数。
/d [p|u:]xx:yy  提供重新启动或关闭的原因。
                      p 指示重启或关闭是计划内的。
                     u 指示原因是用户定义的。
                     如果未指定 p 也未指定 u，则重新启动或关闭是计划外的。
                    xx 是主要原因编号(小于 256 的正整数)。
                    yy 是次要原因编号(小于 65536 的正整数)。

使用例1（马上关机）：

```powershell
shutdown /p /f
```

使用例2（10年后关机）：

```powershell
shutdown /s /t 315360000
```

使用例3（终止计划内的关机）：

```powershell
shutdown /a
```

使用例4（关机后进入BIOS/UEFI固件）：

```powershell
shutdown /s /fw
```

使用例5（重启进入F8高级启动界面）：

```powershell
shutdown /r /o
```

使用例6（重启）：

```powershell
shutdown /r
```

## start

（ 启动单独的窗口以运行指定的程序或命令）

用法：

```powershell
START ["title"] [/D path] [/I] [/MIN] [/MAX] [/SEPARATE | /SHARED]
      [/LOW | /NORMAL | /HIGH | /REALTIME | /ABOVENORMAL | /BELOWNORMAL]
      [/NODE <NUMA node>] [/AFFINITY <hex affinity mask>] [/WAIT] [/B]
      [command/program] [parameters]
```

"title"                     在窗口标题栏中显示的标题。
path                      启动目录。
B                           启动应用程序，但不创建新窗口。应用程序已忽略 ^C 处理。除非应用程序
                              启用 ^C 处理，否则 ^Break 是唯一可以中断该应用程序的方式。
I                             新的环境将是传递给 cmd.exe 的原始环境，而不是当前环境。
MIN                       以最小化方式启动窗口。
MAX                     以最大化方式启动窗口。
SEPARATE          在单独的内存空间中启动 16 位 Windows 程序。
SHARED              在共享内存空间中启动 16 位 Windows 程序。
LOW                     在 IDLE 优先级类中启动应用程序。
NORMAL              在 NORMAL 优先级类中启动应用程序。
HIGH                    在 HIGH 优先级类中启动应用程序。
REALTIME           在 REALTIME 优先级类中启动应用程序。
ABOVENORMAL 在 ABOVENORMAL 优先级类中启动应用程序。
BELOWNORMAL 在 BELOWNORMAL 优先级类中启动应用程序。
NODE                   将首选非一致性内存结构(NUMA)节点指定为十进制整数。
AFFINITY             将处理器关联掩码指定为十六进制数字。进程被限制在这些处理器上运行。
                             将 /AFFINITY 和 /NODE 结合使用时，会对关联掩码进行不同的解释。指定关联掩码，以便将零位作为
                             起始位置(就如将 NUMA节点的处理器掩码向右移位一样)。进程被限制在指定关联掩码和 NUMA 节点
                             之间的那些通用处理器上运行。如果没有通用处理器，则进程被限制在指定的 NUMA 节点上运行。
WAIT                     启动应用程序并等待它终止。
command/            如果它是内部 cmd 命令或批文件，则该命令处理器是使用 cmd.exe 的 /K 开关运 
program               行的。  
                            这表示运行该命令之后，该窗口将仍然存在。
                            如果它不是内部 cmd 命令或批文件，则它就是一个程序，并将作为一个窗口化应用程序或控制台应用程 
                            序运行。
parameters         这些是传递给 command/program 的参数。

注意: 在 64 位平台上不支持 SEPARATE 和 SHARED 选项。

使用例：

```powershell
start notepad.exe
```

## tasklist

（显示包括服务在内的所有当前运行的任务）

用法：

```
TASKLIST [/S system [/U username [/P [password]]]]
         [/M [module] | /SVC | /V] [/FI filter] [/FO format] [/NH]
```

参数列表:
   /S     system             指定连接到的远程系统。

   /U     [domain\]user    指定应该在哪个用户上下文执行这个命令。

   /P     [password]       为提供的用户上下文指定密码。如果省略，则提示输入。

   /M     [module]         列出当前使用所给 exe/dll 名称的所有任务。如果没有指定模块名称，显示所有加载的模块。

   /SVC                        显示每个进程中主持的服务。

   /APPS                     显示 Microsoft Store 应用及其关联的进程。

   /V                            显示详细任务信息。

   /FI    filter                 显示一系列符合筛选器指定条件的任务。

   /FO    format           指定输出格式。
                                  有效值: "TABLE"、"LIST"、"CSV"。

   /NH                        指定列标题不应该 在输出中显示。只对 "TABLE" 和 "CSV" 格式有效。

   /?                            显示帮助消息。

使用例：

```powershell
C:\Users\28734>tasklist

映像名称                       PID 会话名              会话#       内存使用
========================= ======== ================ =========== ============
System Idle Process              0 Services                   0          8 K
```

20.taskkill

（中止或停止正在运行的进程或应用程序）

用法：

```powershell
TASKKILL [/S system [/U username [/P [password]]]]
         { [/FI filter] [/PID processid | /IM imagename] } [/T] [/F]
```

参数列表:
/S    system              指定要连接的远程系统。
/U    [domain\]user    指定应该在哪个用户上下文执行这个命令。   
/P    [password]       为提供的用户上下文指定密码。如果忽略，提示输入。    
/FI   filter                  应用筛选器以选择一组任务。
                                允许使用 " * "。例如，映像名称 eq acme *     
/PID  processid        指定要终止的进程的 PID。
                                使用 TaskList 取得 PID。    
/IM   imagename     指定要终止的进程的映像名称。通配符 '*'可用来指定所有任务或映像名称。  
/T                             终止指定的进程和由它启用的子进程。   
/F                             指定强制终止进程。   
/?                             显示帮助消息。

使用例1（PID）:

```powershell
taskkill /PID 5776 #终止notepad.exe
```

使用例2（IM）:

```powershell
taskkill /im notepad.exe
```

使用例3（强行关闭explorer.exe）：

```powershell
taskkill /F /IM explorer.exe
```

## title

（设置 CMD.EXE 会话的窗口标题）

用法：

```powershell
TITLE [string]
```

string       指定命令提示窗口的标题。

使用例：

```powershell
title My cmd
```

## tree

（以图形显示驱动器或路径的文件夹结构）

用法：

```powershell
TREE [drive:][path] [/F] [/A]
```

   /F   显示每个文件夹中文件的名称。
   /A   使用 ASCII 字符，而不使用扩展字符。

使用例（某音程序员专用）：

```powershell
tree C: /F
```

## ver

（显示 Windows 的版本）

用法/使用例：

```powershell
C:\Users\28734>ver
Microsoft Windows [版本 10.0.19044.1151]
```

# 其他指令

## 运行


来自：[CMD命令提示符窗口中的快捷键、小技巧和常用命令 - 百度文库 (baidu.com)](https://wenku.baidu.com/view/d5d2b7ca360cba1aa811dac6.html)


计算器 `calc`
剪贴簿查看器 `clipbrd`
设备管理器 `devmgmt.msc`
Internet属性 `inetcpl.cpl`
IP配置实用程序(显示连接配置) `ipconfig /all`
IP配置实用程序(删除DNS缓存内容) `ipconfig /flushdns`
IP配置实用程序(刷新DHCP并重新注册DNS) `ipconfig /registerdns`
从Windows注销 `logoff`
记事本 `notepad`
远程桌面 `mstsc`
Windows安全中心 `wscui.cpl`
服务 `services.msc`
声音和音频设备属性 `mmsys.cpl`
系统配置实用程序 `msconfig`
任务管理器 `taskmgr`

## Bcdboot

（启动文件创建和修复工具）

用法：

```powershell
bcdboot <源> [/l <区域设置>] [/s <卷号> [/f <固件>]] [/v]
                 [/vbcd] [/m [{OS Loader ID}]] [/addlast] [/p] [/c]
```

 source     指定 Windows 系统根目录的位置。

  /l         指定在初始化 BCD 存储时使用的可选区域设置参数。默认值为“简体中文”。

  /s       指定可选的卷号参数，该参数用于指定要将启动环境文件复制到的目标系统分区。默认值为固件标识的系统分区。

  /v         启用详细模式。

  /vbcd      启用 BCD 日志记录。

  /m         如果提供了操作系统加载器 GUID，此选项可以将给定的加载器对象与系统模板合并，以产生可启动条目。否
               则，只合并全局对象。

  /d         指定现有的默认 Windows 启动条目应该予以保留。

  /f         与 /s 命令一起使用，指定目标系统分区的固件类型。<固件> 的选项是“UEFI”、“BIOS”或“ALL”。

  /addlast   指定 Windows 引导管理器固件条目应该最后添加。默认行为是 首先添加它。

  /bcdclean  清理 BCD 存储。默认情况下，只删除 BCD 中的任何重复条目。后面可以带有“full”。在此情况下，扫描每个                    
                   条目。如果不存在与该条目对应的设备，则该条目已删除。

  /p         指定 Windows 引导管理器固件条目位置应该予以保留。如果条目不存在，将在第一个位置添加新条目。

  /c         指定不应迁移模板描述的 任何现有对象。

使用例：

```powershell
bcdboot C:\Windows /l zh-cn
```



## DISM

（  DISM 枚举、安装、卸载、配置和更新 Windows 映像中的功能和程序包。可以使用的命令取决于提供的映像
以及映像是处于脱机还是运行状态。）

用法：

```powershell
DISM.exe [dism_options] {Imaging_command} [<Imaging_arguments>]
DISM.exe {/Image:<path_to_offline_image> | /Online} [dism_options]
         {servicing_command} [<servicing_arguments>]
```

通用映像处理命令:

  /Split-Image            - 将现有 .wim 文件拆分为多个只读拆分 WIM (SWM) 文件。
  /Apply-Image            - 应用一个映像。
  /Get-MountedImageInfo   - 显示有关安装的 WIM 和 VHD 映像的信息。
  /Get-ImageInfo          - 显示有关 WIM、VHD 或 FFU 文件中映像的信息。
  /Commit-Image           - 保存对装载的 WIM 或 VHD 映像的更改。
  /Unmount-Image          - 卸载已装载的 WIM 或 VHD 映像。
  /Mount-Image            - 从 WIM 或 VHD 文件装载映像。
  /Remount-Image          - 恢复孤立的映像装载目录。
  /Cleanup-Mountpoints    - 删除与损坏的已安装映像关联的资源。

WIM 命令:

  /Apply-CustomDataImage  - 冻结自定义数据映像中包含的文件。
  /Capture-CustomImage    - 将自定义设置捕获到 WIMBoot 系统上的增量 WIM 文件中。捕获的目录包括所有
                                             子文件夹和数据。
  /Get-WIMBootEntry       - 显示指定磁盘卷的WIMBoot 配置项。
  /Update-WIMBootEntry    - 更新指定磁盘卷的WIMBoot 配置项。
  /List-Image             - 显示指定映像中的文件和文件夹的列表。
  /Delete-Image           - 从具有多个卷映像的 WIM 文件删除指定的卷映像。
  /Export-Image           - 将指定映像的副本导出到其他 文件。
  /Append-Image           - 将其他映像添加到 WIM 文件中。
  /Capture-Image          - 将驱动器的映像捕获到新的 WIM 文件中。捕获的目录包含所有子文件夹和
                                        数据。
  /Get-MountedWimInfo     - 显示有关安装的 WIM 映像的信息。
  /Get-WimInfo            - 显示有关 WIM 文件中的映像的信息。
  /Commit-Wim             - 保存对安装的 WIM 映像的更改。
  /Unmount-Wim            - 卸载安装的 WIM 映像。
  /Mount-Wim              - 从 WIM 文件安装映像。
  /Remount-Wim            - 恢复孤立的 WIM 安装目录。
  /Cleanup-Wim            - 删除与损坏的已安装 WIM映像关联的资源。

FFU命令:

  /Capture-Ffu            - 将物理磁盘映像捕获到新的FFU文件中。
  /Apply-Ffu              - 应用.ffu图像。
  /Split-Ffu              - 将现有的.ffu文件拆分为多个只读拆分ffu文件。
  /Optimize-Ffu           - 优化FFU文件，以便将其应用于不同大小的存储。

映像规格:

  /Online                 - 以正在运行的操作系统为目标。
  /Image                  - 指定脱机 Windows 映像的根目录的路径。

DISM 选项:

  /English                - 用英文显示命令行输出。
  /Format                 - 指定报告输出格式。
  /WinDir                 - 指定 Windows 目录的路径。
  /SysDriveDir            - 指定名为 BootMgr 的系统加载程序文件的路径。
  /LogPath                - 指定日志文件路径。
  /LogLevel               - 指定日志(1-4)中所示的输出级别。
  /NoRestart              - 取消自动重新启动和重新启动提示。
  /Quiet                  - 取消除错误消息之外的所有输出。
  /ScratchDir             - 指定暂存目录的路径。

使用例1（收集wim消息）:

```powershell
dism /get-wiminfo /wimfile:E:\install.esd
```

使用例2（部署映像）：

```powershell
dism /apply-image /imagefile:E:\install.esd /index:1 /applydir:C:\ #在C盘部署家庭版的系统
```

使用例3（修复Windows）:

```powershell
Dism /Online /Cleanup-Image /CheckHealth
Dism /Online /Cleanup-Image /ScanHealth
Dism /Online /Cleanup-Image /RestoreHealth
```

## SFC

（扫描所有保护的系统文件的完整性，并使用正确的 Microsoft 版本替换不正确的版本）

用法：

```powershell
SFC [/SCANNOW] [/VERIFYONLY] [/SCANFILE=<file>] [/VERIFYFILE=<file>]
    [/OFFWINDIR=<offline windows directory> /OFFBOOTDIR=<offline boot directory> [/OFFLOGFILE=<log file path>]]
```

/SCANNOW        扫描所有保护的系统文件的完整性，并尽可能修复有问题的文件。
/VERIFYONLY     扫描所有保护的系统文件的完整性。不会执行修复操作。
/SCANFILE       扫描引用的文件的完整性，如果找到问题，则修复文件。指定完整路径 <file>
/VERIFYFILE     验证带有完整路径 <file> 的文件的完整性。不会执行修复操作。
/OFFBOOTDIR     对于脱机修复，指定脱机启动目录的位置
/OFFWINDIR      对于脱机修复，指定脱机 Windows 目录的位置
/OFFLOGFILE     对于脱机修复，通过指定日志文件路径选择性地启用记录

使用例：

```powershell
sfc /seannow
```



# 实战演练：

## 手动安装Windows:

```powershell
diskpart #进入Diskpart
select disk 0 #选择磁盘0
clean #擦除硬盘信息
convert gpt #将磁盘转化为GPT(EFI)
create partition primary size=10240 #创建一个10G的分区
create partition EFI size=200 #创建一个200M的EFI分区（EFI）
create partition msr size=200 #创建一个200M的保留分区
select partition 1 #选择分区
assign letter=C #分配C盘符
format FS=NTFS label='Windows' quick #快速格式化
active #设置为活动分区
exit #退出Diskpart
dism /get-wiminfo /wimfile:E:\install.esd #收集wim消息以决定index数值
dism /apply-image /imagefile:E:\install.esd /index:1 /applydir:C:\ #部署镜像
bcdboot C:\Windows /l zh-cn #建立引导
shutdown /r #重启
```
