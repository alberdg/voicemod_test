import React, { useState, useEffect, useContext } from 'react';
import { isValidEmail, isValidPassword } from '../../utils/utils';
import { renderInputField, renderSpinner, renderHelperMessage } from './';
import { fetchCountries } from '../../actions/countries';
import { Country } from '../../interfaces/country';
import { signup } from '../../actions/signup';
import { SIGNED_IN_USER } from '../../constants';
import { AppContext } from '../../context/app-context';
import { UserContext } from '../../context/user-context';

/**
 * Add user form component
 * @function
 * @param history History object
 * @param shouldRedirect Flag indicating if component should redirect to home
 * @returns singup Signup element
 */
const AddUserForm = ({ history, shouldRedirect = true } : { history: any, shouldRedirect: boolean }): JSX.Element => {
  const { countries, setCountries} = useContext(AppContext);
  const {
    name, setName, lastname, setLastname, email, setEmail, password, setPassword,
    repeatPassword, setRepeatPassword, country, setCountry, telephone, setTelephone,
    postcode, setPostcode
  } = useContext(UserContext);
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ errorMessage, setErrorMessage ] = useState<string>('');
  const [ successMessage, setSuccessMessage ] = useState<string>('');
  const validEmail = isValidEmail(email);
  const validPassword = isValidPassword(password);

  useEffect(() => {
    resetForm();
    if (!Array.isArray(countries) || countries.length === 0) {
      const fetchData = async () => {
        const response = await fetchCountries();
        if (response && response.status === 200) {
          setCountries(response.data);
        }
        setLoading(false);
      }
      fetchData();
    }
  }, []);

  /**
   * Resets the form
   * @function
   */
  const resetForm = () => {
    setName('');
    setLastname('');
    setEmail('');
    setPassword('');
    setRepeatPassword('');
    setTelephone('');
    setPostcode('');
    setCountry('');
  }

  /**
   * onChange handler for country
   * @function
   * @param event OnChange event
   */
  const handleCountryChange = (event: React.FormEvent<HTMLSelectElement>) => {
    const { selectedIndex } = event.currentTarget;
    const country: string = selectedIndex ? countries[selectedIndex].id : '-1';
    setCountry(country);
  }

  /**
   * Performs user signup
   * @function
   * @param event Form submitted event
   */
  const performSignup = async (event: MouseEvent) => {
    event.preventDefault();
    const validForm: boolean = isValidForm();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);
    if (validForm) {
      const response = await signup(name, lastname, email, password, telephone, country, postcode)
      if (response && response.status === 201) {
        if (shouldRedirect) {
          localStorage.setItem(SIGNED_IN_USER, JSON.stringify(response.data));
          setLoading(false);
          return history.push('/users');
        } else {
          setSuccessMessage('User successfully added');
          resetForm();
        }
      } else if (response && response.status === 400) {
        setErrorMessage('User already exists');
      } else {
        setErrorMessage('Error in user sign up');
      }
      setLoading(false);
    }
  }

  /**
   * Validates the form
   * @function
   * @returns flag Flag indicating if the form is valid
   */
  const isValidForm = () => {
    return !name.isEmpty() && !lastname.isEmpty() && validEmail &&
      validPassword && repeatPassword === password && !telephone.isEmpty() &&
      !postcode.isEmpty() && country !== '-1';
  }

  /**
   * Renders name input
   * @function
   * @returns name Name element
   */
  const renderName = (): JSX.Element => {
    return renderInputField('name-input',
    'form-control',
    'First name',
    name,
    setName,
    'text',
    false);
  }

  /**
   * Renders lastname input
   * @function
   * @returns lastname Lastname element
   */
  const renderLastname = (): JSX.Element => {
    return renderInputField('lastname-input',
    'form-control',
    'Last name',
    lastname,
    setLastname,
    'text',
    false);
  }

  /**
   * Renders email element
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
    'Invalid email address format');
  }

  /**
   * Renders password element
   * @function
   * @returns password Password element
   */
  const renderPassword = () => {
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
   * Renders repeat password element
   * @function
   * @returns repeatPassword Repeat password element
   */
  const renderRepeatPassword = () => {
    const display: boolean = validPassword && password !== repeatPassword;
    return renderInputField('repeat-password-input',
    'form-control',
    'Repeat your password',
    repeatPassword,
    setRepeatPassword,
    'password',
    display,
    'repeat-password-error',
    'alert alert-danger',
    'error',
    'Passwords don\'t match');
  }

  /**
   * Renders telephone element
   * @function
   * @returns telephone Telephone element
   */
  const renderTelephone = () => {
    return renderInputField('telephone-input',
    'form-control',
    'Telephone',
    telephone,
    setTelephone,
    'telephone',
    false);
  }

  /**
   * Renders postcode element
   * @function
   * @returns postcode Postcode element
   */
  const renderPostcode = () => {
    return renderInputField('postcode-input',
    'form-control',
    'Postcode',
    postcode,
    setPostcode,
    'postcode',
    false
    );
  }

  /**
   * Renders signup button
   * @function
   * @returns signupButton Signup button element
   */
  const renderSignupButton = (): JSX.Element => {
    const disabled = !isValidForm();
    return (
      <div className="form-group mx-auto">
        <button
          id="signup"
          className="btn btn-primary"
          disabled={disabled}
          onClick={(event: any) => performSignup(event)}
        >
          Sign up
        </button>
      </div>
    )
  }

  /**
   * Renders country options
   * @function
   * @returns options Country options
   */
  const renderCountryOptions = (): any => {
    return countries.map((country: Country) =>
      <option className="country" key={country.id} id={country.id}>{country.name}</option>);
  }

  /**
   * Renders country select element
   * @function
   * @returns countries Country select element
   */
  const renderCountries = (): JSX.Element => {
    return (
      <div className="form-group">
        <select id="countries-select" className="form-control"
          onChange={event => handleCountryChange(event)}
          value={country}>
          <option id="-1">Please select a country</option>
          {renderCountryOptions()}
        </select>
      </div>
    )
  }

  /**
   * Renders signup error
   * @function
   * @returns element Signup error element
   */
  const renderError = (): JSX.Element => {
    return (
        renderHelperMessage(
         !errorMessage.isEmpty(),
         'signup-error',
         "alert alert-danger",
         'error',
         errorMessage
       )
    );
  }

  /**
   * Renders signup success
   * @function
   * @returns element Signup success element
   */
  const renderSuccess = (): JSX.Element => {
    return (
        renderHelperMessage(
         !successMessage.isEmpty(),
         'signup-success',
         "alert alert-success",
         'success',
         successMessage
       )
    );
  }

  /**
   * Renders add user form
   * @function
   * @returns element Add user form element
   */
  const renderForm = () : JSX.Element => {
    if (loading) return null as any;
    return (
      <form noValidate className="mt-3">
        {renderName()}
        {renderLastname()}
        {renderEmail()}
        {renderPassword()}
        {renderRepeatPassword()}
        {renderTelephone()}
        {renderCountries()}
        {renderPostcode()}
        {renderError()}
        {renderSuccess()}
        {renderSignupButton()}
      </form>
    );
  }

  return (
    <>
      {renderForm()}
      {renderSpinner(loading)}
    </>
  )



}
export default AddUserForm;
