// ---------------------------------HOME REDIRECT

document.querySelector("#goSearchBtn")
.addEventListener("click", goSearch)

function goSearch() {
    fetch("/")
    .then(res => window.location.href = res.url)
    .catch(err => console.log("Internal server error. Sorry :(", err))
}

// ---------------------------------SHOW FAVS

function showFavs () {
    fetch("https://glacial-woodland-30782.herokuapp.com/showFavs", {
        headers: {
            'authorization': `Bearer: ${sessionStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
    })
    .then(res => res.json())
    .then(data => {
        if (data.status == 200){
            saludar(data.nombre)
            data.data.map(el => printData(el))
        }
        if (data.status == 400){
            alert(data.msg)
        }
        if (data.status == 403){
            alert(data.msg)
            setTimeout(window.location.href = data.url, 1500)
        }
    })
    .catch(err => console.log("Internal server error. Sorry :(", err))
}

showFavs()

function saludar(nombre = usuarie){
    let saludo = document.createElement("h2")
    saludo.setAttribute("class", "saludo")
    saludo.innerText = `¡Hola, ${nombre}! Estás en tu área personal.`
    document.querySelector('.welcome').appendChild(saludo)
}

function printData(element) {
        // Creación de tarjeta en la que se almacenará cada oferta.

        let card = document.createElement("div")
        card.setAttribute("class", "ofert")
        document.querySelector('#father').appendChild(card)

        // Título de la oferta
        let title = document.createElement("a")
        title.setAttribute("class", "titulo")
        title.setAttribute("href", element.enlace)
        title.setAttribute("target", "_blank")
        title.innerText = element.titulo;
        card.appendChild(title)

        //  Descripción
        let description = document.createElement("p")
        description.setAttribute("class", "descripcion");
        description.innerText = element.descripcion;
        card.appendChild(description)

        // // SubContenedor
        let footerOfert = document.createElement("div")
        footerOfert.setAttribute("class", "footer-ofert")
        card.appendChild(footerOfert);

        let money = document.createElement("h4")
        money.setAttribute("class","remuneracion")
        money.innerText = element.remuneracion
        footerOfert.appendChild(money)

        let favBtn = document.createElement("button")
        favBtn.setAttribute("class","enterBTN")
        footerOfert.appendChild(favBtn)
        favBtn.addEventListener("click", () => {
            deleteFav(element)
        })        
        let star = document.createElement("img")
        star.setAttribute("src", "img/estrella.svg")
        star.setAttribute("class","estrella")
        favBtn.appendChild(star)
}

// ---------------------------------DELETE FAVS

function deleteFav(favId) {
    fetch("https://glacial-woodland-30782.herokuapp.com/deleteFav", {
        method: 'DELETE',
        body: JSON.stringify( { elem: favId } ),
        headers: {
            'Content-Type': "application/json",
            'authorization': `Bearer: ${sessionStorage.getItem('token')}`,
        }
    })
    .then(res => res.json())
    .then(data => {
        if (data.status == 200){
            alert(data.msg)
            setTimeout(window.location.href = data.url, 1500)
        }
        if (data.status == 500){
            alert(data.msg)
        }
    })
    .catch(err => console.log("Internal server error. Sorry :(", err))
}

// ------------------------------------------LOGOUT

document.querySelector("#logoutBtn")
    .addEventListener("click", () => logout() )
    
function logout() {
    fetch("https://glacial-woodland-30782.herokuapp.com/logout", {
        method: 'PUT',
        headers: {
            'authorization': `Bearer: ${sessionStorage.getItem('token')}`
        }
    })
    .then(res => res.json())
    .then(data => {
        if (data.status == 200){
            alert(data.msg)
            sessionStorage.removeItem('token')
            setTimeout(window.location.href = data.url, 1500)
        }
        if (data.status == 500){
            alert(data.msg)
            setTimeout(window.location.href = data.url, 1500)
        }
    })
    .catch(err => console.log("Internal server error. Sorry :(", err))
}
