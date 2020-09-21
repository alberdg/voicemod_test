import React, { useContext } from 'react';
import { isValidPassword } from '../../utils/utils';
import { renderInputField, renderSpinner, renderHelperMessage } from '../Common';
import { PasswordContext } from '../../context/password-context';

/**
 * Edit User password form component
 * @function
 * @param performAction Action to be performed
 * @returns editUserPasswordForm Edit user password form element
 */
const EditUserPasswordForm = ({ performAction } :
  { performAction: Function }): JSX.Element => {
  const {
    password, setPassword, repeatPassword, setRepeatPassword,
    loading, passwordErrorMessage, passwordSuccessMessage,
  } = useContext(PasswordContext);
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
        <h1 id="edit-password-title" className="mx-auto">Voicemod edit user password</h1>
      </div>
    )
  }

  /**
   * Renders password element
   * @function
   * @returns password password element
   */
  const renderPassword = (): JSX.Element => {
    const display: boolean = !validPassword && !password?.isEmpty();
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
  const renderRepeatPassword = (): JSX.Element => {
    return renderInputField('repeat-password-input',
    'form-control',
    'Repeat password',
    repeatPassword,
    setRepeatPassword,
    'password',
    !repeatPassword?.isEmpty() && password !== repeatPassword,
    'password-error',
    'alert alert-danger',
    'error',
    'Password don\'t match'
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
          onClick={(event: any) => performAction(event)}
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
         !passwordErrorMessage.isEmpty(),
         'edit-password-error',
         "alert alert-danger",
         'error',
         passwordErrorMessage
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
         !passwordSuccessMessage.isEmpty(),
         'edit-password-success',
         "alert alert-success",
         'success',
         passwordSuccessMessage
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
