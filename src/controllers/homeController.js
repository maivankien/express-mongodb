const { json } = require('express');
const connection = require('../config/database')
const { getAllUsers, getUserById, updateUserById , deleteUserById} = require('../services/CRUDService')
const User = require('../models/user')

const getHomepage = async (req, res, next) => {
    let results = await User.find({})
    return res.render('home', { listUsers: results })
}

const newsPage = (req, res) => {
    res.render('sample.ejs')
}

const postCreateUser = async (req, res) => {
    let email = req.body.email
    let name = req.body.name
    let city = req.body.city
  
    await User.create({
        email,
        name,
        city,
    })

    res.send("Create new user")
}

const getCreatePage = (req, res) => {
    return res.render('create')
}

const getUpdatePage = async (req, res) => {
    const userId = req.params.id
    let user = await User.findById(userId).exec()
    return res.render('edit', { userEdit: user })
}

const postUpdateUser = async (req, res) => {
    let email = req.body.email
    let name = req.body.name
    let city = req.body.city
    let Id = req.body.userId
    await User.updateOne({_id: Id}, {
        name: name,
        email: email,
        city: city,
    })
    res.redirect('/')
}

const postDeleteUser = async (req, res) => {
    const userId = req.params.id
    let user = await User.findById(userId).exec()
    return res.render('delete', { userEdit: user })
}

const postHandleRemoveUser = async (req, res) => {
    let Id = req.body.userId
    await deleteUserById(Id)
    res.redirect('/')
}

module.exports = {
    getHomepage,
    newsPage,
    postCreateUser,
    getCreatePage,
    getUpdatePage,
    postUpdateUser,
    postDeleteUser,
    postHandleRemoveUser,
}