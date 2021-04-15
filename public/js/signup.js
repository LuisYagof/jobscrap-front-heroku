const INPUTname = document.querySelector("#inputName")
const INPUTmail = document.querySelector("#inputEmail")
const INPUTpass = document.querySelector("#inputPass")

// ---------------------------------------------VOLVER

document.querySelector("#goBackBtn")
    .addEventListener("click", () => goBack())
    
function goBack() {
    fetch("/")
    .then(res => window.location.href = res.url)
    .catch(err => console.log("Internal server error. Sorry ;(", err))
};

// ---------------------------------------------SIGN UP  

document.querySelector("#signUpBtn")
    .addEventListener("click", () => signUp() )
    
function signUp() {
    fetch("https://glacial-woodland-30782.herokuapp.com/signup", {
        method: 'POST',
        body: JSON.stringify( {nombre: INPUTname.value, email: INPUTmail.value, pass: INPUTpass.value} ),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(res => res.json())
    .then(data => {
        if (data.status == 200){
            alert(data.msg)
            sessionStorage.setItem("token", data.token)
            setTimeout(window.location.href = data.url, 1500)
        }
        if (data.status == 406){
            alert(data.msg)
        }
        if (data.status == 500){
            alert(data.msg)
        }
    })
    .catch(err => console.log("Internal server error. Sorry :(", err))
}

