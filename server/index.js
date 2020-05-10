const express = require('express');
const app = express();
const server = require('http').Server(app); 
const io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/hola-mundo', (req, res) => {
    res.status(200).send('Hola Mundo!')
})

let messages = [{
    id:1,
    text: 'Bienvenido a la sala de la que nunca podras salir, bienvenido al Infierno!',
    nickname: 'Aioria'
}];

//Abrir conexion al Socket
io.on('connection', (socket) => {
    console.log('El nodo con IP: ' + socket.handshake.address + ' se ha conectado');

    socket.emit('messages', messages);

    socket.on('add-message', (data) =>{
        messages.push(data);

        io.sockets.emit('messages', messages);
    });


});

server.listen(6677, () => {
    console.log('Servidor corriendo en http://localhost:6677');
});