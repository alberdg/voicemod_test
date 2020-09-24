import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import './user-table.css';
import { renderSpinner , renderHelperMessage } from './';
import { User } from '../../interfaces/user';
import { fetchUsers, deleteUser } from '../../actions/users';
import { MAX_USER_RECORDS } from '../../constants';

/**
 * Functional component representing a table with users
 * @function
 * @returns element User table element
 */
const UserTable = (): JSX.Element => {
  const [ users, setUsers ] = useState<User>([] as any);
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ usersCount, setUsersCount ] = useState<number>(0);
  const [ pageCount, setPageCount ] = useState<number>(10);
  const [ currentPage, setCurrentPage ] = useState<number>(0);
  const [ errorMessage, setErrorMessage ] = useState<string>('');

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  /**
   * Fetches users
   * @function
   */
  const fetchData = async (page: number) => {
    const response = await fetchUsers(page, MAX_USER_RECORDS);
    if (response && response.status === 200) {
      setUsers(response.data?.users || []);
      const usersCount: number = response.data?.usersCount || 0;
      setUsersCount(usersCount);
      const pageCount: number = usersCount ? Math.ceil(usersCount / MAX_USER_RECORDS) : 0;
      setPageCount(pageCount);
    } else {
      setErrorMessage('Error while retrieving users');
    }
    setLoading(false);
  }

  /**
   * Deletes the given user
   * @function
   * @param id User id
   */
  const removeUser = async (userId: string): Promise<any> => {
    setLoading(true);
    const response = await deleteUser(userId);
    if (response && response.status === 200) {
      console.log(response.data);
      setUsers(response.data);
    } else {
      //FIXME implement proper notification
      console.log(response.data, response.status);
    }
    setLoading(false);
  }

  /**
   * Renders pagination for users table
   * @function
   * @returns pagination Pagination element
   */
  const renderPagination = (): JSX.Element => {
    if (!usersCount || !errorMessage.isEmpty()) {
      return null as any;
    }
    return (
      <div className="table-responsive mt-1">
        <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={pageCount}
            pageClassName="pagination-page"
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={'pagination'}
            activeClassName={'pagination-active'}
          />
      </div>
    )
  }

  /**
   * Handles page change
   * @function
   * @param selected Selected page
   * @returns pagination Pagination element
   */
  const handlePageChange = ({ selected } : { selected: number}) => {
    setCurrentPage(selected);
  }

  /**
   * Renders a single user row
   * @function
   * @param user User item
   * @returns row User row
   */
  const renderUserRow = (user: User): JSX.Element => {
    const { id, name, lastname, email, country, telephone, postcode } = user;
    return (
      <tr key ={id}>
        <td>
          <button className="btn btn-primary" onClick={() => removeUser(id)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </td>
        <td>
          <Link to={`/users/${id}`} className="btn btn-primary">
            <FontAwesomeIcon icon={faEdit} />
          </Link>
        </td>
        <td>{name}</td>
        <td>{lastname}</td>
        <td>{email}</td>
        <td>{country?.name || ''}</td>
        <td>{telephone}</td>
        <td>{postcode}</td>
      </tr>
    )
  }

  /**
   * Renders user table rows
   * @function
   * @returns rows User table rows
   */
  const renderUserRows = (): JSX.Element => {
    if (!Array.isArray(users) || users.length === 0) {
      return null as any;
    }
    return users.map((user: User) => renderUserRow(user)) as any;
  }
  /**
   * Renders users table
   * @function
   * @returns element User table element
   */
  const renderUserTable = (): JSX.Element => {
    if (loading || !errorMessage.isEmpty()) {
      return null as any;
    }
    return (
      <div className="table-responsive mt-3">
        <table id="users-table" className="table">
          <thead className="bg-primary">
            <tr>
              <th></th>
              <th></th>
              <th className="text-white">Name</th>
              <th className="text-white">Last name</th>
              <th className="text-white">Email</th>
              <th className="text-white">Country</th>
              <th className="text-white">Telephone</th>
              <th className="text-white">Postcode</th>
            </tr>
          </thead>
          <tbody>
            {renderUserRows()}
          </tbody>
        </table>
      </div>
    )
  }

  /**
   * Renders error message for fetch users
   * @function
   * @returns element Error message element
   */
  const renderErrorMessage = (): JSX.Element => {
    if (errorMessage.isEmpty()) {
      return null as any;
    }
    return (
        renderHelperMessage(
         !errorMessage.isEmpty(),
         'users-error',
         "alert alert-danger",
         'error',
         errorMessage
       )
    );

  }
  return (
    <>
      {renderSpinner(loading)}
      {renderUserTable()}
      {renderPagination()}
      {renderErrorMessage()}
    </>
  )
}
export default UserTable;
