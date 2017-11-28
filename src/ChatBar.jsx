import React, {Component} from 'react';

class ChatBar extends Component {
  handleCurrentUser(event) {
    if(event.key === 'Enter') {
      let username = event.target.value;
      if (username) {
        this.props.onChangeCurrentUser(username);
        event.target.value = '';
      }
    }
  }

  handleNewMessage(event) {
    // on keypress ENTER
    if(event.key === 'Enter') {
      let text = event.target.value;
      if (text) {
        this.props.onNewMessage(text);
        event.target.value = '';
      }
    }
  }

  constructor(props) {
    super(props);
    this.handleCurrentUser = this.handleCurrentUser.bind(this);
    this.handleNewMessage = this.handleNewMessage.bind(this);
  }

  render() {
    console.log('Rendering <ChatBar />');
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={ this.props.currentUser ? this.props.currentUser : "Your Name (Optional)"} defaultValue={ this.props.currentUser } onKeyPress={ this.handleCurrentUser }/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={ this.handleNewMessage }/>
      </footer>
    );
  }
}
export default ChatBar;
