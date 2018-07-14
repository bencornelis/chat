import React, { Component } from 'react';
import Channels from './Channels';
import Messages from './Messages';
import MessageForm from './MessageForm';

class App extends Component {
  render() {
    return (
      <div>
        <Channels />
        <Messages />
        <MessageForm />
      </div>
    );
  }
}

export default App;
