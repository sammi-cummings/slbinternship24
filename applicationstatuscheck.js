const express = require('express');
const applicationstatuscheck = express();
const fs = require('fs');
const ExcelJS = require('exceljs');
const path =  require('path');
const PORT = 5672;
const excelFile = path.join(__dirname, 'Manal COR and GPA for Applications that are stuck at - Application Status Check and Confirm_ATI_Registration Work Step - May 24, 2024.xlsx');
const jsonFile  = path.join(__dirname, 'applicationstatuscheck.json');

applicationstatuscheck.use(express.json());

//Endpoint for port 5672
applicationstatuscheck.listen(PORT, () => {
    console.log("Server Listening on PORT: ", PORT);
});

                     //Functions to read and write JSON Data - applicationstatuscheck.json
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
applicationstatuscheck.get('/all-data', async(req,res) =>{
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
            const wksht = wkbk.getWorksheet(1); //Using current worksheet
            
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