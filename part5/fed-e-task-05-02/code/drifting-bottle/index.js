const express = require('express')
const redis = require('redis')
var uuid = require('node-uuid')
const app = express()
const port = 3000

// redis配置
const redisConfig = {
  host: '127.0.0.1', // Redis host
  port: 6379, // Redis port
  // host: '106.75.13.23', // 远程redis
  // 默认关闭，不建议生产环境开启，会降低性能
  // showFriendlyErrorStack: true,
}

// 1、建立连接
const client = redis.createClient(redisConfig)

// 2、配置解析请求体数据 application/json
// 它会把解析到的请求体数据放到 req.body 中
// 注意：一定要在使用之前就挂载这个中间件
app.use(express.json())

// 3、测试web请求
// app.get('/', (req, res, next) => {
//   res.send('Hello World!')
// })

// 4、扔一个漂流瓶
app.post('/', async (req, res, next) => {
  try {
    const bottle = req.body

    // 为每个漂流瓶随机生成一个不重复的 id
    const bottleId = uuid()

    const type = {
      male: 0,
      female: 1,
    }

    // 根据漂流瓶类型的不同将漂流瓶保存到不同的数据库
    // 主要目的是为了方便使用 Redis 中的 RANDOMKEY 命令：该命令返回当前数据库中的一个随机键，不能加任何条件
    await client.SELECT(type[bottle.type])

    // 将数据存为哈希
    await client.HMSET(bottleId, bottle)

    // 设置漂流瓶生存期为 1 天
    await EXPIRE(bottleId, 60 * 60 * 24)

    res.status(201).json({
      bottle: {
        id: bottleId,
        ...bottle,
      },
    })
  } catch (err) {
    next(err)
  }
})

// 5、捡一个漂流瓶
app.get('/', (req, res, next) => {
  try {
    const query = req.query
    const type = {
      all: Math.round(Math.random()),
      male: 0,
      femail: 1
    }

    query.type = query.type || 'all'

    // 根据请求的瓶子类型到不同的数据库中取数据    
    await client.SELECT(type[query.type])

    // 20% 几率捡到海星
    if (Math.random() <= 0.2) {
      return res.status(200).json({
        message: '讨厌的海星...'
      })
    }

    // 随机返回一个漂流瓶 ID
    const bottleId = await client.RANDOMKEY()
    if (!bottleId) {
      res.status(200).json({
        message: '大海空空如也...'
      })
    }

    // 根据漂流瓶 ID 获取完整的漂流瓶信息
    const bottle = await client.HGETALL(bottleId)
    
    res.status(200).json({
      bottle
    })

    // 从 Redis 中删除捡到的漂流瓶
    client.DEL(bottleId)
  } catch (err) {
    next(err)
  }
})

// 6、扔回海里
app.post('/bottle/:id/back', async (req, res, next) => {
  try {
    const bottle = req.body // owner type content time
    const bottleId = uuid()
    await client.SELECT(bottleType[bottle.type])
    await client.HMSET(bottleId, bottle)
    res.status(201).json({
      bottle: {
        bottleId,
        ...bottle
      }
    })

    // 根据漂流瓶原始时间设置生存期
    // 写入时间 + 1天过期时间
    // PEXPIRE 和 EXPIRE 类似，都是设置键的生存时间
    // EXPIRE 以秒为单位，PEXPIRE 以毫秒为单位
    client.PEXPIRE(bottleId, bottle.time + (1000 * 60 * 60 * 24) - Date.now())
  } catch (err) {
    next(err)
  }
})

// 7、之前所有路由中调用 next(err) 就会进入这里，注意：存在四个参数，不可缺少
app.use((err, req, res, next) => {
  return res.status(500).json({
    error: err.message,
  })
})

// 8、监听端口
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
