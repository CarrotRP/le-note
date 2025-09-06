const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    lastLogin: {
        type: Date,
        default: null
    },
    failedAttempts: {
        type: Number,
        default: 0
    },
    isLocked: {
        type: Boolean,
        default: false
    },
    lockUntil: {
        type: Date
    },
    notes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Note"
        }
    ]
}, { timestamps: true })

const User = mongoose.model('User', userSchema);
module.exports = User;