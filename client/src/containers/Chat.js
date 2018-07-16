import React, { Component } from 'react';
import Channels from '../components/Channels';
import Messages from '../components/Messages';
import MessageForm from '../components/MessageForm';
import Logout from '../components/Logout';
import styled from 'styled-components';

const ChatContainer = styled.div`
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

class Chat extends Component {
  render() {
    return (
      <ChatContainer>
        <LeftSidebar>
          <Channels />
        </LeftSidebar>
        <Main>
          <Messages />
          <MessageForm />
        </Main>
        <Logout />
      </ChatContainer>
    );
  }
}

export default Chat;
