import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import HelperMessage from '../Common/helper-message';
import { isValidEmail, isValidPassword } from '../../utils/utils';
import { signin } from '../../actions/signin';
import { SIGNED_IN_USER } from '../../constants';

/**
 * Functional component representing login screen
 * @function
 * @returns component Login component
 */
const Login = (): JSX.Element => {
  const [ email, setEmail ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ error, setError ] = useState<boolean>(false);
  const validEmail = isValidEmail(email);
  const validPassword = isValidPassword(password);

  /**
   * Performs sign in
   * @function
   */
  const performSignin = async (event: MouseEvent) => {
    // Prevent event default behaviour
    event.preventDefault();
    setError(false);

    /**
     * Double check just in case user removes disabled property on
     * browsers inspector
    */
    if (validEmail && validPassword) {

      setLoading(true);
      const response = await signin(email, password);
      if (response && response.data) {
        // Store user in localstorage
        localStorage.setItem(SIGNED_IN_USER, JSON.stringify(response.data));
      } else {
        setError(true);
      }
      setLoading(false);
    }
  }

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
        <button
          id="login"
          className="btn btn-primary"
          disabled={disabled}
          onClick={(event: any) => performSignin(event)}
        >
          Sign in
        </button>
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
        <Link id="signup" to="/signup" className="text-white mt-5">Sign up</Link>
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

  /**
   * Renders voicemod logo
   * @function
   * @returns element Voicemod logo
   */
  const renderLogo = (): JSX.Element => {
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

  /**
   * Renders loading spinner
   * @function
   * @returns spinner Spinner element
   */
  const renderLoading = () => {
    if (!loading) {
      return null;
    }
    return (
      <div className="row">
        <img
          id="loading"
          src="/img/loading.gif"
          alt="Loading"
          className="img-fluid mx-auto mb-2"
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
          {renderLoading()}
          {
            renderHelperMessage(
              error && !loading,
              'signin-error',
              "alert alert-danger",
              'error',
              'Invalid credentials'
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
