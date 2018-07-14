import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { actions as channelActions } from '../reducers/channel';

class Channels extends Component {
  render() {
    const { channels, viewChannel } = this.props;

    return (
      <div>
        {channels.map(({ channelId, channelName, updatedSinceVisited }) => {
          return (
            <div
              key={channelId}
              onClick={() => { viewChannel(channelId); }}
              >
              {updatedSinceVisited && '*'} {channelName}
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const channels = R.pipe(
    R.path(['channel', 'channelIdToChannel']),
    R.values
  )(state);

  return { channels };
}

const mapDispatchToProps = {
  viewChannel: channelActions.viewChannel
};

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
