const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");

const initializePasspot = require('./passport-config')
initializePasspot(passport, email => {
    return users.find(user => user.email === email)
});

const users = []


app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
}));

app.get('/', (req, res) => {
    res.render('index.ejs', { name: 'Duke' });
})

/// LOGIN FORM
//#region
app.get('/login', (req, res) => {
    res.render('login.ejs');
})

app.post('/login', (req, res) => {
    //res.render('register.ejs');
})
//#endregion


// REGISTER FORM
app.get('/register', (req, res) => {
    res.render('register.ejs');
})

app.post('/register', async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.hashedPassword, 10);
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login')
    }
    catch{
        res.redirect('/register')
    }
    console.log(users)
})

app.listen(3000);