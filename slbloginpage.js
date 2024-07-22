const slbloginpage = document.getElementById('form')
const uname = document.getElementById('uname')
const pwrd = document.getElementById('pwrd')
const login = document.getElementById('login')
const rqstaccess = document.getElementById('fpwrd')
const error_message = document.getElementById('error_message')
const mysql2 = require('mysql2')


//Login Button
slbloginpage.addEventListener('login', (e) =>{
    try {
        const logininfo = validateUnamePassword(uname,pwrd)
        if (ferr.length > 0){
            e.preventDefault()
            error_message.innerText = ferr.join(". ")
        }
    
    }catch(lgberr){

    }
})


//Request Access Button
slbloginpage.addEventListener('rqstaccess',(rae)=>{

})




//Function to validate the customer's username and password
function validateUnamePassword(uname, pwrd){
    try{

    let vnperr =[]
    const success = true

    if ((pwrd == '' & uname == '') || (pwrd == '' & uname == found) || (pwrd == found & uname == '')){
        vnperr.push('Insert password or username')
        vnperr.parentElement.classList.add('Incorrect')
    
    }else if ((pwrd !== found & uname == found) || (pwrd == found & uname !== found) || (pwrd !== found & uname !== found)){
        vnperr.push('Incorrect username or password')
        vnperr.parentElement.classList.add('Incorrect')
    }

    return success
    }catch(vuperr){

    }
}
