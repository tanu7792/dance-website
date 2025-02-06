
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 80;

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); // For serving static files
app.use(express.urlencoded({ extended: true })); // Middleware to parse form data

// PUG SPECIFIC STUFF
app.set('view engine', 'pug'); // Set the template engine as Pug
app.set('views', path.join(__dirname, 'views')); // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    const con = "This is the best content on the internet so fast";
    const params = { title: 'PUBG is the best game', content: con };
    res.status(200).render('index.pug', params);
});

app.post('/', (req, res) => {
    let name = req.body.name;
    let age = req.body.age;
    let gender = req.body.gender;
    let address = req.body.address;
    let more = req.body.more;

    let outputToWrite = `The name of the client is ${name}, ${age} years old, ${gender}, residing at ${address}, more about him/her: ${more}`;
    fs.writeFileSync(path.join(__dirname, 'output.txt'), outputToWrite);

    const params = { message: 'Your form has been submitted successfully' };
    res.status(200).render('index.pug', params);
});

// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});
