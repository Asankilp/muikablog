---
title: 笔记·将MineCraft3D皮肤转换为4D皮肤
published: 2024-07-29
description: 别碰，有时之沙
tags: [MineCraft]
category: 笔记
draft: false
abbrlink: 24648
---
因为在MCC服务器不能用自己的3D皮肤，所以折腾了一个下午，把自己的3D皮肤转换成了4D皮肤，以下是过程。

![效果展示](https://img.snowy.moe/2024/image-20240728235932932.png)

# 前提准备

1. 一张你自己的皮肤图片
2. [Blockbench](https://www.blockbench.net/)。一个建模工具
3. [Bedrock Launcher](https://bedrocklauncher.github.io/)：用它下载的基岩版副本来更方便地更改游戏文件

# 你知道吗

你需要先了解[基岩版皮肤包](https://learn.microsoft.com/zh-cn/minecraft/creator/documents/packagingaskinpack)的文件夹和文件结构以便理解下面转换的过程。

# 转换过程

· 打开Bedrock Launcher，登录你的微软账号，然后进入游戏。
· 进入游戏后退出，转到Bedrock Launcher的设置，版本，进入游戏对应版本的文件夹。
· 进入data/skin_packs文件夹，为vanilla建立一个备份，以便在必要时回退。
· 进入vanilla文件夹，找到`geometry.json`，用Blockbench打开（文件->打开模型），选择`geometry.humanoid.custom`
· 在左下方纹理栏中，点击导入纹理图标，选择你的皮肤图片。
· 如果一切正常，你应该可以看到你的3D皮肤建模，点击文件->导出->导出基岩版几何，将新的.json文件命名为`new_skin.json`
· 接下来你需要调整`new_skin.json`，用文本编辑器（vscode）打开`new_skin.json`，按以下格式调整json文件

```json
{
	"geometry.MoemuSkin1": {
      "texture_width": 64,
      "texture_height": 64,
      "visible_bounds_width": 3,
      "visible_bounds_height": 3,
      "visible_bounds_offset": [0, 1.5, 0],
			"bones": [
				{
					"name": "root",
					"pivot": [0, 0, 0]
				},
				{
					"name": "waist",
					"parent": "root",
					"pivot": [0, 12, 0]
				},
				{
					"name": "body",
					"parent": "waist",
					"pivot": [0, 24, 0],
					"cubes": [
						{"origin": [-4, 12, -2], "size": [8, 12, 4], "uv": [16, 16]}
					]
				},
				{
					"name": "head",
					"parent": "body",
					"pivot": [0, 24, 0],
					"cubes": [
						{"origin": [-4, 24, -4], "size": [8, 8, 8], "uv": [0, 0]}
					]
				},
				{
					"name": "hat",
					"parent": "head",
					"pivot": [0, 24, 0],
					"cubes": [
						{"origin": [-4, 24, -4], "size": [8, 8, 8], "inflate": 0.5, "uv": [32, 0]}
					]
				},
				{
					"name": "cape",
					"parent": "body",
					"pivot": [0, 24, 3]
				},
				{
					"name": "leftArm",
					"parent": "body",
					"pivot": [5, 22, 0],
					"cubes": [
						{"origin": [4, 12, -2], "size": [4, 12, 4], "uv": [32, 48]}
					]
				},
				{
					"name": "leftSleeve",
					"parent": "leftArm",
					"pivot": [5, 22, 0],
					"cubes": [
						{"origin": [4, 12, -2], "size": [4, 12, 4], "inflate": 0.25, "uv": [48, 48]}
					]
				},
				{
					"name": "leftItem",
					"parent": "leftArm",
					"pivot": [6, 15, 1]
				},
				{
					"name": "rightArm",
					"parent": "body",
					"pivot": [-5, 22, 0],
					"cubes": [
						{"origin": [-8, 12, -2], "size": [4, 12, 4], "uv": [40, 16]}
					]
				},
				{
					"name": "rightSleeve",
					"parent": "rightArm",
					"pivot": [-5, 22, 0],
					"cubes": [
						{"origin": [-8, 12, -2], "size": [4, 12, 4], "inflate": 0.25, "uv": [40, 32]}
					]
				},
				{
					"name": "rightItem",
					"parent": "rightArm",
					"pivot": [-6, 15, 1],
					"locators": {
						"lead_hold": [-6, 15, 1]
					}
				},
				{
					"name": "jacket",
					"parent": "body",
					"pivot": [0, 24, 0],
					"cubes": [
						{"origin": [-4, 12, -2], "size": [8, 12, 4], "inflate": 0.25, "uv": [16, 32]}
					]
				},
				{
					"name": "leftLeg",
					"parent": "root",
					"pivot": [1.9, 12, 0],
					"cubes": [
						{"origin": [-0.1, 0, -2], "size": [4, 12, 4], "uv": [16, 48]}
					]
				},
				{
					"name": "leftPants",
					"parent": "leftLeg",
					"pivot": [1.9, 12, 0],
					"cubes": [
						{"origin": [-0.1, 0, -2], "size": [4, 12, 4], "inflate": 0.25, "uv": [0, 48]}
					]
				},
				{
					"name": "rightLeg",
					"parent": "root",
					"pivot": [-1.9, 12, 0],
					"cubes": [
						{"origin": [-3.9, 0, -2], "size": [4, 12, 4], "uv": [0, 16]}
					]
				},
				{
					"name": "rightPants",
					"parent": "rightLeg",
					"pivot": [-1.9, 12, 0],
					"cubes": [
						{"origin": [-3.9, 0, -2], "size": [4, 12, 4], "inflate": 0.25, "uv": [0, 32]}
					]
				}
			]
		}
}

```

其中，`geometry.MoemuSkin1`中的`MoemuSkin1`是你的皮肤名字，也就是[打包皮肤包](https://learn.microsoft.com/zh-cn/minecraft/creator/documents/packagingaskinpack)里面的`TemplateSkin1TemplateSkin1`，除了改变这个值，你不应该改变任何数字。

· 调整完毕后，接下来我们要合并至MC目录下的`geometry.json`，打开`geometry.json`。你有两种选择，一是全部删了然后把调整后的`new_skin.json`里面的内容全部复制进去，要么参考以上格式把`geometry.json`先转换一下然后再按照json格式复制粘贴一下。这里我们因为省事先用第一种方法。

· 打开`skins.json`文件，参考[打包皮肤包](https://learn.microsoft.com/zh-cn/minecraft/creator/documents/packagingaskinpack)把内容重新再填一遍，示例如下：

```json
{
    "serialize_name": "MoemuSkin",
    "localization_name": "MoemuSkin",
    "skins": [
      {
        "localization_name": "MoemuSkin1",
        "geometry": "geometry.MoemuSkin1",
        "texture": "Moemu.png",
        "type": "free"
      }
    ]
  }
```

· 把你的皮肤图片拖到这些json文件所在的文件夹下，然后更改`texture`项，确保`texture`所对应的文件存在。

· 打开`manifest.json`文件，参考[打包皮肤包](https://learn.microsoft.com/zh-cn/minecraft/creator/documents/packagingaskinpack)把内容重新再填一遍，示例如下

```json
{
    "header": {
      "name": "MoemuSkinPack",
      "version": [1, 0, 0],
      "uuid": "<Your uuid1>"
    },
    "modules": [
      {
        "version": [1, 0, 0],
        "type": "skin_pack",
        "uuid": "<Your uuid2>"
      }
    ],
    "format_version": 1
  }
```

请确保你已经生成了两个唯一的uuid标识符，如果你的uuid标识符与别人重复，你就有可能无法上传你的皮肤模型

· 打开游戏，转到更衣室->经典皮肤选项卡，你应该看到你的皮肤。如果什么都没有，那就是上面的某一步出现问题了。但无论你是不是按照上面的教程一步一步走，你都会看到商店里面的皮肤无法加载，这就是这个方法的弊端。（但是两种方法都会有这个问题）

上述过程我们简称为改包，只要别人在设置中关闭了`仅允许受信任的皮肤`都可以看到你的皮肤。

# 如何将一张任意一张表情包制作成皮肤

![效果展示](https://img.snowy.moe/2024/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202024-07-28%20232459.png)按照这个过程你可以将任何一张表情包制作成“纸片人”皮肤。

你需要将该表情包转换成128x128大小, .png格式

和上述过程类似，但是你需要使用特定的`geometry.json`文件，自己跑去Blockbench建模很容易无法识别。

```json
{
	"geometry.JinghuaSkin1": {
    "bones": [
      {
        "name": "root",
        "pivot": [0,0,0]
      },
      {
        "name": "body",
        "parent": "waist",
        "pivot": [0,24,0],
        "poly_mesh": {
          "normalized_uvs": true,
          "normals": [
            [0,0,-1]
          ],
          "positions": [
            [-23.642477,0.103634,-0.000001],
            [23.642469,0.103629,-0.000001],
            [23.642477,47.388577,0.000009],
            [-23.642469,47.38858,0.000009]
          ],
          "uvs": [[0,0],[1,0],[1,1],[0,1]],
          "polys": [[[0,0,0],[1,0,1],[2,0,2],[3,0,3]]]
        }
      },
      {
        "name": "waist",
        "parent": "root",
        "pivot": [0,99999,0]
      },
      {
        "name": "head",
        "parent": "body",
        "pivot": [0,99999,0]
      },
      {
        "name": "cape",
        "pivot": [0,99999,3],
        "parent": "body"
      },
      {
        "name": "hat",
        "parent": "head",
        "pivot": [0,99999,0]
      },
      {
        "name": "leftArm",
        "parent": "body",
        "pivot": [5,99999,0]
      },
      {
        "name": "leftSleeve",
        "parent": "leftArm",
        "pivot": [5,99999,0]
      },
      {
        "name": "leftItem",
        "pivot": [6,99999,1],
        "parent": "leftArm"
      },
      {
        "name": "rightArm",
        "parent": "body",
        "pivot": [-5,99999,0]
      },
      {
        "name": "rightSleeve",
        "parent": "rightArm",
        "pivot": [-5,99999,0]
      },
      {
        "name": "rightItem",
        "pivot": [-6,99999,1],
        "locators": {
          "lead_hold": [-6,15,1]
        },
        "parent": "rightArm"
      },
      {
        "name": "leftLeg",
        "parent": "root",
        "pivot": [1.9,99999,0
        ]
      },
      {
        "name": "leftPants",
        "parent": "leftLeg",
        "pivot": [1.9,99999,0]
      },
      {
        "name": "rightLeg",
        "parent": "root",
        "pivot": [-1.9,99999,0]
      },
      {
        "name": "rightPants",
        "parent": "rightLeg",
        "pivot": [-1.9,99999,0
        ]
      },
      {
        "name": "jacket",
        "parent": "body",
        "pivot": [0,999999,0]
      }
    ],
    "texturewidth": 225,
    "textureheight": 225
  }
}
```

之后的过程不再叙述了，上面都有。
