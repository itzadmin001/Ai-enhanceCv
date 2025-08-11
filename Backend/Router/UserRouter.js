const express = require('express');
const { UserRegister, UserLogin, logoutUser } = require('../Controllars/UserControllar');
const UserRouter = express.Router()




UserRouter.post("/register", UserRegister)

UserRouter.post("/login", UserLogin)

UserRouter.get("/logout", logoutUser)


module.exports = UserRouter;