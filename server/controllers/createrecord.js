const { mysql } = require('../qcloud')
module.exports =  async ctx => {
  const { add, openid } = ctx.request.body
  try {
    const res = await mysql('records').where('openid', openid)
                .select('mark').orderBy('id', 'desc').first()
    
    console.log(res)
    if (res) {
        var mark = res.mark
    } else {
        var mark = 0
    }

    mark = mark + add

    console.log('当前', add)

    await mysql('records').insert({
        openid,
        add,
        mark
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

