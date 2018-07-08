import React, { Component } from 'react';
import { Actors } from '../index';

class MessageForm extends Component {
  onClick = (e) => {
    e.preventDefault();

    const { _msg } = this.refs;
    const msg = _msg.value.trim();
    Actors().messageActor.sendMessage(msg);
    _msg.value = '';
  }

  render() {
    return (
      <form>
        <input type='text' ref='_msg'/>
        <button onClick={this.onClick}>send</button>
      </form>
    );
  }
}

export default MessageForm;
