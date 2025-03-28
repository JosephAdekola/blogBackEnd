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
            require: [true, "name field is required"]
        },
        username: {
            type: String,
            require: [true, "name field is required"]
        },
        password: {
            type: String,
            require: [true, "name field is required"]
        }
    },
    {
        timestamps: true
    })

    const publisherModel = mongoose.model("usersData", usersModel)

    module.exports = publisherModel