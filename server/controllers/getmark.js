const { mysql } = require('../qcloud')
module.exports =  async ctx => {
  const { openid } = ctx.request.query
  try {
    const res = await mysql('records').where('openid', openid)
                .select('mark').orderBy('id', 'desc').first()
    console.log('11111111111111111111111111')
    console.log(res)
    if (res) {
        var mark = res.mark
    } else {
        var mark = 0
    }

    ctx.state.data = {
      code: 0,
      msg: 'success',
      mark: mark
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

