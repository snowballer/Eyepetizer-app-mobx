//入口文件
import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import { Provider } from 'mobx-react';
import { useStrict } from 'mobx';
import * as store from './stores';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//使用严格模式，即只响应action来更新状态
useStrict(true);

//去除移动端延迟
if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body);
	}, false);
}

// 组件挂载
// {...store}注入数据
ReactDOM.render(
	<Provider {...store}>
		 <App />
	</Provider>,
	document.getElementById('root')
);

//注册ServiceWorker以获取类似native app的离线体验
registerServiceWorker();
