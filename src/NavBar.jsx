import React, {Component} from 'react';

class NavBar extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const message = this.props.userCount === 1
      ? 'user online'
      : 'users online'
    return (<nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
    <span className="user-count">{this.props.userCount} {message}</span>
    </nav>)
  }
}
NavBar.propTypes = {
  userCount: React.PropTypes.string.isRequired
}
export default NavBar;
