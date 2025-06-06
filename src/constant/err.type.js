//导出
module.exports = {
    isUserHaveNull: {
        code: "10001",
        message: "用户账户输入用户名或密码有空值",
        result: ""
    },

    isUserRepeat: {
        code: "10002",
        message: "用户账户已存在",
        result: ""
    },


    userRegisterError: {
        code: '10003',
        message: '服务器的土豆服务器or土豆mysql出现异常，或者不小心大了一堆符号',
        result: ''
    },

    isUserNotExist: {
        code: '10004',
        message: '用户账户不存在',
        result: ''
    },
    isDataSlectError: {
        code: '10005',
        message: '数据查询失败',
        result: ''
    },

    isPasswordError: {
        code: '10006',
        message: '密码错误',
        result: ''
    },
    TokenExpiredError: {
        code: '10007',
        message: 'token过期',
        result: ''
    },

    JsonWebTokenError: {
        code: '10008',
        message: 'token无效',
        result: ''
    },

    NotBeforeError: {
        code: '10009',
        message: 'token还未激活',
        result: ''
    },
    notIsAdmain: {
        code: '10010',
        message: '不是管理员',
        result: ''
    },
    ParameterError: {
        code: '10011',
        message: '参数错误,或者缺少字段',
        result: ''
    },
    createGoodsError: {
        code: '10012',
        message: '商品创建失败,数据库操作错误',
        result: ''
    },
    selectGoodsError: {
        code: '10013',
        message: '商品查询失败,数据库操作错误',
        result: ''
    },
    DuplicateProductError: {
        code: '10014',
        message: '商品名称重复',
        result: ''
    },
    updateGoodsError: {
        code: '10015',
        message: '商品更新失败,数据库操作错误',
        result: ''
    },
    notFoundIdError: {
        code: '10016',
        message: '你确定你传的id是存在的吗',
        result: ''
    },
    removeGoodsError: {
        code: '10017',
        message: '商品下架失败,数据库操作错误',
        result: ''
    },
    repeatedRemovalError: {
        code: '10018',
        message: '商品重复下架',
        result: ''
    },
    restoreGoodsError: {
        code: '10019',
        message: '商品恢复上架失败,数据库操作错误',
        result: ''
    },
    repeatedRestoreError: {
        code: '10020',
        message: '商品重复恢复上架',
        result: ''
    },
    selectPageGoodsError: {
        code: '10021',
        message: '分页查询商品失败,数据库操作错误',
        result: ''
    },
    resultIsEmpty: {
        code: '10022',
        message: '查询结果为空',
        result: ''
    },
    ParameterCartError: {
        code: '10023',
        message: '购物车参数错误',
        result: ''
    },
    notFountIdError: {
        code: '10024',
        message: '商品下架中',
        result: ''
    },
    isNullFountError: {
        code: '10025',
        message: '商品不存在',
        result: ''
    },
    isAddCartError: {
        code: '10026',
        message: '添加购物车失败',
        result: ''
    },
    isFoundPageError: {
        code: '10027',
        message: '分页查询失败',
        result: ''
    },
    isUpdateCartError: {
        code: '10028',
        message: '更新购物车失败',
        result: ''
    },
    isNullError: {
        code: '10029',
        message: '参数为空，必要参数cart_num,和selected',
        result: ''
    },
    isRemooveError: {
        code: '10030',
        message: '删除购物车失败',
        result: ''
    },
    selectAllError: {
        code: '10031',
        message: '全选/全不选所有商品失败',
        result: ''
    },
    createAddressError: {
        code: '10032',
        message: '创建地址失败',
        result: ''
    },
    findIdError: {
        code: '10033',
        message: '地址id不存在',
        result: ''
    },
    pageSelectError: {
        code: '10034',
        message: '分页查询失败',
        result: ''
    },
    removeAddressError: {
        code: '10035',
        message: '删除地址失败',
        result: ''
    },
    createOrderMiddleWareError: {
        code: '10036',
        message: '订单中间件错误',
        result: ''
    },
    createOrderError: {
        code: '10037',
        message: '订单创建失败,数据库操作错误',
        result: ''
    },
    clearCartError: {
        code: '10037',
        message: "清空购物车失败",
        result: ''
    },
    createGoodOrderError: {
        code: '10038',
        message: '商品订单创建失败,数据库操作错误',
        result: ''
    },
    cancelOrderError: {
        code: '10039',
        message: '订单取消失败,数据库操作错误',
        result: ''
    },
    goodsNumIsNullError: {
        code: '10040',
        message: '商品数量不足',
        result: ''
    },
    cancelOrderMiddleWareError: {
        code: '10041',
        message: '订单取消中间件错误，操作数据库错误',
        result: ''
    }
}