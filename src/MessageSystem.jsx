import React, {Component} from 'react';

class MessageSystem extends Component {
  render() {
    console.log("Rendering <MessageSystem />");
    return (
      <div className="message system">
        {this.props.systemMessage}
      </div>
    );
  }
}
export default MessageSystem;
