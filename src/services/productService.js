const Project = require('../models/project')

module.exports = {
    postCreateProjectsService: async (projectData) => {
        if(projectData.type === "EMPTY-PROJECT") {
            let result = await Project.create(projectData)
            return result
        }
        if(projectData.type === "ADD-USERS") {
            let myProject = await Project.findById(projectData.projectId).exec()
            for(let i = 0; i < projectData.userArr.length; i++) {
                myProject.usersInfor.push(projectData.userArr[i])
            }
            let newResult = await myProject.save()
            return newResult
        }
    }
}