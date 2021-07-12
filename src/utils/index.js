// 莫块化（es 6提供）
// 导入和导出
// 其他文件可以使用该文件和变量和方法
// 默认导出
// export default：默认导出 ：导处变量 数组 对象 方法 只能导出一次
// 
// export 导处变量 数组 对象 方法 但是要加let 或者const 能导出多次

// export default{

// }
// 导入 import 名字 from ‘地址’
// import  * as 名字  form ‘地址’(与上面区别为这个导出了所有内容这个文件)


// export let a = 10
// export let a =()=>{

// }
// 导入 import {名字}  from 地址

import { Dialog } from 'vant';



export default {
    // 检测用户是否登陆
    checkLoggin({ key, next, item }) {
        // 检测本地是否有用户信息
        // key是用户传过来存到本地的名字
        // next：传入一个函数 下一步的操作
        // item：next 函数需要的参数
        // let user =localStorage.getItem(key)
        if (key) {
            // 已经登陆
            // 继续下部操作
            next(item)
        } else {
            // 未登陆
            Dialog({ message: '请登陆' });
        }
    },

    // 储存记录 （浏览记录（browse）搜索记录（search）。。。
    // key：储存的名字
    // data:数据id
    // attr：判断元素是否存在的属性名
    saveHistory({
        key, data, attr
    }) {
        let dataids = data + 'History'
        let history = localStorage.getItem(dataids)
        if (history) {
            // 之前已经存储过
            let arr = JSON.parse(localStorage.getItem('浏览记录'))
            let item = null
            if (typeof data === 'string') {
                item = arr.find(i => {
                    return i[attr] === data
                })
            } else {
                item = arr.find(i => {
                    return i[attr] === data[attr]
                })
                if (!item) {
                    if (typeof data === 'string') {
                        let obj = {
                            [attr]: data
                        }
                        arr.push(obj)
                    } else {
                        arr.push(data)
                    }
                    localStorage.setItem('浏览记录', JSON.stringify(arr))
                }
            }
        } else {
            // 第一次存储
            // 把存储的数据都转换成对象 
            let arr = []
            console.log(arr);
            if (typeof data === 'string') {
                let obj = {
                    ids: data
                }
                arr.push(obj)
            } else {
                arr.push(data)
            }
            localStorage.setItem('浏览记录', JSON.stringify(arr))
        }
    }
}