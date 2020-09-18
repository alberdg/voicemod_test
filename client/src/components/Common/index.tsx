import React from 'react';
import HelperMessage from './helper-message';
import Spinner from './spinner';

/**
 * Renders a helper message
 * @function
 * @param display Flag indicating if Helper message should be displayed
 * @param id Helper message id
 * @param classes Helper message classes
 * @param message Helper message
 * @returns helperMessage Helper message element
 */
export const renderHelperMessage = (display: boolean, id: string,
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
 * Renders name input
 * @function
 * @returns input Input element
 */
export const renderInputField = (id: string, classes: string, placeholder: string,
  value: string, onChange: Function, type:string = 'text', display: boolean,
  helperId: string = '', helperClasses: string = '', helperSpanClass: string = '',
  helperMessage: string = ''): JSX.Element => {
  return (
    <>
      <div className="form-group">
        <input
          id={id}
          className={classes}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={event => onChange(event.target.value)}
        />
      </div>
      {
        renderHelperMessage(
          display,
          helperId,
          helperClasses,
          helperSpanClass,
          helperMessage
        )
      }
    </>
  );
}

/**
 * Renders loading spinner
 * @function
 * @param loading Flag indicating if spinner should be displayed
 * @returns spinner Loading spinner
 */
export const renderSpinner = (loading: boolean): JSX.Element => {
  return <Spinner loading={loading}/>
}
