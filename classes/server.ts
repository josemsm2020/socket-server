import express from 'express';
//import { SERVER_PORT } from './../global/environment';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io'; //El nombre de socketIO puede ser otro
                                  //lo único que se indica es que todo lo   
                                  //de socket.io se almacene ahí
import http from 'http';
import * as socket from '../sockets/socket';

export default class Server {

    private static _instance: Server;

    public app: express.Application;
    public port: number;
    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor(){
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server( this.app ); //Esta inicialización también se 
                                                       //puede hacer con el método createServer
        this.io = socketIO( this.httpServer );

        this.escucharSockets();
    }

    //Algo estático es algo que yo puedo llamar directamente haciendo referencia a la clase.
    //Este método es el que me va a permitir hacer un server.instance para obtener esta referencia 
    //a este método
    public static get instance() {
        return this._instance || ( this._instance = new this() ); //new this = new Server()
    }

    private escucharSockets(){
        console.log('escuchando conexiones - sockets');
        
        this.io.on('connection', cliente =>{
            console.log('Cliente conectado');

            //mensajes
            socket.mensaje( cliente, this.io );

            //Desconectar
            socket.desconectar( cliente );
            
        });
    }

    //Método para levantar el servicio
    start( callback: Function ){
        //this.app.listen( this.port, callback() );
        this.httpServer.listen( this.port, callback() );
    }
}
