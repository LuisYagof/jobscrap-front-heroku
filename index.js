// -------------------------PAQUETES E IMPORTACIONES

const express = require('express');

// -------------------------------SERVIDOR Y PUERTOS

const server =  express()
const listenPort = process.env.STATIC || 443;

const staticFilesPath = express.static(__dirname + '/public');
server.use(staticFilesPath);

// -----------------------------PARSEADOR DE EXPRESS

server.use(express.urlencoded({extended:false}));
server.use(express.json());

// // ----------------------------------------MIDDLE

const cors = require('cors')
server.use(cors())

// -------------------------------------LEVANTAR SERVIDOR

server.listen(listenPort,
    () => console.log(`Server started listening on ${listenPort}`))
    
// ---------------------------------SERVICIO DE ESTÁTICOS

let fileOptions = {
    root: __dirname + '/public'
};

server.get('/', (req,res) => {
    res.sendFile('index.html', fileOptions);
});

server.get('/favoritos', (req,res) => {
    res.sendFile('favoritos.html', fileOptions);
});

server.get('/login', (req,res) => {
    res.sendFile('login.html', fileOptions);
});

server.get('/signup', (req,res) => {
    res.sendFile('signUp.html', fileOptions);
});

server.get('/recuperar', (req,res) => {
    res.sendFile('recuperar.html', fileOptions);
});

server.get('/password', (req,res) => {
    res.sendFile('password.html', fileOptions);
});
