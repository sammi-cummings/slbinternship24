const express = require('express');
const confirmatiregistration = express();
const fs = require('fs');
const bodyParser = require('body-parser');
//const excelJS = require('exceljs');

confirmatiregistration.use(bodyParser.json());
confirmatiregistration.use(bodyParser.urlencoded({extended: true}));

const PORT = 4580;

//Endpoint for port 4580
confirmatiregistration.listen(PORT, () => {
    console.log("Server Listening on PORT: ", PORT);
});


               //ENDPOINTS TO GET, UPDATE, ADD AND DELETE DATA FOR EXCEL FILE/
confirmatiregistration.get('/atistatus', function(req,res){
    fs.readFile(__dirname + "/" + "confirmatiregistration.json", "utf8", function(errd,datab){
        console.log(datab);
        res.send(datab);
        if (errd)
            console.log(errd);
    });
});