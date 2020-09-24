import React from 'react';

/**
 * Helper message element
 * @function
 * @param display Flag indicating if the message should be displayed
 * @param message Message to be displayed
 * @param classes Message css classes
 * @param id Message id
 * @returns helperMessage HelperMessage component
 */
const HelperMessage = ({ display, message, classes, id, alertClasses } :
  {
    display: boolean, message: string, classes: string, id: string,
    alertClasses: string
  }): any => {
  if (!display) {
    return null;
  }
  return (
    <div className="form-group">
      <div className={alertClasses}>
        <span id={id} className={classes}>{message}</span>
      </div>
    </div>
  )
}
export default HelperMessage;
