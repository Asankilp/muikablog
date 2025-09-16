---
title: 笔记·Python爬虫
published: 2021-08-20
tags: [Python]
category: 笔记
draft: false
abbrlink: 3401
---

# 下载文件

```python
import requests as r
url='https://muspace.top/index.html' #下载地址
name='My file' #下载文件名
file=r.get(url) #下载ing...
open(name,'wb').write(file.ccontent) #写入文件
```

但有机率报错：

```python
InsecureRequestWarning: Unverified HTTPS request is being made. Adding certificate verification is strongly advised. 
See: https://urllib3.readthedocs.io/en/latest/advanced-usage.html#ssl-warnings
  InsecureRequestWarning
```

解决方法：

```python
import urllib3
urllib3.disable_warnings()
```

# 爬虫时指定User-Agent

```python
headers={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36'}
response = request.get(url,headers=headers)
```

# BeautifulSoup库

```python
#解析网页信息
from re import split
import bs4
import requests as r
from bs4 import BeautifulSoup as bs

headers={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36'} #指定UA
html=r.get('https://muspace.top/index.html',headers=headers) #页面的html文件
text=html.text
tree=bs(text,'lxml') #将HTML 文档转换成树形结构

#提取信息的第一种方式
def item():
    #site-title（F12->定位数据并右键->“复制”➔“复制Selector”）
    data=tree.select('#site-title') #引用路径
    print('data:',data) #此时输出的是目标的HTML代码：[<h1 id="site-title">沐の空间</h1>]
    for item in data:
        result={
            'title':item.get_text(), #获取文本
            'link':item.get('href') #获取链接
        }
    print(result) #{'title': '沐の空间', 'link': None}
    result=result['title']
    print(result) #沐の空间

#提取信息的第二种方式
def find():
    tag=tree.find('h1') #使用find方法查到第一个h1标签(标签所处的HTML代码通常是：<h1 id="site-title">沐の空间</h1>)
    #遍历搜索的所有结果
    def finds():
        for i in tree.find('div'):
            print(i)
    input('按任意键')
    print(tag) #输出find获取到的值:<h1 id="site-title">沐の空间</h1>
    print(tag.name) #输出标签的名字:h1
    print(tag['id']) #输出标签的id属性值:site-title
    print(tag.string) #输出标签中的文本：沐の空间

#检查内容是不是注释
def check():
    import bs4
    markup = "<b><!--我打赌你肯定在看源代码--></b>" #注释本释
    soup = bs(markup,'lxml') #将HTML 文档转换成树形结构（梅开二度）
    comment = soup.b.string #提取文本信息(但是注释的类型为：bs4.element.Comment)
    if type(comment) == bs4.element.Comment:
        print('该字符是注释')
    else:
        print('该字符不是注释')

def findall():
    print(tree.find_all('title')) # 搜索文档树 输出：[<title>沐の空间 - 做自己的学习笔记</title>]
    # 完整语法为find_all(name , attrs , recursive , string , **kwargs )
    # name 参数：可以查找所有名字为 name 的tag。
    # attr 参数：就是tag里的属性。
    # string 参数：搜索文档中字符串的内容。
    # recursive 参数： 调用tag的 find_all() 方法时，Beautiful Soup会检索当前tag的所有子孙节点。如果只想搜索tag的直接子节点，可以使用参数 recursive=False 。
    def example():
        print(tree.find_all('div', 'top_part')) #输出：[<div class="top_part"></div>, <div class="top_part"></div>, <div class="top_part"></div>]
        print(tree.find_all('p')) #输出：[<p style="text-align:center">   loading...</p>]
        print(tree.find_all(id='web_bg')) #输出：[<div id="web_bg"></div>]
        import re
        print(tree.find(string=re.compile("沐の空间"))) #输出：沐の空间 - 做自己的学习笔记
    example()
```

# 实战演练1

```python
#实战演练（爬取沐の空间上面的文章cover图）
def useful():
	from re import split
	import requests as r
	from bs4 import BeautifulSoup as bs
    import shutil,os,bs4
    #新建img目录以便于存放爬取后的图片
    os.system('md img')
    imgdir=os.path.dirname(os.path.abspath(__file__))+'\img'
    #获取html文件
    web=r.get('https://muspace.top/index.html')
    #对数据进行处理
    text=web.text
    tree=bs(text,'lxml')
    data=tree.find_all('img') #寻找带有img标签的语句
    #遍历所有结果并对其进行处理
    for img in data:
        a=img['src'] #获取下载链接
        try:
            #适用于：https://cdn.jsdelivr.net/gh/WhitemuTeam/web-img/img/xxx.jpg
            name=a.split('/img/') #分块并获取名字
            name=name[1]
        except:
            try:
                #适用于：https://cdn.jsdelivr.net/gh/WhitemuTeam/web-img/xxx.jpg
                name=a.split('/web-img/')
                name=name[1]
            except:
                #其他的都不爬取
                continue
        try:
            #尝试下载，如果报错就是存在重复图片
            get=r.get(a)
            open(name,'wb').write(get.content)
            print('已保存图片',name)
            shutil.move(name,imgdir) #剪切文件
        except:
            continue
    print('爬取已完成')

if __name__=='__main__':
    useful()
```



# get传递参数

