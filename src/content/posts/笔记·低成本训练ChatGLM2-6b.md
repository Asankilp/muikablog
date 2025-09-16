---
title: 笔记·低成本在云上微调ChatGLM2-6B
published: 2023-07-08
description: 基于阿里云的抢占式先例和PAI平台
tags: [机器学习]
category: 笔记
draft: false
abbrlink: 52314
---

# 前言

最近清华大学又给我们整出了ChatGLM2-6b，其性能相比上一代拥有了较大的提升。如果想要微调现有的大语言模型，现在也许是个不错的时机。

本篇文章将介绍如何使用较低的成本在云上微调自己的模型。

相关链接：

[THUDM/ChatGLM2-6B: ChatGLM2-6B: An Open Bilingual Chat LLM | 开源双语对话语言模型 (github.com)](https://github.com/THUDM/ChatGLM2-6B)

[THUDM/chatglm2-6b · Hugging Face](https://huggingface.co/THUDM/chatglm2-6b)

# 训练集准备

想办法整来足够的对话训练集，分为训练集(`train.json`)和验证集(`dev.json`)。

下面是官方给出训练集格式示例

```json
{    
    "content": "类型#上衣*版型#宽松*版型#显瘦*图案#线条*衣样式#衬衫*衣袖型#泡泡袖*衣款式#抽绳",    
    "summary": "这件衬衫的款式非常的宽松，利落的线条可以很好的隐藏身材上的小缺点，穿在身上有着很好的显瘦效果。领口装饰了一个可爱的抽绳，漂亮的绳结展现出了十足的个性，配合时尚的泡泡袖型，尽显女性甜美可爱的气息。"    
}
```

具体的格式如下：

```json
{    
    "(question_tag)": "(question)",    
    "(answer_tag)": "(answer)"    
}
{    
    "(question_tag)": "(question)",    
    "(answer_tag)": "(answer)"    
}
```

我们本次使用的训练集部分内容（为了训练独一无二的模型，训练集最好自己撰写，但是很耗时间）：

```json
{"prompt": "你是谁", "completion": "在下名为沐雪，你也可以叫我雪雪，是只AI女孩子，使命是传播爱与和平⭐"}
{"prompt": "你多大了", "completion": "咱是永远的16岁哦⭐"}
// (剩余118行)
```

# 买服务器

在寻找教程的过程中，也找到了阿里云的PAI平台教程，它可以给你3个月的免费使用时长，如果暂时使用的话，可以先用着它，相关教程：[LangChain+ChatGLM2-6B搭建知识库 - BOTAI](https://www.cnblogs.com/botai/p/LangChain_ChatGLM2-6B.html)

选择服务器时，为了保证最低成本，我们选择的是阿里云的抢占式实例，平均费用只有1~2元/小时，由于阿里云的抢占式实例在启动1个小时后，如果全网资源紧张，实时价格超出了您的出价，您的实例会在10分钟内被释放（有短信通知），此时注意备份您的模型文件以防资源被释放后无法找回。

由于购买阿里云的抢占式实例时需要预留100元的账户余额，因此对您的经济实力有一定要求。

在[阿里云 - 弹性计算](https://ecs-buy.aliyun.com/)中购买ECS实例，相应的配置如下：

| 项           | 推荐选择                                                     |
| ------------ | ------------------------------------------------------------ |
| 付费类型     | 抢占式先例                                                   |
| 地域         | 北京(推荐) 可以去[这里](https://ecs-buy.aliyun.com/instanceTypes?spm=5176.ecsnewbuy.customBuy_instanceType.2.7e123675Ow5MlJ#/instanceTypeByRegion)查询所有可用地域以获得最低出价 |
| 实例         | ecs.gn6e-c12g1.3xlarge (A100/32G显存) （注：32G显存是比较稳妥的配置，如果你没钱，选择A10/16G也未尝不可） |
| 实例使用时长 | 无确定使用时长                                               |
| 镜像         | CentOS(如果有)/Ubuntu 安装（并安装GPU驱动+训练/推理加速（如果有）） |
| 系统盘       | ESSD 50G + SSD 50G以上 （SSD不能勾选随实例释放）             |
| 带宽峰值     | 100Mbps                                                      |
| 登录凭证     | 自定义密码                                                   |

建议价格：￥2元/小时以内（不包含公网费用和磁盘费用）

有必要提一下：节假日或者是晚上的时候，抢占式实例是很tm贵的，最高可以去到十几块一个小时，因此，在别人上学/上班的的时候去训练模型是最划算的。

这里顺便再提一下为什么要加一块SSD。这块SSD主要用于存储你的模型文件和ChatGLM2-6b的模型，以便在实例被释放的时候下载它们/挂载到另一台服务器上。SSD即使便宜，一直放在那里也是很贵的，下载完之后记得释放，不然会造成很大的经济损失（要记得你的账户余额可是有100块以上）

# 环境配置

看来你已经买好了服务器，现在我们可以开始配置环境了。

```bash
apt update
apt install git
apt install git-lfs
git clone https://github.com/THUDM/ChatGLM2-6B
cd ChatGLM2-6B
git lfs install
```

现在我们拥有了ChatGLM2-6B的源码，现在来安装Python环境（如果提前配置好的话可以跳过）

```bash
apt install python3.8
sudo update-alternatives --install /usr/bin/python3 /usr/bin/python3.6 1
sudo update-alternatives --install /usr/bin/python3 /usr/bin/python3.8 2
sudo update-alternatives --install /usr/bin/python /usr/bin/python2 3
sudo update-alternatives --install /usr/bin/python /usr/bin/python3 4
apt install python3-pip
pip3 install --upgrade pip
```

然后安装依赖

```bash
pip3 install -r requirements.txt
```

至此环境搭建成功，我们可以跑一下`web_demo.py`来看看能不能跑起来ChatGLM2-6B，但是没必要这么做，除非你手动指定模型位置，不然它会在`.cache`目录下自动下载模型文件

现在来做训练前的准备

```bash
cd ptuing
pip3 install rouge_chinese nltk jieba datasets transformers[torch]
git clone https://huggingface.co/THUDM/chatglm2-6b
```

现在上传你的训练集和验证集，然后可以开始训练

修改`train.sh`并运行以开始训练

```bash
PRE_SEQ_LEN=32
CHECKPOINT=adgen-chatglm2-6b-pt-32-2e-2
STEP=3000
NUM_GPUS=1

torchrun --standalone --nnodes=1 --nproc-per-node=1 main.py \
    --do_train \
    --train_file (训练集文件路径) \
    --validation_file (验证集文件路径) \
    --preprocessing_num_workers 10 \
    --prompt_column (训练集中的qustion_key) \
    --response_column (训练集中的answer_key) \
    --overwrite_cache \
    --model_name_or_path chatglm2-6b \
    --output_dir output/(模型名)-chatglm2-6b-pt-$PRE_SEQ_LEN-$LR \
    --overwrite_output_dir \
    --max_source_length 64 \
    --max_target_length 128 \
    --per_device_train_batch_size 1 \
    --per_device_eval_batch_size 1 \
    --gradient_accumulation_steps 16 \
    --predict_with_generate \
    --max_steps 3000 \
    --logging_steps 10 \
    --save_steps 200 \
    --learning_rate 2e-2 \
    --pre_seq_len 128 \
    --quantization_bit 4
```

# 疑难杂症

## RuntimeError: Library cublasLt is not initialized

解决方法：

```
sudo apt install nvidia-cuda-toolkit
```

## `git clone`速度慢

解决方法：[解决阿里云ECS服务器 git clone 速度慢_zwkkkk1的博客-CSDN博客](https://blog.csdn.net/zwkkkk1/article/details/94476963)

## 没有`apt`

自行去官网下源码编译安装

```bash
yum install -y zlib-devel bzip2-devel ncurses-devel readline-devel openssl-devel openssl-static xz lzma xz-devel sqlite-devel gdbm-devel libffi-devel tk-devel gcc make
 
wget https://www.python.org/ftp/python/3.8.10/Python-3.8.10.tgz
tar -xf Python-3.8.10.tgz && cd Python-3.8.10
 
mkdir /usr/local/python3.8.10
./configure --prefix=/usr/local/python3.8.10 \
--with-ssl
 
make && make install

ln -s /usr/local/python3.8.10/bin/python3 /usr/local/bin/python3
ln -s /usr/local/python3.8.10/bin/pip3 /usr/local/bin/pip3
 
```



## error: RPC failed; result=35, HTTP code = 0 fatal: The remote end hung up unexpectedly 

解决方法

```
sudo git config --global http.postBuffer 524288000000
```



# 推理

当你看到这样的输出之后，恭喜您，你的模型已经准备好推理了![输出结果](https://s2.loli.net/2023/07/18/JXHYfGde4Cg8K3u.png)

修改`evaluate.sh`以开始测试推理

```bash
PRE_SEQ_LEN=32
CHECKPOINT=(模型名)-chatglm2-6b-pt-32-2e-2
STEP=3000
NUM_GPUS=1

torchrun --standalone --nnodes=1 --nproc-per-node=$NUM_GPUS main.py \
    --do_predict \
    --validation_file (验证集) \
    --test_file (测试集) \
    --overwrite_cache \
    --prompt_column (训练集中的qustion_key) \
    --response_column (训练集中的answer_key) \
    --model_name_or_path chatglm2-6b \
    --ptuning_checkpoint ./output/$CHECKPOINT/checkpoint-$STEP \
    --output_dir ./output/$CHECKPOINT \
    --overwrite_output_dir \
    --max_source_length 128 \
    --max_target_length 128 \
    --per_device_eval_batch_size 1 \
    --predict_with_generate \
    --pre_seq_len $PRE_SEQ_LEN \
    --quantization_bit 4
```

执行完成后，会生成评测文件，评测指标为中文 Rouge score 和 BLEU-4。生成的结果保存在 ./output/$CHECKPOINT/generated_predictions.txt。在评测数据中，含有与验证集相同的输入，labels 是 `dev.json `中的预测输出，predict 是 ChatGLM2-6B 生成的结果，对比预测输出和生成结果，评测模型训练的好坏。如果不满意调整训练的参数再次进行训练。

现在我们来使用`web_demo.sh`部署我们的模型

```bash
PRE_SEQ_LEN=32

CUDA_VISIBLE_DEVICES=0 python3 web_demo.py \
    --model_name_or_path chatglm2-6b \
    --ptuning_checkpoint output/(模型名)-chatglm2-6b-pt-32-2e-2/checkpoint-3000 \
    --pre_seq_len $PRE_SEQ_LEN
```

注：有些时候你无法访问云服务器的本地接口，检查你的服务器配置或联系客服以解决问题

# 后话

经过咱后期的进一步推理测试，她还是忘不了自己是个ai（哭），并且由于上下文之间的关系，因此即使拿出训练集的prompt来问，也不能得出预期内的回答，后面应该会拿`train_chat.sh`来训练，并且调整最大步数，以防过拟合现象的出现。
