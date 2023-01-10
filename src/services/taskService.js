const Task = require('../models/task')
const aqp = require('api-query-params')

module.exports = {
    createTask: async (data) => {
        try {
            if (data.type === "EMPTY-TASK") {
                let result = await Task.create(data)
                return result
            }
        } catch (error) {
            console.log(error)
            return null
        }
    },
    getTasks: async (queryString) => {
        try {
            const page = queryString.page
            const { filter, limit, population } = aqp(queryString)
            delete filter.page
            let offset = (page - 1) * limit
            let result = await Task.find(filter).populate(population).skip(offset).limit(limit).exec()
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    },
    updateTask: async (dataUpdate) => {
        try {
            let result = await Task.updateOne({_id: dataUpdate.id}, {
                ...dataUpdate
            })
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    },
    deleteTask: async (id) => {
        try {
            let result = await Task.delete({ _id: id })
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }
}