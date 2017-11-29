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
      const messages = this.state.messages.concat(message);
      this.setState({messages});
      console.log(`${message.username} posted new message: ${message.content}`);
    }
  }

  changeUsername(username) {
    let prevUsername = this.state.username;
    if (!prevUsername) {
      prevUsername = 'Anonymous';
    }
    this.setState({username: username, systemMessage: `${prevUsername} changed their name to ${username}`});
    console.log(`${prevUsername} changed their name to ${username}`);
  }

  addMessage(text) {
    let username = this.state.username;
    if (!username) {
      username = 'Anonymous';
    }
    const message = {
      // id: this.state.messages.length + 1,
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
