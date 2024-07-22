const slbloginpage = document.getElementById('form')
const uname = document.getElementById('uname')
const pwrd = document.getElementById('pwrd')
const rme = document.getElementById('rme')
const fpwrd = document.getElementById('fpwrd')
const rqstaccess = document.getElementById('fpwrd')
const error_message = document.getElementById('error_message')

slbloginpage.addEventListener('login', (e) =>{

    let ferr = []

    if(uname){
        ferr = getSLBLoginErrors(uname,pwrd)
    }
    
    if (ferr.length > 0){
        e.preventDefault()
        error_message.innerText = ferr.join(". ")
    }

})

slbloginpage.addEventListener('rqstaccess',(rae)=>{

})

slbloginpage.addEventListener('fpwrd', (fperr)=>{

})

function getSLBLoginErrors(uname,pwrd){
    let lginerr = []

    if (uname === "" || uname == null){
        lginerr.push('Username is required')
        uname.parentElement.classsList.add('Incorrect')
    }

    if (pwrd === "" || pwrd == null){
        lginerr.push('Password is required')
        uname.parentElement.classsList.add('Incorrect')
    }

    return lginerr

}