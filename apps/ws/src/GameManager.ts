import  { Game } from './Game';
import WebSocket from "ws";
import { GAME_STARTED, INIT_GAME, MOVE } from "./message";

export class GameManager{
    private games:  Game[]
    private pendingUser: WebSocket | null
    private user: WebSocket[]
    constructor(){
        this.games=[]
        this.pendingUser = null
        this.user = []
    }

    addUser(socket:WebSocket){
        this.user.push(socket)
        this.addHandler(socket)
    }
    removeUser(socket:WebSocket){
        this.user.filter(user=>user!==socket)
        // Stop the game because user  left
    }
    private handleMessage(){

    }
    private addHandler(socket:WebSocket){
        socket.on("message",(data:any)=>{
            const message = JSON.parse(data.toString())
             if(message.type ===INIT_GAME){
                if(this.pendingUser){
                    const game = new Game(this.pendingUser,socket);
                    this.games.push(game)
                    this.pendingUser = null
                    socket.send(JSON.stringify({
                        type:GAME_STARTED,
                        nextTurn:"b"
                    }))
                    game.player1.send(JSON.stringify({
                        type:GAME_STARTED,
                        nextTurn:"w"
                    }))

                }else{
                    this.pendingUser = socket
                }
            }else if(message.type === MOVE){
                console.log("Hello")
                const game  = this.games.find(game=>game.player1 ===socket || game.player2===socket)
                if(game){
                    console.log("bye")
                    game.makeMove(socket,message.payload)
                }
            }
        })
    }
}
