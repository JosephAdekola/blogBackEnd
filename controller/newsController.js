const newsModel = require("../scheema/newsScheema");

const createNews = async (req, res)=>{
    try {
        const addNews = await newsModel.create(req.body)
        return res.status(201).json(addNews)
    } catch (error) {
        return res.status(500).json({msg:error.msg})
    }
}

const findAllNews = async (req, res)=>{
    try {
        const getAllNews = await newsModel.find({})
        return res.status(200).json(getAllNews)
    } catch (error) {
        return res.status(500).json({msg:error.msg})
    }
}

const FindSingleNews = async (req, res)=>{
try {
    const {id} = req.params
    const singleNews = await newsModel.findById(id)
    if (!singleNews) {
        return res.status(404).json('not found')
    }
    return res.status(200).json(singleNews)
} catch (error) {
    return res.status(500).json({msg:error.msg})
}
}

const editNews = async (req, res)=>{
try {
    const {id} = req.params;
    const editSingleNews = await newsModel.findByIdAndUpdate(id, req.body)
    if (!editSingleNews) {
        return res.status(404).json('news does not exist')
    }

    return res.status(200).json(editSingleNews)

} catch (error) {
    return res.status(500).json({msg:error.msg})
}
}

const deleteNews = async (req, res)=>{
try {
    const {id} = req.params
    const deleteSingleNews = await newsModel.findByIdAndDelete(id)

    if (!deleteSingleNews) {
        return res.status(404).json("not found")
    }

    return res.status(200).json(deleteSingleNews)
} catch (error) {
    return res.status(500).json({msg:error.msg})
}
}

module.exports = {
    createNews,
    findAllNews,
    FindSingleNews,
    editNews,
    deleteNews
}