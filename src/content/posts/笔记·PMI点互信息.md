---
title: 笔记·PMI点互信息与NLP
published: 2025-07-09
description: 大一畜生没学概率论怎么办？
tags: ["NLP", "论文"]
category: 笔记
draft: false
abbrlink: 3219
---

## 概述

在统计学 、 概率论和信息论中， **点互信息 (PMI, Pointwise Mutual Information)**或点共同信息 ，是一种衡量事件关联的度量。它衡量的是 两个事件同时发生的概率 与 这两个事件独立时的概率 之间的差值，也就是两个事件**一起出现**的概率是否大于它们**独立出现**的概率。

## 定义

公式如下：

$$
pmi(x;y) \equiv \log_2{\frac{p(x,y)}{p(x)p(y)} = \log_2{\frac{p(x|y)}{p(x)}} = \log_2{\frac{p(y|x)}{p(y)}}}
$$

对于上述公式，后两个表达式通过贝叶斯定理等于第一个表达式。

## 性质

1. 对称性： $pmi(x;y) = pmi(y;x)$

2. 值域： $-\infty \le pmi(x;y) \le \min[-\log{p(x), -\log{p(y)}}]$

   通过上式，我们可以知道 PMI 可能为正或为负。

   当 $X$ 和 $Y$ 独立时，$p(x|y) = p(y|x) = 0$ ，故 $pmi(x;y) = pmi(y;x) = 0$ 

   $X$ 和 $Y$ 完全相关时（即 $p(x|y)$ 或 $p(y|x)$ 等于 1)，PMI 达到最大值

3. 链式法则：$pmi(x;yz) = pim(x;y) + pmi(x;z|y)$

## 局限性

1. PMI 可以取正值和负值，且没有固定的界限，这使得它更难解释。
2. PMI 具有“对低频事件给出较高分数的已知倾向”，但在诸如测量词语相似度等应用中，更倾向于“对那些由更多证据支持其关联性的词语对给出较高分数”。

## 变体

为了克服上述局限，提出了以下变体：

### 正值 PMI(PPMI)

即将 PMI 的负值设为零：

$$
ppmi⁡(x;y) \equiv \max(\log_2\frac{⁡p(x,y)}{p(x)p(y)},0)
$$

这一定义的动机源于以下观察：

> 负 PMI 值（意味着事物共同出现的频率低于我们预期的偶然性）往往不可靠，除非我们的语料库非常庞大"，以及"不清楚是否有可能用人类判断来评估这种'不相关性'的分数"。此外，它通过将这些事件（$p(x,y)=0$）的 PPMI 设为 0，避免了处理从未一起发生的事件的 $-\infty$ 值

### 归一化点互信息（NPMI）

即将 PMI 的取值进行归一化处理， -1 表示从不一起出现；0 表示独立；+1 表示完全可以共现

$$
npmi⁡(x;y)=\frac{pmi⁡(x;y)}{h(x,y)}
$$

其中 $h(x,y)$ 为联合自信息：$h(x, y) = -\log_2{p(x,y)}$

### PMI^K 家族

截至 2011 年，被描述为"最广泛使用的变体之一"，其定义为：

$$
pmi^k(x;y) \equiv \log_2{\frac{p(x,y)^k}{p(x)p(y)}} = pmi(x;y) - (-(k-1))\log_2{p(x, y)}
$$

特别地， $pmi^1(x;y) = pmi(x;y)$

## 在 NLP 中的应用

在继续之前，我们先来介绍引理的概念。

### 引理

在形态学和词典学中， **引理**（或称词元，lemma）是一个词形集合的规范形式、词典形式 、或引证形式 。例如，在英语中，*break、breaks、broke、broken* 和 *breaking* 是同一个词素的不同形式，其中 *break* 是作为索引的词元。确定给定词素的词元的过程称为**词元提取**。

**词素**指的是一个单词词形变化系统中的所有屈折变化或交替形式，而**词元**指的是按惯例被选来代表词素的特定形式。

### 基于 PMI 的风格指示引理识别

