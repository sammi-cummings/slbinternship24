const express = require('express');
const slbapp = express();
const fs = require('fs');

const PORT = 3080;

slbapp.listen(PORT, () => {
    console.log("Server Listening on PORT: ", PORT);
});

//Endpoint to retrieve customers' data from file
slbapp.get('/customers', function(req,res){
    fs.readFile(__dirname + "/" + "users.json", "utf8", function(err,data){
        console.log(data);
        res.send(data);
        if (err)
            console.log(err);
    });
});

//Endpoint to update customer's data
slbapp.put("/updatecustomer", function(req,res){
    fs.readFileSync(__dirname + "/" + "users.json", "utf8", function(err,data){
        
    })
})
