
const Chat  = require('./models/Chats');

module.exports = function(io) {
    //escucha
    let ArrayUs = {};
    

    io.on('connection', async socket => {
        console.log('Usuario nuevo connectado !');

        //
        let mensajold = await Chat.find({}).limit(8).sort('-created');
        socket.emit('Mensajes old',mensajold);

        //Esciche desde cliente
        socket.on('usernew',(data, cb) => {
            //console.log(data);
            if(data in ArrayUs) {
                cb(false);
            }
            else {
                cb(true);
                socket.nombre_u = data;
                //Guarda user en memoria sev
                ArrayUs[socket.nombre_u] = socket;
                cargaNombreUs();
            }
        });

        //Escucha este 
        socket.on('Envia mensaje', async (data, cb) => {
            "peparra"
            var msg = data.trim();
            if(msg.substr(0, 3) === '/p ') {
                msg = msg.substr(3);
                const index = msg.indexOf(' ');
                    if(index!== -1) {
                        var name = msg.substring(0 , index);
                        var msg = msg.substring(index +1);
                        if (name in users) {
                            ArrayUs[name].emit('whisper',{
                                msg,
                                nombre_u: socket.nombre_u
                            })
                        }
                        else {
                            cb('Error !! Ponga un usuario correcto !');
                        }
                    } else {
                        cb('error! please ingresa tu mensaje!');
                    }
            } else {
                var newMsg = new Chat({
                    msg,
                    name: socket.nombre_u
                });
                //Guarda la data
                await newMsg.save();
                //console.log(data);
                //Event gral reenvia con este nvo evento
                io.sockets.emit('Nvo mensaje', {
                    msg:data,
                    name:socket.nombre_u
                });
            }
        });

        //Escucha evnt decoonexion
        socket.on('disconnect',data =>{
            if(socket.ArrayUs) return;
            //ArrayUs.splice(ArrayUs.indexOf(socket.ArrayUs), 1);
            delete ArrayUs[socket.nombre_u];
            cargaNombreUs();

        });
        
        function cargaNombreUs(){
            //io.sockets.emit('nombreusuarios',Objet.keys(ArrayUs));
            io.sockets.emit('nombreusuarios', Object.keys(ArrayUs));
        }
    });
}
