const express = require('express');
const applicationstatuscheck = express();
const fs = require('fs');
const bodyParser = require('body-parser');
//const excelJS = require('exceljs');

applicationstatuscheck.use(bodyParser.json());
applicationstatuscheck.use(bodyParser.urlencoded({extended: true}));

const PORT = 5672;

//Endpoint for port 5672
applicationstatuscheck.listen(PORT, () => {
    console.log("Server Listening on PORT: ", PORT);
});

                    //ENDPOINTS TO GET, UPDATE, ADD AND DELETE DATA FPR EXCEL FILE/

//Endpoint retrieving data from JSON File
applicationstatuscheck.get('/atistatus', function(req,res){
    fs.readFile(__dirname + "/" + "applicationstatuscheck.json", "utf8", function(err,data){
        console.log(datab);
        res.send(datab);
        if (errd)
            console.log(errd);
    });
});