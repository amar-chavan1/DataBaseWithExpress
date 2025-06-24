const mongoose = require('mongoose');
const Chat = require('./models/chat.js')

main().then(() => {
    console.log('DB Connection Successful!!!');
}).catch((err) => {
    console.log('Connection Failed (:');
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/chatdb')
}

const chatData = [
    {
        from: 'Alice',
        to: 'Bob',
        msg: 'Hey Bob, how are you?'
    },
    {
        from: 'Charlie',
        to: 'David',
        msg: 'Meeting at 5 PM. Dont be late!'
    },
    {
        from: 'Eve',
        to: 'Frank',
        msg: 'Did you check the report?'
    }
];


Chat.insertMany(chatData)
    .then((res) => {
        console.log('Chats inserted successfully:', res);
    })
    .catch((err) => {
        console.log('Error inserting chats:', err);
    });
