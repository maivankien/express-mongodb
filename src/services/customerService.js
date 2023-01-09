const Customer = require('../models/customer')
const aqp = require('api-query-params')


module.exports = {
    createCustomerService: async (customerData) => {
        try {
            let result = await Customer.create({
                name: customerData.name,
                address: customerData.address,
                phone: customerData.phone,
                email: customerData.email,
                description: customerData.description,
                image: customerData.image,
            })
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    },
    createArrayCustomerService: async (arr) => {
        try {
            let result = await Customer.insertMany(arr)
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    },
    getAllCustomerService: async (limit, page, name, queryString) => {
        try {
            let result = null
            if (limit && page) {
                let offset = (page - 1) * limit
                const { filter } = aqp(queryString)
                delete filter.page
                result = await Customer.find(filter).skip(offset).limit(limit).exec()
            }
            else {
                result = await Customer.find({})
            }
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    },
    putUpdateCustomerService: async (dataUpdate) => {
        try {
            let { name, email, address, phone, description, id } = dataUpdate
            let result = await Customer.updateOne({ _id: id }, {
                name, email, address, phone, description
            })
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    },
    deleteACustomerService: async (id) => {
        try {
            let result = await Customer.delete({ _id: id })
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    },
    deleteArrCustomerService: async (ids) => {
        try {
            let result = await Customer.delete({
                _id: {
                    $in: ids
                }
            })
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }
}