*以下内容取自 [arXiv 2302.08362: Conversation Style Transfer using Few-Shot Learning](https://arxiv.org/abs/2302.08362)*

为了识别每个风格领域中的风格指示引理，我们采用了一种基于点互信息（PMI）（Church and Hanks, 1990）的方法。我们首先获取来自每个风格领域的所有代理话语，并使用 spaCy Python 库对代理使用的每个单词进行引理化处理。我们忽略所有的标点符号和停用词。然后对于一个引理 $w$ ，我们通过以下公式计算其与风格领域 $t$ 之间的点互信息（PMI），即$I(w, t)$：

$$
\begin{align*}
I(w,t)=\operatorname{log}\frac{P(w|t)}{P(w)}
\end{align*}
$$
其中，$P(w|t)$ 是通过对风格 $t$ 中使用的所有引理进行计数并计算 $\frac{count(w)}{count(all−lemmas)}$ （其中分母 $count(all-lemmas)$ 为在这个风格中，所有词（引理）的总出现次数，分子同理）得到的，而 $P(w)$ 则是通过对所有风格的话语中的引理 $w$ 进行计数并计算得到的。现在，我们根据 PMI 得分对每个风格领域中的引理进行排名。为了去除特定主题的引理和很少使用的引理，我们忽略了那些在每个风格领域中代理话语中使用超过 10% 以及在风格 $H_1$, $B$, $H_2$ 中分别使用少于 0.5%、0.3%、0.3% 的引理（注：这里过滤阈值的设定应该是出于一种经验性策略）。每个风格领域中前 300 个高PMI引理列于表 11 中。

*对于论文中的公式，log 的底数被省略。若无特殊说明，log 默认是自然对数（以 e 为底），而在信息论中，PMI 等指标多数默认用 log base 2，用于以“bit”为单位衡量信息量。本文的 log 底数为 2*

### 使用 NLTK 计算 PMI

```python
import nltk
from nltk.corpus import brown
from nltk.stem import WordNetLemmatizer
from math import log

# 确保所需资源已安装（如未安装请取消注释以下行）
# nltk.download('brown')
# nltk.download('wordnet')
# nltk.download('omw-1.4')

class PMICalculator:
    def __init__(self, category='news'):
        self.lemmatizer = WordNetLemmatizer()
        """词形还原工具类实例"""
        self.sentences = self._prepare_sentences(brown.sents(categories=category))
        self.word_freq = self._build_frequency_distribution()
        self.total_words = sum(self.word_freq.values())
        """总词数"""
        self.total_sentences = len(self.sentences)
        """总句数"""

    def _prepare_sentences(self, raw_sentences) -> list[list[str]:
        """
        对语料库中的所有句子进行词形还原并转换为小写
        """
        return [
            [self.lemmatizer.lemmatize(word.lower()) for word in sentence]
            for sentence in raw_sentences
        ]

    def _build_frequency_distribution(self):
        """
       	语料库中词形还原后单词的返回频率分布
        """
        words = [word for sentence in self.sentences for word in sentence]
        return nltk.FreqDist(words)

    def prob(self, word) -> float:
        """
        词汇在语料库中出现的概率
        """
        return self.word_freq[word] / self.total_words

    def joint_prob(self, word1, word2) -> float:
        """
        词 1 和词 2 出现在同一句子中的概率
        应用 +1 平滑处理以避免概率为零
        """
        co_occurrence_count = sum(1 for sent in self.sentences if word1 in sent and word2 in sent)
        return (co_occurrence_count + 1) / self.total_sentences

    def pmi(self, word1, word2) -> float:
        """
        计算两个单词之间的点w互信息（PMI）
        """
        p_x = self.prob(word1)
        p_y = self.prob(word2)
        p_xy = self.joint_prob(word1, word2)
        return log(p_xy / (p_x * p_y), 2)


def demo():
    pmi_calc = PMICalculator()

    word_pairs = [('new', 'york'), ('new', 'the')]
    for w1, w2 in word_pairs:
        print(f"PMI('{w1}', '{w2}') = {pmi_calc.pmi(w1, w2):.4f}")
        print(f"P('{w1}') = {pmi_calc.prob(w1):.6f}")
        print(f"P('{w2}') = {pmi_calc.prob(w2):.6f}")
        print(f"P('{w1}', '{w2}') = {pmi_calc.joint_prob(w1, w2):.6f}")
        print("-" * 40)

if __name__ == '__main__':
    demo()
```

```python
PMI('new', 'york') = 6.9599
P('new') = 0.020266
P('york') = 0.004373
P('new', 'york') = 0.011032
----------------------------------------
PMI('new', 'the') = 1.8864
P('new') = 0.020266
P('the') = 0.537000
P('new', 'the') = 0.040234
----------------------------------------
```

## 参考文献

[点互信息 - 维基百科 --- Pointwise mutual information - Wikipedia](https://en.wikipedia.org/wiki/Pointwise_mutual_information)

[NLP之【点互信息PMI】——衡量两变量之间的相关性_nlp pmi-CSDN博客](https://blog.csdn.net/weixin_42782150/article/details/127068069)

[arxiv 2302.08362: Conversation Style Transfer using Few-Shot Learning](https://arxiv.org/abs/2302.08362)

