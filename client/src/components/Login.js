import React, { Component } from 'react';
import { Agents } from '../index';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { username, password } = this.state;
    Agents().authAgent.login(username, password);
  }

  render() {
    const { showSignup } = this.props;

    return (
      <div>
        Login
        <form>
          <div>
            <label htmlFor='username'>Username</label>
            <input type='text' name='username' onChange={this.handleInputChange} />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input type='password' name='password' onChange={this.handleInputChange} />
          </div>
          <button onClick={this.handleSubmit}>submit</button>
        </form>
        No account? <button onClick={showSignup}>Sign up</button>
      </div>
    );
  }
}

export default Login;
