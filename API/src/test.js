var xlsx = require('xlsx')
var wkbk = xlsx.readFile('NCU-PAYS-COR-JUNE 19 2024 (003).xlsx')

//var wsht = wkbk.Sheets['PAYS MAY 30 2024 (2)']
var wshtjson = xlsx.utils.sheet_to_json(wsht)

var y =[{
    "Customer_TRN": "100291708",
    "RegistrationNo": "SLB-RLOS-123385",
    "Registered": "YES",
    "SemesterCost": 181946.18,
    "Semester": 1,
    "GPA": 3.79,
    "Product_Code": "",
    "CurrentAcademicYear": 2023
    }]

wshtjson.push(y)
xlsx.utils.sheet_add_json(wkbk.Sheets['PAYS MAY 30 2024 (2)'], y, {origin: -1, skipHeader: true})
xlsx.writeFile(wkbk,'NCU-PAYS-COR-JUNE 19 2024 (003).xlsx')










