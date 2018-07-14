import React, { Component } from 'react';
import { Actors } from '../index';
import { connect } from 'react-redux';
import * as R from 'ramda';

class MessageForm extends Component {
  onClick = (e) => {
    e.preventDefault();

    const { channelId } = this.props;
    const { _msg } = this.refs;
    const msg = _msg.value.trim();
    Actors().messageActor.sendMessage(channelId, msg);
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

const mapStateToProps = state => {
  const channelId = R.path(['channel', 'currentChannelId'])(state);
  return { channelId };
}

export default connect(mapStateToProps)(MessageForm);
