---
title: 笔记·Python Logging模块的用法
published: 2024-12-31
description: 几年没写技术博客了
tags: [Python]
category: 笔记
draft: false
abbrlink: 38585
---

这篇文章我们来讲一下 python 中常用的 Logging 模块。

## Why not print

在开始之前，我们先来讲一下为什么我们不建议使用 `print` 。

我们都知道， Logging 是中大型项目中常用日志记录模块，与 `print` 相比，它提供了比较常用的日志等级（如 `DEBUG`, `INFO`, `WARNING`, `ERROR`, `CRITICAL`），可以按需筛选和分类；除此之外，它还能自由开关而无需手动注释代码（`logger.handlers.clear()` 或 `level=logging.NOTSET`）。

即使你没看上面的文章，你都很容易联想到 Logging 其实是 print 的超集，在简单使用中它们发挥着一样的功能。所以本篇文章中我们来看看 Logging 的一些与众不同的地方以及怎么写出一个好看的日志输出。

## 基本使用

对于刚入手的萌新们，我们简单介绍一下 `Logging` 的一般用法。

下面是一个惯用用法的简单示例：

```python
# myapp.py
import logging
import mylib
logger = logging.getLogger(__name__)

def main():
    logging.basicConfig(filename='myapp.log', level=logging.INFO)
    logger.info('Started')
    mylib.do_something()
    logger.info('Finished')

if __name__ == '__main__':
    main()
```

```python
# mylib.py
import logging
logger = logging.getLogger(__name__)

def do_something():
    logger.info('Doing something')
```

运行这样的代码会输出：

```bash
INFO:__main__:Started
INFO:mylib:Doing something
INFO:__main__:Finished
```

其中：

`logging.getLogger`：用于创造一个 Logger 实例， Logger 实例也拥有诸如 `logging.info` 之类的日记等级输出函数。在本例中，`logging.getLogger(__name__)` 创造了一个当前模块的日记记录器，相较于直接使用 `logging.getLogger()` 所返回的根记录器，它能够避免根记录器所带来许多潜在的问题（比如使用 `basicConfig` 配置返回的日志记录器，同时也会导致其他模块的日志记录器配置跟着改变）。所以我们平时尽量使用 `logging.getLogger(__name__)`所返回的日志记录器进行操作，但是这样也还存在一个潜在的问题，我们之后再讲。

`logging.basicConfig`：更改基本配置，在本例中它更改全局（根）logger 配置，常用的参数有：

| 参数       | 描述                                                         |
| :--------- | :----------------------------------------------------------- |
| `filename` | 指定日志输出所写入的文件名                                   |
| `format`   | 指定日志输出格式，默认格式为`%(levelname)s:%(name)s:%(message)s` |
| `level`    | 指定日志输出级别                                             |
| `encoding` | 指定写入文件格式（filename被指定时）                         |

`logging.INFO`：日志级别，所有的日志级别有：

| 级别               | 数值 | 含义 & 何时使用                                              |
| :----------------- | :--- | :----------------------------------------------------------- |
| `logging.NOTSET`   | 0    | 未设置。这个级别允许子记录器继承父记录器的日志级别，如果失败，就什么级别也不输出。 |
| `logging.DEBUG`    | 10   | 调试信息。通常在 Debug 阶段使用                              |
| `logging.INFO`     | 20   | 运行信息。输出程序运行状态，确认一切按预期进行。             |
| `logging.WARNING`  | 30   | 不影响运行的意外情况。但这可能在不久的将来出现问题。         |
| `logging.ERROR`    | 40   | 错误信息。由于一个更严重的问题，该软件无法执行某些功能。     |
| `logging.CRITICAL` | 50   | 严重错误。程序无法继续正常运行或被迫中止。                   |

当然你也可以使用数值作为日志级别，但很显然我们不应该这么做。

`logger.info`：使用 `logger` 日志记录器输出对应级别的日志，函数名类比上文中的日志级别（没有 `logging.notset` 这个函数）

