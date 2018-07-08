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
  const messages = R.path(['message', 'messages'])(state);
  return { messages };
}

export default connect(mapStateToProps)(Messages);
