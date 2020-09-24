import React, { useContext, useEffect } from 'react';
import Header from '../Common/header';
import UserForm from '../Common/user-form';
import { UserContext } from '../../context/user-context';
import { signup } from '../../actions/signup';
import { checkAuthorization } from '../../utils/utils';

/**
 * Functional component representing add user page
 * @function
 * @param history Router history
 * @returns addUer Add user component
 */
const AddUser = ({ history } : { history : any }) => {
  const { validForm, setSuccessMessage, setErrorMessage,
    setLoading, name, lastname, email, password, country, telephone,
    postcode, setUnauthorized } = useContext(UserContext);

    useEffect(() => {
      checkAuthorization(history, setUnauthorized);
    }, []);

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

  /**
   * Creates a new user
   * @function
   * @param event Form submitted event
   * @param resetForm Reset form function
   */
  const addUser = async (event: MouseEvent, resetForm: Function) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);
    if (validForm) {
      const response = await signup(name, lastname, email, password, telephone,
        country?.id, postcode);
      if (response && response.status === 201) {
        setSuccessMessage('User successfully added');
        resetForm();
      } else if (response && response.status === 400) {
        setErrorMessage('User already exists');
      } else {
        setErrorMessage('Error while adding a new user');
      }
      setLoading(false);
    }
  }

  return (
    <>
      <Header history={history} active="add-user"/>
      <div className="row">
        <div className="col-sm-12 text-center page-container" id="add-user">
          {renderTitle()}
          <UserForm
            actionId="signup"
            actionTitle="Add user"
            performAction={(event: MouseEvent, resetForm: Function) => addUser(event, resetForm)}
            />
        </div>
      </div>
    </>
  )
}
export default AddUser;
