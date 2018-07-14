import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';

class Messages extends Component {
  render() {
    const { messages } = this.props;

    return (
      <div>
        {messages.map((message, idx) => {
          return <div key={idx}>{message}</div>;
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const channelId = R.path(['channel', 'currentChannelId'])(state);
  const messages = R.pipe(
    R.pathOr([], ['channel', 'channelIdToMessages', channelId]),
    R.map(R.prop('content'))
  )(state);

  return { messages };
}

export default connect(mapStateToProps)(Messages);
