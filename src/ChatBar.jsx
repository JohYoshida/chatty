import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.handleNewUsername = this.handleNewUsername.bind(this);
    this.handleNewMessage = this.handleNewMessage.bind(this);
  }

  // Add new username to props
  handleNewUsername(event) {
    if (event.key === 'Enter') {
      let username = event.target.value;
      if (username) {
        this.props.changeUsername(username);
        event.target.value = '';
      }
    }
  }

  // Add message text to props
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
    return (<footer className="chatbar">
      <input className="chatbar-username" placeholder={this.props.username
          ? this.props.username
          : 'Your Name (Optional)'} defaultValue={this.props.username} onKeyPress={this.handleNewUsername}/>
      <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.handleNewMessage}/>
    </footer>);
  }
}
ChatBar.propTypes = {
  changeUsername: React.PropTypes.func.isRequired,
  addMessage: React.PropTypes.func.isRequired,
  username: React.PropTypes.string.isRequired
}
export default ChatBar;
