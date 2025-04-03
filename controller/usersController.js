const publisherModel = require("../scheema/usersScheema");
const bcrypt = require("bcryptjs")
const nodemailer = require('nodemailer');
const saveVeriModel = require("../scheema/emailVerifyModel");
const e = require("cors");
const jwt = require("jsonwebtoken");
const dontenv = require("dotenv").config()

const transporter = nodemailer.createTransport({
    service: process.env.ServiceProv,
    host: process.env.EmailHost,
    auth: {
        user: process.env.EmailSecret,
        pass: process.env.PassSecret
    },
    tls: {
        rejectUnauthorized: false
    }
})

console.log("testing");



//use this function to check if your transporter is working perfectly
// transporter.verify((error, success)=>{
//     if (error) {
//         console.log(error);        
//     } else {
//         console.log(success);
//         console.log("ready for message");

//     }
// })


const veriEmailSender = async ({ _id, email }, res) => {
    try {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`
        const emailDetails = {
            from: process.env.PassSecret,
            to: email,
            subject: "verify your email",
            html: `use the following OTP: ${otp} to verify your email. this OTP will expire in 15 minutes`
        }

        const hashedOtp = await bcrypt.hash(otp, 10)

        const newVeriOtp = new saveVeriModel(
            {
                userID: _id,
                otp: hashedOtp,
                createdAt: Date.now(),
                expireAt: Date.now() + 30000
            }
        )




        await newVeriOtp.save()
        await transporter.sendMail(emailDetails)
        return res.status(200).json({ message: "verification otp sent ", data: { userID: _id, email } })
    } catch (error) {
        console.log(`the following error occures: ${error.message}`);
    }
};

const verifyOtp = async (req, res) => {
    try {
        const { userID, otp } = req.body;
        if (!userID || !otp) {
            return res.status(400).json({ message: "all fields are required" })
        }

        const findUser = await saveVeriModel.findOne({ userID });
        if (!findUser) {
            return res.status(404).json({ message: "user not found" })
        }
        const { expireAt, otp: hashedOtp } = findUser
        if (new Date(expireAt) < Date.now()) {
            await saveVeriModel.deleteMany({ userID })
            return res.status(400).json({ message: "OTP expired" })
        }
        const convertOtp = await bcrypt.compare(otp, hashedOtp)
        console.log(convertOtp);

        if (!convertOtp) {
            return res.status(400).json({ message: "invalid OTP" })
        }

        await publisherModel.updateOne({ _id: userID }, { isVerified: true });

        return res.status(200).json({ message: "Email verification successful" })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const resendEmailVerification = async (req, res) => {
    try {
        const { userID, email } = req.body
        if (!userID || !email) {
            return res.status(400).json({ message: "please fill out all fields" })
        }
        veriEmailSender({ _id: userID, email: email }, res)
        return res.status(200).json("OTP sent")

    } catch (error) {
        return res.status(400).json({message:error})
    }
}




const createUser = async (req, res) => {
    const { name, gender, email, username, password } = req.body
    try {
        if (!name || !gender || !email || !username || !password) {
            return res.status(401).json("all fields are are require")
        }
        const userExist = await publisherModel.findOne({ email });
        // console.log(userExist);
        if (userExist) {
            return res.status(401).json({ msg: "an account with this email already exist" });
        }
        if (password.length < 7) {
            return res.status(400).json({ msg: "password must be a minimum of 7 characters" })
        };
        if (password.length > 30) {
            return res.status(400).json({ msg: "password must be a maximum of 30 characters" })
        }
        const hashedPaword = await bcrypt.hash(password, 10);
        const payLoad = {
            name,
            gender,
            email,
            username,
            password: hashedPaword,
            role: "user",
            isVerified: false
        }
        const addUser = new publisherModel(payLoad)
        const SavedUser = await addUser.save()
        await veriEmailSender(SavedUser, res)
        return res.status(200).json(`user created successfully, id: ${SavedUser._id}`)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const signUserIn = async (req, res) => {
    const { username, password } = req.body
    try {
        const findUser = await publisherModel.findOne({ username })
        if (!findUser) {
            return res.status(404).json({ msg: "user not found" })
        }

        const parsedPW = await bcrypt.compare(password, findUser.password);
        if (!parsedPW) {
            return res.status(400).json({ msg: "ivalid credential" })
        }

        const token = jwt.sign({userId: findUser._id, role:findUser.role}, 
                        process.env.AccessTokenSecrete, 
                        {expiresIn:"60s"})

        return res.status(200).json({ msg: "login successful", loginToken:token })
    } catch (error) {
        return res.status(500).json({message: error})
    }
}



const getAllUser = async (req, res) => {
    try {
        const allUser = await publisherModel.find({})
        return res.status(200).json(allUser)
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}

module.exports = {
    createUser,
    signUserIn,
    getAllUser,
    verifyOtp,
    resendEmailVerification
}