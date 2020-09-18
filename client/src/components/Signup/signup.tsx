import React from 'react';
import './signup.css';
import Logo from '../Common/logo';
import AddUserForm from '../Common/add-user-form';

/**
 * Sign up component
 * @function
 * @param history History object
 * @returns singup Signup element
 */
const Signup = ({ history }: { history: any }): JSX.Element => {
  /**
   * Renders voicemod logo
   * @function
   * @returns logo Logo element
   */
  const renderLogo = () => {
    return (
      <Logo />
    )
  }

  /**
   * Renders login title
   * @function
   * @returns title Title element
   */
  const renderTitle = (): JSX.Element => {
    return (
      <div className="row mt-3">
        <h1 id="title" className="mx-auto text-white">Voicemod create a new account</h1>
      </div>
    )
  }

  /**
   * Renders login subtitle
   * @function
   * @returns title Subtitle element
   */
  const renderSubtitle = (): JSX.Element => {
    return (
      <div className="row mt-3">
        <h5 id="subtitle" className="mx-auto text-white">Please fill in all the fields.</h5>
      </div>
    )
  }

  /**
   * Renders add user form
   * @function
   * @returns element Add user form element
   */
  const renderAddUserForm = (): JSX.Element => {
    return <AddUserForm history={history}/>
  }

  return (
    <div id="signup-container">
      <div id="signup-wrapper" className="col-md-6 col-sm-12 text-center">
        {renderLogo()}
        {renderTitle()}
        {renderSubtitle()}
        {renderAddUserForm()}
      </div>
    </div>
  );
}
export default Signup;