除此之外还有 `logging.log` `logging.exception` ，它们分别用于底层日志输出（需要指定日志级别）和异常堆栈输出（基本等同于`logging.error(msg, exc_info=True)`）

对于所有日志记录函数，常用的参数有（斜体表示 ***kwargs* 中的关键字参数）：

| 参数       | 描述                                                         |
| ---------- | ------------------------------------------------------------ |
| msg        | 消息格式字符串，与 `print` 中的 `msg` 一致，它从 `*args` 接受格式化运算符 |
| *exc_info* | 输出`sys.exc_info（）` 中的错误输出。                        |

上面的基本使用例子太过复杂了，对于小型的项目，我们直接使用 `logging.info` 函数即可，它与 `print` 用法基本一致，只是包含了更多的额外信息。但这些额外信息并没有什么用，对此我们可以在这之前指定日志输出格式。

```python
logging.basicConfig(format='[%(levelname)s] %(funcName)s: %(message)s')
```

这样的输出就好看多了。

## 日志输出格式

| 格式                  | 描述                                                         |
| :-------------------- | :----------------------------------------------------------- |
| `%(asctime)s`         | **表示可读性高的的日志时间。比如 '2003-07-08 16:49:45,896' （逗号之后的数字为时间的毫秒部分）** |
| `%(created)f`         | 日志时间浮点数。比如 '1672540800.123'（即 `time.time_ns()` / 1e9 所返回的值） |
| `%(filename)s`        | `pathname` 的文件名部分（包含扩展名）                        |
| `%(funcName)s`        | **函数名**                                                   |
| `%(levelname)s`       | **日志级别**                                                 |
| `%(levelno)s`         | 日志级别对应的数值                                           |
| `%(lineno)d`          | 发出日志记录调用所在的源行号（如果可用）                     |
| `%(message)s`         | **记入日志的消息，即 `msg % args` 的结果（这对文件日志管理器很有用）** |
| `%(module)s`          | **模块 (`filename` 的名称部分)（不包含扩展名）**             |
| `%(msecs)d`           | 日志时间的毫秒部分。                                         |
| `%(name)s`            | 日志记录器名称。                                             |
| `%(pathname)s`        | 日志记录器所在源文件的完整路径名（如果可用）。               |
| `%(process)d`         | 进程ID（如果可用）                                           |
| `%(processName)s`     | 进程名（如果可用）                                           |
| `%(relativeCreated)d` | 以毫秒数表示的相对日志时间，即相对于 logging 模块被加载时刻的差值。 |
| `%(thread)d`          | 线程ID（如果可用）                                           |
| `%(threadName)s`      | 线程名（如果可用）                                           |
| `%(taskName)s`        | `asyncio.Task` 名称（如果可用）。                            |

一些常用的格式已用粗体标出，大家也可以尝试用一下这些格式看看有什么效果。

## 日志记录器

我们常用的日志处理器其实是控制台日志处理器，它默认在新的 `logger` 对象中被使用，你也可以自己手动创建一个。

```python
# 创建控制台日志处理器
console_handler = logging.StreamHandler()
```

有了日志处理器，你可以再对获取的日志处理器进行单独的配置。

```python
console_handler.setLevel(logging.DEBUG)
console_handler.setFormatter(logging.Formatter('[%(levelname)s] %(funcName)s: %(message)s'))
```

其中，`setFormatter` 要求传入一个格式器，在格式器初始化的过程中，可以传入的常见参数有：

| 参数      | 描述                                                         |
| --------- | ------------------------------------------------------------ |
| `fmt`     | 消息格式字符串。如果未指定，则将使用 `'%(message)s'`，即已记录的日志消息 |
| `datefmt` | 时间格式字符串。                                             |

要把日志处理器能被 `logger` 使用，你需要在 `logger` 中添加处理器对象：

```python
# 移除默认的handler
for handler in logger.handlers:
    logger.removeHandler(handler)
    
logger.addHandler(console_handler)
```

