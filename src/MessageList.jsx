import React, {Component} from 'react';
import Message from './Message.jsx';
import MessageSystem from './MessageSystem.jsx';

class MessageList extends Component {
  render() {
    const messages = this.props.messages.map((message) => {
      return <Message key={message.id} color={message.color} username={message.username} content={message.content}/>
    });
    return (<main className="messages">
      {messages}
      <MessageSystem systemMessage={this.props.systemMessage}/>
    </main>);
  }
}
MessageList.propTypes = {
  messages: React.PropTypes.array.isRequired,
  systemMessage: React.PropTypes.string.isRequired
}
export default MessageList;
