const publisherModel = require("../scheema/usersScheema");

const createUser = async (req, res) => {
    try {
        const addUser = await publisherModel.create(req.body);
        return res.status(200).json(addUser)
    } catch (error) {
        return res.status(500).json({msg:error})
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