为了避免冲突，我们一般会先移除默认的 handler。但有的时候尽管只有我们定义的 handler，调用 logger 的方法时还是调用了根 logger的 handler，这个时候我们就需要禁止 logger 向上层传播。

```python
logger.propagate = False
```

除了控制台日志处理器，我们还会使用文件日志处理器将日志写入到文件中。

```python
# 创建文件日志处理器
if os.path.exists('logs') == False:
    os.mkdir('logs')
    
file_handler = logging.FileHandler(f'logs/{time.strftime("%Y-%m-%d", time.localtime())}.log', encoding='utf-8')
file_handler.setLevel(logging.DEBUG)
file_handler.setFormatter(logging.Formatter('[%(asctime)s] [%(levelname)s] %(funcName)s: %(message)s'))
logger.addHandler(file_handler)
```

创建文件日志处理器的过程大致与控制台日志处理器一致，除了需要指定文件名和文件编码除外。

## 带有颜色的控制台日志处理器

默认输出的白色往往不能体现日志等级间的差异，从而难以定位问题，因此我们使用带有颜色的控制台日志处理器帮助我们更快的找到我们所需要的日志输出。

在这之前需要安装第三方库：`colorlog`

```python
# 创建控制台日志处理器
console_handler = logging.StreamHandler()

# 定义颜色输出格式
color_formatter = colorlog.ColoredFormatter('%(log_color)s[%(levelname)s] %(message)s', log_colors = {'DEBUG': 'cyan', 'INFO': 'green', 'WARNING': 'yellow', 'ERROR': 'red', 'CRITICAL': 'red,bg_white'})

# 将颜色输出格式添加到控制台日志处理器
console_handler.setFormatter(color_formatter)

# 移除默认的handler
for handler in logger.handlers:
    logger.removeHandler(handler)
    
logger.addHandler(console_handler)
```

一个新的用于指定颜色的日志输出格式是：`%(log_color)s`，通常位于格式字符串的开头部分。

上述程序中最为重要的是 `colorlog.ColoredFormatter` 中的 `log_colors` 参数，它通过一个字典记录级别名称到颜色名称的映射。

可用的颜色有:

- `black`
- `red`
- `green`
- `yellow`
- `blue`,
- `purple`
- `cyan`
- `white`

以下转义码可用于格式字符串：

- `{color}`、`fg_{color}`、`bg_{color}`：前景色和背景色。
- `bold`、`bold_{color}`、`fg_bold_{color}`、`bg_bold_{color}`：粗体/亮色。
- `thin`， `thin_{color}`， `fg_thin_{color}`： 细色（取决于终端）。
- `reset`：清除所有格式（前景色和背景色）。

要实现指定子字符串的颜色，`%(reset)s`通常会很有用：

```python
"%(log_color)s%(levelname)-8s%(reset)s %(blue)s%(message)s"
```

## 模块间共享日志记录器

在基本使用一节中，我们讲过在日常中我们尽量使用 `logging.getLogger(__name__)`，但在大型工程中它会存在这样一个问题，不同模块间通过 `__name__` 获取到的 `logger` 往往是相互独立的，也就是他们的配置并不同步，要让他们的配置同步，第一个我们想到的方法是设置根 `logger` 的配置，然后统一使用根 `logger`。

```python
logging.basicConfig(format='[%(levelname)s] %(funcName)s: %(message)s')
```

但这样会存在一个问题，无论是自定义的模块还是引入的第三方模块，都遵循这样的配置。

这样看起来可能没有什么问题，实际使用起来你会发现某一个模块的日志竟然会被输出两次，一次使用模块自身的 `logger` 处理器，另一次使用我们定义的 `basicConfig` 。而这不是我们想要的，而这也难以让我们关闭某个模块的 `logger` 输出。

所以我们通常使用一个自命名的 logger 作为我们的“全局”日志管理器。

```python
logger = logging.getLogger("app")
```

这将创建一个名为"app"的日志管理器，并在全局中可用。所有模块都可以通过 getLogger 获取到这个 logger 。

当然，为了便于维护，我们还可以在引入模块中指定模块名：

