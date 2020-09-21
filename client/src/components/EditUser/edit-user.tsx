import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../Common/header';
import EditUserForm from './edit-form';
import EditUserPasswordForm from './edit-password-form';
import { UserContext } from '../../context/user-context';
import { signup } from '../../actions/signup';
import { User } from '../../interfaces/user';
import { renderHelperMessage } from '../Common/';
import { fetchUserById } from '../../actions/users';

/**
 * Functional component representing edit user page
 * @function
 * @param history Router history
 * @returns addUer Add user component
 */
const EditUser = ({ history } : { history : any }) => {
  const { id } = useParams();
  const { validForm, setSuccessMessage, setErrorMessage,
    setLoading, name, lastname, email, password, country, telephone,
    postcode, setName, setLastname, setEmail, setPassword, setCountry,
    setTelephone, setPostcode, setValidForm } = useContext(UserContext);
  const [ fetchError, setFetchError ] = useState<string>('');

  useEffect(() => {
    initializeContext();
    const fetchData = async () => {
      const response = await fetchUserById(id);
      if (response && response.status === 200) {
        const user: User = response.data;
        if (user?.id === id) {
          initializeUser(user);
        }
      } else {
        setFetchError('Error loading user');
      }
      setLoading(false);
    }
    fetchData();
  }, [id]);

  /**
   * Initialize context values
   * @function
   */
  const initializeContext = () => {
    setErrorMessage('');
    setSuccessMessage('');
    setValidForm(false);
    setLoading(true);
  }

  /**
   * Initialize user context using fetched value
   * @function
   * @param user User object
   */
  const initializeUser = (user: User) : void => {
    const { name, lastname, email, country, telephone,
      postcode } = user;
    setName(name);
    setLastname(lastname);
    setEmail(email);
    setPassword('');
    setCountry(country);
    setTelephone(telephone);
    setPostcode(postcode);
  }

  /**
   * Renders edit user title
   * @function
   * @returns title Title element
   */
  const renderTitle = (): JSX.Element => {
    return (
      <div className="row mt-3">
        <h1 id="title" className="mx-auto">Voicemod edit user</h1>
      </div>
    )
  }


  /**
   * Edits the current user
   * @function
   * @param event Form submitted event
   */
  const editUser = async (event: MouseEvent): Promise<void> => {
    if (!id) {
      return null as any;
    }
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (validForm) {
      setLoading(true);
      const response = await signup(name, lastname, email, password, telephone,
        country, postcode);
      if (response && response.status === 201) {
        setSuccessMessage('User successfully edited');
      } else if (response && response.status === 400) {
        setErrorMessage('User email already exists');
      } else {
        setErrorMessage('Error while editing the user');
      }
      setLoading(false);
    }
  }

  /**
   * Edits the current user password
   * @function
   * @param event Form submitted event
   * @param setPasswordErrorMessage Password error message
   * @param setPasswordSuccessMessage Password success message
   */
  const editUserPassword = async (event: MouseEvent, setPasswordErrorMessage: Function,
    setPasswordSuccessMessage: Function): Promise<void> => {
    if (!id) {
      return null as any;
    }
    event.preventDefault();
    setPasswordErrorMessage('');
    setPasswordSuccessMessage('');

  }

  /**
   * Renders edit user form
   * @function
   * @returns userForm Edit user form
   */
  const renderUserForm = (): JSX.Element => {
    if (!fetchError.isEmpty()) {
      return null as any;
    }
    return (
      <EditUserForm
        actionId="edit"
        actionTitle="Edit user"
        performAction={(event: MouseEvent) => editUser(event)}
      />
    );
  }

  /**
   * Renders edit user password form
   * @function
   * @returns userPasswordForm Edit user password form
   */
  const renderUserPasswordForm = (): JSX.Element => {
    if (!fetchError.isEmpty()) {
      return null as any;
    }
    return (
      <EditUserPasswordForm
        performAction={(
          event: MouseEvent, 
          setPasswordErrorMessage: Function,
          setPasswordSuccessMessage: Function,
        ) => editUserPassword(event, setPasswordErrorMessage, setPasswordSuccessMessage)}
      />
    );
  }

  /**
   * Renders fetch error message
   * @function
   * @returns fetchError Fetch error message
   */
  const renderFetchError = (): JSX.Element => {
    if (fetchError.isEmpty()) {
      return null as any;
    }
    return (
      <>
        {renderHelperMessage(
         true,
         'edit-error',
         "alert alert-danger",
         'error',
         fetchError
       )}
       {renderBackButton()}
      </>
    );
  }

  /**
   * Renders back button
   * @function
   * @returns backButton Back button element
   */
  const renderBackButton = () => {
    return (
      <div className="row mt-3">
         <div className="col-12">
           <Link to="/users">
             <button id="back" className="btn btn-primary">
               Back
             </button>
           </Link>
         </div>
      </div>
    );
  }

  /**
   * Renders edit user data form
   * @function
   * @returns editUserData Edit user data form element
   */
  const renderEditUserData = (): JSX.Element =>  {
    return (
      <div className="card">
        <div className="card-body">
          {renderTitle()}
          {renderUserForm()}
        </div>
      </div>
    );
  }


  return (
    <>
      <Header history={history} active="edit-user"/>
      <div className="row">
        <div className="col-sm-12 text-center page-container" id="edit-user">
          {renderEditUserData()}
          {renderUserPasswordForm()}
          {renderFetchError()}
        </div>
      </div>
    </>
  )
}
export default EditUser;
