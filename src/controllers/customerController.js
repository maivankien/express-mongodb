const Joi = require('joi')
const { uploadSingleFile } = require('../services/fileService')
const { createCustomerService, createArrayCustomerService, getAllCustomerService, putUpdateCustomerService, deleteACustomerService,
    deleteArrCustomerService }
    = require('../services/customerService')

// key: value
module.exports = {
    postCreateCustomer: async (req, res) => {
        let { name, address, phone, email, description } = req.body

        // Validate Data
        const schema = Joi.object({
            name: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),

            address: Joi.string(),

            phone: Joi.string().pattern(new RegExp('^[0-9]{8,11}$')),

            email: Joi.string().email(),

            description: Joi.string(),
        })

        const { error } = schema.validate(req.body, { abortEarly: false })
        if (error) {
            return res.status(200).json({
                msg: error
            })
        } else {
            let imageUrl = ''

            if (!req.files || Object.keys(req.files).length === 0) {
                // Do nothing
            }
            else {
                let result = await uploadSingleFile(req.files.image)
                // imageUrl = path.resolve(__dirname, '../public/images/upload', result.path)
                imageUrl = result.path
            }

            let customerData = {
                name, address, phone, email, description, image: imageUrl,
            }
            let customer = await createCustomerService(customerData)
            return res.status(200).json({
                EC: 0,
                data: customer
            })
        }
    },
    postCreateArrayCustomer: async (req, res) => {
        let customer = await createArrayCustomerService(req.body.customers)
        if (customer) {
            return res.status(200).json({
                EC: 0,
                data: customer
            })
        } else {
            return res.status(200).json({
                EC: -1,
                data: customer
            })
        }
    },
    getAllCustomer: async (req, res) => {
        let limit = req.query.limit
        let page = req.query.page
        let name = req.query.name
        let result = null
        if (limit && page) {
            result = await getAllCustomerService(limit, page, name, req.query)
        }
        else {
            result = await getAllCustomerService()
        }
        return res.status(200).json({
            EC: 0,
            data: result,
        })
    },
    putUpdateCustomer: async (req, res) => {
        let result = await putUpdateCustomerService(req.body)
        return res.status(200).json({
            EC: 0,
            data: result,
        })
    },
    deleteACustomer: async (req, res) => {
        let id = req.body.id
        let result = await deleteACustomerService(id)
        return res.status(200).json({
            EC: 0,
            data: result,
        })
    },
    deleteArrCustomer: async (req, res) => {
        let ids = req.body.CustomersId
        let result = await deleteArrCustomerService(ids)
        return res.status(200).json({
            EC: 0,
            data: result,
        })
    }
}