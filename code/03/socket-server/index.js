import { WebSocketServer} from 'ws';

const wss = new WebSocketServer ({port:3000});


wss.on('connection', onConnection);

function onConnection (ws) {
   // console.log('connected');
    ws.on('message', onMessage);
}

function onMessage(data) {
    //console.log('on message', data)
    let jd =JSON.parse(data);
   wss.clients.forEach(client => {
    client.send(JSON.stringify(jd));
   });
    
}