

/*$(function(){
    alert('pepe');
})*/

//Obtener los elementos del DOM
 $(function(){
    const socket = io();
    const $mensajeForm = $('#form-mensaje');
    const $mensajeBox = $('#Mensaje');
    const $chat = $('#Chat');

    //Obtener los elementos del DOM Formulario de Nombres de usuario
    const $nameUs_form = $('#nameUs-form');
    const $ErrorName = $('#errorname');
    const $nameUs = $('#nombre_userf');

    //Lis usuarios
    const $users = $('#nombre_us');

    //Evento de log a enviar al servidor
    $nameUs_form.submit(e => {
        e.preventDefault();
        var Nombre_us = $nameUs.val();
        //console.log('Enviando nvo usuario de nombre -',Nombre_us);
        socket.emit('usernew',$nameUs.val(), data => {
            if(data) {
                $('#nameUslog').hide();
                $('#Contenedor-main').show();
                $('#Online').show();
            }
            else {
                $ErrorName.html('<div clas="alert alert-dagner"> Este usuarisillo ya existe! </div>');
            }
            $nameUs.val('');
        });
    });
    //Evento en el formulario
    $mensajeForm.submit(e => {
        e.preventDefault();
       
        var mensaje = $mensajeBox.val();
        //console.log('Enviando info', mensaje);
        //Envia
        socket.emit('Envia mensaje', $mensajeBox.val(), data => {
            //$chat.append('<p clas="error">')
            $chat.append(`<p class="error">${data}</p>`);
        });
        $mensajeBox.val('');
    });

    //Escucha eventos
    socket.on('Nvo mensaje', function(data){
        //var chts = $chat 
        $chat.append('<b>' + data.name + '</b> :' +data.msg +'</br>');
    });
    
    //Evento escucha de us en linea


    socket.on('nombreusuarios', data => {
        let html = '';
        for(i = 0; i < data.length; i++) {
          html += `<p id='pp' style=color: green;><i class="fa fa-camera-retro"></i>  ${data[i]}</p>`;
          
 
        }
        $users.html(html);
      });
      socket.on('whisper', data => {
        $chat.append(`<p class="whisper"><b>${data.name}</b>: ${data.msg}</p>`);
      });

      socket.on('Mensajes old', msgs => {
        for(let i = msgs.length -1; i >=0 ; i--) {
          displayMsg(msgs[i]);
        }
      });
  
      function displayMsg(data) {
        $chat.append(`<p class="msg"><b>${data.name}</b>: ${data.msg}</p>`);
      }
 })