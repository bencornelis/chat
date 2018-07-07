import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { msg: null };
  }

  componentWillMount() {
    fetch(process.env.REACT_APP_SERVER_URL)
      .then(res => res.json())
      .then(({ msg }) => this.setState({ msg }));
  }

  render() {
    const { msg } = this.state;

    return (
      <div>
        Received response: {msg}
      </div>
    );
  }
}

export default App;
