import React, {  useState, useContext } from 'react';
import { isValidPassword } from '../../utils/utils';
import { renderInputField, renderSpinner, renderHelperMessage } from '../Common';
import { UserContext } from '../../context/user-context';

/**
 * Edit User password form component
 * @function
 * @param performAction Action to be performed
 * @returns editUserPasswordForm Edit user password form element
 */
const EditUserPasswordForm = ({ performAction } :
  { performAction: Function }): JSX.Element => {
  const {
    password, setPassword, repeatPassword, setRepeatPassword, loading
  } = useContext(UserContext);
  const [ errorMessage, setErrorMessage ] = useState<string>('');
  const [ successMessage, setSuccessMessage ] = useState<string>('');
  const validPassword = isValidPassword(password);

  /**
   * Validates the form
   * @function
   * @returns flag Flag indicating if the form is valid
   */
  const isValidForm = () => {
    return validPassword && password === repeatPassword;
  }


  /**
   * Renders edit user password title
   * @function
   * @returns passwordTitle Password title element
   */
  const renderTitle = (): JSX.Element => {
    return (
      <div className="row mt-3">
        <h1 id="title" className="mx-auto">Voicemod edit user password</h1>
      </div>
    )
  }

  /**
   * Renders password element
   * @function
   * @returns password password element
   */
  const renderPassword = (): JSX.Element => {
    return renderInputField('password-input',
    'form-control',
    'Password',
    password,
    setPassword,
    'password',
    !isValidPassword);
  }

  /**
   * Renders repeat password element
   * @function
   * @returns repeatPassword Repeat password element
   */
  const renderRepeatPassword = (): JSX.Element => {
    return renderInputField('repeat-password-input',
    'form-control',
    'Repeat password',
    repeatPassword,
    setRepeatPassword,
    'password',
    password !== repeatPassword
    );
  }

  /**
   * Renders edit password button
   * @function
   * @returns editPasswordButton Edit password button element
   */
  const renderActionButton = (): JSX.Element => {
    const disabled = !isValidForm();
    return (
      <div className="form-group mx-auto">
        <button
          id='edit-password-btn'
          className="btn btn-primary"
          disabled={disabled}
          onClick={(event: any) => performAction(event,
            setErrorMessage,
            setSuccessMessage)}
        >
          Save
        </button>
      </div>
    )
  }


  /**
   * Renders edit password error
   * @function
   * @returns element Edit password error element
   */
  const renderError = (): JSX.Element => {
    return (
        renderHelperMessage(
         !errorMessage.isEmpty(),
         'edit-password-error',
         "alert alert-danger",
         'error',
         errorMessage
       )
    );
  }

  /**
   * Renders esir password success
   * @function
   * @returns element Edit password success element
   */
  const renderSuccess = (): JSX.Element => {
    return (
        renderHelperMessage(
         !successMessage.isEmpty(),
         'edit-password-success',
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
      <div className="card mt-3">
        <div className="card-body">
          <form id="edit-user-password-form" noValidate className="mt-3">
            {renderTitle()}
            {renderPassword()}
            {renderRepeatPassword()}
            {renderError()}
            {renderSuccess()}
            {renderActionButton()}
          </form>
        </div>
      </div>
    );
  }

  return (
    <>
      {renderForm()}
      {renderSpinner(loading)}
    </>
  )



}
export default EditUserPasswordForm;
