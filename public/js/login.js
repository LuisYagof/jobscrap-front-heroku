const INPUTmail = document.querySelector("#inputEmail")
const INPUTpass = document.querySelector("#inputPass")

// ---------------------------------------------VOLVER

document.querySelector("#goBackBtn")
.addEventListener("click", () => goBack())
    
function goBack() {
    fetch("/")
    .then(res => window.location.href = res.url)
    .catch(err => console.log("Internal server error. Sorry :(", err))
};


// ---------------------------------------------PASSWORD

document.querySelector("#forgotBtn")
    .addEventListener("click", () => forgot())
    
function forgot() {
    fetch("/recuperar")
    .then(res => window.location.href = res.url)
    .catch(err => console.log("Internal server error. Sorry :(", err))
};

// ---------------------------------------------SIGN UP  

document.querySelector("#loginBtn")
    .addEventListener("click", () => login() )
    
function login() {
    fetch("https://glacial-woodland-30782.herokuapp.com/login", {
        method: 'POST',
        body: JSON.stringify( {email: INPUTmail.value, pass: INPUTpass.value} ),
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

