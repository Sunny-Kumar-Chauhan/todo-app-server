var mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
//specify the fields which we want in our collection(table).  
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "Password must be atleast 8 character long"]
    },
    avatar: {
        public_id: String,
        url: String
 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

    tasks: [{
        title: "String",
        description: "String",
        completed: Boolean,
        createdAt: Date
    }],


})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE 
    })
}
//here we saving our collectionSchema with the name user in database  
//userModel will contain the instance of the user for manipulating the data.  
var userModel = module.exports = mongoose.model('user', userSchema) 