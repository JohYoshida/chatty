import React, {Component} from 'react';

class NavBar extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    console.log('Rendering <NavBar />');
    const message = this.props.userCount === 1
      ? 'user online'
      : 'users online'
    return (<nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
    <p>{this.props.userCount} {message}</p>
    </nav>)
  }
}
NavBar.propTypes = {
  userCount: React.PropTypes.number.isRequired
}
export default NavBar;
