require('dotenv').config()
const express = require("express")
const app = express()
const ResumeRouter = require("./Router/ResumeRouter");
const cors = require("cors");
const DBconntect = require('./db/db');
const UserRouter = require('./Router/UserRouter');
const cookieParser = require('cookie-parser');
const { VerifyUser } = require('./Middlewares/UserAuth');
DBconntect()





app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser())



app.use("/", ResumeRouter)
app.use('/user', UserRouter)

app.get("/", (req, res) => {
    res.send("Okay")
})

app.use("/me", VerifyUser, (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    });
})


const PORT = process.env.PORT || 3000;




app.listen(PORT, () => {
    console.log("👍 Server started")
})

module.exports = app;