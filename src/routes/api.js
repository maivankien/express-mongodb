const express = require('express')
const routerAPI = express.Router()
const { getUsersAPI, postCreateUserAPI, putUpdateUserAPI, deleteUserAPI, postUploadSingleFileApi, postUploadMultipleFilesAPI }
    = require('../controllers/apiController')

const { postCreateCustomer, postCreateArrayCustomer, getAllCustomer, putUpdateCustomer, deleteACustomer, deleteArrCustomer }
    = require('../controllers/customerController')

const { postCreateProjects, getAllProject, putUpdateProject, deleteAProject } = require('../controllers/projectController')

const { postCreateTask, getAllTask, putUpdateTask, deleteATask } = require('../controllers/taskController')


routerAPI.get('/users', getUsersAPI)

routerAPI.post('/users', postCreateUserAPI)

routerAPI.put('/users', putUpdateUserAPI)

routerAPI.delete('/users', deleteUserAPI)

routerAPI.post('/file', postUploadSingleFileApi)

routerAPI.post('/files', postUploadMultipleFilesAPI)

// Customer

routerAPI.post('/customer', postCreateCustomer)

routerAPI.get('/customers', getAllCustomer)

routerAPI.post('/customers-many', postCreateArrayCustomer)

routerAPI.put('/customers', putUpdateCustomer)

routerAPI.delete('/customers', deleteACustomer)

routerAPI.delete('/customers-many', deleteArrCustomer)

routerAPI.get('/info', (req, res) => {
    return res.status(200).json({
        data: req.query
    })
})

routerAPI.get('/info/:name/:address', (req, res) => {
    return res.status(200).json({
        data: req.params
    })
})

routerAPI.post('/projects', postCreateProjects)

routerAPI.get('/projects', getAllProject)

routerAPI.put('/projects', putUpdateProject)

routerAPI.delete('/projects', deleteAProject)

// Task

routerAPI.post('/tasks', postCreateTask)

routerAPI.get('/tasks', getAllTask)

routerAPI.put('/tasks', putUpdateTask)

routerAPI.delete('/tasks', deleteATask)

module.exports = routerAPI