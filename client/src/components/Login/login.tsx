import React, { useState } from 'react';
import './login.css';
import HelperMessage from '../Common/helper-message';
import { isValidEmail, isValidPassword } from '../../utils/utils';
/**
 * Functional component representing login screen
 * @function
 * @returns component Login component
 */
const Login = () => {
  const [ email, setEmail ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const validEmail = isValidEmail(email);
  const validPassword = isValidPassword(password);
  /**
   * Renders email input
   * @function
   * @returns email Email element
   */
  const renderEmail = (): JSX.Element => {
    return (
      <div className="form-group">
        <input
          id="email-input"
          className="form-control"
          placeholder="Email"
          type="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
      </div>
    );
  }

  /**
   * Renders a helper message
   * @function
   * @param display Flag indicating if Helper message should be displayed
   * @param id Helper message id
   * @param classes Helper message classes
   * @param message Helper message
   * @returns helperMessage Helper message element
   */
  const renderHelperMessage = (display: boolean, id: string,
    alertClasses: string, classes: string, message: string): JSX.Element => {
    return (
      <HelperMessage
        display={display}
        message={message}
        id={id}
        classes={classes}
        alertClasses={alertClasses}
      />
    )
  }

  /**
   * Renders password input
   * @function
   * @returns password Password element
   */
  const renderPassword = (): JSX.Element => {
    return (
      <div className="form-group">
        <input
          id="password-input"
          className="form-control"
          placeholder="Password"
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
      </div>
    );
  }

  /**
   * Renders login button
   * @function
   * @returns loginButton Login button element
   */
  const renderLoginButton = (): JSX.Element => {
    const disabled = !isValidEmail(email) || !isValidPassword(password);
    return (
      <div className="form-group mx-auto">
        <button id="login" className="btn btn-primary" disabled={disabled}>Sign in</button>
      </div>
    )
  }

  /**
   * Renders sign up button
   * @function
   * @returns signupButton Sign up element
   */
  const renderSignupButton = (): JSX.Element => {
    return (
      <div className="form-group mx-auto">
        <a id="signup" href="/signup" className="text-white mt-5">Sign up</a>
      </div>
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
        <h1 id="title" className="mx-auto text-white">Voicemod coding challenge</h1>
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
        <h5 id="subtitle" className="mx-auto text-white">Please enter your credentials to sign in.</h5>
      </div>
    )
  }

  const renderLogo = () => {
    return (
      <div className="row mx-auto">
        <img
          src="https://www.voicemod.net/v3/wp-content/themes/voicemod/inc/assets/img/logo-header.png"
          alt="Voicemod coding challenge"
          className="img-fluid"
        />
      </div>
    )
  }

  return (
    <div id="login-container">
      <div id="login-wrapper" className="col-md-6 col-sm-12 text-center">
        {renderLogo()}
        {renderTitle()}
        {renderSubtitle()}
        <form noValidate className="mt-3">
          {renderEmail()}
          {
            renderHelperMessage(
              !validEmail && email.trim().length > 0,
              'email-error',
              "alert alert-danger",
              'error',
              'Invalid email address format'
            )
          }
          {renderPassword()}
          {
            renderHelperMessage(
              !validPassword && password.trim().length > 0,
              'password-error',
              'alert alert-danger',
              'error',
              'Password must have between 4 and 20 characters'
            )
          }
          {renderLoginButton()}
          {renderSignupButton()}
        </form>
      </div>
    </div>
  )
}
export default Login;
