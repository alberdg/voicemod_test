import React, {  useEffect, useContext } from 'react';
import { isValidEmail } from '../../utils/utils';
import { renderInputField, renderSpinner, renderHelperMessage } from '../Common';
import { fetchCountries } from '../../actions/countries';
import { Country } from '../../interfaces/country';
import { AppContext } from '../../context/app-context';
import { UserContext } from '../../context/user-context';

/**
 * Edit User form component
 * @function
 * @param actionId Action button id
 * @param performAction Action to be performed
 * @param actionTitle Action button title
 * @returns singup Signup element
 */
const EditUserForm = ({ actionId, performAction, actionTitle } :
  { actionId: string, performAction: Function, actionTitle: string }): JSX.Element => {
  const { countries, setCountries} = useContext(AppContext);
  const {
    name, setName, lastname, setLastname, email, setEmail, country, setCountry,
    telephone, setTelephone, postcode, setPostcode, errorMessage, successMessage,
    loading, setLoading, validForm, setValidForm
  } = useContext(UserContext);

  const validEmail = isValidEmail(email);

  useEffect(() => {
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
   * Validates the form
   * @function
   * @returns flag Flag indicating if the form is valid
   */
  const isValidForm = () => {
    return !name.isEmpty() && !lastname.isEmpty() && validEmail &&
      !telephone.isEmpty() && !postcode.isEmpty() && country !== '-1';
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
   * Renders telephone element
   * @function
   * @returns telephone Telephone element
   */
  const renderTelephone = (): JSX.Element => {
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
  const renderPostcode = (): JSX.Element => {
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
  const renderActionButton = (): JSX.Element => {
    const disabled = !validForm;
    return (
      <div className="form-group mx-auto">
        <button
          id={actionId}
          className="btn btn-primary"
          disabled={disabled}
          onClick={(event: any) => performAction(event)}
        >
          {actionTitle}
        </button>
      </div>
    )
  }

  /**
   * Renders country options
   * @function
   * @returns options Country options
   */
  const renderCountryOptions = (): JSX.Element[] => {
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
         'edit-error',
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
         'edit-success',
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
    // Store if the form is valid in user context
    setValidForm(isValidForm());
    return (
      <form id="edit-user-form" noValidate className="mt-3">
        {renderName()}
        {renderLastname()}
        {renderEmail()}
        {renderTelephone()}
        {renderCountries()}
        {renderPostcode()}
        {renderError()}
        {renderSuccess()}
        {renderActionButton()}
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
export default EditUserForm;
