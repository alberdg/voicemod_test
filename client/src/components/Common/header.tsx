import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';

/**
 * Header component
 * @function
 * @param history Router history
 * @returns header Header component
 */
const Header = ({ history } : { history: any }) => {
  return (
    <nav id="header" className="navbar fixed-top navbar-light bg-primary">
      <Link id="sign-out" className="text-white float-right" to="#">Sign out</Link>
    </nav>
  )
}
export default Header;
