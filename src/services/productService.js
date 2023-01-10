const Project = require('../models/project')
const aqp = require('api-query-params')


module.exports = {
    postCreateProjectsService: async (projectData) => {
        if (projectData.type === "EMPTY-PROJECT") {
            let result = await Project.create(projectData)
            return result
        }
        if (projectData.type === "ADD-USERS") {
            let myProject = await Project.findById(projectData.projectId).exec()
            for (let i = 0; i < projectData.userArr.length; i++) {
                myProject.usersInfor.push(projectData.userArr[i])
            }
            let newResult = await myProject.save()
            return newResult
        }
        if (projectData.type === "REMOVE-USERS") {
            let myProject = await Project.findById(projectData.projectId).exec()
            projectData.userArr.forEach(element => {
                myProject.usersInfor.pull(element)
            });
            let newResult = await myProject.save()
            return newResult
        }
        if (projectData.type === "ADD-TASKS") {
            let myProject = await Project.findById(projectData.projectId).exec()
            for (let i = 0; i < projectData.taskArr.length; i++) {
                myProject.tasks.push(projectData.taskArr[i])
            }
            let newResult = await myProject.save()
            return newResult
        }
    },
    getProject: async (queryString) => {
        const page = queryString.page
        const { filter, limit, population } = aqp(queryString)
        console.log(population)
        delete filter.page
        let offset = (page - 1) * limit
        let result = await Project.find(filter).populate(population).skip(offset).limit(limit).exec()
        return result
    },
    putProject: async (data) => {
        try {
            let { name, endDate, description, id } = data
            let result = await Project.updateOne({ _id: id }, {
                name, endDate, description
            })
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    },
    deleteProject: async (id) => {
        try {
            let result = await Project.delete({ _id: id })
            return result
        } catch (error) {
            console.log(result)
            return null
        }
    }
}