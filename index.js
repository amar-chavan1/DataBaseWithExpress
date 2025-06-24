const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Chat = require('./models/chat.js')
const session = require('express-session');
const flash = require('connect-flash');


app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
    secret: 'secret', // replace with a strong secret
    resave: false,
    saveUninitialized: true
}));
app.use(flash());

// Pass flash messages to all views
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});


app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs");

main().then(() => {
    console.log('DB Connection Successful!!!');
}).catch((err) => {
    console.log('Connection Failed (:');
})
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/chatdb')
}

app.get('/', (req, res) => {
    res.render('main');
})


app.get('/chats', (req, res) => {
    Chat.find().then((chats) => {
        res.render('chats', { chats }); // success and error are already in res.locals
    }).catch((err) => {
        console.log('Error', err);
    });
});



app.post('/chats', (req, res) => {
    const chat = new Chat({
        from: req.body.from,
        msg: req.body.msg,
        to: req.body.to,
    });
    chat.save().then(() => {
        req.flash('success', 'Chat added successfully!');
        res.redirect('/chats');
    }).catch((err) => {
        req.flash('error', 'Failed to add chat!');
        res.redirect('/chats');
    });
});



app.post('/chats/edit/:id', (req, res) => {
    const { id } = req.params;
    const { from, to, msg } = req.body;

    Chat.findByIdAndUpdate(id, { msg })
        .then(() => {
            req.flash('success', 'Chat updated successfully!');
            res.redirect('/chats');
        })
        .catch((err) => {
            console.error('Update Error:', err);
            req.flash('error', 'Failed to update chat!');
            res.redirect('/chats');
        });
});

app.post('/chats/delete/:id', async (req, res) => {
  try {
    const chatId = req.params.id;
    await Chat.findByIdAndDelete(chatId);
    req.flash('success', 'Chat deleted successfully!');
    res.redirect('/chats');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Failed to delete chat.');
    res.redirect('/chats');
  }
});



app.listen(8080, () => {
    console.log('Server is listening on http://localhost:8080')
})
