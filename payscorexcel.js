var express = require('express');
var payscorexcel = express();
var fs = require('fs');
var xlsx = require('xlsx');
var path =  require('path');
var PORT = 3080;
var excelFile = xlsx.readFile('NCU-PAYS-COR-JUNE 19 2024 (003).xlsx'); 
var jsonFile  = path.join(__dirname, 'NCU-PAYS-COR-JUNE 19 2024.json');

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
payscorexcel.post('/add-data', (req, res) => {
     
    try{
        const newdata = req.body;
        if (!newdata || !Array.isArray(newdata)){
            return res.status(400).send('Invalid format. Data should be in an array of objects.');
        }
        
        try {
            // Read existing JSON data
            const jsonData = readJsonData();
            
            // Add new data to JSON file
            jsonData.push(...newdata);
            writeJsonData(jsonData);
            
            // Adding data to existing Excel File
            xlsx.utils.sheet_add_json(excelFile.Sheets['PAYS MAY 30 2024 (2)'], newdata, {origin: -1, skipHeader: true})
            xlsx.writeFile(excelFile, 'NCU-PAYS-COR-JUNE 19 2024 (003).xlsx' )
            
            
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
  
payscoreexcel.put('/update-data', (req,res) => {})
