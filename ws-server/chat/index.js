import Websocket from 'ws';
import Message from '../models/message';

class ChatServer {
  constructor() {
    this.wss = new Websocket.Server({ port: 3002 });
  }

  listen = () => {
    this.wss.on('connection', (ws) => {
      this._authenticate(ws);
      ws.on('message', this._handleMessage);
    });
  }

  _authenticate = ws => {
    ws.send('auth request')
  }

  _handleMessage = async (_msg) => {
    console.log('received: %s', _msg)
    const msg = JSON.parse(_msg);
    switch(msg.type) {
      case messageTypes.AUTH_RESPONSE:
        this._handleAuthMessage(msg.payload);
        break;

      case messageTypes.CHAT:
        this._handleChatMessage(msg.payload);
        break;

      default:
        console.warn('unknown message type', msg.type);
    }
  }

  _handleAuthMessage = (msg) => {

  }

  _handleChatMessage = async (msg) => {
    try {
      await Message.write(msg);
    } catch(error) {
      console.error('could not write message to cassandra db - not forwarding', msg, error);
      return;
    }

    this.wss.clients.forEach(client => {
      if (client !== ws && client.readyState === Websocket.OPEN) {
        client.send(JSON.stringify(msg));
      }
    });
  }
}

export default ChatServer;
