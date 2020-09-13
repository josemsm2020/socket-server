import { Socket } from "socket.io";
import socketIO from 'socket.io';

export const desconectar = ( cliente: Socket ) => {
    cliente.on( 'disconnect', () => {
        console.log('Cliente desconectado');
    });
}

//Escuchar mensajes
export const mensaje = ( cliente: Socket, io: socketIO.Server ) => {
    cliente.on( 'mensaje', ( payload: {de: string, cuerpo: string} ) => {
        console.log('Mensaje recibido', payload );

        //Emito el mensaje y lo que quiero emitir es la misma propiedad
        //que estoy escuchando en el chatService método getMessages y voy 
        //a emitir el payload (que es el mensaje)
        io.emit( 'mensaje-nuevo', payload );
    });
}
