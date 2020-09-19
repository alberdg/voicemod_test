import React from 'react';
import Header from '../Common/header';
import AddUserForm from '../Common/add-user-form';

/**
 * Functional component representing add user page
 * @function
 * @param history Router history
 * @returns addUer Add user component
 */
const AddUser = ({ history } : { history : any }) => {
  /**
   * Renders login title
   * @function
   * @returns title Title element
   */
  const renderTitle = (): JSX.Element => {
    return (
      <div className="row mt-3">
        <h1 id="title" className="mx-auto">Voicemod create a new user</h1>
      </div>
    )
  }

  return (
    <>
      <Header history={history} active="add-user"/>
      <div className="row">
        <div className="col-sm-12 text-center page-container" id="add-user">
          {renderTitle()}
          <AddUserForm history={history} shouldRedirect={false}/>
        </div>
      </div>
    </>
  )
}
export default AddUser;
