const { mysql } = require('../qcloud')

module.exports = async(ctx) => {
    const { openid, page } = ctx.request.query
    console.log('records: ', openid)
    try {
        const records = await mysql('records')
                                .where('openid', openid)
                                .orderBy('id', 'desc')
                                .limit(15).offset(Number(page) * 15)
        console.log('re', records)
        ctx.state.data = {
            code: 0,
            msg: 'success records',
            records
        }
    } catch (e) {
        ctx.state = {
            code: -1,
            data: {
              msg: '查找records失败' + e.sqlMessage
            }
        }
        console.log('数据库查找失败')
    }
}