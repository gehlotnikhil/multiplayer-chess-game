import { GameManager } from './GameManager.js';
import ws from 'ws';  // This imports the default export: WebSocket (client-side constructor)
const wss = new ws.WebSocketServer({ port: 8080 });
const gameManager = new GameManager();
wss.on('connection', function connection(ws:ws.WebSocket) { 
  gameManager.addUser(ws)
  ws.on('error', console.error);
   
  ws.on('message', function message(data:any) {
    console.log('received: %s', data);
  });
  ws.on("close",()=>gameManager.removeUser(ws))

  ws.send(JSON.stringify({"success":"Connected"}));
});