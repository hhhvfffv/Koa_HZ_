
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
    }
}