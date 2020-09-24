import React, { useState } from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import { signout } from '../../actions/signout';
import { SIGNED_IN_USER } from '../../constants';
/**
 * Header component
 * @function
 * @param history Router history
 * @param active Active view
 * @returns header Header component
 */
const Header = ({ history, active } : { history: any, active: string }) => {
  const [ collapsed, setCollapsed] = useState<boolean>(true);

  /**
   * Performs user signout
   * @function
   * @param event Click event
   */
  const performSignout = async (event: MouseEvent) : Promise<void> => {
    event.preventDefault();
    const response = await signout();
    if (response && response.status === 200) {
      localStorage.removeItem(SIGNED_IN_USER);
      history.push('/');
    }
  }

  const renderMenu = () : JSX.Element => {
    if (collapsed) {
      return null as any;
    }
    const usersClasses = active === 'users' ? 'nav-item active' : 'nav-item';
    const addUserClasses = active === 'add-user' ? 'nav-item active' : 'nav-item';

    return (
      <div className="navbar-collapse bg-secondary" id="header">
        <ul className="navbar-nav">
          <li className={usersClasses}>
            <Link id="users" className="text-white" to="/users">Home</Link>
          </li>
          <li className={addUserClasses}>
            <Link id="add-new-user" className="text-white" to="/users/add">Add user</Link>
          </li>
          <li className="nav-item">
            <Link id="sign-out-item" className="text-white" to="" onClick={(event: any) => performSignout(event)}>Sign out</Link>
          </li>
        </ul>
      </div>
    )
  }

  return (
    <nav id="header" className="navbar fixed-top navbar-light bg-primary">
      <button className="navbar-toggler" type="button"
        data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav"
        aria-expanded="false" aria-label="Toggle navigation"
        onClick={() => setCollapsed(!collapsed)}>
        <span className="navbar-toggler-icon"></span>
      </button>
      {renderMenu()}
    </nav>
  )
}
export default Header;
