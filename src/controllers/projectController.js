const { postCreateProjectsService } = require('../services/productService')

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
    }
}