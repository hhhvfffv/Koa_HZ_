
/**
 * 1.用户账户输入有空值
 */
const isUserHaveNull = {
    code: "10001",
    message: "用户账户输入用户名或密码有空值",
    result: ""
}

/**
 * 与数据库有重复
 */
const isUserRepeat = {
    code: "10002",
    message: "用户账户已存在",
    result: ""
}

//导出
module.exports = {
    isUserHaveNull, // 用户账户输入有空值
    isUserRepeat   // 与数据库有重复
}