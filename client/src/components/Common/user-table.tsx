import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import './user-table.css';
import { renderSpinner } from './';
import { User } from '../../interfaces/user';
import { fetchUsers, deleteUser } from '../../actions/users';
/**
 * Functional component representing a table with users
 * @function
 * @returns element User table element
 */
const UserTable = (): JSX.Element => {
  const [ users, setUsers ] = useState<User>([] as any);
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ pageCount, setPageCount ] = useState(10);
  useEffect(() => {
    fetchData();
  }, []);

  /**
   * Fetches users
   * @function
   */
  const fetchData = async () => {
    const response = await fetchUsers();
    if (response && response.status === 200) {
      setUsers(response.data);
    } else {
      console.log(response.data, response.status);
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
    console.log(`handlePageChange`, selected);
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
          <Link to={`/edit/${id}`} className="btn btn-primary">
            <FontAwesomeIcon icon={faEdit} />
          </Link>
        </td>
        <td>{name}</td>
        <td>{lastname}</td>
        <td>{email}</td>
        <td>{country}</td>
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
    if (loading) {
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
  return (
    <>
      {renderSpinner(loading)};
      {renderUserTable()}
      {renderPagination()}
    </>
  )
}
export default UserTable;
