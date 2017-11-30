import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.socket = null;
    this.state = {
      username: '',
      systemMessage: '',
      messages: []
    }
    this.changeUsername = this.changeUsername.bind(this);
    this.addMessage = this.addMessage.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.addEventListener('open', () => {
      console.log('Connected to server');
    });

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      switch(message.type) {
        case 'incomingMessage': {
          const messages = this.state.messages.concat(message);
          this.setState({messages});
          break;
        }
        case 'incomingNotification': {
          this.setState({systemMessage: message.content});
          break;
        }
        default: {
          throw new Error('Unknown event type ' + message.type);
        }
      }

    }
  }

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

    this.setState({username: username, systemMessage: message});
  }

  addMessage(text) {
    let username = this.state.username;
    if (!username) {
      username = 'Anonymous';
    }
    const message = {
      type: 'postMessage',
      username: username,
      content: text
    };
    this.socket.send(JSON.stringify(message));

    // this.socket.onmessage = (event) => {
    //   const message = JSON.parse(event.data);
    //   const messages = this.state.messages.concat(message);
    //   this.setState({messages});
    //   console.log(`${username} posted new message: ${message.content}`);
    // }
  }

  render() {
    console.log('Rendering <App />');
    return (<div>
      <ChatBar username={this.state.username} addMessage={this.addMessage} changeUsername={this.changeUsername}/>
      <MessageList messages={this.state.messages} systemMessage={this.state.systemMessage}/>
    </div>);
  }
}

export default App;
