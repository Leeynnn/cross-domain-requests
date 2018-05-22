#cross-domain-requests
##可以用来实现跨域请求，把请求信息委托给中间层去转发请求并获取数据并返回
##更有意义的是可以实现前后端分离，把所有请求委托给中间层去转发，并在中间层处理返回的数据，中间层把能直接使用的数据返回给视图层
###CrossDomain 对象的使用示例
```javascript
let crossDomain = new CrossDomain('') // 中间层地址
crossDomain.ajax({
    method: 'GET' // POST
    url: '', // 需要转发的请求地址
    data: '' // 请求对象
  }, function (data) {
    // 回调函数
  })
  // 当然ajax方法第一个传的参数可以根据自己需要去更改，并不是一定要这么传一个对象，但是一定是要跟中间层约定好的内容
  // 例如，你不想在前端暴露请求地址，可以通过视图层和中间层约定好的键值对在中间层匹配对应的请求地址
```
# 转发层示例
```javascript
window.addEventListener('message', (data) => {
  let _data = data.data
  $.ajax({
      method: _data.method,
      url: _data.url,
      data: _data.data
  }, function (d) {
      window.parent.postMessage(d, '*')
  })
})
```
