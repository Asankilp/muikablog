---
title: 笔记·PCFG上下文无关文法在风格提取中的作用
published: 2025-10-07
description: 到了大二也不会 NLP 喵
tags: ["NLP", "论文"]
category: 笔记
draft: false
abbrlink: 3188
---

> 如果我们能让计算机“读懂”语言结构，那么它就能开始“理解”风格。

## 从“句子是怎么长出来的”说起

我们每天都在说话、写句子。比如：

> “我今天好开心！”

但计算机看到的只是一个字符串。那它怎么知道“我”是主语、“开心”是形容词呢？

这就要靠**句法分析（Syntactic Parsing）**。

而**上下文无关文法（Context-Free Grammar, CFG）**，是最经典的句法表示方法。

它用一套“规则”来描述语言的结构，比如：

```
S → NP VP      （一个句子由名词短语+动词短语组成）
NP → Pronoun   （名词短语可以是一个代词）
VP → Adv Adj   （动词短语可以是副词+形容词）
```

有了这些规则，我们就能“生成”句子，比如：

> S → NP VP → Pronoun Adv Adj → 我 今天 开心
>  得到：“我今天开心”

这就像一个语言生成器，它告诉我们一句话是怎么“长出来的”。

## CFG 上下文无关文法定义

**上下文无关文法**（英语：context-free grammar，缩写为CFG），在计算机科学中，若一个形式文法 $G = (V, Σ, P, S)$ 的产生式规则都取如下的形式：$A \to \alpha$，其中 $A∈V ，\alpha∈(V∪Σ)*$ ，则将其称之为上下文无关文法。

上下文无关文法取名为“上下文无关”的原因就是因为字符 $A$ 总可以被字符串 $\alpha$ 自由替换，而无需考虑字符 $A$ 出现的上下文。如果一个形式语言是由上下文无关文法生成的，那么可以说这个形式语言是上下文无关的。

上下文无关文法重要的原因在于它们拥有足够强的表达力来表示大多数程序设计语言的语法；实际上，几乎所有程序设计语言都是通过上下文无关文法来定义的。另一方面，上下文无关文法又足够简单，使得我们可以构造有效的分析算法来检验一个给定字符串是否是由某个上下文无关文法产生的。例子可以参见 LR 分析器和 LL 分析器。

## 理解单个 CFG 规则

一个 CFG 规则可以这样表示
$$
T_{c} \to T_{p}
$$
其中：

- $T_c$ 是一个非终结符，取值于 CTB 中文树库的标签
- $T_p$ 是子成分，可以是非终结符/终结符（比如词性标签）
- `->` 表示为**产生/组成**，即一个非终结符由一组子成分产生。

让我们来看一个具体的例子：
$$
INTJ \to IJ
$$
其中：

- `INTJ` 在 CFG 中表示为: interjection（插话，感叹语）
- `IJ` 作为词性标签，表示为: Interjection（感叹词）

据此，这个例子可以解读为一个感叹语由一个感叹词产生。一个小型语法树示例如下：

```
(ROOT
  (IP
    (INTJ (IJ 啊))
    (NP (PN 我))
    (VP (VV 知道))))
```

## 概率版的 CFG(PCFG)

问题是——一种句子可能有很多种写法。比如：

> “我今天特别开心”
>  “今天我好开心啊”

哪种更常见？

这就引出了**概率上下文无关文法（Probabilistic Context-Free Grammar, PCFG）**。

PCFG 在普通 CFG 的基础上，加上了**概率权重**：

```
VP → Adv Adj   [0.3]
VP → Adv Adv Adj [0.1]
VP → Adj        [0.6]
```

意思是：

- 60% 的时候人们只用一个形容词；
- 30% 的时候会加点副词；
- 10% 的时候甚至连副词都叠两个！

于是，PCFG 不仅能描述“句子怎么构成”，还能告诉我们“某种句式有多常见”。

## 计算 PCFG 的概率

训练 PCFG 的核心思路其实很简单：

1. 从语料库中抽取大量句子；
2. 用句法分析器（如 HanLP 或 Stanford Parser）分析出句法树；
3. 统计每条规则的出现频率；
4. 计算每条规则的概率：

$$
 P(A → α) = \frac{Count(A → α)}{\sum_{β}{Count(A → β)}}
$$

举个例子：

如果我们看到 100 次 VP 结构，其中：

