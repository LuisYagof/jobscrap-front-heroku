const INPUTmail = document.querySelector("#inputEmail")
const SENDbtn = document.querySelector("#sendBtn")

// ---------------------------------LOGIN REDIRECT

document.querySelector("#goBackBtn")
.addEventListener("click", goBack)

function goBack() {
    fetch("/login")
    .then(res => window.location.href = res.url)
    .catch(err => console.log("Internal server error. Sorry :(", err))
}


SENDbtn.addEventListener("click", () => recuperar() )

function recuperar() {
    fetch("https://glacial-woodland-30782.herokuapp.com/recuperar", {
        method: 'POST',
        body: JSON.stringify( {email: INPUTmail.value} ),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(res => res.json())
    .then(data => {
        if (data.status == 200){
            alert(data.msg)
        }
        if (data.status == 400){
            alert(data.msg)
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
