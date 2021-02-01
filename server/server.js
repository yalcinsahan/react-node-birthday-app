import express from 'express'
import mongoose from 'mongoose'
import userRouter from './routes/userRoutes.js'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()

//connect to database
mongoose.connect("mongodb://localhost:27017/birthdayDB",
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

//check the connect
const db = mongoose.connection
db.on('error', console.error.bind(console, 'bağlantı hatası:'))
db.once('open', function () {
    console.log("bağlantı başarılı.");
})

//body-parser module for getting data from request
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//enable all cors requests
app.use(cors())

//routes
app.use("", userRouter)

//setting port for application
app.listen(8000, () => console.log("uygulama 8000 portunda çalışıyor."))

