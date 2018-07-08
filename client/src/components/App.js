import React, { Component } from 'react';
import Messages from './Messages';
import MessageForm from './MessageForm';

class App extends Component {
  render() {
    return (
      <div>
        <Messages />
        <MessageForm />
      </div>
    );
  }
}

export default App;
