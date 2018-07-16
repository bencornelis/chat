import React, { Component } from 'react';
import { Agents } from '../index';
import { connect } from 'react-redux';
import * as R from 'ramda';

class MessageForm extends Component {
  onClick = (e) => {
    e.preventDefault();

    const { channelId } = this.props;
    const { _msg } = this.refs;
    const msg = _msg.value.trim();
    Agents().messageAgent.sendMessage(channelId, msg);
    _msg.value = '';
  }

  render() {
    return (
      <form>
        <input type='text' ref='_msg'/>
        <button onClick={this.onClick} disabled={!this.props.channelId}>send</button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  const channelId = R.path(['channel', 'currentChannelId'])(state);
  return { channelId };
}

export default connect(mapStateToProps)(MessageForm);
