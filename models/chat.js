// const mongoose = require('mongoose');

// const chatSchema = new mongoose.Schema({
//     from: {
//         type: String,
//         required: true
//     },
//     to: {
//         type: String,
//         required: true

//     },
//     msg: {
//         type: String,
//         maxLength: 200
//     },
//     createdAt: {
//         type: Date,
//         required: true,
//         default: Date.now
//     }
// })

// const Chat = mongoose.model('Chat', chatSchema)
// module.exports = Chat;



const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    msg: {
        type: String,
        maxLength: 200
    }
}, {
    timestamps: true // 👈 This automatically adds createdAt and updatedAt
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
