---
title: 笔记·基于Tacotron2与Vits的语音训练过程
published: 2022-10-06
description: 一次偶然的兴趣罢了
tags: [Python, 机器学习]
category: 笔记
draft: false
abbrlink: 11985
---

# 前言

最近咱看到班上的同学在搞Vits，偶然的机遇下咱也开搞了，顺便取得了科技社的内部权限，挺好的（指训练结果）

注意: 由于咱没有显卡，Torch也没检测到核显，因此我们使用Google提供的Colab进行机器学习，请准备一台可以上Colab的机器，不推荐使用手机，可能会导致代码块内容缺失。

提示: 我关于Tacotron2和Vits的知识都是从B站Up主[夏夜有轻风](https://space.bilibili.com/87688497)编写的文章中学来的，因此本文大部分内容都是从他的专栏中取得，其他是我的一些补充，您可以直接看他的文章：
[零基础炼丹秘籍 - 为自己喜爱的角色训练TTS（文字转语音）模型](https://www.bilibili.com/read/cv17826415?from=articleDetail)
[零基础炼丹 - vits版补充 ](https://www.bilibili.com/read/cv18357171?from=search&spm_id_from=333.337.0.0)

# Tacotron2

## 开始之前

tacotron2是Google在2017年发布的基于PyTorch的TTS神经网络模型。

Google官方为个人用户免费提供colab线上深度学习服务，有中文界面。

免费版colab一次只能开启一个会话，**单次最长训练时间12个小时**，而且需要一直保持界面打开，仅适合入门（像我这种没钱换电脑的也勉强能用）。单次超时断开后，大概经过24h后就会重新可用，但是能用的小时数可能会少，而且用的越频繁就会越少。如果存在断点，你可以用训练出来的模型接着上次的地方训练。

补充一点，想要恢复单次训练时间，就得减少训练次数，推荐一周一次，但是本文撰写的时候是在国庆假期中，每天用一次和每周用一次比起来还是前者赚一点。

基于该平台，我们开始零基础训练模型之旅。

再补充一点，Tacotron2的教程比较详细，但是模型生成后只能通过Colab的笔记本中生成语音模型，需要GPU，否则得自己搭建环境，而Vits的教程虽然不详细，但是生成后的模型可以通过MoeGoe生成，像博主这种Torch都识别不出来的GPU都可以生成语音，所以先学习Tacotron2可以让你理解训练过程，如果想要长久玩还是推荐使用Vits。

## 路线图

提取角色语音


获取台词文本（这两步最耗精力）


复制一份“笔记”副本并上传前面的文件


修改几个参数（很简单！）


一键开始训练


合成语音



## 第一步 提取角色语音

其实就是解包，这部分直接删除，如果想要了解某个游戏解包的过程可以搜索对应引擎的解包教程，原文的只适用Krkr或GARbro支持的游戏，故删除，有需要的可以去原文了解。

注意：提取出的语音需转换成wav格式，单声道，采样率必须为22050Hz，PCM 16bit。关于转换音频格式，opus格式文件可以直接用GARbro转换，ogg格式文件可以用ffmpeg转换，用格式工厂转换wav时需要注意调整配置：单声道与采样率22050Hz。



## 第二步 获取台词文本

获取到台词文本即可。建议如果游戏文件中有scn.xp3文件，可以解包得到ks.scn文件，用FreeMoteToolkit转成json提取文件。~~（转换后的json结构很杂，建议自己写个程序提取）~~

用notepad新建一个文件，最好为list.txt。文件内容大致如下：

wavs/0013000.wav|です
wavs/0013001.wav|です
wavs/0013002.wav|です
wavs/0013003.wav|です
wavs/0013004.wav|です
左侧是语音文件的名称，后侧是对应的文本，用英文标点'|'分隔，不需要空格。文件名前面需要带"wavs/"前缀，或者也可以放其他目录。建议用默认的wavs目录和list.txt文件名，会省去一些不必要的配置麻烦和报错。

补充：注意文件最后一行不可以为空



## 第三步 复制notebook并上传资源

根据原作者提供的notebook和up主CjangCjengh的cleane改了一份写好的中文深度学习notebook，只需要一步一步配置就可以了。

链接: https://colab.research.google.com/drive/18fbCupSaQde-FtF2Z2Na-LP5BrukjNMs?usp=sharing

打开后，先复制一份副本，在弹出的副本页面中进行接下来的操作

点击"在云端硬盘中保存一份副本"


一路点播放键，等待显示对号后，点击下一个播放键，执行下一段代码。

执行准备
然后把准备好的语音文件上传到wavs目录下，带有语音文件列表和对应台词的文件list.txt上传到filelists目录下。

上传文件
上传完后按顺序点击代码块的播放键即可。

后面很简单，只需要填写几个参数。

第一个，model_filename，模型的文件名

第二个，batch_size，和语音文件的数量有关，建议设置的比语音文件的数量稍小一些，不要设置太大，否则显卡会炸掉。这里我的样本用于演示，比较少，可以设置的更多，比如有30个语音文件就设置为20。

第三个，epochs，训练的次数，次数越多可能越精准，花的时间可能越长，可以设置成300或更多。

第四个，training_files和validation_files，训练文件和验证文件的列表，填我们刚才编写好的list.txt即可，这里两个参数都需要修改为"filelists/list.txt"

第五个，text_cleaner，选择预处理文本的cleaner，即把日语台词自动转换为罗马音的处理方式，笔记下面有几种cleaner的比较。

其他参数都不用设置。设置完后点击播放键运行。

进行一些配置
继续点击播放键运行代码，生成mel谱，检查数据集。

生成mel谱和检查数据集

## 第四步 一键开始训练！

点击播放键开始训练。如果没有问题，你会看到生成的图表。

（补充：训练过程中会生成每一步的某种图像，消耗流量较大，敬请留意）

如果不手动停止，一共会迭代epochs参数里设置的次数。

训练时间越长，效果可能越好，俗称“炼丹”。

训练到Validation loss在0.15以下可能可以收获一定效果。

如果Validation loss居高不下，可能是音频文件比较多，也可能是音频文件对应的台词有错误。

## 第五步 合成语音

生成的模型会保存在你的云端硬盘上（路径: colab/outdir/你的模型名）

有了模型，就可以导入到HifiGan和WaveGlow等合成语音了。

训练出的模型在这个目录下
可以在colab上合成（需要GPU运行时），也可以下载模型在本地合成语音。目前至少有三款合成语音的软件（实际上第二个只能用于vits），在本地导入模型即可合成语音，推荐在下面：

https://www.bilibili.com/video/BV1Tr4y1577U

https://www.bilibili.com/video/BV1WU4y1C7Nr (Vits Only)

https://www.bilibili.com/video/BV1nW4y1h75H

## 支持的语言

这是原文中没有的章节，博主这里补充一下，避免选错训练平台。

截止到2022/10/6 00:00 CjangCjengh中的Traotron2-janpanese仓库支持的Cleaner(语言)为:

English, Japanese

# Vits

由于提取数据集等部分和tacotron2部分大致相同，这里只简略介绍vits数据集制作的不同 ，以及介绍vits合成语音的大致流程。

vits笔记本地址：https://colab.research.google.com/drive/1eEwa5KmHrwZ06vM4CxkQyq6DAT_rSUMW?usp=sharing

## 第一部分  数据集制作的不同

训练vits单人模型，数据集制作与tacotron2完全相同。

训练vits多人模型，数据集中的语音列表文件略有变化，变化如下。

wavs/A/001.wav|0|です。
wavs/A/002.wav|0|です。
wavs/B/001.wav|1|ます。
wavs/B/002.wav|1|ます。
中间多了一栏，是多人模型中人物的id标号，代表这是哪个人物的语音。同一个人物用同一个id。注意台词左边不要有空格。这部分需要和speakers的填写对应。

0对应A的语音，1对应B的语音

## 第二部分 语音合成的步骤

以使用MoeTTS[3]和日语vits单人模型为例：

https://www.bilibili.com/video/BV1Tr4y1577U

1. VITS单角色模型选择下载下来的G.pth文件。

2. 在G.pth文件所在目录下需要放置config.json配置文件。

配置文件可以在笔记本后面生成（可以使用非GPU运行时）
3.  待合成的文本需要提前用cleaners转换。cleaners必须是训练模型时使用的cleaners（补充一点，其实未必，只要训练时的语言与合成时的cleaners语言对应就行了，比如说你训练的是english_cleaners, 但是直接转换会报错，这时需要更改配置文件，教程后面出）

将转换结果复制到待合成文本一栏即可

## 支持的语言

由于代码库更新的比较勤，因此支持的语言在不断增长中，你可以在[cleaners.py](https://github.com/CjangCjengh/vits/blob/main/text/cleaners.py)中查看支持的语言。

截止到2022.10.06 00:00 CjangCjengh中的Vits仓库支持的Cleaner(语言)为:

`japanese`(日文),` korean`(韩文), `chinese`(普通话), `zh_ja_mixture`(中日混合), `sanskrit`(梵语), `cjks`(4语混合+english)，`cjke`(3语混合+english)，`Thai`(泰文), `Shanghainese`(上海话)

混合语种中的支持语种可以参考名字中的缩写或直接查看[cleaners.py](https://github.com/CjangCjengh/vits/blob/main/text/cleaners.py)

## 补充

1. 其实可以把**param_enable_tb**的勾取消掉，作为一个普通人，其实也看不懂可视化
2. Vits没有Loss损耗显示（如果你能读懂tensorboard可视化的话）
3. Vits训练的时间要比Tacotron2长

## 添加english_cleaners

完成下载依赖库后，在vits/text下新建`numbers.py`，添加以下内容:

```python
""" from https://github.com/keithito/tacotron """

import inflect
import re


_inflect = inflect.engine()
_comma_number_re = re.compile(r'([0-9][0-9\,]+[0-9])')
_decimal_number_re = re.compile(r'([0-9]+\.[0-9]+)')
_pounds_re = re.compile(r'£([0-9\,]*[0-9]+)')
_dollars_re = re.compile(r'\$([0-9\.\,]*[0-9]+)')
_ordinal_re = re.compile(r'[0-9]+(st|nd|rd|th)')
_number_re = re.compile(r'[0-9]+')


def _remove_commas(m):
  return m.group(1).replace(',', '')


def _expand_decimal_point(m):
  return m.group(1).replace('.', ' point ')


def _expand_dollars(m):
  match = m.group(1)
  parts = match.split('.')
  if len(parts) > 2:
    return match + ' dollars'  # Unexpected format
  dollars = int(parts[0]) if parts[0] else 0
  cents = int(parts[1]) if len(parts) > 1 and parts[1] else 0
  if dollars and cents:
    dollar_unit = 'dollar' if dollars == 1 else 'dollars'
    cent_unit = 'cent' if cents == 1 else 'cents'
    return '%s %s, %s %s' % (dollars, dollar_unit, cents, cent_unit)
  elif dollars:
    dollar_unit = 'dollar' if dollars == 1 else 'dollars'
    return '%s %s' % (dollars, dollar_unit)
  elif cents:
    cent_unit = 'cent' if cents == 1 else 'cents'
    return '%s %s' % (cents, cent_unit)
  else:
    return 'zero dollars'


def _expand_ordinal(m):
  return _inflect.number_to_words(m.group(0))


def _expand_number(m):
  num = int(m.group(0))
  if num > 1000 and num < 3000:
    if num == 2000:
      return 'two thousand'
    elif num > 2000 and num < 2010:
      return 'two thousand ' + _inflect.number_to_words(num % 100)
    elif num % 100 == 0:
      return _inflect.number_to_words(num // 100) + ' hundred'
    else:
      return _inflect.number_to_words(num, andword='', zero='oh', group=2).replace(', ', ' ')
  else:
    return _inflect.number_to_words(num, andword='')


def normalize_numbers(text):
  text = re.sub(_comma_number_re, _remove_commas, text)
  text = re.sub(_pounds_re, r'\1 pounds', text)
  text = re.sub(_dollars_re, _expand_dollars, text)
  text = re.sub(_decimal_number_re, _expand_decimal_point, text)
  text = re.sub(_ordinal_re, _expand_ordinal, text)
  text = re.sub(_number_re, _expand_number, text)
  return text
```

在同目录下的`cleaners.py`文件末尾添加以下内容:

```python
from .numbers import normalize_numbers
def english_cleaners(text):
  '''Pipeline for English text, including number and abbreviation expansion.'''
  text = convert_to_ascii(text)
  text = lowercase(text)
  text = normalize_numbers(text)
  text = expand_abbreviations(text)
  text = collapse_whitespace(text)
  return text
```

生成配置文件后把其中的`custom_cleaners`改成支持`english_cleaners`的cleaners（直接使用`english_cleaners`会报错），可以从[vits/cleaners.py](https://github.com/CjangCjengh/vits/blob/main/text/cleaners.py)看到所有`cleaners`，支持`english_cleaners`的cleaners的如`cjks_cleaners`

cleaners其实就是一个把文本转换为罗马音的函数，有条件的可以自己写一套出来。

# 补充

1. 训练集建议在50以上，训练次数随训练集的长度增大而增大，训练集出现的不同单词总数尽量要多

2. Colab在训练过程中可能会掉线，可以在控制台中输入以下命令减少掉线几率，让系统知道你在活跃状态

   ```javascript
   function ClickConnect(){
     console.log("Working"); 
     document
       .querySelector("#top-toolbar > colab-connect-button")
       .shadowRoot
       .querySelector("#connect")
       .click()
   }
    
   setInterval(ClickConnect,60000)
   ```

   