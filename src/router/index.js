const fs = require('fs');

//导入路由
const Router = require('koa-router');

//创建路由实例
const router = new Router();

//导入各个路由模块
try {
    fs.readdirSync(__dirname).forEach(file => {
        if (file !== 'index.js') {
            const route_ = require(`./` + file)
            router.use(route_.routes())
            router.use(route_.allowedMethods())
        }

    })
} catch (err) {
    console.error(err);
    console.error('路由加载失败');

}

module.exports = router;

