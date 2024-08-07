const express = require('express');
const confirmatiregistration = express();
const fs = require('fs');
const PORT = 4580;
const ExcelJS = require('exceljs');
const path =  require('path');
const excelFile = path.join(__dirname, 'Manal COR and GPA for Applications that are stuck at - Application Status Check and Confirm_ATI_Registration Work Step - May 24, 2024.xlsx');
const jsonFile  = path.join(__dirname, 'confirmatiregistration.json');

confirmatiregistration.use(express.json());


//Endpoint for port 4580
confirmatiregistration.listen(PORT, () => {
    console.log("Server Listening on PORT: ", PORT);
});


//API Route to retrieve data from JSON File
confirmatiregistration.get('/all-data', function(req,res){
    try{
        fs.readFile(jsonFile, function(errJsonfile, dataconaticreg){
            console.log(dataconaticreg);
            res.send(dataconaticreg);
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
applicationstatuscheck.post('/add-data', async (req, res) => {
    try{
        const newdata = req.body; //Expecting an array of objects
        if (!newdata || !Array.isArray(newdata)) {
            return res.status(400).send('Invalid format. Data should be in an array of objects.');
        }
        
        try {
            // Read existing JSON data
            const jsonData = readJsonData();
            
            // Add new data to JSON
            jsonData.push(...newdata);
            writeJsonData(jsonData);
            
            // Open existing Excel file
            const wkbk = new ExcelJS.Workbook();
            await wkbk.xlsx.readFile(excelFile);
            const wksht = wkbk.getWorksheet(2); //Using current worksheet
            
            // Adding new row/s to Excel worksheet
            newdata.forEach(info => {
            wksht.addRow(info);
            });

            // Save the Excel file
            await wkbk.xlsx.writeFile(excelFile);

             res.status(200).send('Data added successfully to the worksheet');
    
        }catch (excelerr) {
        console.error(excelerr);
        res.status(500).send('Data not added to the worksheet. Try again');
        }

    } catch(posterr){
    console.error(posterr);
    res.status(404).send('Not Found')
   }
});