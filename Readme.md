# supply-goods-chain

  基于React+Nodejs的餐饮供应链物资管理系统

## 项目运行

- 使用`git clone 项目地址`命令拷贝项目到本地
- 运行`npm run server`命令启动后端服务
- 运行`npm start`命令启动前端服务
- 浏览器访问[localhost:8000](localhost:8000)，或等待浏览器自动打开该页面，即可查看效果

- 开发环境前端打包命令`npm run build:dev`
- 生产环境前端打包命令`npm run build:pro`

## 项目架构说明

```js
+ supply-chain
   + client
      + dist // 编译并打包后的文件
        + img
        + js
        + css
        + index.html // 前端入口文件
      + src
         + assets // 图片等静态资源
         + components // 一些公用组件
         + containers // 容器组件
         + redux // 和redux有关的文件
            + actions // action文件
            + reducers // reducer文件
            + store // 初始化的store
         + routes // 路由相关文件
            + routes.js
         + index.js // 整个前端项目的入口文件
   + server // 服务端文件
      + bin // node项目启动文件
         + www
      + models // Model层
      + services // Services层
      + utils // 后端用工具类
         + api.js // 封装使api可以写入每个service的init中
         + connection.js // 负责数据库连接
         + helper.js // 工具类
      + app.js // 项目入口及程序启动文件
   + package.json  
   + .babelrc
   + .editorconfig
   + .eslintignore
   + .eslintrc
   + .gitignore
   + Readme.md
   + webpack.config.js
```

## 业务流程图

![业务流程梳理](http://ww1.sinaimg.cn/large/006gU7ahly1g0huthcix2j30za0qumxr.jpg)

## 项目任务看板

- [x] 项目框架搭建
- [x] 登录模块
- [x] 注册模块
- [x] 首页
- [x] 门店档案模块
- [x] 总部档案模块
- [x] 供应商档案模块
- [x] 物品档案模块
- [x] 门店请购模块
- [x] 门店自采模块
- [x] 门店请购验收模块
- [x] 门店自采验收模块
- [x] 门店入库流水模块
- [x] 门店库存管理模块
- [x] 总部订单管理模块
- [x] 供应商订单管理模块
- [ ] 细节优化

