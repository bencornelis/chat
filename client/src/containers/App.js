import React, { Component } from 'react';
import Auth from './Auth';
import Chat from './Chat';
import { connect } from 'react-redux';
import * as R from 'ramda';

class App extends Component {
  render() {
    const { userLoggedIn } = this.props;

    return userLoggedIn ? <Chat /> : <Auth />;
  }
}

const mapStateToProps = state => {
  const userLoggedIn = R.path(['auth', 'userLoggedIn'])(state);

  return { userLoggedIn };
};

export default connect(mapStateToProps)(App);
