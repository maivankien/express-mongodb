const User = require('../models/user')

const getUsersAPI = async (req, res, next) => {
    let results = await User.find({})
    return res.status(200).json({
        errorCode: 0,
        data: results,
    })
}

const postCreateUserAPI = async (req, res) => {
    let email = req.body.email
    let name = req.body.name
    let city = req.body.city
  
    let user = await User.create({
        email,
        name,
        city,
    })

    return res.status(200).json({
        errorCode: 0,
        data: user,
    })
}


const putUpdateUserAPI = async (req, res) => {
    let email = req.body.email
    let name = req.body.name
    let city = req.body.city
    let Id = req.body.userId
    let user = await User.updateOne({_id: Id}, {
        name: name,
        email: email,
        city: city,
    })
    return res.status(200).json({
        errorCode: 0,
        data: user,
    })
}


const deleteUserAPI = async (req, res) => {
    let Id = req.body.userId
    let result = await User.deleteOne({
        _id: Id,
    })
    return res.status(200).json({
        errorCode: 0,
        data: result,
    })
}

module.exports = {
    getUsersAPI,
    postCreateUserAPI,
    putUpdateUserAPI,
    deleteUserAPI,
}