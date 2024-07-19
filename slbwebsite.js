var express = require('express')
var slbwebsite = express()
var slbjam = '192.168.5.129'
var port = 9090


slbwebsite.use(express.json())
slbwebsite.listen(port, slbjam, () => {
    console.log('Server is listening on : ', 'http://' + slbjam + '/' + port)
})

slbwebsite.get('/login', (req, res) => {
    try {
        res.send(`<form>
            
            <div class = 'imglogo'>
            <img src = 'C:\Users\scummings\InternshipSLB -2024\slbinternship24\SLB-logo-smll.png' alt = "Students'Loan Bureau Logo">
            </div> <br><br>

            <div class - 'container' style = 'background-color: >
            <label for = 'uname'>Username</label>
            <input type = 'text' name = 'uname' required><br><br>

            <label for = 'pwrd'>Password</label>
            <input type = 'text' name = 'pwrd' required><br><br>

            <button type = 'submit'>Login</button>
            <button type = 'button' class = 'cancalbtn'> Cancel</button><br>

            <label>
            <input type ='checkbox' checked = "checked" name = 'remember'>Remember Me
            </label>
            <div>

            <div class = 'container'>
            <span class = 'pwrd'><a href ='#'> Forget password?</span>
            </div>

            </form>`)
    } catch (slbloginerr) {
        res.status(404).send('Page Not Found')
    }
})

slbwebsite.put('/loginsuccess', (req, res) => {

})