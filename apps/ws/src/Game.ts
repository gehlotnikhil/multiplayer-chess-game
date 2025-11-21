import WebSocket from 'ws';
import { Chess } from 'chess.js';
import { MOVE, GAME_OVER, INIT_GAME } from './message';

export class Game{
    public player1:WebSocket;
    public player2:WebSocket;
    private board: Chess;
    private moves:String[];
    private startTime:Date;
    private moveCount:number;
    constructor(player1:WebSocket,player2:WebSocket){
        this.player1 = player1
        this.player2 = player2
        this.startTime = new Date()
        this.moves = []
        this.moveCount = 0
        this.board = new Chess()
        this.player1.send(JSON.stringify({
            type:INIT_GAME,
            payload:{
                color:"white"
            }
        }))
        this.player2.send(JSON.stringify({
            type:INIT_GAME,
            payload:{
                color:"black"
            }
        }))
    }
    makeMove(socket:WebSocket,payload:{
        from:string,
        to:string
    }){
        console.log("move reached here", this.moveCount, " ", this.board.moves())
        //validation the type of move using zod

        if(this.moveCount%2===0 && socket === this.player2){
            console.log(this.moveCount %2===0 ," 1 ", socket === this.player2)
            return 
        }
        if(this.moveCount%2===1 && socket === this.player1){
            console.log(this.moveCount %2===1 ," 2 ", socket === this.player1)
            return
        }
        console.log("move reached here 2")
        try{

            this.board.move(payload)
            this.moveCount++
        }catch(e){
            console.log(e)
            return
        }
       if(this.board.isGameOver()){
        this.player1.send(JSON.stringify({
            type:GAME_OVER,
            payload:{
                winner:this.board.turn()==="w"?"black":"white"
            }
        }))
        this.player2.send(JSON.stringify({
            type:GAME_OVER,
            payload:{
                winner:this.board.turn()==="w"?"black":"white"
            }
        }))
        return 
       }
       console.log("hiiiiiiiiiiii --",this.board.turn())
       console.log(this.moveCount)
    //    if(this.moveCount%2===0){
    this.player1.send(JSON.stringify({
            type:MOVE,
            payload:payload,
            nextTurn:this.board.turn().toString()
        }))
       
    //    }else{
         this.player2.send(JSON.stringify({
            type:MOVE,
            payload:payload,
            nextTurn:this.board.turn().toString()

        }))
    //    }

        // check if the game is over

        //send the updated board to both players
    }
}