require('dotenv').config()
const express = require('express')
const configViewEngine = require('./config/viewEngine')
const webRoutes = require('./routes/web')
const apiRoutes = require('./routes/api')
const fileUpload = require('express-fileupload')

const connection = require('./config/database')
const { MongoClient } = require('mongodb')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const app = express()
const port = process.env.PORT || 3000
const hostname = process.env.HOST_NAME

// config file upload
// default options
app.use(fileUpload())

// config req.body
app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true }))

// Config viewEngine
configViewEngine(app)

// Khai báo route
app.use('/', webRoutes)

app.use('/v1/api/', apiRoutes)



    ; (async () => {
        try {
            // using mongoose
            await connection()

            // using mongodb driver
            // connection URl
            // const url = process.env.DB_HOST_WITH_DRIVER
            // const client = new MongoClient(url)
            // // Database Name
            // const dbName = process.env.DB_NAME

            // await client.connect();
            // console.log('Connected successfully to server');
            // const db = client.db(dbName);
            // const collection = db.collection('customers')

            // let result = await collection.findOne({name: "maivankien"})

            app.listen(port, hostname, () => {
                console.log(`Backend MongoDB app listening on port ${port}`)
            })
        } catch (error) {
            console.log(">>>>> Error connect to db: ", error)
        }
    })()

