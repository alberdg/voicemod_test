import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './signup.css';
import Logo from '../Common/logo';
import AddUserForm from '../Common/user-form';
import { UserContext } from '../../context/user-context';
import { signup } from '../../actions/signup';
import { SIGNED_IN_USER } from '../../constants/';

/**
 * Sign up component
 * @function
 * @param history History object
 * @returns singup Signup element
 */
const Signup = ({ history }: { history: any }): JSX.Element => {
  const {
    setErrorMessage, setLoading, validForm, name, lastname,
    email, password, telephone, country, postcode, setName, setLastname,
    setEmail, setPassword, setRepeatPassword, setCountry, setTelephone,
    setPostcode
  } = useContext(UserContext);

  useEffect(() => {
    initializeContext();
  }, []);

  /**
   * Initialize user context
   * @function
   */
  const initializeContext = () => {
    setName('');
    setLastname('');
    setEmail('');
    setPassword('');
    setCountry('-1');
    setRepeatPassword('');
    setTelephone('');
    setPostcode('');
  }

  /**
   * Performs user sign up
   * @function
   * @param event Form submitted event
   * @param resetForm Reset form function
   */
  const performSignup = async (event: MouseEvent, resetForm: Function) => {
    event.preventDefault();
    setErrorMessage('');
    setLoading(true);
    if (validForm) {
      const response = await signup(name, lastname, email, password, telephone,
        country, postcode);
      if (response && response.status === 201) {
        resetForm();
        localStorage.setItem(SIGNED_IN_USER, JSON.stringify(response.data));
        history.push('/users');
      } else if (response && response.status === 400) {
        setErrorMessage('User already exists');
      } else {
        setErrorMessage('Error while adding a new user');
      }
      setLoading(false);
    }
  }

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
    return <AddUserForm
      actionId="signup"
      actionTitle="Sign up"
      performAction={(event: MouseEvent, resetForm: Function) => performSignup(event, resetForm)}/>
  }

  /**
   * Renders sign in button
   * @function
   * @returns signinButton Sign in element
   */
  const renderSigninButton = (): JSX.Element => {
    return (
      <div className="form-group mx-auto">
        <Link id="signin" to="/" className="text-white mt-5">Sign in</Link>
      </div>
    )
  }

  return (
    <div id="signup-container">
      <div id="signup-wrapper" className="col-md-6 col-sm-12 text-center">
        {renderLogo()}
        {renderTitle()}
        {renderSubtitle()}
        {renderAddUserForm()}
        {renderSigninButton()}
      </div>
    </div>
  );
}
export default Signup;
