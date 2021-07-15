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

// import { join } from 'core-js/core/array';
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
    // data:储存的数据
    // attr：判断元素是否存在的属性名
    saveHistory({
        key,
        data, attr
    }) {
        // 拼接一个名字
        let name = key + 'history'
        let history = localStorage.getItem(name)
        if (history) {
            // 有储存过数据
            // 1.把存储的值先拿出来
            let arr = JSON.parse(localStorage.getItem(name))
            // 2。检测数据是否存在
            let item = null
            if (typeof data === 'string') {
                // 查找数组里面是否存在元素
                item = arr.find(i => {
                    // 如果在其他数据当中，判断的属性就不叫name而叫其他属性 变成attr 就像arr.name
                    return i[attr] === data
                })
            } else {
                console.log(data);
                item = arr.find(i => {
                    return i[attr] === data[attr]
                })
                console.log(333);
            }
            // item 如果存在 显示存在的数据 不存在 显示undefind
            // 没有数据
            if (!item) {
                if (typeof data === 'string') {
                    let obj = {
                        [attr]: data
                    }
                    arr.push(obj)
                } else {
                    arr.push(data)

                }
                localStorage.setItem(name, JSON.stringify(arr))
            }else {
                console.log(222);
            }
        } else {
            // 第一次存（
            // 把存储的数据全部转换成对象
            let arr = []
            if (typeof data === 'string') {
                let obj = {
                    name: data
                }
                arr.push(obj)
            } else {
                arr.push(data)

            }
            localStorage.setItem(name, JSON.stringify(arr))
        }
    },


    // 提取记录
    getHistory({ key }) {
        let name = key + 'history'
        let arr = localStorage.getItem(name)
        if (arr) {
            return JSON.parse(arr)
        }
    }
}