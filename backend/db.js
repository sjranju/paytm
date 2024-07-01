import { connect, Schema, model } from 'mongoose'

connect('mongodb+srv://singanoodiranjana:aJmn3bDkrMOf1QD6@cluster0.4qv8rg4.mongodb.net/paytm')

const userSchema = Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30,
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
})

const accountSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    balance: {
        type: Number,
        required: true
    }
})

const User = model('User', userSchema)
const Account = model('Account', accountSchema)

export default {
    User,
    Account
}