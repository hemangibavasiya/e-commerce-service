const express = require('express')
const dotenv = require('dotenv')


dotenv.config()

const dbCon = require('./repository/db')

global.db = dbCon.connect()
require('./model/modelExport')

const app = express()


app.listen(process.env.PORT, () => console.log('server is up now'))

const postRoutes = require('./routes/post')
const cartRoutes = require('./routes/cart')

app.use(express.json())
app.use('/uploads', express.static('uploads'));

app.use('/api/posts', postRoutes)
app.use('/api/cart', cartRoutes)