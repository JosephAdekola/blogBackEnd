const { default: mongoose } = require("mongoose");


const veriModel = mongoose.Schema({
    userID: {
        type: String
    },
    otp: {
        type:String
    },
    createdAt: {
        type: Date
    },
    expireAt: {
        type: Date
    }
})

const saveVeriModel = mongoose.model("otpData", veriModel)
module.exports = saveVeriModel