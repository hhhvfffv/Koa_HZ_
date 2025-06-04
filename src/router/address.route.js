
const Router = require('koa-router');
const { getUserTokenInfo } = require('../middleWare/auth.middleWare');
const { FieldValidation } = require('../middleWare/cart.middleWare');
const { crete, update, findAll, remove } = require('../controller/address.controller');
const { findIsTure } = require('../middleWare/address.middleWere');
const router = new Router({ prefix: '/address' });

/**
 * 新建地址
 */
router.post('/', getUserTokenInfo, FieldValidation({
    consignee: { type: "string", required: true, allowEmpty: false, min: 2, max: 20 },
    Telephone: { type: 'string', format: /^1[34578]\d{9}$/, required: true },
    address: { type: "string", required: true, allowEmpty: false, min: 2, max: 100 },
    isdefault: { type: "boolean", required: false }
}), crete)

/**
 * 更新地址
 */
router.put('/:id', getUserTokenInfo,
    FieldValidation({
        consignee: { type: "string", required: false, allowEmpty: false, min: 2, max: 20 },
        Telephone: { type: 'string', format: /^1[34578]\d{9}$/, required: false },
        address: { type: "string", required: false, allowEmpty: false, min: 2, max: 100 },
        isdefault: { type: "boolean", required: false }
    }),
    findIsTure,
    update)

/**
 * 分页查询
 */
router.get('/', getUserTokenInfo, findAll)

/**
 * 删除地址
 */
router.delete('/:id', getUserTokenInfo, findIsTure, remove)

module.exports = router;