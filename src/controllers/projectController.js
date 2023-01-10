const { postCreateProjectsService, getProject, putProject, deleteProject } = require('../services/productService')

module.exports = {
    postCreateProjects: async (req, res) => {
        let project = await postCreateProjectsService(req.body)
        if(project) {
            res.status(200).json({
                EC: 0,
                data: project
            })
        }
        else {
            res.status(200).json({
                EC: -1,
                data: project
            })
        }
    },
    getAllProject: async (req, res) => {
        let result = await getProject(req.query)
        res.status(200).json({
            EC: 0,
            data: result
        })
    }, 
    putUpdateProject: async (req, res) => {
        let result = await putProject(req.body)
        res.status(200).json({
            EC: 0,
            data: result
        })
    },
    deleteAProject: async (req, res) => {
        let result = await deleteProject(req.body.id)
        res.status(200).json({
            EC: 0,
            data: result
        })
    }
}