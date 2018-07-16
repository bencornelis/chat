import React, { Component } from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowingLogin: true
    };
  }

  showLogin = () => {
    this.setState({ isShowingLogin: true });
  }

  showSignup = () => {
    this.setState({ isShowingLogin: false });
  }

  render() {
    const { isShowingLogin } = this.state;

    return isShowingLogin ? <Login showSignup={this.showSignup} /> : <Signup />;
  }
}

export default Auth;