```python
import requests as r
payload = {'key1': 'value1', 'key2': 'value2'}
r = r.get("http://httpbin.org/get", params=payload)
#get的网址实际为：http://httpbin.org/get?key1=value1&key2=value2
```

# 获取网页上的文字

注意：该网页内容必须为：text（content-type: text/plain; charset=utf-8)

```python
import requests as r
web=r.get('https://v1.hitokoto.cn/?encode=text')
web.encoding='utf-8' #对文字进行编码（可选）
sen=web.text #输出文字
```

# 实战演练2

爬取小说

```python
# -*- coding:UTF-8 -*-
import requests as r
from bs4 import BeautifulSoup as bs

#指定UA
headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36 Edg/92.0.902.73'}

#爬取目录
def geturl():
    global text  
    url='https://www.bqkan8.com/25_25963/' #目录链接
    html=r.get(url,headers=headers) #开始爬取
    html.encoding='gbk' #网站使用gbk编码
    html=html.text
    tree=bs(html,'lxml') #将html转化为树形结构    
    title=tree.find_all('a') #寻找带有a标签的语句
    num=0 #统计title数量
    for i in title:
        num=num+1
    text=open('page.txt','w',encoding='utf-8') #创建txt文件以用于存放小说
    for i in range(num): #循环获取每章节的链接
        purl=title[i+41]
        purl='https://www.bqkan8.com/'+purl['href']
        page(purl)
    text.close() #保存退出
    input('爬取完毕')

#爬取每章节的文章
def page(url): 
    html=r.get(url,headers=headers).text
    tree=bs(html,'lxml')
    title=tree.find('title').string.split('_')[0] #获取标题
    page=tree.find_all(id='content')[0].text.split('　　(')[0].replace('　　','\n\n') #获取正文
    print(title,file=text)
    print(page,file=text)
    print('爬取',title,'已完成')

if __name__=='__main__':
    geturl()
```



# 从XML提取信息

`temp.xml`:

未经格式化：

```xml
<?xml version="1.0" encoding="utf-8" ?><images><image><startdate>20210813</startdate><fullstartdate>202108130900</fullstartdate><enddate>20210814</enddate><url>/th?id=OHR.UbehebeCrater_ZH-CN0157876978_1920x1080.jpg&amp;rf=LaDigue_1920x1080.jpg&amp;pid=hp</url><urlBase>/th?id=OHR.UbehebeCrater_ZH-CN0157876978</urlBase><copyright>死亡谷国家公园里的优比喜比火山口，加利福尼亚州 (© Albert Knapp/Alamy)</copyright><copyrightlink>https://www.bing.com/search?q=%E6%AD%BB%E4%BA%A1%E8%B0%B7%E5%9B%BD%E5%AE%B6%E5%85%AC%E5%9B%AD&amp;form=hpcapt&amp;mkt=zh-cn</copyrightlink><headline></headline><drk>1</drk><top>1</top><bot>1</bot><hotspots></hotspots></image><tooltips><loadMessage><message>正在加载...</message></loadMessage><previousImage><text>上一个图像</text></previousImage><nextImage><text>下一个图像</text></nextImage><play><text>播放视频</text></play><pause><text>暂停视频</text></pause></tooltips></images>
```

经格式化

```xml
<images>
	<image>
		<startdate>20210813</startdate>
		<fullstartdate>202108130900</fullstartdate>
		<enddate>20210814</enddate>
		<url>/th?id=OHR.UbehebeCrater_ZH-CN0157876978_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp</url>
		<urlBase>/th?id=OHR.UbehebeCrater_ZH-CN0157876978</urlBase>
		<copyright>死亡谷国家公园里的优比喜比火山口，加利福尼亚州 (© Albert Knapp/Alamy)</copyright>
		<copyrightlink>https://www.bing.com/search?q=%E6%AD%BB%E4%BA%A1%E8%B0%B7%E5%9B%BD%E5%AE%B6%E5%85%AC%E5%9B%AD&form=hpcapt&mkt=zh-cn</copyrightlink>
		<headline/>
		<drk>1</drk>
		<top>1</top>
		<bot>1</bot>
		<hotspots/>
	</image>
<tooltips>
	<loadMessage>
		<message>正在加载...</message>
	</loadMessage>
	<previousImage>
		<text>上一个图像</text>
	</previousImage>
	<nextImage>
		<text>下一个图像</text>
	</nextImage>
	<play>
		<text>播放视频</text>
	</play>
	<pause>
		<text>暂停视频</text>
	</pause>
	</tooltips>
</images>
```

Python源码：

```python
from xml.dom import minidom
dom=minidom.parse("temp.xml") #加载和读取XML文件
root=dom.documentElement #获取XML文档对象
msg = root.getElementsByTagName('copyright') #数据所在节点名
information1 = msg[0].firstChild.data #获取文本名
print('拍摄地(作者)：',information1)
```

# post

```python
import requests as r
import json

#部分数据需要到F12->网络->XHR->xxx获取
def http():
    mydata={'value1':'abc'} #表单数据：
    url='http://httpbin.org/post' #请求地址
    back=r.post(url,data=mydata) #post
    sen=json.loads(back.text) #格式化数据
    fin=sen['form'] #提取form数据
    print(fin) #输出结果

if __name__=='__main__':
    http()
```

