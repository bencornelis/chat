import React, { Component } from 'react';
import Channels from './Channels';
import Messages from './Messages';
import MessageForm from './MessageForm';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const LeftSidebar = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
`;

class App extends Component {
  render() {
    return (
      <Container>
        <LeftSidebar>
          <Channels />
        </LeftSidebar>
        <Main>
          <Messages />
          <MessageForm />
        </Main>
      </Container>
    );
  }
}

export default App;
