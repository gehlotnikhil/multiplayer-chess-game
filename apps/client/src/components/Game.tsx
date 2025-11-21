import  { useEffect, useState } from "react";
import ChessBoard from "./ChessBoard";
import useSocket from "../hooks/useSocket";
import { Chess } from "chess.js";
export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";
export const GAME_STARTED = "game_started";
function Game() {
  const [isStarted, setIsStarted] = useState(false);
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [nextTurn, setNextTurn] = useState("");
  const [UserColor, setUserColor] = useState(null)
  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      switch (message.type) {
        case INIT_GAME:
          setIsStarted(true);
          console.log("Game initialized");
          setChess(new Chess());
          setBoard(chess.board());
          break;
          case GAME_STARTED:
            console.log("Game started");
            setNextTurn(message.nextTurn);
            setUserColor(message.nextTurn);
           console.log("nextTurn-",message)
          break;
        case GAME_OVER:
          console.log("Game over");
          setIsStarted(false);
          break;
        case MOVE:
          console.log("MOVE made");
          chess.move(message.payload);
          setBoard(chess.board());
          setNextTurn(message.nextTurn);
          console.log("nextTurn-",message)
          break;
      }
    };
  }, [socket]);
  useEffect(() => {
  }, [nextTurn])
  
  
  

  if (!socket) return <div>Connecting...</div>;
  return (
    <div className="flex">
      <div className="grid grid-cols-6 w-full h-[33rem]  flex  flex-col items-center justify-center">
        <div className="col-span-4 flex flex-col items-center">
          <div  style={{display:isStarted?"flex":"none"}}  className=" text-white bg-green-400 h-[3rem] w-[24rem] flex flex-row items-center justify-center">
            <p className="font-3xl font-bold">{ nextTurn === "w" ? "White's turn" : (nextTurn==="b"?"Black's turn":"")}</p>
          </div>
          <div  className=" text-white bg-red-400 h-[3rem] w-[24rem] flex flex-row">
            <img
              src={"/account.png"}
              style={{ height: "3rem", width: "3rem" ,display: isStarted?"block":"none" }}
              alt=""
            />
            <div style={{display:isStarted?"flex":"none"}} className="flex font-bold flex-col justify-center items-center w-[10rem]">
              <p >Guest{(Math.random() * 10000).toFixed(0)}</p>
            </div>
          </div>
          <div>
            <ChessBoard socket={socket} board={board} nextTurn={nextTurn} />
          </div>
          <div className="text-white bg-red-400 h-[3rem] w-[24rem] flex flex-row">
            <img
              src={"/account.png"}
              style={{ height: "3rem", width: "3rem" }}
              alt=""
            />
            <div className="flex flex-col justify-center font-bold items-center w-[10rem]">
              <p>Guest{(Math.random() * 10000).toFixed(0)}</p>
            </div>
          </div>
        </div>

        <div className="col-span-2  bg-purple-300 w-[200px] h-[400px] flex flex-col items-center py-5">
           <div  style={{display:isStarted?"flex":"none"}}  className=" text-white bg-purple-400 h-[3rem] w-[200px] flex flex-row items-center justify-center mb-10">
             <p className="font-3xl font-bold">{UserColor === "w" ? "You are White" : (UserColor==="b"?"You are Black":"")}</p>
           </div>
          <button
            disabled={isStarted}
            className=" px-8 py-4 bg-green-500 hover:bg-green-700 text-white font-bold  rounded"
            onClick={() => {
              socket.send(
                JSON.stringify({
                  type: INIT_GAME,
                })
              );
            }}
          >
            Play
          </button>
        </div>
      </div>
    </div>
  );
}

export default Game;
