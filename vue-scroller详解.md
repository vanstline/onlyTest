###  常规格式

```javascript
<scroller
    :on-refresh="refresh"
    :on-infinite="infinite"
	ref="myscroller"
    >
</scroller>
```

滚动分为上、下 两种情况 可以根据不同的函数来执行不同的事件

### `:on-refresh="refresh"` 一般作用于下拉刷新

1. 不会自动执行

2. 当下拉至 `transform: translate3d(0px, 60px, 0px) scale(1);`的时候 会触发刷新事件

   在这里需要事件执行到这里的时候 需要添加 `this.$refs.myscroller.finishPullToRefresh();` 停止下拉刷新 否则父容器会一直卡在60px 区域，不会回弹到其实位置

3. 如果需要在刷新完成后有一个弹窗提醒的话 ，可以在刷新结束的时候 添加`this.$vux.toast.text('刷新成功','top')`

   这里第二个参数 接受任意值 作用决定于弹窗显示的位置： top 是在顶部区域 bottom 会显示在底部区域 其他任何参数 都会显示在中部偏上的位置，弹窗都是默认左右居中的

`this.$refs.myscroller.finishPullToRefresh()`   停止拉扯刷新，否则整个容器会一直卡在 60px 的位置上不会回到其实位置

### `:on-infinite="infinite"` 处理上拉无限加载

- 该事件会在页面初始化的时候 自动执行，解决办法设置一个变量为false  用布尔值来控制函数是否 return 
- 是上拉无限加载，不是只执行一次，当父容器滚动到页尾的时候会自动触发该事件 （在第一次测试的时候纠结了好久 怎么停不下来），解决办法很简单  当滚动不是页尾的时候 就会终止该事件 ，或者有下面后内容加载填充撑起父容器的时候 该问题就不复存在了
- ​

