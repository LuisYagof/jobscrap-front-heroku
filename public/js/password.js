// ---------------------------------------------REESTABLECER

const Url = new URLSearchParams(window.location.search)
const token = Url.get('tok')

function reestablecer(){
    fetch(`https://glacial-woodland-30782.herokuapp.com/reestablecer/${token}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(res => res.json())
    .then(data => {
        if (data.status == 200){
            alert(data.msg)
            printDynamics(data.userMail, data.id, data.nombre, data.secret)
        }

        if (data.status == 500){
            alert(data.msg)
            setTimeout(window.location.href = data.url, 1500)
        }
    })
    .catch(err => console.log("Internal server error. Sorry :(", err))
}

reestablecer()

// ---------------------------------------------PRINT

function printDynamics (mail, id, nombre = usuario, secret){

    let cardMensaje = document.createElement("div")
    let mensaje = document.createElement("h2")
    mensaje.setAttribute("class", "textLog")
    mensaje.innerText = `¡Hola, ${nombre}! Escribe tu nueva contraseña.`
    cardMensaje.appendChild(mensaje)
    document.querySelector("#container").appendChild(cardMensaje);

    let cardInput  = document.createElement("div")
    cardInput.setAttribute("class","write")
    let input = document.createElement("input")
    input.setAttribute("placeholder","Escribe aquí tu contraseña.")
    input.setAttribute("class","input")
    input.setAttribute("type","password")
    // input.setAttribute("required")
    cardInput.appendChild(input);
    document.querySelector("#container").appendChild(cardInput);
    
    let cardBoton  = document.createElement("div")
    cardBoton.setAttribute("class","btn")
    let boton = document.createElement("button")
    boton.innerText= "Enviar";
    boton.setAttribute("type","button")
    boton.setAttribute("class","basicBtn")
    cardBoton.appendChild(boton);
    document.querySelector("#container").appendChild(cardBoton);
    
   boton.addEventListener("click", () => {
       resetPass (input.value, mail, id, secret)
    })
}

// ---------------------------------------------NEW PASS 
    
function resetPass(pass, mail, id, secret) {
fetch("https://glacial-woodland-30782.herokuapp.com/newPass", {
        method: 'PUT',
        body: JSON.stringify( {pass: pass, email: mail, id: id, secret: secret} ),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(res => res.json())
    .then(data => {
        if (data.status == 200){
            alert("Contraseña cambiada correctamente. Bienvenido")
            sessionStorage.setItem("token", data.token)
            window.location.href = data.url
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