import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <h1>Hello React :)</h1>
        <ChatBar />
        <MessageList />
      </div>
    );
  }
}

export default App;
