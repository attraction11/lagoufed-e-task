const ioredis = require('ioredis')

// 1、建立连接
const redis = new ioredis({
  port: 6379,
  host: '106.75.13.23',
  // 默认关闭，不建议生产环境开启，会降低性能
  // showFriendlyErrorStack: true,
})

// 2、操作 Redis 数据库
// redis.set('foo', 'bar', (err, ret) => {
//   if (err) {
//     return console.log('写入失败', err)
//   }

//   console.log('写入成功', ret)
// })

// redis.get('foo', (err, ret) => {
//   if (err) {
//     return console.log('获取失败', err)
//   }

//   console.log('获取成功', ret)
// })

// 2、操作 Redis 数据库 （promise）
// redis
//   .get('foo')
//   .then((ret) => {
//     console.log(ret)
//   })
//   .catch((err) => {
//     console.log('获取失败', err)
//   })

// 2、操作 Redis 数据库 （async...await）
// async function main() {
//   try {
//     const ret = await redis.get('foo')
//     console.log('ret: ', ret)
//   } catch (error) {
//     console.log('操作失败: ', error)
//   }
// }

// main()

// 3、操作 Redis 管道
// async function main() {
//   try {
//     const pipeline = redis.pipeline()
//     for (let i = 0; i < 5; i++) {
//       pipeline.set(`${i}-foo`, i)
//     }
//     await pipeline.exec()
//   } catch (error) {
//     console.log('操作失败: ', error)
//   }
// }

// main()

// 4、操作 Redis 事务操作
async function main() {
  try {
    const ret = await redis.multi().set('Jack', 100).set('Rose', 200).exec()
    console.log('ret: ', ret)
  } catch (error) {
    console.log('操作失败: ', error)
  }
}

main()

// 5、关于错误堆栈信息
// async function main() {
//   try {
//     await redis.set('Jack')
//     console.log('OK')
//   } catch (error) {
//     console.log('操作失败: ', error)
//   }
// }

// main()
