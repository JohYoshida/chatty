import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
      systemMessage: '',
      messages: [
        {id: 1, username: "Joh", content: "Hello!"},
        {id: 2, username: "Not Joh", content: "Not hello!"}]
    }
    this.onChangeCurrentUser = this.onChangeCurrentUser.bind(this);
    this.onNewMessage = this.onNewMessage.bind(this);
  }

  onChangeCurrentUser(username) {
    let prevUsername = this.state.currentUser;
    if (!prevUsername) {
      prevUsername = 'Anonymous';
    }
    this.setState({
      currentUser: username,
      systemMessage: `${prevUsername} changed their name to ${username}`
    });
    console.log(`${prevUsername} changed their name to ${username}`);
  }

  onNewMessage(text) {
    let username = this.state.currentUser;
    if (!username) {
      username = 'Anonymous';
    }
    const message = {id: this.state.messages.length + 1, username: username, content: text };
    const messages = this.state.messages.concat(message);
    this.setState({
      messages
    });
    console.log(`${username} posted new message: ${message.content}`);
  }

  render() {
    console.log('Rendering <App />');
    const text = this.state.text
    return (
      <div>
        <ChatBar currentUser={ this.state.currentUser } onNewMessage={ this.onNewMessage } onChangeCurrentUser={ this.onChangeCurrentUser }/>
        <MessageList messages={ this.state.messages } systemMessage={ this.state.systemMessage }/>
      </div>
    );
  }
}


export default App;
