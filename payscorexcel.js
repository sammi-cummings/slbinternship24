const express = require('express');
const payscorexcel = express();
const fs = require('fs');
const bodyParser = require('body-parser');
//const excelJS = require('exceljs');

payscorexcel.use(bodyParser.json());
payscorexcel.use(bodyParser.urlencoded({extended: true}));

const PORT = 3080;

//Endpoint for port 3080
payscorexcel.listen(PORT, () => {
    console.log("Server Listening on PORT: ", PORT);
});

               //ENDPOINTS TO GET, UPDATE, ADD AND DELETE DATA FPR EXCEL FILE/

//Endpoint to retrieve customers' data from NCU-PAYS-COR-JUNE 19 2024
payscorexcel.get('/customers', function(req,res){
    fs.readFile(__dirname + "/" + "NCU-PAYS-COR-JUNE 19 2024.json", "utf8", function(err,data){
        console.log(data);
        res.send(data);
        if (err)
            console.log(err);
    });
});


//Endpoint to retrieve a customer's data by trn
payscorexcel.get("/:customerbytrn", function(req,res){
    fs.readFile(__dirname + "/" + "NCU-PAYS-COR-JUNE 19 2024.json", "utf8", function(err,data){
        data = JSON.parse(data);
        const trn = data + req.body.trn;
        res.send(trn);
        if (err)
            console.log(err);
    });
});

//Endpoint to update customer's data
payscorexcel.put("/updatecustomer", function(req,res){
    
    fs.readFileSync(__dirname + "/" + "NCU-PAYS-COR-JUNE 19 2024.json", "utf8", function(err,data){
        data = JSON.parse(data);
        

    });
});

//Endpoint to add customer's data to file
payscorexcel.post("/addcustomer", function(req,res){
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
payscorexcel.delete("/deletecustomer", function(req,res){
    fs.readFileSync(__dirname + "/" + "users.json", "utf8", function(err,data){

    });
});

