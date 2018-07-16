import React, { Component } from 'react';
import { Agents } from '../index';

class Logout extends Component {
  handleClick = () => {
    Agents().authAgent.logout();
  }

  render() {
    return <button onClick={this.handleClick}>Logout</button>
  }
}

export default Logout;
