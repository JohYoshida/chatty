import React, {Component} from 'react';

class MessageSystem extends Component {
  render() {
    console.log('Rendering <MessageSystem />');
    return (
      <div className="message system">
        {this.props.systemMessage}
      </div>
    );
  }
}
MessageSystem.propTypes = {
  systemMessage: React.PropTypes.string.isRequired
}
export default MessageSystem;
