
const mongoos = require("mongoose")



const UserModels = new mongoos.Schema({
    username: {
        type: String,
        required: true,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxLength: 100
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

const UserModel = mongoos.model("user", UserModels)
module.exports = UserModel;