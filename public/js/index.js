const INPUT = document.querySelector('#input')
const SEARCHbtn = document.querySelector('#searchBtn')

// ---------------------------------LOGIN REDIRECT

document.querySelector("#loginBtn")
.addEventListener("click", getLogin)

function getLogin() {
    fetch("/login")
    .then(res => window.location.href = res.url)
    .catch(err => console.log("Internal server error. Sorry :(", err))
}

// ---------------------------------SIGNUP REDIRECT

document.querySelector("#signUpBtn")
    .addEventListener("click", getSignup)

function getSignup() {
    fetch("/signup")
    .then(res => window.location.href = res.url)
    .catch(err => console.log("Internal server error. Sorry :(", err))
}

// ---------------------------------FAVS REDIRECT

document.querySelector("#favsBtn")
    .addEventListener("click", goToFavs)

function goToFavs() {
    fetch("/favoritos")
    .then(res => window.location.href = res.url)
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

// ------------------------------------THIEF

function generateThief(){
    let div = document.createElement("div")
    div.setAttribute("class", "thiefSpiner")
    div.setAttribute("id", "spiner")
    
    let thief = document.createElement("img")
    thief.setAttribute("src", "img/thief.png")
    thief.setAttribute("id", "thief")
    div.appendChild(thief)
    document.querySelector('.welcome').appendChild(div)
}

// ------------------------------------REMOVE

function removeThief(){
    document.querySelector('#spiner').remove()
}

function removeContainer(){
    if (document.querySelector('#father').querySelectorAll('*')[0]){
        document.querySelector('#father').querySelectorAll('*').forEach(n=>n.remove())
    }
}

// ---------------------------------SEARCH FETCH

INPUT.addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
        removeContainer()
        generateThief()
        search()
    }
})

SEARCHbtn.addEventListener("click", () => {
    removeContainer()
    generateThief()
    search()    
})

function search(){
    if ( sessionStorage.getItem('token') ){
        fetch(`https://glacial-woodland-30782.herokuapp.com/search/${INPUT.value}`, {
            headers: {
                'authorization': `Bearer: ${sessionStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            removeThief()
            if (data.status == 200){
                data.data.map(el => printDataLogged(el))
            }
            if (data.status == 400){
                alert(data.msg)
            }
            if (data.status == 500){
                alert(data.msg)
            }
        })
        .catch(err => console.log("Internal server error. Sorry :(", err))
    } else {
        fetch(`https://glacial-woodland-30782.herokuapp.com/search/${INPUT.value}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            removeThief()
            if (data.status == 200){
                data.data.map(el => printDataAnon(el))
            }
            if (data.status == 400){
                alert(data.msg)
            }
            if (data.status == 500){
                alert(data.msg)
            }
        })
        .catch(err => console.log("Internal server error. Sorry :(", err))

    }
}

function printDataLogged(element) {
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

        if(element.fav){
            let favBtn = document.createElement("button")
            favBtn.setAttribute("class","enterBTN")
            footerOfert.appendChild(favBtn)
            favBtn.addEventListener("click", () => {
                if (confirm("¿Seguro que quieres eliminar esta oferta guardada?")){
                    star.setAttribute("src", "img/estrellaKo.svg")
                    // element.fav = false
                    deleteFav(element)    
                }
            })        
            let star = document.createElement("img")
            star.setAttribute("src", "img/estrella.svg")
            star.setAttribute("class","estrella")
            favBtn.appendChild(star)
            
        } else {
            let favBtn = document.createElement("button")
            favBtn.setAttribute("class","enterBTN")
            footerOfert.appendChild(favBtn)
            favBtn.addEventListener("click", () => {
                star.setAttribute("src", "img/estrella.svg")
                // element.fav = true
                setFav(element)
            })         
            let star = document.createElement("img")
            star.setAttribute("src", "img/estrellaKo.svg")
            star.setAttribute("class","estrella")
            favBtn.appendChild(star)
        }
}

function printDataAnon(element) {
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
            alert("Inicia sesión para guardar en favoritos")
            getLogin()
        })        
        let star = document.createElement("img")
        star.setAttribute("src", "img/estrellaKo.svg")
        star.setAttribute("class","estrella")
        favBtn.appendChild(star)

}

// ---------------------------------SAVE FAV

function setFav(favInfo) {
    fetch(`https://glacial-woodland-30782.herokuapp.com/newFav`, {
        headers: {
            'authorization': `Bearer: ${sessionStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({titulo: favInfo.titulo, descripcion: favInfo.descripcion, remuneracion: favInfo.remuneracion, enlace: favInfo.enlace})
    })
    .then(res => res.json())
    .then(data => {
        if (data.status == 200){
            alert(data.msg)
        }
        if (data.status == 400){
            alert(data.msg)
        }
        if (data.status == 500){
            alert(data.msg)
        }
    })
    .catch(err => console.log("Internal server error. Sorry :(", err))
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
        }
        if (data.status == 400){
            alert(data.msg)
        }
        if (data.status == 500){
            alert(data.msg)
        }
    })
    .catch(err => console.log("Internal server error. Sorry :(", err))
}