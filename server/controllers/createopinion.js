const { mysql } = require('../qcloud')
module.exports =  async ctx => {
  const { opinion, src, wechat, openid } = ctx.request.body
  try {
    await mysql('opinions').insert({
      openid,
      src,
      wechat,
      opinion
    })
    ctx.state.data = {
      code: 0,
      msg: 'success'
    }
  } catch (e) {
    ctx.state = {
      code: -1,
      data: {
        msg: '添加失败' + e.sqlMessage
      }
    }
    console.log('数据库插入失败')
  }

}

