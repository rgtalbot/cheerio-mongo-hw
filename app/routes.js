var express = require('express');
var path = require('path');
var request = require('request');
var router = express.Router();


//SIGN UP FORM POST AND REDIRECT
// router.post('/api/new', function (req, res) {
//     console.log('here?');
//     console.log(req.body);
//     var newCompany = req.body;
//     request({
//         url: myDirectory + "auth/register",
//         method: "POST",
//         form: newCompany
//     }, function(error, response, body) {
//         res.send(body);
//     });
// });


//route to handle delete goes here (app.delete)


// FRONTEND ROUTES =======================
//route to handle all angular requests
router.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;