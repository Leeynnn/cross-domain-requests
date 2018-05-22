class CrossDomain {
    constructor (url) {
        this.cache = []
        this.loaded = false
        this.url = url
        this.iframe = document.createElement('iframe')
        this.iframe.src = url
        this.iframe.style.display = 'none'
        this.iframe.style.width = '0'
        this.iframe.style.height = '0'
        this.iframe.onload = this.loadFunction.bind(this)
        document.body.appendChild(this.iframe)
    }
    loadFunction () {
        this.loaded = true
        for (let i = 0; i < this.cache.length; i++) {
            this.ajax(this.cache[i].data, this.cache[i].callback)
        }
        this.cache = []
    }
    ajax (data, callback) {
        // data 示例
        // {
        //     method: 'GET',
        //     url: '',
        //     data: {
        //         a: 1,
        //         b: 2
        //     }
        // }
        if (!this.loaded) {
            this.cache.push({
                data: data,
                callback: callback
            })
            console.log('please waite until the CrossDomain created!')
        } else {
            this.iframe.contentWindow.postMessage(data, this.url)
            this.addEvent(window, 'message', function (d) {
                callback(d)
            })
        }
    }
    addEvent (elem, type, handler) {
        if (window.addEventListener) {
            elem.addEventListener(type, handler, false)
            this.addEvent = function (elem, type, handler) {
                elem.addEventListener(type, handler, false)
            }
        } else {
            elem.attachEvent('on' + type, handler)
            this.addEvent = function (elem, type, handler) {
                elem.attachEvent('on' + type, handler)
            }
        }
    }
}
// 转发层js示例
// window.addEventListener('message', (data) => {
//     let _data = data.data
//     $.ajax({
//         method: _data.method,
//         url: _data.url,
//         data: _data.data
//     }, function (d) {
//         window.parent.postMessage(d, '*')
//     })
// })

export default CrossDomain
