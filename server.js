
const express = require('express');
const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/student_management_system')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB Error:', err));

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/login', (req, res) => {
    res.render('login');
});

// SIGN UP PAGE
app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', async (req, res) => {

    try {
        const {
            fullName,
            email,
            username,
            password,
            confirmPassword,
            role
        } = req.body;

        // Check password
        if (password !== confirmPassword) {
            return res.send('Passwords do not match!');
        }

        // Check existing user
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.send('Email or Username already exists!');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user
        const newUser = new User({
            fullName,
            email,
            username,
            password: hashedPassword,
            role
        });

        await newUser.save();

        res.send('Account created successfully!');

    } catch (error) {
        console.log(error);
        res.send('Something went wrong!');
    }

});

// FORGOT PASSWORD PAGE
app.get('/forgot', (req, res) => {
    res.render('forgot');
});

app.post('/login', (req, res) => {

    console.log("LOGIN ROUTE WORKING");

    const username = req.body.username;
    const password = req.body.password;

    console.log("USERNAME:", req.body.username);
    console.log("PASSWORD:", req.body.password);

    res.send('Login successful!');
});

console.log("POST ROUTE LOADED");

app.listen(5050, () => {
    console.log('Server running on port 5050');
});
