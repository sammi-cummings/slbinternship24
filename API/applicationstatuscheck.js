var express = require('express')
var applicationstatuscheck = express()
var fs = require('fs')
var path = require('path')
var xlsx = require('xlsx')
var PORT = 5672;
var excelFile = xlsx.readFile('Manal COR and GPA for Applications that are stuck at - Application Status Check and Confirm_ATI_Registration Work Step - May 24, 2024.xlsx')
var wksht = excelFile.Sheets['Application Status Check']
var jsonFile = path.join(__dirname, 'applicationstatuscheck.json')

applicationstatuscheck.use(express.json());

//API Route for port 5672
applicationstatuscheck.listen(PORT, () => {
    console.log("Server Listening on PORT: ", PORT);
});

                          //Functions to read and write JSON Data

//Function to read JSON File
var readJsonData = () => {
    if (fs.existsSync(jsonFile)) {
        const data = fs.readFileSync(jsonFile);
        return JSON.parse(data);
    }
    return [];
};

//Function to add JSON data to JSON file
var writeJsonData = (data) => {
    fs.writeFileSync(jsonFile, JSON.stringify(data, null, 2));
};


//API route to retrieve the data from JSON File
applicationstatuscheck.get('/all-data', async(req,res) =>{
    try{ 
        fs.readFile(jsonFile, function(errJsonfile, datapayscor){
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
applicationstatuscheck.post('/add-data', (req, res) => {
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
            
            sheet1 = workbook.Sheets["Application Status Check"]
            sheet1.push(newdata);
            xlsx.utils.sheet_add_json(workbook.Sheets[sheet1], sheet1)
            xlsx.writeFile(workbook, 'Manal COR and GPA for Applications that are stuck at - Application Status Check and Confirm_ATI_Registration Work Step - May 24, 2024.xlsx');


            //const worksheet = workbook.getWorksheet(1); //Using current worksheet
            
            // Adding new row/s to Excel worksheet
           // newdata.forEach(info => {
           // worksheet.addRow(info);
            //});

            // Save the Excel file
            //await workbook.xlsx.writeFile(excelFile);

             res.status(200).send('Data added successfully to the worksheet');
    
        }catch (excelerr) {
        console.error(excelerr);
        res.status(500).send('Data not added to the worksheet. Try again');
        }

    } catch(posterr){
    console.error(posterr);
    res.status(404).send('Not Found');
   }
});


//API Route to update a current data in Excel Workbook
applicationstatuscheck.put('/update-data', async(req,res) => {
    try{
        const updatedata = req.body; //Expecting array of objects
        if (!updatedata || !Array.isArray(updatedata)){
            return res.status(400).send('Invalid format. Data should be in an array of objects.');
        }
        try{
        
            //Read existing JSON File
        const jsonData = readJsonData();

         // Open existing Excel file
         const workbook = new ExcelJS.Workbook();
         await workbook.xlsx.readFile(excelFile);
         const worksheet = workbook.getWorksheet(1); //Using current worksheet


        }catch(excelupderr){

        }
    }catch(puterr){
        console.error(puterr);
        res.status(404).send('Not Found');
    }

})

//API Route to delete current data in Excel Workbook
applicationstatuscheck.delete('/delete-data', async(req,res)=>{
    try{
        const filters = req.body;
    }catch(err){}
})