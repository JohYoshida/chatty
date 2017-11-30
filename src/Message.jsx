import React, {Component} from 'react';


class Message extends Component {

  render() {
    const divStyle = {
      color: this.props.color
    }
    console.log('Rendering <Message />');
    return (
    <div className="message">
      <span className="message-username" style={divStyle}>{ this.props.username }</span>
      <span className="message-content">{ this.props.content }</span>
    </div>
    );
  }
}
Message.propTypes = {
  username: React.PropTypes.string.isRequired,
  content: React.PropTypes.string.isRequired,
  color: React.PropTypes.string.isRequired
}
export default Message;
