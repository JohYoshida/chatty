import React, {Component} from 'react';

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('Rendering <NavBar />');
    return (<nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>

    </nav>)
  }
}

export default NavBar;