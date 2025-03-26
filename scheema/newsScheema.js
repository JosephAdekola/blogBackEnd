const mongoose = require("mongoose")

const newArticleModel = mongoose.Schema(
    {
        title: {
            type: String,
            require: [true, "please add a title"]
        },
        author: {
            type: String,
            require: [true, "please enter author name"]
        },
        content: {
            type: String,
            require: [true, "write a description"]
        },
        Image: {
            type: String,
            require: [true, "please enter image url"]
        }
    },
    {
        timestamps: true
    }
)

const newsModel = mongoose.model("new", newArticleModel )

module.exports = newsModel
