import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
import NavBar from './NavBar.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = null;
    this.state = {
      username: '',
      userColor: '',
      userCount: '',
      systemMessage: '',
      messages: []
    }
    this.changeUsername = this.changeUsername.bind(this);
    this.addMessage = this.addMessage.bind(this);
  }

  componentDidMount() {
    // Connect to server
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.addEventListener('open', () => {
      console.log('Connected to server');
    });

    // Message event
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      // Set state based on message type
      switch (message.type) {
        case 'incomingMessage': {
          const messages = this.state.messages.concat(message);
          this.setState({messages});
          break;
        }
        case 'incomingNotification': {
          this.setState({systemMessage: message.content});
          break;
        }
        case 'incomingUserCount': {
          this.setState({userCount: message.userCount});
          break;
        }
        case 'incomingNewUser' : {
          this.setState({userColor: message.userColor})
          break;
        }
        default: {
          throw new Error('Unknown event type ' + message.type);
        }
      }
    }
  }

  // Construct and send message containing new username
  changeUsername(username) {
    let prevUsername = this.state.username;
    if (!prevUsername) {
      prevUsername = 'Anonymous';
    }
    const message = {
      type: 'postNotification',
      username: username,
      content: `${prevUsername} changed their name to ${username}`
    }
    this.socket.send(JSON.stringify(message))
    this.setState({username: username, systemMessage: message.content});
  }

  // Construct and send message containing user's text
  addMessage(text) {
    let username = this.state.username;
    if (!username) {
      username = 'Anonymous';
    }
    const message = {
      type: 'postMessage',
      username: username,
      content: text,
      color: this.state.userColor
    };
    this.socket.send(JSON.stringify(message));
  }

  render() {
    const { userCount, username, messages, systemMessage } = this.state
    return (<div>
      <NavBar userCount={userCount}/>
      <ChatBar username={username} addMessage={this.addMessage} changeUsername={this.changeUsername}/>
      <MessageList messages={messages} systemMessage={systemMessage}/>
    </div>);
  }
}

export default App;
