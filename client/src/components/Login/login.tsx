import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import Logo from '../Common/logo';
import { isValidEmail, isValidPassword } from '../../utils/utils';
import { signin } from '../../actions/signin';
import { SIGNED_IN_USER } from '../../constants';
import { renderSpinner, renderInputField, renderHelperMessage } from '../Common';
/**
 * Functional component representing login screen
 * @function
 * @returns component Login component
 */
const Login = ({ history } : { history : any }): JSX.Element => {
  const [ email, setEmail ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ errorMessage, setErrorMessage ] = useState<string>('');
  const validEmail = isValidEmail(email);
  const validPassword = isValidPassword(password);

  /**
   * Performs sign in
   * @function
   */
  const performSignin = async (event: MouseEvent) => {
    // Prevent event default behaviour
    event.preventDefault();
    setErrorMessage('')

    /**
     * Double check just in case user removes disabled property on
     * browsers inspector
    */
    if (validEmail && validPassword) {

      setLoading(true);
      const response = await signin(email, password);
      if (response && response.status === 200) {
        // Store user in localstorage
        localStorage.setItem(SIGNED_IN_USER, JSON.stringify(response.data));
        history.push('/home');
      } else if (response && response.status === 400) {
        setErrorMessage('Invalid credentials');
      } else {
        setErrorMessage('Sign in error');
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
    const display: boolean = !validEmail && !email.isEmpty();
    return renderInputField('email-input',
      'form-control',
      'Email',
      email,
      setEmail,
      'email',
      display,
      'email-error',
      'alert alert-danger',
      'error',
      'Invalid email address format'
    );
  }


  /**
   * Renders password input
   * @function
   * @returns password Password element
   */
  const renderPassword = (): JSX.Element => {
    const display: boolean = !validPassword && !password.isEmpty();
    return renderInputField('password-input',
    'form-control',
    'Password',
    password,
    setPassword,
    'password',
    display,
    'password-error',
    'alert alert-danger',
    'error',
    'Password must have between 4 and 20 characters');
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
      <Logo />
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
          {renderPassword()}
          {renderSpinner(loading)}
          {renderHelperMessage(!errorMessage.isEmpty(),
            'signin-error',
            'alert alert-danger',
            'error',
            errorMessage)}
          {renderLoginButton()}
          {renderSignupButton()}
        </form>
      </div>
    </div>
  )
}
export default Login;
