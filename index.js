const { check, validationResult }
    = require('express-validator');
 
const bodyparser = require('body-parser')
const express = require("express")
const path = require('path');
const { log } = require('console');
const app = express()
 
var PORT = 3000
 
// View Engine Setup
app.set("views", path.join(__dirname))
app.set("view engine", "ejs")

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.render("form");
})

app.post('/saveData', [
    check('email', 'Email length should be 10 to 30 characters')
                    .isEmail().isLength({ min: 10, max: 30 }),
    check('name', 'Name length should be 10 to 20 characters')
                    .isLength({ min: 10, max: 20 }),
    check('mobile', 'Mobile number should contains 10 digits')
                    .isLength({ min: 10, max: 10 }),
    check('password', 'Password length should be 8 to 10 characters')
                    .isLength({ min: 8, max: 10 })
], (req, res) => {
 
    // validationResult function checks whether
    // any occurs or not and return an object
    const errors = validationResult(req);
 
    // If some error occurs, then this
    // block of code will run
    if (!errors.isEmpty()) {
        res.json(errors)
        console.log(errors);
    }
 
    // If no error occurs, then this
    // block of code will run
    else {
        res.send("Successfully validated")
    }
});
 


app.listen(3000,()=>{
    console.log("running")
})