import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { ConnectDB } from './ConnectDB/ConnectDB.js'
import { postRoute } from './Routes/PostRoute.js'
import { userRoute } from './Routes/UserRoute.js'
import cookieParser from 'cookie-parser'
// import { configDotenv } from 'dotenv'
// ("dotenv").config();


const app = express()

app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3000/home/:id", "http://localhost:3000/editpostimage/", "http://localhost:3000/createpost/:userid", "http://localhost:3000/viewprofiles/:fArray", "http://localhost:3000/viewprofile/:userid", "http://localhost:3000/home/:id/:viewuserpost", "http://localhost:3000/allusers"],

    methods: ["GET", "POST", "PUT", "DELETE"],

    credentials: true
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

ConnectDB()

app.use('/', userRoute)
app.use('/', postRoute)

const port = 9000

app.listen(port, () => console.log(`Server running at port ${port}`))