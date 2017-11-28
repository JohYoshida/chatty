import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
      messages: [
        {id: 1, username: "Joh", content: "Hello!"},
        {id: 2, username: "Not Joh", content: "Goodbye!"}]
    }
  }

  componentDidMount() {
  console.log("componentDidMount <App />");
  setTimeout(() => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }, 3000);
}

  render() {
    console.log('Rendering <App/>');
    return (
      <div>
        <ChatBar currentUser={ this.state.currentUser }/>
        <MessageList messages={ this.state.messages }/>
      </div>
    );
  }
}

export default App;
