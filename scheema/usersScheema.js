const mongoose = require('mongoose')

const usersModel = mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, "name field is required"]
        },
        gender: {
            type: String,
            require: [true, "name field is required"]
        },
        email: {
            type: String,
            require: [true, "name field is required"],
            trim: true,
            unique: true,
            match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "please enter a valid email"]
        },
        username: {
            type: String,
            require: [true, "name field is required"],
            unique: true
        },
        password: {
            type: String,
            require: [true, "name field is required"],
            minlength: [7, 'password must be at lease 7 characters'],
            minlength: [30, 'password must not be more than 30 characters']
        },
        role: {
            type: String,
            default: "user"
        },
        isVerified: {
            type: Boolean,
            require:false,
        }
    },
    {
        timestamps: true
    })

    const publisherModel = mongoose.model("usersData", usersModel)

    module.exports = publisherModel