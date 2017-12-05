# 开眼视频官网

>依赖React技术栈构建的开眼视频官网

## 预览

在线预览地址：http://www.kaiyanapp.com/
（与官网效果一致）

## 构建工具

**create-react-app**

## 技术栈

- **React**：React框架
- **React-router4**：React路由
- **mobx**：React状态管理工具
- **styled-component**：组织React组件样式
- **axios**：http请求
- **fastclick**：去除移动端点击延迟

## 启动项目
``` bash
#git clone
https://github.com/snowballer/Eyepetizer-app-v4.git

# install create-react-app
npm install -g create-react-app

# install dependencies
npm install

# serve with hot reload at localhost:3000
npm start

# build for production with minification
npm run build

```

## 疑难解析

**跨域问题**：项目中遇到了跨域问题，参阅了create-react-app官方github上的跨域解决方法，在package.json添加proxy，成功解决

```json
{
  "name": "eyepetizer-app",
  "version": "0.1.0",
  "private": true,
  "proxy":"http://baobab.kaiyanapp.com"
}
```

**组件更新**：针对不同路由路径下同一组件的如何更新问题困扰了很久，在简书、segmentfault及stackoverflow进行了搜索和询问，查阅了组件更新的控制方式，componentWillReceiveProps虽然能通过比较两次props的不同进行更新，但会造成redux的action混乱的问题，最终查阅虚拟DOM的组件key的底层原理，给组件加上唯一值key解决了问题，加深了对虚拟DOM的组件key的理解

```javascript
const FinalDetail = connect(
  ({ playVideoInfo, videoListInfo, replyListInfo }) =>
  ({ playVideoInfo, videoListInfo, replyListInfo }),actions
)(Detail);

export default function (props) {
  return (<FinalDetail {...props} key={props.match.url} />);
}
```

**Router history**：如果采用hashhistory，路径匹配时会多出/#/部分，为了url的纯净优雅，采用了BrowserHistory，但同时发现路由会出现匹配不到页面时跳转到首页的问题，因此在路由中增加了其他路径匹配NotFound组件

```javascript
import createHistory from 'history/createBrowserHistory'
export const history = createHistory();
const routeconfig =(
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/detail/:id" component={Detail}></Route>
      <Route component={NotFound}></Route>
    </Switch>
  </ConnectedRouter>
);
```

## 项目心得

**React-router**：React-router的v4版本相较于之前的v2及v3版本有了较大幅度的更新，api的变动很大，新版的router也是组件化一部分，组件化的思想更深入了，具体api改动请查阅官方说明

**mobx**：基于mobx的状态管理更加简洁明了，但相对，状态流并不如redux清晰，简单的项目采用mobx比较好。

**styled-component**：css采用styled-component库实现，相较于传统的css写法，此种写法class类名自动随机生成，更有效地避免了classname命名管理混乱的状态，而且该库把css跟组件相结合，更符合组件化的思想
