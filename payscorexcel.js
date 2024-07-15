const express = require('express');
const payscorexcel = express();
const fs = require('fs');
const xlsx = require('xlsx');
//const exceljs = require('exceljs');
const path =  require('path');
const PORT = 3080;
const excelFile = path.join(__dirname, 'NCU-PAYS-COR-JUNE 19 2024 (003).xlsx'); 
const jsonFile  = path.join(__dirname, 'NCU-PAYS-COR-JUNE 19 2024.json');

payscorexcel.use(express.json());

//Endpoint for port 3080
payscorexcel.listen(PORT, () => {
    console.log("Server Listening on PORT: ", PORT);
});


                    //Functions to read and write JSON Data - NCU-PAYS-COR-JUNE 19 2024.json

//Function to read JSON File
const readJsonData = () => {
    if (fs.existsSync(jsonFile)) {
        const data = fs.readFileSync(jsonFile);
        return JSON.parse(data);
    }
    return [];
};

//Function to write JSON data
const writeJsonData = (data) => {
    fs.writeFileSync(jsonFile, JSON.stringify(data, null, 2));
};


//API route to retrieve the data from JSON File
payscorexcel.get('/all-data', async(req,res) =>{
    try{
        fs.readFile(jsonFile,  function(errJsonfile, datapayscor){
            console.log(datapayscor);
            res.send(datapayscor);
            if(errJsonfile){
                console.log(errJsonfile);
            }
        });
    }catch(geterr){
        console.error(geterr);
        res.status(404).send('Not Found')
    }
});

//API route to add data to Excel Workbook
payscorexcel.post('/add-data', async(req, res) => {
     
    try{
        const jsonnewdata = req.body;
        if (!jsonnewdata || !Array.isArray(jsonnewdata)){
            return res.status(400).send('Invalid format. Data should be in an array of objects.');
        }
        
        try {
            // Read existing JSON data
            const jsonData = readJsonData();
            
            // Add new data to JSON
            jsonData.push(...jsonnewdata);
            writeJsonData(jsonData);
            
            // Open existing Excel file
            const wkbk = xlsx.readFile(excelFile);
            await wkbk.xlsx.readFile(excelFile);
            const wksht = wkbk.getWorksheet('PAYS MAY 30 2024 (2)');
            
            jsonnewdata.forEach(info => {
                wksht.addRow(info);
            });
              
            
            await wkbk.xlsx.writeFile(excelFile);
            
            
            res.status(200).send('Data added successfully to the worksheet');
    
        }catch (excelerr){
            console.error(excelerr);
            res.status(500).send('Data not added to the worksheet. Try again');
        }

    } catch(posterr){
        console.error(posterr);
        res.status(404).send('Not Found')
    }
});

//payscorexcel.delete('/delete-data', async(req,res)=>{

    //try{
       // const deletedata = req.body;
    //}
//})

