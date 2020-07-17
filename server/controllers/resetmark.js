const { mysql } = require('../qcloud')
module.exports =  async ctx => {
  const { openid } = ctx.request.body
  try {
    let add = 0
    let mark = 0
    let note = ""

    await mysql('records').insert({
        openid,
        add,
        mark,
        note
    })
    
    ctx.state.data = {
      code: 0,
      msg: 'success'
    }
    console.log('reset 后端 成功')
  } catch (e) {
    ctx.state = {
      code: -1,
      data: {
        msg: 'reset失败' + e.sqlMessage
      }
    }
    console.log('数据库插入失败')
  }

}

