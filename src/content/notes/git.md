---
title: Git
published: '2021/6/13 16:45:00'
---

注意：本教程省略前面配置

# 建立仓库

```bash
git init
```

# 关联仓库

注意：需获取仓库地址

```bash
git remote add origin git@github.com:<your username>/<your repository>
```

# 创建分支

```bash
git checkout -b <branch>
```



# 添加文件（全部）

```bash
git add .
```
```bash
git commit -m "Upload"
```

# 解决冲突

```bash
git pull --rebase origin master
```



# 上传文件

注意：master代表你的分支名

```bash
git push -u origin master
```

