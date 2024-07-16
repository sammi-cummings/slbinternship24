var xlsx = require('xlsx')
var wkbk = xlsx.readFile('NCU-PAYS-COR-JUNE 19 2024 (003).xlsx')

var wsht = wkbk.Sheets['PAYS MAY 30 2024 (2)']
var wsht = xlsx.utils.sheet_to_json(wsht)
 
wsht.push({
    "Customer_TRN": "100291708",
    "RegistrationNo": "SLB-RLOS-123385",
    "Registered": "Y",
    "SemesterCost:": 181946.18,
    "Semester": 1,
    "GPA": 3.79,
    "Product_Code": "",
    "CurrentAcademicYear": 2023
  })

  xlsx.utils.sheet_add_json(wsht, wsht)
  xlsx.writeFile(wkbk,'NCU-PAYS-COR-JUNE 19 2024 (003).xlsx')

