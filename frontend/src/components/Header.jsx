import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React, { Component } from "react";

export default class Header extends Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
  };

  render() {
    const { authenticated } = this.props;
    return (
      <ul className="menu">
        <li>
          <Link to="/">Home</Link>
        </li>
        {authenticated ? (
          <li onClick={this.handleLogoutClick}>Logout</li>
        ) : (
          <li onClick={this.handleSignInClick}>Login</li>
        )}
      </ul>
    );
  }

  handleSignInClick = () => {
    window.open("http://localhost:4000/auth/twitter", "_self");
  };

  handleLogoutClick = () => {
    window.open("http://localhost:4000/auth/logout", "_self");
    this.props.handleNotAuthenticated();
  };
}
