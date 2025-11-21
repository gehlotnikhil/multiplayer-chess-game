import type { Chess, Color, PieceSymbol, Square } from "chess.js";
import React, { useEffect, useState } from "react";
import { MOVE } from "./Game";

function ChessBoard({
  board,
  socket,
  nextTurn,
}: {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket;
  nextTurn: string;
}) {
  useEffect(() => {
    console.log(board);
  }, []);
  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);
   const audio = new Audio("/move.wav");
  audio.volume = 0.2;

  return (
    <div className="text-white-200 ">
      {board.map((row, i) => {
        return (
          <div key={i} className="flex justify-center">
            {row.map((square, j) => {
              return (
                <div
                  onClick={() => {
                    // console.log(square," ----",i,"   ,",j, "->>>>>>",String.fromCharCode(97+j)," - ",8-i);
                    console.log(square);
                    const squareRepresentation =
                      String.fromCharCode(97 + j) + (8 - i).toString();
                    if (from === squareRepresentation) {
                      return;
                    }
                    if (!from) {
                      setFrom(squareRepresentation);
                      
                    } else {
                      if (square && square.color === nextTurn) {
                        setFrom(squareRepresentation);
                        return;
                      }


                      // setTo(square?.square ?? null);
                      console.log(from, " ", squareRepresentation);
                      socket.send(
                        JSON.stringify({
                          type: MOVE,
                          payload: {
                            from: from,
                            to: squareRepresentation,
                          },
                        })
                      );
                      audio.play();
                      setFrom(null);
                    }
                  }}
                  key={j}
                  className={`w-12 h-12 ${
                    from ===
                    `${String.fromCharCode(97 + j) + (8 - i).toString()}`
                      ? "bg-[#CBD858]"
                      : ""
                  } ${(i + j) % 2 === 0 ? "bg-[#789857]" : "bg-[#e6e8ca]"}`}
                >
                  <div className="w-full h-full  justify-center align-center   flex">
                    <div className="flex flex-col justify-center">
                      {square ? (
                        <img
                          src={`/${square.color}${square.type}.png`}
                          alt=""
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default ChessBoard;
