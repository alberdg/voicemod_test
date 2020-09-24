import React, { useEffect, useContext } from 'react';
import './home.css';
import Header from '../Common/header';
import UserTable from '../Common/user-table';
import { AppContext } from '../../context/app-context';
import { UserContext } from '../../context/user-context';
import { fetchCountries } from '../../actions/countries';
import { checkAuthorization } from '../../utils/utils';

/**
 * Functional component representing home page
 * @function
 * @param history Router history
 * @returns home Home component
 */
const Home = ({ history } : { history : any }) => {
  const { countries, setCountries } = useContext(AppContext);
  const { setUnauthorized } = useContext(UserContext);

  useEffect(() => {
    checkAuthorization(history, setUnauthorized);
    if (!Array.isArray(countries) || countries.length === 0) {
      const fetchData = async () => {
        const response = await fetchCountries();
        if (response && response.status === 200) {
          setCountries(response.data);
        }
      }
      fetchData();
    }
  }, []);

  /**
   * Renders login title
   * @function
   * @returns title Title element
   */
  const renderTitle = (): JSX.Element => {
    return (
      <div className="row mt-3">
        <h1 id="title" className="mx-auto">Voicemod users administration panel</h1>
      </div>
    )
  }

  // FIXME -> Move table to a component
  return (
    <>
      <Header history={history}  active="users"/>
      <div className="row">
        <div className="col-sm-12 text-center" id="home">
          {renderTitle()}
          <UserTable />
        </div>
      </div>
    </>
  )
}
export default Home;
