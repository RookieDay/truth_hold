import config from './config'

export function showSuccess(params) {
    uni.showToast({
        title: params,
        icon: 'success'
    })
}


export function showModal(title, content) {
    uni.showModal({
        title: title,
        content: content,
        showCancel: false
    })
}

export function request(url, method, data) {
    return new Promise((resolve, reject) => {
        uni.request({
            url: config.host + url,
            method,
            data: data,
            success: (res) => {
                console.log('请求成功....')
                if (res.data.code === 0) {
                    resolve(res.data.data)
                } else {
                    reject(res.data)
                }
            }
        })
    })
}

export function get(url, data) {
    return request(url, 'GET', data)
}

export function post(url, data) {
    return request(url, 'POST', data)
}   