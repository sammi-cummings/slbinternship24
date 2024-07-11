const express = require('express');
const slbapp = express();
const fs = require('fs');
const bodyParser = require('body-parser');

slbapp.use(bodyParser.json());
slbapp.use(bodyParser.urlencoded({extended: true}));

const PORT = 3080;

//Endpoint for port 3080
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


//Endpoint to retrieve a customer's data by trn
slbapp.get("/:customerbytrn", function(req,res){
    fs.readFile(__dirname + "/" + "users.json", "utf8", function(err,data){
        data = JSON.parse(data);
        const trn = data + req.body.trn;
        res.send(trn);
        if (err)
            console.log(err);
    });
});

//Endpoint to update customer's data
slbapp.put("/updatecustomer", function(req,res){
    
    fs.readFileSync(__dirname + "/" + "users.json", "utf8", function(err,data){
        data = JSON.parse(data);
        

    });
});

//Endpoint to add customer's data to file
slbapp.post("/addcustomer", function(req,res){
    const newUser = {
        trn: req.body.trn,
        RegistrationNo: req.body.RegistrationNo,
        RegistrationStatus: req.body.RegistrationStatus,
        SemesterCost: req.body.SemesterCost,
        SemesterNumber: req.body.SemesterNumber,
        GPA: req.body.GPA,
        ProductCode: req.body.ProductCode,
        AcademicYear: req.body.AcademicYear
    };

    fs.readFileSync(__dirname + "/" + "users.json", "utf8", function(err,data){
        data = JSON.parse(data);
        fs.writeFileSync(__dirname + "/" + "users.json", newUser, "utf8", err =>{
            if (err){
                console.error(err)
            }else{
                console.log(JSON.stringify(data));
                res.send("Customer's data added successfully.");
            }
        })
       if (err)
            console.log(err);
    });
});

//Endpoint to delete customer's data
slbapp.delete("/deletecustomer", function(req,res){
    fs.readFileSync(__dirname + "/" + "users.json", "utf8", function(err,data){

    });
});