
const { createTask, getTasks, updateTask, deleteTask } = require('../services/taskService')

module.exports = {
    postCreateTask: async (req, res) => {
        let task = await createTask(req.body)
        res.status(200).json({
            EC: 0,
            data: task
        })
    },
    getAllTask: async (req, res) => {
        let tasks = await getTasks(req.query)
        res.status(200).json({
            EC: 0,
            data: tasks
        })
    },
    putUpdateTask: async (req, res) => {
        let result = await updateTask(req.body)
        res.status(200).json({
            EC: 0,
            data: result
        })
    },
    deleteATask: async (req, res) => {
        let result = await deleteTask(req.body.id)
        res.status(200).json({
            EC: 0,
            data: result
        })
    }
}