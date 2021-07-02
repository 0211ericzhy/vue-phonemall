// 封装所有请求
import http from "./index";
export default {
    // 获取首页数据
    recommend() {
        return http.get('/recommend')
    },
    //搜索
    search(value, page = 1) {
        return http.post('/search', {
            value,
            page
        })
    },
    // 分类查询
    category(id) {
        return http.get(`/classification?mallSubId=${id}`)
    },
    // 查询获取购物车数据(post)
    getCard() {
        return http.post(`/getCard`)
    },
    //购物车加减商品
    editCart(count, id, mallPrice) {
        return http.post('/editCart', {
            count,
            id,
            mallPrice
        })
    },
    // 购物车商品删除
    deleteShop(id) {
        return http.post('/deleteShop', id)
    },
    // 购物车支付页面(post)
    placeOrder({ address,
        tel,
        orderId,
        totalPrice,
        idDirect,
        count }) {
        return axios.post('/order', {
            address,
            tel,
            orderId,
            totalPrice,
            idDirect,
            count
        })
    },
    // 单个商品详情
    goodOne(id, page = 1) {
        return http.get(`/goods/one?id=${id}&page=${page}`)
    },
    // 收藏单个商品(post)
    collection(goods) {
        return http.post('/collection', goods)
    },
    // 取消收藏(post)
    cancelCollection(id) {
        return http.post('/cancelCollection', { id })
    },
    // 查询商品是否已收藏(post)
    isCollection(id) {
        return http.post(`/isCollection`, { id })
    },
    // 加入购物车(post)
    addShop(id) {
        return http.post(`/addShop`, { id })
    },
    // 退出登录(post)
    loginOut() {
        return http.post(`/loginOut`)
    },
    // 获取用户信息(post)
    user() {
        return http.post(`/queryUser`)
    },
    // 修改保存用户信息(post)
    saveUser({ gender,
        year,
        month,
        day,
        id,
        nickname }) {
        return http.post(`/saveUser`, {
            gender,
            year,
            month,
            day,
            id,
            nickname
        })
    },
    //  商品评论(post)
    getOrderNum({ id,
        rate,
        content,
        anonymous,
        _id,
        order_id,
        image: [] }) {
        return http.get(`/myOrder/orderNum`, {
            id,
            rate,
            content,
            anonymous,
            _id,
            order_id,
            image: []
        })
    },
    // 查询用户收货地址(get)
    getAddress() {
        return http.get(`/getAddress`)
    },
    // 查询默认收货地址(get)
    getDefaultAddress() {
        return http.get(`/getDefaultAddress`)
    },
    // 20. 设置默认收货地址(post)
    setDefaultAddress(id) {
        return http.post(`/setDefaultAddress`, { id })
    },
    // 21. 增加收货地址(post)
    postAddress({ name,
        tel,
        address,
        isDefault,
        province,
        city,
        county,
        addressDetail,
        areaCode,
        id }) {
        return http.http(`/address`, {
            name,
            tel,
            address,
            isDefault,
            province,
            city,
            county,
            addressDetail,
            areaCode,
            id
        })
    },
    // 22. 删除地址(post)
    deleteAddress({ id }) {
        return http.post('/deleteAddress', {
            id
        })
    },
    // 注册(post)
    register(nickname, password, verify) {
        return http.post('/register', {
            nickname,
            password,
            verify,
        })
    },
    // 登录(post)
    login(nickname, password, verify,) {
        return http.post('/login', {
            nickname,
            password,
            verify
        })
    },
    // 订单查询(get)
    getMyOrder() {
        return http.get(`/myOrder`)
    },
    // 查询已评价(get)
    alreadyEvaluated(page = 1) {
        return http.get('/alreadyEvaluated', {
            params: { page }
        })
    },
    //  查询未评价(get)
    tobeEvaluated(page = 1) {
        return http.get('/tobeEvaluated', {
            params: { page }
        })
    },
    //  查询单条评论(post)
    evaluateOne(id, _id) {
        return axios.post('/evaluateOne', {
            id, _id
        })
    },
}