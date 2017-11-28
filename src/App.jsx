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
    })
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
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 0, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({
        messages
      });
    }, 3000);
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
