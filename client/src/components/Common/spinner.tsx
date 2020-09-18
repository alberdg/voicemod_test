import React from 'react';

/**
 * Functional component representing a loading spinner
 * @function
 * @param loading Loading flag to determine if render component
 * @returns component Spinner component
 */
const Spinner = ({ loading } : { loading: boolean }) : any => {
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
export default Spinner;
