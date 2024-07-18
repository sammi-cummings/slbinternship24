var express = require('express')
var mysql2 = require('mysql2')
var bodyparser = require('body-parser')
var payscorexcel = express()
var fs = require('fs')
var xlsx = require('xlsx')
var path = require('path')
var excelFile = xlsx.readFile('NCU-PAYS-COR-JUNE 19 2024 (003).xlsx') 
var jsonFile  = path.join(__dirname, 'NCU-PAYS-COR-JUNE 19 2024.json')
var PORT = 3080;
var ipAddress = '192.168.5.129'

var con = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qj_wj%pC8+Pk',
    database: 'NCU_PAYS_COR_JUNE_19_2024'
})


payscorexcel.use(express.json())
payscorexcel.use(bodyparser.json())
payscorexcel.use(bodyparser.urlencoded({extended:true}))

 
//API Route for 192.168.5.129:3080
payscorexcel.listen(PORT, ipAddress,() =>{
    console.log(' Server is listening on : ', "http"+':'+"//"+ipAddress +':'+ PORT)
})


//Functions to read and write JSON Data

//Function to read JSON File
const readJsonData = () => {
    if (fs.existsSync(jsonFile)) {
        const data = fs.readFileSync(jsonFile)
        return JSON.parse(data)
    }
    return []
}

//Function to write JSON data
const writeJsonData = (data) => {
    fs.writeFileSync(jsonFile, JSON.stringify(data, null, 2))
}


function jsonToSql(json) {
    const tableName = 'PAYSMAY302024';
    const columns = Object.keys(json).join(', ');
    const values = Object.values(json).map(value => `'${value}'`).join(', ');
  
    const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;
    return sql;
  }


//API route to retrieve the data from Excel File and convert to JSON
payscorexcel.get('/all-data', (req,res) =>{
    try{
        var jsondata = xlsx.utils.sheet_to_json(excelFile.Sheets['PAYS MAY 30 2024 (2)'])
            console.log(jsondata)
            res.send(jsondata)
    }catch(geterr){
        console.error(geterr)
        res.status(404).send('Page Not Found')
    }
})

//payscorexcel.get("/add-data", (req,res) => {
   // const newdata = req.body
   // res.send(Enter data: ', newdata)
//})


//API ROUTE TO REQUEST BODY
//payscorexcel.get('/add-data', (req, res) => {
    //try{
      //  res.send(`
    //<form action="/data-added" method="POST">
   // <label for="newdata">Enter data here</label><br><br>
    //<label for="newdata">TRN :</label>
   // <input type="text" Customer TRN="newdata"><br><br>
   // <label for="newdata">Registration Number :</label>
   // <input type = "text" RegistrationNo="newdata"><br><br>
   // <label for="newdata">Registered :</label>
   // <input type = "text" Registered="newdata"><br><br>
    //<label for="newdata">Semester Cost :</label>
    //<input type = "text" SemesterCost="newdata"><br><br>
    //<label for="newdata">Semester :</label>
    //<input type = "text" Semester="newdata"><br><br>
   /// <label for="newdata">GPA :</label>
   // <input type = "text" GPA="newdata"><br><br>
   // <label for="newdata">Product Code :</label>
   // <input type = "text" Product_Code="newdata"><br><br>
    //<label for="newdata">Current Academic Year :</label>
    //<input type = "text" CurrentAcademicYear="newdata"><br><br>
    //<button type="submit">Submit</button>
    //</form>`)

   // }catch(adddataerr){
  //      console.error(adddataerr)
  ////      res.status(500).send('Data not sent. Try again')
  //  }
//})

//API route to add data to Excel Workbook, JSON File and SQL
payscorexcel.post('/data-added', (req, res) => {
     
    try{
        const newdata = req.body
        if (!newdata || !Array.isArray(newdata)){
            return res.status(400).send('Invalid format. Data should be in an array of objects.')
        }
        
        try {
            // Read existing JSON data
            const jsonData = readJsonData()
            
            // Add new data to JSON file
            jsonData.push(...newdata)
            writeJsonData(jsonData)
            
            // Adding data to existing Excel File
            xlsx.utils.sheet_add_json(excelFile.Sheets['PAYS MAY 30 2024 (2)'], newdata, {origin: -1, skipHeader: true})
            xlsx.writeFile(excelFile, 'NCU-PAYS-COR-JUNE 19 2024 (003).xlsx' )
            
            con.connect(function(sqlerr){
                if(sqlerr) throw sqlerr
                console.log("Connected")
                const datasql = jsonToSql(newdata)
                con.query(datasql,(queryerr, res)=>{
                    if(queryerr){
                        return res.status(500).send(queryerr)
                    }
                })
            })

            res.status(200).send('Data added successfully')



            
        }catch (exceladderr){
            console.error(exceladderr)
            res.status(500).send('Data not added. Try again')
        }



    } catch(posterr){
        console.error(posterr)
        res.status(404).send('Page Not Found')
    }
});
  
payscorexcel.put('/update-data', (req,res) => {
    const {} = req.body
    try{
        var jsonexceldata = xlsx.utils.sheet_to_json(excelFile.Sheets['PAYS MAY 30 2024 (2)'])
        var existdata =  readJsonData()

        jsonexceldata.forEach(jsondata =>{ 
            for(let key in jsondata){
                existdata[key] = jsondata[key]
            } 
        })
        
        writeJsonData(existdata)
        
        res.status(200).send('Data updated successfully')

    }catch(puterror){
        console.error(puterror)
        res.status(404).send('Page Not Found')
    }
})