- 60 次是 VP → Adj
- 30 次是 VP → Adv Adj
- 10 次是 VP → Adv Adv Adj

那就能得到上面的概率。

## PCFG 在“风格提取”任务中的作用

PCFG 不只是语法工具，它其实也能**反映语言风格的偏好**。

比如：

- 动漫角色喜欢用感叹句（`INTJ → IJ` 出现率高）；
- 心理咨询语料更偏好客观叙述（`NP → NN` 出现率高）；
- 傲娇型角色经常用前置话题结构（`TOP → CP` 常见）。

当我们分别训练“不同风格的语料库”的 PCFG 模型，就能发现——**每种风格的语法规则分布是不一样的**。

这些概率差异，能帮助我们“量化”风格倾向。

例如，研究发现：

| 规则      | 动漫语料中的概率 | 心理语料中的概率 | 比率 |
| --------- | ---------------- | ---------------- | ---- |
| INTJ → IJ | 0.85             | 0.003            | 283× |
| NP → NR   | 0.03             | 0.00006          | 500× |

意味着动漫角色说话时的“感叹结构”和“人名称呼”极为频繁，这正是动漫语言“外显、情绪化”的体现，说明风格不仅体现在用词上，也体现在句法结构上。PCFG 能让“句子结构差异”成为可量化的风格信号。

## PCFG 在研究中的作用

在风格提取任务研究中，PCFG 被用来：

1. **识别句法模式差异** —— 哪种句式在哪种角色中更常见；
2. **构建“风格向量”中的句法维度** —— 把这些规则概率当作特征；
3. **计算对数似然比（LLR）** —— 判断哪些语法规则最能区分风格。

例如：

$$
 LLR = 2[k_1\log\frac{k_1}{n_1μ} + k_2\log\frac{k_2}{n_2μ}]
$$

其中 $k_1$, $k_2$ 为两个语料中该规则的出现次数，$n_1$, $n_2$ 为各语料的总规则数。

如果一个规则在动漫语料中出现远多于心理语料，那它的 LLR 就会很高，代表它是**风格显著句法**。

## Why LLR

所以为什么 **对数似然比（LLR）** 比单纯的概率比率（PR）或原始概率 (P) 更能区分风格？

假设我们比较两种语料：

- 动漫语料（Style）
- 基准语料（Base）

对某条语法规则（如 `INTJ → IJ`），我们有：

| 语料  | 出现次数 (k) | 总规则数 (n) | 概率 (P = k/n) |
| ----- | ------------ | ------------ | -------------- |
| Style | (k_1)        | (n_1)        | (P_1)          |
| Base  | (k_2)        | (n_2)        | (P_2)          |

其中: 

**① 原始概率 (P)**

反映的是该规则在语料中的**绝对常见程度**。比如：

> 动漫语料中 `INTJ → IJ` 的概率是 0.85。

但单看概率，无法说明它是“动漫特有”，因为心理语料也可能高（只是绝对句数不同）。

**② 概率比率 (PR)**

定义：

$$
 PR = \frac{P_1}{P_2}
$$

即 “这个规则在动漫语料中出现的频率是基准语料的几倍”。

例如：

> `PR = 27928.32`
>  表示在动漫语料中这个规则比心理语料常见 27928 倍！

听起来很强烈，但注意⚠️：

- 如果基准语料中这个规则**几乎没出现**（比如只出现 1 次），
   那分母 (P_2) 很小，导致 PR 被**放大到离谱**；
- 它不考虑样本量大小，1000 次 vs 1 次 与 2 次 vs 0 次，PR 都可能很高；
- 所以 **PR 只看比例，不看置信度**。

**③ 对数似然比 (LLR)**

LLR 是一种**统计显著性检验**，用于衡量“这种差异是否可信”。

定义如下（简化形式）：

$$
 LLR = 2 \times \left[k_1 \log\frac{k_1}{n_1μ} + k_2 \log\frac{k_2}{n_2μ}\right]
$$

其中
 (μ = \frac{k_1 + k_2}{n_1 + n_2}) 是总体的期望概率。

它比较的是：

> “在两个语料中，这条规则的分布与期望分布相比，偏离有多大。”

LLR 的优势在于：

1. **考虑样本量（frequency）**

它不会让罕见规则（比如出现 2 次 vs 0 次）得到巨大比率，因为当 (k_1, k_2) 很小时，对数项会趋近 0，贡献很小。

