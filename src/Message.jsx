import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log('Rendering <Message />');
    return (
    <div className="message">
      <span className="message-username" >{ this.props.username }</span>
      <span className="message-content">{ this.props.content }</span>
    </div>
    );
  }
}
Message.propTypes = {
  username: React.PropTypes.string.isRequired,
  content: React.PropTypes.string.isRequired
}
export default Message;
