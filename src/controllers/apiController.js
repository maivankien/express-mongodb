const User = require('../models/user')
const { uploadSingleFile, uploadMultipleFiles } = require('../services/fileService')

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
    let user = await User.updateOne({ _id: Id }, {
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

const postUploadSingleFileApi = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    let result = await uploadSingleFile(req.files.image)
    return res.status(200).json(
        {
            EC: 0,
            data: result
        }
    )
}

const postUploadMultipleFilesAPI = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    // console.log(req.files);
    //upload single => files is an object
    //upload multiple => files is an array
    if (Array.isArray(req.files.image)) {
        //upload multiple
        let result = await uploadMultipleFiles(req.files.image);
        return res.status(200).json({
            EC: 0,
            data: result
        })

    } else {
        //upload single
        return await postUploadSingleFileApi(req, res);
    }
}

module.exports = {
    getUsersAPI,
    postCreateUserAPI,
    putUpdateUserAPI,
    deleteUserAPI,
    postUploadSingleFileApi,
    postUploadMultipleFilesAPI,
}