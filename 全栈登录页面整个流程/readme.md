# 目标
+ node编写接口 map装进接口地址和方法 服务器server目录分层
     + index.js:入口文件js 负责执行总逻辑
     + config.js: 读取server.config文件 把数据转换为map object格式
     + loader.js: 读取web目录下面的controller文件 把他set进map方法  接口：方法
     + dao: db层跟数据库交道
     + pages: 页面文件
     + service:  
     + web:编写接口
+ 系统在几点出错 打印日志 方便排查