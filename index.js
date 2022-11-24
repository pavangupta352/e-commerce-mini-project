const express = require('express');
const app = express();
const db_connect = require('./db_connect')
const cors = require('cors')
const session = require('express-session')
const parser = require('cookie-parser');

const login = require('./login');
const register = require('./register');

app.use(session({
    key: "uid",
    secret: "0xC345$%^&ewfwfwaae#$%^&*SDFGHJKNBVCFDRGTHJM",
    resave: false,
    saveUninitialized: true,


}))
app.get('/hi', (r, rs) => rs.send('hello'))
app.use(cors({ credentials: true, origin: 'http://localhost:4000' }))
db_connect('test');

app.use(express.static('front'))
app.use(express.json());
app.use(parser())
app.use('/login', login)
app.use('/register', register)



app.get('/logout', (r, rs) => {
    r.session.destroy()
    rs.redirect("http://localhost:4000")
})

app.listen(4000, () => console.log('server started'))