换句话说，它过滤掉了“噪声性差异”。

2. **衡量差异的“显著性”而非“幅度”**

PR 只是“幅度”对比，但 LLR 实际上在问：

> “这条规则的分布差异足够显著到可以认为风格不同吗？”

因此它能识别**统计上真的不同的句式结构**。

3. **可排序性强**

LLR 值越大，表示该规则在两个语料中差异越大、越显著。

这使我们可以直接用它对规则排序，挑出最“风格显著”的结构。

例如在我们论文中的结果：

| 规则      | PR       | LLR         |
| --------- | -------- | ----------- |
| INTJ → IJ | 27928.32 | **1756.39** |
| NP → NR   | 498.97   | **3364.83** |

虽然第一条的 PR 更大，但第二条的 LLR 更高，说明 “名词短语 → 人名” 的句法偏好在统计上**更显著**。

换句话说，它不是偶然的高比例，而是广泛、稳定的风格特征。

综上，以上说明可以归纳为以下比喻：

- **P** 是“这个句式有多常见”；
- **PR** 是“这个句式比别人多多少”；
- **LLR** 是“这个句式真的常见到可以代表风格吗”。

> PR 像是看比例，LLR 像是在问：
>  “这个比例差异有没有统计意义，还是只是样本太少的错觉？”

因此，LLR 不是单纯“数出现次数”的指标，而是一种带有统计意义的“风格显著性量化工具”。

## 如何计算一个风格库的 PCFG

