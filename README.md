# 分页插件

## 参数
** obj **         //需要渲染的dom盒子

** iNowPage **    //当前选中页码

** pageTotal **   //页码总数

** pageMax **     //页面显示最大页码格数

** callbackFn **  //点击事件回调函数  传入一个对象，里面有当前点击页码的参数

## 案例

```
var page = Util.pageRender({
	obj : $('#page'),
	iNowPage : 1,
	pageMax : 10,
	pageTotal : 99,
	callbackFn : function(opts){
		fn && fn(opts)
	}
});
page.init();
```
