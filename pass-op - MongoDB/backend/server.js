const express = require('express')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb')
const bodyparser = require('body-parser')
const cors = require('cors')

dotenv.config()

// Connection URL
const url = process.env.MONGO_URL || 'mongodb://localhost:27017'
const client = new MongoClient(url)

// Database Name
const dbName = 'passop'
const app = express()
const port = 3000

app.use(bodyparser.json())
app.use(cors())

async function start() {
    await client.connect()
    console.log('✅ Connected to MongoDB')

    const db = client.db(dbName)
    const collection = db.collection('password')

    // get passwords
    app.get('/', async (req, res) => {
        const findResult = await collection.find({}).toArray()
        res.json(findResult)
    })

    // save password
    app.post('/', async (req, res) => {
        const password = req.body          // ⬅️ yahan req.body hoga, res.body nahi
        const result = await collection.insertOne(password)
        res.json({ success: true, result })
    })

    // delete the password by id
    app.delete('/', async (req, res) => {
        const { id } = req.body            // frontend se id aa rahi hai
        const result = await collection.deleteOne({ id }) // id ke basis pe delete
        res.json({ success: true, result })
    })

    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`)
    })
}

start().catch(console.error)
