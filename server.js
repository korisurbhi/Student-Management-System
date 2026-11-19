
const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/login', (req, res) => {
    res.render('login');
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
