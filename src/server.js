require('dotenv').config()
const express = require('express')
const configViewEngine = require('./config/viewEngine')
const webRoutes = require('./routes/web')
const apiRoutes = require('./routes/api')

const connection = require('./config/database')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const app = express()
const port = process.env.PORT || 3000
const hostname = process.env.HOST_NAME

// config req.body
app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true }))

// Config viewEngine
configViewEngine(app)

// Khai báo route
app.use('/', webRoutes)

app.use('/v1/api/', apiRoutes)



;(async () => {
    try {
        await connection()
        app.listen(port, hostname, () => {
            console.log(`Backend MongoDB app listening on port ${port}`)
        })
    } catch (error) {
        console.log(">>>>> Error connect to db: ", error)
    }
})()

