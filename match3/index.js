/**
 * Creando el servidor
 */

const http=require("http");
const app=require("express")();
app.get("/", (req,res)=> res.sendFile(__dirname+"/index.html"))
app.listen(7148, ()=>console.log("Escuchando en el puerto 7148"))

const websocketServer=require("websocket").server
const httpServer=http.createServer();

//Poniendo el servidor en modo de escucha
httpServer.listen(7147, () => console.log("Listening.. on 7147")) //el parametro listen indica el puerto en el que está escuchando el servidor

//hasmap de los clientes en el sistema (jugadores de la partida)
const clients={};
//hashmap de los juegos
const games={};

//función para la creación de un objeto guid para intercambio de información e identificador de clientes
function S4(){
    return(((1+Math.random()) *0x10000)|0).toString(16);
}
//then to call it, plus stitch in '4' int the third group
const guid =()=>(S4()+S4()+"-"+S4()+"-"+S4())

const wsServer=new websocketServer({
    "httpServer":httpServer
})
wsServer.on("request",request=>{
    //peticion de conexion
    const connection=request.accept(null,request.origin); 
    //nueva peticion de abrir conexion
    connection.on("open", () => console.log("Ha ingresado a la partida!"))
    //desconectando
    connection.on("close", () => console.log("Bye bye!"))
    //mensaje al servidor
    connection.on("message", message => {
        //logica del intercambio de mensajes entre cliente y conexion
        try{
            const result=JSON.parse(message.utf8Data)

            // Solicitud del usuario de crear un nuevo juego
            if(result.method === "create"){
                const clientId=result.clientId;
                
                //creacion del identificador del objeto juego
                const gameId = guid();
                
                // creacion del nuevo objeto juego
                games[gameId] = {
                    "id": gameId,
                    "balls": 63
                }

                const payLoad = {
                    "method": "create",
                    "casillas" : games[gameId]
                }

                const con = clients[clientId].connection;
                con.send(JSON.stringify(payLoad));
            }

        }catch(error){
            console.log("Error en e intercambio de datos");
        }

    })
    //generando el nuevo identificador del cliente para la conexión entre el cliente y el servidor
    const clientId = guid();
    clients[clientId]={
        "connection":connection
    };

    //generando la respuesta del seridor hacia los clientes
    const payLoad={
        "method":"connect",
        "clientId":clientId
    }

    //envio de verificacion de conexion desde el servidor hacia el cliente
    connection.send(JSON.stringify(payLoad))

    
})