事先说明，要计算一个风格库的 PCFG，需要一个通用风格的语料库作为基准。因此，我们分别选用 [MuICE-Dataset](https://huggingface.co/datasets/Moemu/Muice-Dataset) 和 [PsyDTCorpus](https://www.modelscope.cn/datasets/YIRONGCHEN/PsyDTCorpus) 作为风格语料和基准语料进行计算。

首先我们需要对两个语料库进行成分句法分析(CON)

```python
from hanlp_restful import HanLPClient
from hanlp_common.document import Document
from time import sleep
import re

HanLP = HanLPClient('https://www.hanlp.com/api', auth=None, language='zh')

def constituency_parsing_safe(texts: list[str], max_batch_num: int = 250, max_chars_per_batch: int = 15000, interval: int = 35) -> List[Document]:
    """对文本进行分词，同时限制每一批总字符数"""
    all_docs = []
    current_batch = []
    current_length = 0
    batch_id = 1

    for text in texts:
        text_len = len(text)

        # 如果加上这个句子会超出限制，则先处理已有批次
        if current_length + text_len > max_chars_per_batch or len(current_batch) + 1 > max_batch_num:
            print(f"Processing batch {batch_id} (Total chars: {current_length})...", end='')
            doc = HanLP.parse(current_batch, tasks=['pos', 'con'])  # 成分句法分析
            all_docs.append(doc)
            print("done.")
            sleep(interval)

            batch_id += 1
            # 重置 batch
            current_batch = [text]
            current_length = text_len
        else:
            current_batch.append(text)
            current_length += text_len

    # 最后一批也别忘记
    if current_batch:
        print(f"Processing batch {batch_id} (Total chars: {current_length})...", end='')
        doc = HanLP.parse(current_batch, tasks=['pos', 'con'])  # 成分句法分析
        all_docs.append(doc)
        print("done.")

    return all_docs
```

其中 `HanLP.parse` 会返回例如下面的结果：

```json
{
  "tok/fine": [
    ["晓美焰", "来到", "北京", "立方庭", "参观", "自然", "语义", "科技", "公司", "。"]
  ],
  "pos/ctb": [
    ["NR", "VV", "NR", "NR", "VV", "NN", "NN", "NN", "NN", "PU"]
  ],
  "con": [
    ["TOP", [["IP", [["NP", [["NR", ["晓美焰"]]]], ["VP", [["VP", [["VV", ["来到"]], ["NP", [["NR", ["北京"]], ["NR", ["立方庭"]]]]]], ["VP", [["VV", ["参观"]], ["NP", [["NN", ["自然"]], ["NN", ["语义"]], ["NN", ["科技"]], ["NN", ["公司"]]]]]]]], ["PU", ["。"]]]]]]
  ]
```

我们只需要关心 `con` 的部分，这个键值存放的是目标句子的语法组成树。

在实验中，我们将每个语料库返回的结果分别存档为单个文件，然后在具体的解析器中加载。

```python
import json
import math
from typing import List, Dict, Tuple, Any, Optional, Literal
from collections import defaultdict, Counter


class PCFGExtractor:
    def __init__(self):
        self.rules_counter: Dict[str, Counter[Tuple[str, ...]]] = defaultdict(Counter)
        self.name: str = ""
        self.total_rules: int = 0

    def load_trees(self, file_path: str) -> List[Dict[str, Any]]:
        self.name = file_path
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)

    def extract_rules_from_tree(self, tree: Any):
        if not isinstance(tree, list) or len(tree) != 2:
            return
        lhs_symbol, rhs = tree
        if isinstance(rhs, list) and all(isinstance(child, list) and len(child) == 2 for child in rhs):
            rhs_symbols = tuple(child[0] for child in rhs)
            self.rules_counter[lhs_symbol][rhs_symbols] += 1
            self.total_rules += 1
            for child in rhs:
                self.extract_rules_from_tree(child)

    def extract_from_data(self, data: List[Dict[str, Any]]):
        for item in data:
            for tree in item.get("con", []):
                self.extract_rules_from_tree(tree)

    def build_pcfg(self) -> Dict[str, Dict[Tuple[str, ...], float]]:
        pcfg_distribution = {}
        for lhs_symbol, rhs_counter in self.rules_counter.items():
            total_count = sum(rhs_counter.values())
            pcfg_distribution[lhs_symbol] = {
                rhs: count / total_count for rhs, count in rhs_counter.items()
            }
        return pcfg_distribution

    def print_pcfg(
        self,
        pcfg: Dict[str, Dict[Tuple[str, ...], float]],
        sort_by: Literal["freq", "prob", "llr"] = 'freq',
        top_k: Optional[int] = None,
        baseline: Optional["PCFGExtractor"] = None,
        eps: float = 1e-5
    ):
        print(f"==={self.name} PCFG 产生式规则（按{'频率' if sort_by == 'freq' else ('对数似然比' if sort_by == 'llr' else '概率')}排序） ===")

        all_rules = []
        for lhs_symbol in self.rules_counter:
            for rhs_symbols in self.rules_counter[lhs_symbol]:
                freq = self.rules_counter[lhs_symbol][rhs_symbols]
                prob = pcfg[lhs_symbol][rhs_symbols]

                # PR / LLR
                pr = llr = None
                if baseline:
                    base_freq = baseline.rules_counter.get(lhs_symbol, {}).get(rhs_symbols, 0)
                    base_total = baseline.total_rules + eps
                    base_prob = base_freq / base_total

                    pr = (prob + eps) / (base_prob + eps)

                    k1, n1 = freq + eps, self.total_rules + eps
                    k2, n2 = base_freq + eps, base_total
                    mu = (k1 + k2) / (n1 + n2)
                    llr = 2 * (k1 * math.log(k1 / (n1 * mu)) + k2 * math.log(k2 / (n2 * mu)))

                all_rules.append((lhs_symbol, rhs_symbols, freq, prob, pr, llr))

        # 排序
        if sort_by == 'llr':
            all_rules.sort(key=lambda x: x[5] or 0, reverse=True)
        else:
            all_rules.sort(key=lambda x: x[2] if sort_by == 'freq' else x[3], reverse=True)

        # 打印
        for i, (lhs, rhs, freq, prob, pr, llr) in enumerate(all_rules):
            if top_k is not None and i >= top_k:
                break
            rhs_str = ' '.join(rhs)
            line = f"{lhs} → {rhs_str:<40} | freq={freq:<5} | P={prob:.4f}"
            if baseline:
                line += f" | PR={pr:.2f} | LLR={llr:.2f}"
            print(line)


def build_and_print_pcfg(file_path: str, baseline: Optional[PCFGExtractor] = None):
    extractor = PCFGExtractor()
    trees_data = extractor.load_trees(file_path)
    extractor.extract_from_data(trees_data)
    pcfg = extractor.build_pcfg()

    if baseline:
        extractor.print_pcfg(pcfg, sort_by='llr', top_k=15, baseline=baseline)
    else:
        extractor.print_pcfg(pcfg, sort_by='freq', top_k=15, baseline=baseline)
    print()

# 1. 先加载基准语料（psydc）
baseline_extractor = PCFGExtractor()
baseline_data = baseline_extractor.load_trees("psydc_cons.json")
baseline_extractor.extract_from_data(baseline_data)
baseline_extractor.build_pcfg()  # 可选，但为了接口统一性

# 2. 比较 muice 与 psydc 的差异
build_and_print_pcfg("muice_cons.json", baseline=baseline_extractor)
build_and_print_pcfg("psydc_cons.json")  # 自身基准不做对比
```

最后我们会得到：

```
===./outputs/cons/muice_cons.json PCFG 产生式规则（按对数似然比排序） ===
NP → NR                                       | freq=513   | P=0.0305 | PR=498.97 | LLR=3364.83
INTJ → IJ                                       | freq=259   | P=0.8548 | PR=27928.32 | LLR=1756.39
TOP → CP                                       | freq=396   | P=0.1415 | PR=506.86 | LLR=1549.77
VP → VV                                       | freq=2924  | P=0.1439 | PR=5.83 | LLR=670.21
CP → IP SP                                    | freq=1632  | P=0.3664 | PR=30.80 | LLR=585.91
UCP → IP PU CP                                 | freq=61    | P=0.0685 | PR=6695.62 | LLR=497.26
FLR → SP                                       | freq=84    | P=0.4615 | PR=16155.72 | LLR=471.29
DNP → ADJP DEG                                 | freq=108   | P=0.0816 | PR=11.13 | LLR=468.22
FLR → IJ                                       | freq=77    | P=0.4231 | PR=14354.33 | LLR=417.82
PP → P LCP                                    | freq=158   | P=0.1300 | PR=16.71 | LLR=377.78
IP → VP PU                                    | freq=83    | P=0.0076 | PR=156.98 | LLR=374.89
NP → NN CC NN                                 | freq=100   | P=0.0059 | PR=0.96 | LLR=372.70
IP → VP SP                                    | freq=75    | P=0.0069 | PR=183.71 | LLR=366.00
CP → IP SP PU                                 | freq=131   | P=0.0294 | PR=141.82 | LLR=339.85
IP → INTJ PU VP                               | freq=46    | P=0.0042 | PR=339.72 | LLR=327.11

===./outputs/cons/psydc_cons.json PCFG 产生式规则（按频率排序） ===
NP → PN                                       | freq=405362 | P=0.3313
NP → NN                                       | freq=384304 | P=0.3141
ADVP → AD                                       | freq=294804 | P=0.9250
IP → VP                                       | freq=272866 | P=0.3916
IP → NP VP                                    | freq=222805 | P=0.3197
VP → VV NP                                    | freq=180224 | P=0.1492
VP → ADVP VP                                  | freq=159355 | P=0.1319
VP → VV VP                                    | freq=127358 | P=0.1054
VP → VV                                       | freq=108984 | P=0.0902
NP → DNP NP                                   | freq=98342 | P=0.0804
VP → VV IP                                    | freq=93577 | P=0.0774
DNP → NP DEG                                   | freq=84483 | P=0.6032
VP → VA                                       | freq=80360 | P=0.0665
CP → IP DEC                                   | freq=73174 | P=0.3175
PP → P NP                                     | freq=71280 | P=0.6010
```

从结果可以看出：

- 动漫语料中出现了大量感叹结构（`INTJ → IJ`）
- “人名称呼”(NP→NR) 与 “前置话题结构”(TOP→CP) 频率显著更高
   这些都是典型的动漫角色语言特征。

> 以 MuICE 为例，其 LLR 最高的产生式为 NP → NR，该规则在 MuICE 中的概率是基准语料的近 500 倍，表明 MuICE 中人名性短语使用频率极高，这与角色对话中频繁称呼他人、带有拟人化指向的特征相吻合。紧随其后的 INTJ → IJ 和 TOP → CP 等规则亦反映了感叹句和话题前置的常用结构，突显出动漫语料中情感表达外显、句法组织更具口语化和情绪驱动的倾向。
>
> 对比之下，由于 PsyDTCorpus 聚焦于心理咨询任务，其使用的高频句式较感性化的前者来说更为中性，主要集中在如 NP → PN、NP → NN、IP → NP VP 等通用句法规则上，展示了更为规范、信息主导的语言组织方式。风格上趋于中性、理性，缺乏动漫语体中的感叹结构、叠加结构或人名引用频次。

## 附录·CTB中文树库

取自: [Chinese Tree Bank — HanLP Documentation](https://hanlp.hankcs.com/docs/annotations/constituency/ctb.html)

| Tag  | Definition                                   | 定义                                                         | 例子                               |
| ---- | -------------------------------------------- | ------------------------------------------------------------ | ---------------------------------- |
| ADJP | adjective phrase                             | 形容词短语，以形容词为中心词                                 | 不完全、大型                       |
| ADVP | adverbial phrase headed by AD (adverb)       | 副词短语，以副词为中心词                                     | 非常、很                           |
| CLP  | classifier phrase                            | 由量词构成的短语                                             | 系列、大批                         |
| CP   | clause headed by C (complementizer)          | 从句，通过带补语（如“的”、“吗”等）                           | 张三喜欢李四吗？                   |
| DNP  | phrase formed by ‘‘XP + DEG’’                | 结构为XP + DEG(的)的短语，其中XP可以是ADJP、DP、QP、PP等等，用于修饰名词短语。 | 大型的、前几年的、五年的、在上海的 |
| DP   | determiner phrase                            | 限定词短语，通常由限定词和数量词构成                         | 这三个、任何                       |
| DVP  | phrase formed by ‘‘XP + DEV’’                | 结构为XP+地的短评，用于修饰动词短语VP                        | 心情失落地、大批地                 |
| FRAG | fragment                                     | 片段                                                         | (完）                              |
| INTJ | interjection                                 | 插话，感叹语                                                 | 哈哈、切                           |
| IP   | simple clause headed by I (INFL)             | 简单子句或句子，通常不带补语（如“的”、“吗”等）               | 张三喜欢李四。                     |
| LCP  | phrase formed by ‘‘XP + LC’’                 | 用于表本地点+方位词（LC)的短语                               | 生活中、田野上                     |
| LST  | list marker                                  | 列表短语，包括标点符号                                       | 一.                                |
| MSP  | some particles                               | 其他小品词                                                   | 所、而、来、去                     |
| NN   | common noun                                  | 名词                                                         | HanLP、技术                        |
| NP   | noun phrase                                  | 名词短语，中心词通常为名词                                   | 美好生活、经济水平                 |
| PP   | preposition phrase                           | 介词短语，中心词通常为介词                                   | 在北京、据报道                     |
| PRN  | parenthetical                                | 插入语                                                       | ，（张三说)，                      |
| QP   | quantifier phrase                            | 量词短语                                                     | 三个、五百辆                       |
| TOP  | root node                                    | 根节点                                                       | 根节点                             |
| UCP  | unidentical coordination phrase              | 不对称的并列短语，指并列词两侧的短语类型不致                 | (养老、医疗）保险                  |
| VCD  | coordinated verb compound                    | 复合动词                                                     | 出版发行                           |
| VCP  | verb compounds formed by VV + VC             | VV + VC形式的动词短语                                        | 看作是                             |
| VNV  | verb compounds formed by A-not-A or A-one-A  | V不V形式的动词短语                                           | 能不能、信不信                     |
| VP   | verb phrase                                  | 动词短语，中心词通常为动词                                   | 完成任务、努力工作                 |
| VPT  | potential form V-de-R or V-bu-R              | V不R、V得R形式的动词短语                                     | 打不赢、打得过                     |
| VRD  | verb resultative compound                    | 动补结构短语                                                 | 研制成功、降下来                   |
| VSB  | verb compounds formed by a modifier + a head | 修饰语+中心词构成的动词短语                                  | 拿来支付、仰头望去                 |

## 附录·常用词性标签简表

| Tag  | 含义     | 示例             |
| ---- | -------- | ---------------- |
| NN   | 普通名词 | 公司、技术       |
| VV   | 动词     | 来、说、知道     |
| AD   | 副词     | 很、非常         |
| IJ   | 感叹词   | 哎呀、啊、欸嘿嘿 |
| PN   | 代词     | 我、你、他       |
| NR   | 专有名词 | 北京、晓美焰     |

## 参考文献

1. [上下文无关文法 - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/上下文无关文法)
2. [概率上下文无关文法 - 维基百科 --- Probabilistic context-free grammar - Wikipedia](https://en.wikipedia.org/wiki/Probabilistic_context-free_grammar)
3. [成分句法分析 | 在线演示](https://hanlp.hankcs.com/demos/con.html)
4. *(WIP)动漫领域的角色扮演训练集扩展*
