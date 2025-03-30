const publisherModel = require("../scheema/usersScheema");
const bcrypt = require("bcryptjs")

const createUser = async (req, res) => {
    const {name, gender, email, username, password} = req.body
    try {
        if (!name || !gender || !email || !username || !password) {
            return res.status(401).json("all fields are are require")
        }
        const userExist = await publisherModel.findOne({email});
        // console.log(userExist);
        
        if (userExist) {
            return res.status(401).json({msg: "an account with this email already exist"});
        }
        if (password.length < 7) {
            return res.status(400).json({msg: "password must be a minimum of 7 characters"})
        };
        if (password.length > 30) {
            return res.status(400).json({msg: "password must be a maximum of 30 characters"})
        }
        const hashedPaword = await bcrypt.hash(password, 10);
        const payLoad = {
            name,
            gender,
            email,
            username,
            password: hashedPaword,
            role: "user"
        }
        const addUser = await publisherModel.create(payLoad)
        return res.status(200).json(`user created successfully, id: ${addUser._id}`)
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
}

const getAllUser = async (req, res) => {
    try {
        const allUser = await publisherModel.find({})
        return res.status(200).json(allUser)
    } catch (error) {
        return res.status(500).json({msg:error})
    }
}

module.exports = {
    createUser,
    getAllUser
}