const http = require('http');
const path = require ('path');
//Agregar Express
const express = require('express');
//Agregar el Socket que permite hacer conectarnos tr
const sockets = require('socket.io');


//Mongodb
const mongodb = require('mongoose');

//serv con exps
const apps = express();
const server = http.createServer(apps);

//Escucha serv cli-serv
const io = sockets.listen(server);

//Mongo Coneccion db
mongodb.connect('mongodb://localhost/chat-databaseaudi')
    .then(db => console.log('Conexion database mongo AUDI establecida'))
    .catch(err => console.log(err));

//Conf
apps.set('puerto', process.env.PORT || 3000);

require('./sockets')(io);

//Static files
apps.use(express.static(path.join(__dirname, 'public')));


//Abre puerto 3000 escucha
server.listen(apps.get('puerto'),() => {
   console.log('Verificando server puerto', apps.get('puerto'));
}); 