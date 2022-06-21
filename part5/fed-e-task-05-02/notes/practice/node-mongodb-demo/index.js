const { MongoClient } = require('mongodb')
// Connection URI
const url = 'mongodb://127.0.0.1:27017'
// Create a new MongoClient
const client = new MongoClient(url)
async function run() {
  try {
    // Connect the client to the server
    await client.connect()

    const testDb = client.db('test')
    const inventoryCollection = testDb.collection('inventory')

    // 创建文档
    // inventoryCollection.insertOne({
    //   name: 'Neapolitan pizza',
    //   shape: 'round',
    //   toppings: ['San Marzano tomatoes', 'mozzarella di bufala cheese']
    // })

    // 查询文档
    // const ret = await inventoryCollection.find({
    //   item: 'notebook'
    // })
    // console.log(await ret.toArray())

    
    // Establish and verify connection
    // await client.db("admin").command({ ping: 1 });
    console.log('Connected successfully to server')
  } catch (err) {
    console.log('Connect failed')
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}

run()
