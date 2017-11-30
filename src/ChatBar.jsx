import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.handleNewUsername = this.handleNewUsername.bind(this);
    this.handleNewMessage = this.handleNewMessage.bind(this);
  }

  handleNewUsername(event) {
    if (event.key === 'Enter') {
      let username = event.target.value;
      if (username) {
        this.props.changeUsername(username);
        event.target.value = '';
      }
    }
  }

  handleNewMessage(event) {
    // on keypress ENTER
    if (event.key === 'Enter') {
      let text = event.target.value;
      if (text) {
        this.props.addMessage(text);
        event.target.value = '';
      }
    }
  }

  render() {
    console.log('Rendering <ChatBar />');
    return (<footer className="chatbar">
      <input className="chatbar-username" placeholder={this.props.username
          ? this.props.username
          : 'Your Name (Optional)'} defaultValue={this.props.username} onKeyPress={this.handleNewUsername}/>
      <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.handleNewMessage}/>
    </footer>);
  }
}
ChatBar.propTypes = {
  changeUsername: React.PropTypes.string.isRequired,
  addMessage: React.PropTypes.string.isRequired,
  username: React.PropTypes.string.isRequired
}
export default ChatBar;
