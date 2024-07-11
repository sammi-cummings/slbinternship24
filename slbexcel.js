const express = require('express');
const slbexcel = express();
const fs = require('fs');
const bodyParser = require('body-parser');

slbexcel.use(bodyParser.json());
slbexcel.use(bodyParser.urlencoded({extended: true}));

const PORT = 3080;

//Endpoint for port 3080
slbexcel.listen(PORT, () => {
    console.log("Server Listening on PORT: ", PORT);
});

            //ENDPOINTS TO GET, UPDATE, ADD AND DELETE DATA TO  NCU-PAYS-COR-JUNE 19 2024//

//Endpoint to retrieve customers' data from NCU-PAYS-COR-JUNE 19 2024
slbexcel.get('/customers', function(req,res){
    fs.readFile(__dirname + "/" + "NCU-PAYS-COR-JUNE 19 2024.json", "utf8", function(err,data){
        console.log(data);
        res.send(data);
        if (err)
            console.log(err);
    });
});


//Endpoint to retrieve a customer's data by trn
slbexcel.get("/:customerbytrn", function(req,res){
    fs.readFile(__dirname + "/" + "NCU-PAYS-COR-JUNE 19 2024.json", "utf8", function(err,data){
        data = JSON.parse(data);
        const trn = data + req.body.trn;
        res.send(trn);
        if (err)
            console.log(err);
    });
});

//Endpoint to update customer's data
slbexcel.put("/updatecustomer", function(req,res){
    
    fs.readFileSync(__dirname + "/" + "NCU-PAYS-COR-JUNE 19 2024.json", "utf8", function(err,data){
        data = JSON.parse(data);
        

    });
});

//Endpoint to add customer's data to file
slbexcel.post("/addcustomer", function(req,res){
    const newUser = {
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
slbexcel.delete("/deletecustomer", function(req,res){
    fs.readFileSync(__dirname + "/" + "users.json", "utf8", function(err,data){

    });
});


            //ENDPOINTS TO GET, UPDATE, ADD AND DELETE DATA TO 
            //Manual COR and GPA for Applications that are stuck at - Application Status Check 
            //and Confirm_ATI_Registration Work Step - May 24, 2024


//Endpoint to retrieve customers' data from applicationstatuscheck
slbexcel.get('/customersapplicationstatus', function(req,res){
    fs.readFile(__dirname + "/" + "applicationstatuscheck.json", "utf8", function(err,data){
        console.log(data);
        res.send(data);
        if (err)
            console.log(err);
    });
});

//Endpoint to retrieve customers' data from confirmatiregistration
slbapp.get('/customersapplicationstatus', function(req,res){
    fs.readFile(__dirname + "/" + "confirmatiregistration.json", "utf8", function(err,data){
        console.log(data);
        res.send(data);
        if (err)
            console.log(err);
    });
});
