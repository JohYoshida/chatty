import React, {Component} from 'react';
import Message from './Message.jsx';
import MessageSystem from './MessageSystem.jsx';

class MessageList extends Component {
  render() {
    const messages = this.props.messages.map((message) => {
      return <Message key={message.id} username={message.username} content={message.content}/>
    });
    console.log("Rendering <MessageList />");
    return (<main className="messages">
      {messages}
      <MessageSystem systemMessage={this.props.systemMessage}/>
    </main>);
  }
}
export default MessageList;
