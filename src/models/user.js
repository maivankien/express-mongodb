const mongoose = require('mongoose')

// Định dạng kiểu dữ liệu
const kittySchema = new mongoose.Schema({
    name: String,
    email: String,
    city: String,
})

const User = mongoose.model('user', kittySchema)

module.exports = User