```python
logger = logging.getLogger("app.module_a")
```

`"app.module_a"` 的日志管理器配置与 `"app"` 是相同的，你也可以将其理解为父子关系。

## 通过配置文件配置 logger

许多地方提到了这个方法，尽管对于我来说不太常用，这里还是稍微提一下。

从文件中加载配置项的核心函数是：`logging.config.dictConfig(config)` 。其中 `config` 参数是一个字典。

因此你可以使用任何你能够想得到的配置文件格式来加载你的 logger 配置，只要他们能够转换成为字典类型。

以 YAML 格式为例，通常使用如下格式：

```yaml
handlers:
  console:
    class : logging.StreamHandler
    formatter: brief
    level   : INFO
    filters: []
  file:
    class : logging.handlers.RotatingFileHandler
    formatter: precise
    filename: logconfig.log
    encoding: utf8
```

这将分别实例化名为 `console` 和 `file` 的日志管理器。`console` 使用 `logging.StreamHandler` 作为基类，使用 brief 格式器，日志设置为 `INFO`；`file` 使用 `logging.handlers.RotatingFileHandler` 作为基类，使用 `precise` 格式器，输出到 `logconfig.log` 文件中。根据加载函数所在的类，他们两个都会被加载到根 `logger` 中，所以他们的名称仅起到便于维护的作用。

除了配置 handlers ，你还可以配置其他日志记录对象。

```python
formatters:
  brief:
    # 以下为针对格式化器 id 'brief' 的配置
  precise:
    # 以下为针对格式化器 'precise' 的配置
    
handlers:
  h1: # 这是一个 id
   # 以下是针对处理器 id 'h1' 的配置
   formatter: brief
  h2: # 这是另一个 id
   # 以下是针对处理器 id 'h2' 的配置
   formatter: precise
    
loggers:
  foo.bar.baz:
    # 针对日志记录器 'foo.bar.baz' 的其它配置
    handlers: [h1, h2]
    formatters: [brief]
```

一般而言上述配置使用 `logging.config.dictConfig(config)` 来使新的日志记录对象在全局可用。

## 总结·可复用的代码

经过了上述学习，我们可以轻松写出一个可复用的模块来帮助我们生成一个清晰的日志记录器。

```python
# utils.logging.py

import logging
import colorlog
import time
import os

def init_logger(LEVEL = logging.INFO):
    # 创建logger对象
    logger = logging.getLogger('app')
    logger.setLevel(LEVEL)

    # 创建控制台日志处理器
    console_handler = logging.StreamHandler()
    console_handler.setLevel(LEVEL)

    # 创建文件日志处理器
    if os.path.exists('logs') == False:
        os.mkdir('logs')
    file_handler = logging.FileHandler(f'logs/{time.strftime("%Y-%m-%d", time.localtime())}.log', encoding='utf-8')
    file_handler.setLevel(logging.DEBUG)
    file_handler.setFormatter(logging.Formatter('[%(asctime)s] [%(levelname)s] %(funcName)s: %(message)s'))

    # 定义颜色输出格式
    color_formatter = colorlog.ColoredFormatter('%(log_color)s[%(levelname)s] %(message)s', log_colors = {'DEBUG': 'cyan', 'INFO': 'green', 'WARNING': 'yellow', 'ERROR': 'red', 'CRITICAL': 'red,bg_white'})

    # 将颜色输出格式添加到控制台日志处理器
    console_handler.setFormatter(color_formatter)

    # 移除默认的handler
    for handler in logger.handlers:
        logger.removeHandler(handler)
    logger.propagate = False
    
    # 添加处理器对象
    logger.addHandler(console_handler)
    logger.addHandler(file_handler)
    return logger
```

```python
# main.py

from utils.logging import init_logger
logger = init_logger(logging.INFO)
```

```python
# module.a.py

logger = logging.getLogger('app.moduleA')
```

以上的日志处理器使用可读性高的日志输出格式，并产生 DEBUG 级别的日志文件以供后期调试。