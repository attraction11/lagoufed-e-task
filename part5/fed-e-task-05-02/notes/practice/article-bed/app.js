const express = require('express')
const { MongoClient, ObjectID } = require('mongodb')
const app = express()
const port = 3000

const connectUrl = 'mongodb://localhost:27017'
const dbClient = new MongoClient(connectUrl)

// 配置解析请求体数据 application/json
// 它会把解析到的请求体数据放到 req.body 中
// 注意：一定要在使用之前就挂载这个中间件
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/articles', async (req, res, next) => {
  try {
    // 1、获取客户端表单数据
    const { article } = req.body
    // 2、数据验证
    if (!article || !article.title || !article.description || !article.body) {
      return res.status(422).json({
        error: '请求参数不符合要求'
      })
    }
    // 3、把验证通过的数据写入数据库
    await dbClient.connect()
    // 成功---> 发送成功的响应
    // 失败---> 发送失败的响应
    const collection = dbClient.db('test').collection('articles')

    article.createdAt = new Date()
    article.updatedAt = new Date()
    const ret = await collection.insertOne(article)
    console.log('ret: ', ret);

    article._id = ret.insertedId
    return res.status(201).json({
      article
    })
  } catch (err) {
    // 由错误处理中间件统一处理
    next(err)
  }
})

app.get('/articles', async (req, res, next) => {
  try {
    let { _page = 1, _size = 10 } = req.query
    _page = Number.parseInt(_page)
    _size = Number.parseInt(_size)

    await dbClient.connect()
    const collection = dbClient.db('test').collection('articles')
    const ret = await collection.find().skip((_page - 1) * _size).limit(_size)

    const articles = await ret.toArray()
    const articlesCount = await collection.countDocuments()
    console.log('ret: ', ret);

    return res.status(200).json({
      articles,
      articlesCount
    })
  } catch (err) {
    next(err)
  }
})

app.get('/articles/:id', async (req, res, next) => {
  try {
    await dbClient.connect()
    const collection = dbClient.db('test').collection('articles')
    const article = await collection.findOne({
      _id: ObjectID(req.params.id)
    })

    return res.status(200).json({
      article
    })
  } catch (err) {
    next(err)
  }
})

app.patch('/articles/:id', async (req, res, next) => {
  try {
    await dbClient.connect()
    const collection = dbClient.db('test').collection('articles')
    await collection.updateOne({
      _id: ObjectID(req.params.id)
    }, {
        $set: req.body.article
    })

    const article = await collection.findOne({
      _id: ObjectID(req.params.id)
    })

    return res.status(201).json({
      article
    })
  } catch (err) {
    next(err)
  }
})

app.delete('/articles/:id', (req, res) => {
  res.send('delete /articles/:id')
})

// 之前所有路由中调用 next(err) 就会进入这里，注意：存在四个参数，不可缺少
app.use((err, req, res, next) => {
  return res.status(500).json({
    error: err.message
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
